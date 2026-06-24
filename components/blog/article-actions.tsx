"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Button, useToast } from "@/components/ui";
import { cn } from "@/lib/utils";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function updateProgress() {
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(documentHeight <= 0 ? 100 : Math.min(100, Math.max(0, (window.scrollY / documentHeight) * 100)));
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return <div className="fixed left-0 top-0 z-[90] h-1 bg-coral transition-[width]" style={{ width: `${progress}%` }} />;
}

export function ArticleActions({ title, url, postSlug, initialLikes = 0 }: { title: string; url: string; postSlug: string; initialLikes?: number }) {
  const { showToast } = useToast();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [fontSize, setFontSize] = useState<"base" | "large">("base");
  const [likeCount, setLikeCount] = useState(initialLikes);

  useEffect(() => {
    setLiked(localStorage.getItem(`loglime-like-${postSlug}`) === "true");
    setBookmarked(localStorage.getItem(`loglime-bookmark-${postSlug}`) === "true");
  }, [postSlug]);

  useEffect(() => {
    document.documentElement.dataset.articleFont = fontSize;
    return () => {
      delete document.documentElement.dataset.articleFont;
    };
  }, [fontSize]);

  const encodedUrl = useMemo(() => encodeURIComponent(url), [url]);
  const encodedTitle = useMemo(() => encodeURIComponent(title), [title]);

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    showToast({ title: "Link copied", description: "Article URL is ready to share.", tone: "success" });
  }

  async function toggleLike() {
    const next = !liked;
    setLiked(next);
    setLikeCount((count) => Math.max(0, count + (next ? 1 : -1)));
    localStorage.setItem(`loglime-like-${postSlug}`, String(next));
    if (next) {
      await fetch("/api/blog/like", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ postSlug }) }).catch(() => undefined);
    }
  }

  function toggleBookmark() {
    const next = !bookmarked;
    setBookmarked(next);
    localStorage.setItem(`loglime-bookmark-${postSlug}`, String(next));
    showToast({ title: next ? "Saved" : "Removed", description: next ? "Article saved in this browser." : "Bookmark removed from this browser.", tone: "info" });
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <a className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-text-secondary transition hover:bg-coral-light hover:text-coral" href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noreferrer" aria-label="Share on X">
        <i className="hgi-stroke hgi-new-twitter text-lg" />
      </a>
      <a className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-text-secondary transition hover:bg-coral-light hover:text-coral" href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`} target="_blank" rel="noreferrer" aria-label="Share on LinkedIn">
        <i className="hgi-stroke hgi-linkedin-01 text-lg" />
      </a>
      <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-text-secondary transition hover:bg-coral-light hover:text-coral" onClick={copyLink} aria-label="Copy article link">
        <i className="hgi-stroke hgi-link-04 text-lg" />
      </button>
      <button className={cn("inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-slate-100 px-3 transition hover:bg-coral-light hover:text-coral", liked ? "text-coral" : "text-text-secondary")} onClick={toggleLike} aria-label="Like article">
        <i className="hgi-stroke hgi-thumbs-up text-lg" />
        <span className="text-caption font-bold">{likeCount}</span>
      </button>
      <button className={cn("inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 transition hover:bg-coral-light hover:text-coral", bookmarked ? "text-coral" : "text-text-secondary")} onClick={toggleBookmark} aria-label="Bookmark article">
        <i className="hgi-stroke hgi-bookmark-02 text-lg" />
      </button>
      <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-text-secondary transition hover:bg-coral-light hover:text-coral" onClick={() => window.print()} aria-label="Print article">
        <i className="hgi-stroke hgi-printer text-lg" />
      </button>
      <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-text-secondary transition hover:bg-coral-light hover:text-coral" onClick={() => setFontSize((value) => (value === "base" ? "large" : "base"))} aria-label={fontSize === "base" ? "Increase article text size" : "Use normal article text size"} title={fontSize === "base" ? "Increase text size" : "Normal text size"}>
        <i className="hgi-stroke hgi-text-font text-lg" />
      </button>
    </div>
  );
}

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function update() {
      setVisible(window.scrollY > 700);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  if (!visible) return null;

  return (
    <Button className="fixed bottom-24 right-4 z-40 h-11 w-11 p-0 lg:bottom-6 lg:right-24" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Scroll to top">
      <i className="hgi-stroke hgi-arrow-up-01" />
    </Button>
  );
}

export function MobileStickyArticleCta() {
  return (
    <div className="fixed inset-x-0 bottom-16 z-40 border-t border-border bg-white/95 p-3 shadow-premium backdrop-blur lg:hidden">
      <a className="flex h-11 items-center justify-center rounded-full bg-coral px-5 text-small font-semibold text-white shadow-floating" href="/demo">
        Book a Loglime demo
      </a>
    </div>
  );
}

export function MobileSwipeNavigation({ previousHref, nextHref }: { previousHref?: string; nextHref?: string }) {
  const router = useRouter();
  const [startX, setStartX] = useState<number | null>(null);

  useEffect(() => {
    function onTouchStart(event: TouchEvent) {
      if (event.touches.length !== 1) return;
      setStartX(event.touches[0]?.clientX ?? null);
    }

    function onTouchEnd(event: TouchEvent) {
      if (startX === null) return;
      const endX = event.changedTouches[0]?.clientX ?? startX;
      const delta = endX - startX;
      if (Math.abs(delta) < 80) return;
      if (delta < 0 && nextHref) router.push(nextHref);
      if (delta > 0 && previousHref) router.push(previousHref);
      setStartX(null);
    }

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [nextHref, previousHref, router, startX]);

  return null;
}
