export type PostCategory = "news" | "article" | "game" | "event" | "promo";
export type BadgeColor =
  | "blue"
  | "green"
  | "red"
  | "orange"
  | "purple"
  | "sky"
  | "emerald";

export interface Post {
  id: string;
  title: string;
  slug: string;
  /** Full content in Markdown */
  content: string;
  /** Short excerpt (plain text) */
  excerpt: string;
  category: PostCategory;
  /** Short label shown as a pill badge, e.g. "Новинка", "Важно" */
  badge: string;
  badgeColor: BadgeColor;
  /** JSON array of image URLs shown in carousel */
  images: string[];
  /** Optional YouTube/video URL */
  videoUrl: string;
  published: boolean;
  /** ISO date-time string */
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}
