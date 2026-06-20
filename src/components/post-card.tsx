"use client";

import { Calendar, Tag } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { BADGE_COLOR_CLASSES, CATEGORY_LABELS, formatDate } from "@/lib/posts";
import type { Post } from "@/types/post";
import { ImageCarousel } from "./image-carousel";
import { MarkdownContent } from "./markdown-content";

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

/** Shown instead of an image slot when the post has no images yet */
function ImageSlotSkeleton() {
  return (
    <div className="skeleton-shimmer w-full aspect-video flex items-center justify-center">
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

export function PostCard({ post, featured = false }: PostCardProps) {
  const [expanded, setExpanded] = useState(false);
  const hasImages = post.images && post.images.length > 0;
  const isLong = post.content.length > 500;

  return (
    <article
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      {/* Image area: real carousel OR skeleton placeholder */}
      {hasImages ? (
        <ImageCarousel images={post.images} title={post.title} />
      ) : (
        <ImageSlotSkeleton />
      )}

      <div className="flex-1 flex flex-col p-5 gap-3">
        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category chip */}
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Tag className="w-3 h-3" />
            {CATEGORY_LABELS[post.category] ?? post.category}
          </span>

          {/* Custom badge */}
          {post.badge && (
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                BADGE_COLOR_CLASSES[post.badgeColor] ?? BADGE_COLOR_CLASSES.blue
              }`}
            >
              {post.badge}
            </span>
          )}

          {/* Date */}
          {post.publishedAt && (
            <span className="ml-auto text-xs text-gray-400 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(post.publishedAt)}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className={`font-bold text-gray-900 leading-snug ${featured ? "text-xl" : "text-lg"}`}
        >
          <Link
            href={`/news/${post.slug}/`}
            className="hover:text-sky-600 transition-colors duration-200"
          >
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-gray-600 text-sm leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {/* Expandable content — maxHeight avoids the height:auto animation bug */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="content"
              initial={{ opacity: 0, maxHeight: 0 }}
              animate={{ opacity: 1, maxHeight: 2400 }}
              exit={{ opacity: 0, maxHeight: 0 }}
              transition={{
                maxHeight: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
                opacity: { duration: 0.25 },
              }}
              className="overflow-hidden"
            >
              <div className="pt-1">
                <MarkdownContent content={post.content} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video embed */}
        {post.videoUrl && (
          <div className="rounded-xl overflow-hidden aspect-video">
            <iframe
              src={post.videoUrl
                .replace("watch?v=", "embed/")
                .replace("youtu.be/", "www.youtube.com/embed/")}
              title={post.title}
              className="w-full h-full"
              allowFullScreen
              loading="lazy"
            />
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto pt-2 flex items-center gap-3 border-t border-gray-50">
          {isLong && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="text-sm text-sky-600 font-medium hover:text-sky-700 transition-colors duration-200"
            >
              {expanded ? "Свернуть ↑" : "Читать полностью →"}
            </button>
          )}
          <Link
            href={`/news/${post.slug}/`}
            className="text-sm text-gray-400 hover:text-sky-600 transition-colors duration-200 ml-auto"
          >
            Открыть →
          </Link>
        </div>
      </div>
    </article>
  );
}
