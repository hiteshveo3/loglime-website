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
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      className="group relative flex aspect-video w-full cursor-pointer items-center justify-center overflow-hidden rounded-[2rem] bg-slate-900"
      onClick={() => setPlaying(true)}
      aria-label={`Play ${title}`}
    >
      <img
        src="/images/Inside Restaurant.webp"
        alt="Restaurant demo"
        className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-300 group-hover:opacity-60 group-hover:scale-105"
      />
      <div className="relative z-10 flex flex-col items-center gap-3">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-coral shadow-floating transition duration-300 group-hover:scale-110">
          <i className="hgi-stroke hgi-play text-3xl text-white" />
        </span>
        <span className="rounded-full bg-black/40 px-4 py-1.5 text-small font-semibold text-white backdrop-blur-sm">Watch 2-min demo</span>
      </div>
    </button>
  );
}
