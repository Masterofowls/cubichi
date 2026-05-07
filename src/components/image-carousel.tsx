"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  title: string;
}

/** Skeleton shown while an individual image loads */
function ImageSkeleton() {
  return (
    <div className="skeleton-shimmer absolute inset-0 flex items-center justify-center">
      <svg
        className="w-10 h-10 text-gray-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h18M3.75 4.5h16.5A.75.75 0 0121 5.25v13.5a.75.75 0 01-.75.75H3.75A.75.75 0 013 18.75V5.25A.75.75 0 013.75 4.5z"
        />
      </svg>
    </div>
  );
}

export function ImageCarousel({ images, title }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [loadedSet, setLoadedSet] = useState<Set<number>>(new Set());

  const markLoaded = useCallback((idx: number) => {
    setLoadedSet((prev) => new Set(prev).add(idx));
  }, []);

  const prev = useCallback(
    () => setCurrent((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );
  const next = useCallback(
    () => setCurrent((i) => (i + 1) % images.length),
    [images.length],
  );

  if (images.length === 0) return null;

  if (images.length === 1) {
    const isLoaded = loadedSet.has(0);
    return (
      <div className="relative w-full aspect-video overflow-hidden bg-gray-100">
        {!isLoaded && <ImageSkeleton />}
        <Image
          src={images[0]}
          alt={title}
          fill
          className={`object-cover img-fade ${isLoaded ? "opacity-100" : "opacity-0"}`}
          sizes="(max-width: 768px) 100vw, 50vw"
          onLoad={() => markLoaded(0)}
          priority={false}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video overflow-hidden group bg-gray-100">
      {images.map((src, idx) => {
        const isLoaded = loadedSet.has(idx);
        return (
          <div
            key={src}
            className="absolute inset-0"
            style={{
              opacity: idx === current ? 1 : 0,
              transition: "opacity 0.35s ease",
              pointerEvents: idx === current ? "auto" : "none",
            }}
          >
            {!isLoaded && idx === current && <ImageSkeleton />}
            <Image
              src={src}
              alt={`${title} — ${idx + 1}`}
              fill
              className={`object-cover img-fade ${isLoaded ? "opacity-100" : "opacity-0"}`}
              sizes="(max-width: 768px) 100vw, 50vw"
              onLoad={() => markLoaded(idx)}
            />
          </div>
        );
      })}

      {/* Navigation buttons */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        aria-label="Предыдущее фото"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        aria-label="Следующее фото"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              idx === current ? "bg-white scale-125" : "bg-white/50"
            }`}
            aria-label={`Фото ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
