"use client";

import { useState } from "react";

export function VideoEmbed({ videoId, title }: { videoId: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="aspect-video w-full">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1`}
          title={title}
          width="100%"
          height="100%"
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      className="group relative flex aspect-video w-full cursor-pointer items-center justify-center overflow-hidden bg-slate-900"
      onClick={() => setPlaying(true)}
      aria-label={`Play ${title}`}
    >
      <img
        src="/images/Inside Restaurant.webp"
        alt="Restaurant demo"
        className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-300 group-hover:opacity-60 group-hover:scale-105"
      />
      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      <div className="relative z-10 flex flex-col items-center gap-4">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-coral transition duration-300 group-hover:scale-110 group-hover:bg-coral-hover" style={{ boxShadow: "0 8px 32px rgba(255,90,95,0.45)" }}>
          {/* inline SVG triangle — guaranteed to render */}
          <svg viewBox="0 0 24 24" fill="white" className="h-8 w-8 translate-x-0.5">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <span className="rounded-full bg-black/50 px-5 py-2 text-small font-semibold text-white backdrop-blur-sm">
          Watch 2-min demo
        </span>
      </div>
    </button>
  );
}
