export const runtime = 'edge';

import { NextResponse } from "next/server";
import { z } from "zod";

import { getGeminiModel, SYSTEM_PROMPTS } from "@/lib/gemini";
import { readContentFile } from "@/lib/content";
import { createServiceClient } from "@/lib/supabase/admin";

const messageSchema = z.object({
  message: z.string().min(1).max(3000),
  mode: z.enum(["visitor", "customer", "team"]).default("visitor"),
  conversationId: z.string().uuid().optional(),
  visitorEmail: z.string().email().optional(),
  visitorName: z.string().optional(),
  stream: z.boolean().optional(),
});

const fallbackReply =
  "I can help with Loglime products, pricing, setup, and demos. For the fastest next step, book a 30-minute walkthrough and the team will map the right restaurant app setup for you.";

function getErrorReply(error: unknown): string {
  if (process.env.NODE_ENV === "development") {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[Zest AI Full Error]", error);
    return `[DEBUG] ${message}`;
  }
  return fallbackReply;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const parsed = messageSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid chat message." }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { message, mode, conversationId, visitorEmail, visitorName, stream } = parsed.data;
  let activeConversationId = conversationId;

  if (supabase && visitorEmail) {
    await supabase.from("leads").insert({
      full_name: visitorName || visitorEmail,
      email: visitorEmail,
      source: "zest",
      interested_products: ["Ordering App + Admin Panel"],
      notes: `Zest lead capture: ${message}`,
      status: "new",
    });
  }

  if (supabase && !activeConversationId) {
    const { data } = await supabase
      .from("ai_conversations")
      .insert({
        visitor_email: visitorEmail ?? null,
        mode,
        messages: [],
        lead_created: Boolean(visitorEmail),
      } as never)
      .select("id")
        .single();
    activeConversationId = (data as { id?: string } | null)?.id;
  }

  const prompt =
    mode === "visitor"
      ? SYSTEM_PROMPTS.visitor
      : mode === "team"
        ? SYSTEM_PROMPTS.team({ name: "Loglime team member", role: "owner" })
        : SYSTEM_PROMPTS.customer({ name: "Customer", restaurantName: "your restaurant", products: ["Loglime"], projects: "available in the portal", openTickets: "available in support" });

  // Get knowledge base for all modes
  const websiteKnowledge = `\n\n📚 KNOWLEDGE BASE:\n${readContentFile("website-copy.md").slice(0, 24000)}\n\n⚖️ LEGAL:\n${readContentFile("legal-documents.md").slice(0, 12000)}`;
  const fullPrompt = `${prompt}${websiteKnowledge}\n\n⚠️ IMPORTANT: Use the knowledge base above to answer. If not found in knowledge base, say "I don't have that information available."`;


  if (supabase && /(human|person|support ticket|create (a )?ticket|talk to support|handoff)/i.test(message)) {
    await supabase.from("tickets").insert({
      id: crypto.randomUUID(),
      title: `Zest handoff${visitorName ? ` — ${visitorName}` : ""}`,
      category: "zest_handoff",
      priority: "normal",
      status: "open",
      ai_created: true,
      resolution_notes: `Visitor: ${visitorEmail ?? "anonymous"}\nRequest: ${message}`,
    });
  }

  if (stream || request.headers.get("accept")?.includes("text/event-stream")) {
    const encoder = new TextEncoder();
    const id = activeConversationId;
    const responseStream = new ReadableStream({
      async start(controller) {
        let reply = "";
        try {
          const model = getGeminiModel();
          const result = await model.generateContentStream(`${fullPrompt}\n\nUser: ${message}\nZest:`);
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              reply += text;
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text, conversationId: id })}\n\n`));
            }
          }
        } catch (error) {
          reply = getErrorReply(error);
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: reply, conversationId: id })}\n\n`));
        }

        if (supabase && id) {
          await supabase
            .from("ai_conversations")
            .update({
              messages: [
                { role: "user", content: message, createdAt: new Date().toISOString() },
                { role: "assistant", content: reply, createdAt: new Date().toISOString() },
              ],
              updated_at: new Date().toISOString(),
            } as never)
            .eq("id", id);

          // Send email notification to admin via Loops
          if (visitorEmail && visitorName && process.env.LOOPS_ZEST_AI_MESSAGE_ID && process.env.LOOPS_API_KEY) {
            try {
              await fetch("https://app.loops.so/api/v1/transactional/send", {
                method: "POST",
                headers: {
                  "Authorization": `Bearer ${process.env.LOOPS_API_KEY}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  transactionalId: process.env.LOOPS_ZEST_AI_MESSAGE_ID,
                  email: process.env.ZOHO_FROM_EMAIL || "info@loglime.com",
                  dataVariables: {
                    visitorName,
                    visitorEmail,
                    message,
                  },
                }),
              });
            } catch (emailError) {
              console.error("[AI Chat Email Error]", emailError);
            }
          }
        }

        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true, conversationId: id })}\n\n`));
        controller.close();
      },
    });

    return new Response(responseStream, {
      headers: {
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "Content-Type": "text/event-stream; charset=utf-8",
      },
    });
  }

  let reply = fallbackReply;
  try {
    const model = getGeminiModel();
    const result = await model.generateContent(`${fullPrompt}\n\nUser: ${message}\nZest:`);
    reply = result.response.text() || fallbackReply;
  } catch (error) {
    reply = getErrorReply(error);
  }

  if (supabase && activeConversationId) {
    await supabase
      .from("ai_conversations")
      .update({
        messages: [
          { role: "user", content: message, createdAt: new Date().toISOString() },
          { role: "assistant", content: reply, createdAt: new Date().toISOString() },
        ],
        updated_at: new Date().toISOString(),
      } as never)
      .eq("id", activeConversationId);

    // Send email notification to admin via Loops
    if (visitorEmail && visitorName && process.env.LOOPS_ZEST_AI_MESSAGE_ID && process.env.LOOPS_API_KEY) {
      try {
        await fetch("https://app.loops.so/api/v1/transactional/send", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${process.env.LOOPS_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            transactionalId: process.env.LOOPS_ZEST_AI_MESSAGE_ID,
            email: process.env.ZOHO_FROM_EMAIL || "info@loglime.com",
            dataVariables: {
              visitorName,
              visitorEmail,
              message,
            },
          }),
        });
      } catch (emailError) {
        console.error("[AI Chat Email Error]", emailError);
      }
    }
  }

  return NextResponse.json({ reply, conversationId: activeConversationId });
}
