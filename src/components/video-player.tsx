"use client";

import { useRef, useState, useCallback } from "react";
import { Play } from "lucide-react";

interface VideoPlayerProps {
  src: string;
  title: string;
}

export function VideoPlayer({ src, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const handlePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
      setHasStarted(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  return (
    <div className="relative group rounded-2xl overflow-hidden bg-gray-900 shadow-xl">
      <video
        ref={videoRef}
        className="w-full aspect-video object-cover"
        preload="metadata"
        playsInline
        controls={hasStarted}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false);
          setHasStarted(false);
        }}
      >
        <source src={src} type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>

      {!hasStarted && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 hover:bg-black/40 transition-colors cursor-pointer"
          aria-label={`Воспроизвести видео: ${title}`}
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="w-8 h-8 sm:w-10 sm:h-10 text-sky-600 ml-1" />
          </div>
          <span className="mt-3 text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
            {title}
          </span>
        </button>
      )}
    </div>
  );
}
