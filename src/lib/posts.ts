import type { Post } from "@/types/post";
import postsData from "../../data/posts.json";

const allPosts = postsData as Post[];

/** Returns all published posts sorted newest first */
export function getPublishedPosts(): Post[] {
  return allPosts
    .filter((p) => p.published)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

/** Returns all posts (including drafts) */
export function getAllPosts(): Post[] {
  return allPosts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function getPostBySlug(slug: string): Post | undefined {
  return allPosts.find((p) => p.slug === slug && p.published);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const CATEGORY_LABELS: Record<string, string> = {
  news: "Новости",
  article: "Статьи",
  game: "Игры",
  event: "События",
  promo: "Акции",
};

export const BADGE_COLOR_CLASSES: Record<string, string> = {
  blue: "bg-blue-100 text-blue-700 border-blue-200",
  green: "bg-green-100 text-green-700 border-green-200",
  red: "bg-red-100 text-red-700 border-red-200",
  orange: "bg-orange-100 text-orange-700 border-orange-200",
  purple: "bg-purple-100 text-purple-700 border-purple-200",
  sky: "bg-sky-100 text-sky-700 border-sky-200",
  emerald: "bg-emerald-100 text-emerald-700 border-emerald-200",
};
