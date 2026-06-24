import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";

import { createServiceClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const commentSchema = z.object({
  postSlug: z.string().min(2).max(120),
  parentId: z.string().uuid().optional(),
  authorName: z.string().min(2).max(80),
  authorEmail: z.string().email().max(180),
  content: z.string().min(20).max(5000),
  website: z.string().max(200).optional(),
  startedAt: z.number().optional(),
  timeOnPageSeconds: z.number().int().min(0).max(86_400).optional(),
});

type RateBucket = { hour: number[]; day: number[]; byPost: Record<string, number[]> };

const rateBuckets = new Map<string, RateBucket>();
const disposableDomains = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "10minutemail.com",
  "throwam.com",
  "yopmail.com",
  "trashmail.com",
  "tempmail.com",
  "sharklasers.com",
  "guerrillamailblock.com",
  "grr.la",
  "guerrillamail.info",
  "spam4.me",
  "mintemail.com",
  "dispostable.com",
  "fakeinbox.com",
  "mailnull.com",
  "maildrop.cc",
  "tempr.email",
  "discard.email",
  "throwaway.email",
]);

const spamKeywords = ["casino", "viagra", "loan", "crypto pump", "adult", "backlink", "seo package", "forex"];

function getIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function getFingerprint(request: Request) {
  const ip = getIp(request);
  const userAgent = request.headers.get("user-agent") ?? "unknown";
  return crypto.createHash("sha256").update(`${ip}:${userAgent}`).digest("hex");
}

function prune(values: number[], windowMs: number) {
  const now = Date.now();
  return values.filter((value) => now - value < windowMs);
}

function checkRateLimit(fingerprint: string, postSlug: string) {
  const now = Date.now();
  const bucket = rateBuckets.get(fingerprint) ?? { hour: [], day: [], byPost: {} };
  bucket.hour = prune(bucket.hour, 60 * 60 * 1000);
  bucket.day = prune(bucket.day, 24 * 60 * 60 * 1000);
  bucket.byPost[postSlug] = prune(bucket.byPost[postSlug] ?? [], 24 * 60 * 60 * 1000);

  if (bucket.hour.length >= 3 || bucket.day.length >= 8 || bucket.byPost[postSlug].length >= 2) {
    rateBuckets.set(fingerprint, bucket);
    return false;
  }

  bucket.hour.push(now);
  bucket.day.push(now);
  bucket.byPost[postSlug].push(now);
  rateBuckets.set(fingerprint, bucket);
  return true;
}

function analyzeSpam(input: z.infer<typeof commentSchema>) {
  let score = 0;
  const reasons: string[] = [];
  const content = input.content.toLowerCase();
  const urlCount = (input.content.match(/https?:\/\//gi) ?? []).length;
  const emailDomain = input.authorEmail.split("@")[1]?.toLowerCase() ?? "";

  if (input.website?.trim()) {
    score += 0.8;
    reasons.push("honeypot");
  }
  if (urlCount > 2) {
    score += 0.5;
    reasons.push("too_many_urls");
  }
  if (input.content.trim().length < 40) {
    score += 0.4;
    reasons.push("short_comment");
  }
  if (spamKeywords.some((keyword) => content.includes(keyword))) {
    score += 0.3;
    reasons.push("keyword_match");
  }
  if ((input.timeOnPageSeconds ?? 0) < 30) {
    score += 0.3;
    reasons.push("fast_submit");
  }
  if (disposableDomains.has(emailDomain)) {
    score += 0.3;
    reasons.push("disposable_email");
  }
  if (/https?:\/\//i.test(input.authorName)) {
    score += 0.2;
    reasons.push("url_in_name");
  }
  if (input.content.length > 30 && input.content === input.content.toUpperCase()) {
    score += 0.1;
    reasons.push("all_caps");
  }
  if (/[!?]{4,}/.test(input.content)) {
    score += 0.1;
    reasons.push("excessive_punctuation");
  }

  return { score: Math.min(1, score), reasons };
}

function statusFromScore(score: number) {
  if (score >= 0.8) return "spam";
  if (score >= 0.3) return "pending";
  return "pending";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postSlug = searchParams.get("postSlug");
  if (!postSlug) return NextResponse.json({ comments: [] });

  const supabase = createServiceClient();
  if (!supabase) return NextResponse.json({ comments: [] });

  const { data, error } = await supabase
    .from("blog_comments")
    .select("id, author_name, content, status, parent_id, created_at, like_count")
    .eq("post_slug", postSlug)
    .in("status", ["approved", "pending"])
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) return NextResponse.json({ comments: [] });
  return NextResponse.json({ comments: data ?? [] });
}

export async function POST(request: Request) {
  const parsed = commentSchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check your name, email, and comment." }, { status: 400 });
  }

  const fingerprint = getFingerprint(request);
  if (!checkRateLimit(fingerprint, parsed.data.postSlug)) {
    return NextResponse.json({ error: "Too many comments from your connection. Please try again later." }, { status: 429 });
  }

  const spam = analyzeSpam(parsed.data);
  const status = statusFromScore(spam.score);
  const now = new Date().toISOString();
  const comment = {
    id: crypto.randomUUID(),
    post_slug: parsed.data.postSlug,
    parent_id: parsed.data.parentId ?? null,
    author_name: parsed.data.authorName,
    author_email: parsed.data.authorEmail,
    author_ip: getIp(request),
    author_user_agent: request.headers.get("user-agent"),
    content: parsed.data.content,
    status,
    like_count: 0,
    spam_score: spam.score,
    spam_reasons: spam.reasons,
    time_on_page_seconds: parsed.data.timeOnPageSeconds ?? null,
    created_at: now,
    updated_at: now,
  };

  const supabase = createServiceClient();
  if (supabase) {
    const { data, error } = await supabase.from("blog_comments").insert(comment as never).select("id, author_name, content, status, parent_id, created_at, like_count").single();
    if (!error && data) return NextResponse.json({ comment: data });
  }

  return NextResponse.json({
    comment: {
      id: comment.id,
      author_name: comment.author_name,
      content: comment.content,
      status: comment.status,
      parent_id: comment.parent_id,
      created_at: comment.created_at,
      like_count: 0,
    },
  });
}
