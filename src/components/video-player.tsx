"use client";

import { Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
  src: string;
  title: string;
}

export function VideoPlayer({ src, title }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const handlePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setHasStarted(true);
    } else {
      video.pause();
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !video.paused) {
          video.pause();
          setHasStarted(false);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative group rounded-2xl overflow-hidden bg-gray-900 shadow-xl"
    >
      <video
        ref={videoRef}
        className="w-full aspect-video object-cover"
        preload="metadata"
        playsInline
        controls={hasStarted}
        onEnded={() => setHasStarted(false)}
      >
        <source src={src} type="video/mp4" />
        <track kind="captions" label={title} srcLang="ru" />
        Ваш браузер не поддерживает видео.
      </video>

      {!hasStarted && (
        <button
          type="button"
          onClick={handlePlay}
          className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 hover:bg-black/40 transition-colors cursor-pointer min-h-[44px]"
          aria-label={`Воспроизвести видео: ${title}`}
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play
              className="w-8 h-8 sm:w-10 sm:h-10 text-sky-600 ms-1"
              aria-hidden="true"
            />
          </div>
          <span className="mt-3 text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
            {title}
          </span>
        </button>
      )}
    </div>
  );
}
