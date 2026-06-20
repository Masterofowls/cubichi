"use client";

import { Rss, SlidersHorizontal } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CATEGORY_LABELS } from "@/lib/posts";
import type { Post } from "@/types/post";
import { PostCard } from "./post-card";

interface NewsFeedProps {
  posts: Post[];
}

const ALL = "all";

export function NewsFeed({ posts }: NewsFeedProps) {
  const [activeCategory, setActiveCategory] = useState<string>(ALL);

  // Collect unique categories from actual posts
  const categories = useMemo(() => {
    const cats = Array.from(new Set(posts.map((p) => p.category)));
    return cats;
  }, [posts]);

  const filtered = useMemo(
    () =>
      activeCategory === ALL
        ? posts
        : posts.filter((p) => p.category === activeCategory),
    [posts, activeCategory],
  );

  if (posts.length === 0) return null;

  return (
    <section
      id="news"
      className="below-fold-section py-16 lg:py-24 bg-gradient-to-b from-white to-sky-50/30 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">📰</span>
              <span className="text-sm font-semibold text-sky-600 uppercase tracking-wider">
                Лента
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Новости и материалы
            </h2>
            <p className="mt-2 text-gray-500">
              Статьи, акции и обновления от Кубики-Самоучки
            </p>
          </div>

          {/* RSS link */}
          <Link
            href="/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-200 bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors text-sm font-medium self-start sm:self-auto"
          >
            <Rss className="w-4 h-4" />
            RSS-лента
          </Link>
        </div>

        {/* Category filter */}
        {categories.length > 1 && (
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <SlidersHorizontal className="w-4 h-4 text-gray-400" />
            <button
              type="button"
              onClick={() => setActiveCategory(ALL)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === ALL
                  ? "bg-sky-600 text-white shadow-sm"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-sky-300 hover:text-sky-600"
              }`}
            >
              Все
            </button>
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-sky-600 text-white shadow-sm"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-sky-300 hover:text-sky-600"
                }`}
              >
                {CATEGORY_LABELS[cat] ?? cat}
              </button>
            ))}
          </div>
        )}

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.25,
                  delay: Math.min(idx * 0.05, 0.18),
                  ease: "easeOut",
                }}
                className={
                  idx === 0 && filtered.length > 2
                    ? "md:col-span-2 lg:col-span-2"
                    : ""
                }
              >
                <PostCard
                  post={post}
                  featured={idx === 0 && filtered.length > 2}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <span className="text-4xl mb-3 block">📭</span>
            <p>Нет публикаций в этой категории</p>
          </div>
        )}
      </div>
    </section>
  );
}
