/**
 * generate-rss.ts
 * Generates public/rss.xml from data/posts.json before the Next.js build.
 * Run: tsx scripts/generate-rss.ts
 *
 * The resulting RSS 2.0 feed is compatible with VK Community import
 * (Settings → News → RSS import → "Publish as article").
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  badge: string;
  images: string[];
  videoUrl: string;
  published: boolean;
  publishedAt: string;
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Converts Markdown to a simplified HTML string suitable for VK article import.
 * A full markdown parser is not used here to keep the build script dependency-free.
 */
function markdownToHtml(md: string): string {
  return (
    md
      // Code blocks
      .replace(
        /```[\s\S]*?```/g,
        (m) => `<pre>${escapeXml(m.slice(3, -3).trim())}</pre>`,
      )
      // Headings
      .replace(/^#{1,6}\s+(.+)$/gm, (_, t, offset, str) => {
        const level = str.slice(0, offset).match(/^#{1,6}/)?.[0]?.length ?? 1;
        return `<h${level}>${t}</h${level}>`;
      })
      // Bold
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      // Italic
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      // Inline code
      .replace(/`(.+?)`/g, "<code>$1</code>")
      // Blockquote
      .replace(/^>\s+(.+)$/gm, "<blockquote>$1</blockquote>")
      // Unordered list items
      .replace(/^[-*]\s+(.+)$/gm, "<li>$1</li>")
      // Horizontal rule
      .replace(/^---+$/gm, "<hr/>")
      // Paragraphs — wrap lines that are not HTML tags
      .split("\n")
      .map((line) => {
        const trimmed = line.trim();
        if (!trimmed) return "";
        if (/^<[a-zA-Z]/.test(trimmed)) return trimmed;
        return `<p>${trimmed}</p>`;
      })
      .join("\n")
  );
}

function formatRfc822(iso: string): string {
  return new Date(iso).toUTCString();
}

function buildRss(posts: Post[], baseUrl: string): string {
  const publishedPosts = posts
    .filter((p) => p.published && p.publishedAt)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );

  const items = publishedPosts
    .map((post) => {
      const postUrl = `${baseUrl}/news/${post.slug}/`;
      const htmlContent = markdownToHtml(post.content);
      const imageHtml =
        post.images?.length > 0
          ? `<img src="${baseUrl}${post.images[0]}" alt="${escapeXml(post.title)}" style="max-width:100%;height:auto;"/><br/>`
          : "";
      const fullHtml = imageHtml + htmlContent;

      // media:content for VK rich preview
      const mediaTag =
        post.images?.length > 0
          ? `<media:content url="${baseUrl}${post.images[0]}" medium="image" />`
          : "";

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${formatRfc822(post.publishedAt)}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
      <content:encoded><![CDATA[${fullHtml}]]></content:encoded>
      ${mediaTag}
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:media="http://search.yahoo.com/mrss/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Кубики-Самоучки — Новости и материалы</title>
    <link>${baseUrl}</link>
    <description>Новости, статьи и акции от Кубики-Самоучки — обучающих игр по русскому языку для детей 7–12 лет.</description>
    <language>ru</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/images/og-preview.jpg</url>
      <title>Кубики-Самоучки</title>
      <link>${baseUrl}</link>
      <width>144</width>
      <height>144</height>
    </image>
${items}
  </channel>
</rss>
`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

const postsPath = resolve(ROOT, "data", "posts.json");
const outputPath = resolve(ROOT, "public", "rss.xml");

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://cubichi.ru";

let posts: Post[] = [];
try {
  posts = JSON.parse(readFileSync(postsPath, "utf-8")) as Post[];
} catch {
  console.warn("⚠️  data/posts.json not found — generating empty RSS feed.");
}

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, buildRss(posts, BASE_URL), "utf-8");

const publishedCount = posts.filter((p) => p.published).length;
console.log(
  `✅  RSS feed generated → public/rss.xml (${publishedCount} published posts)`,
);
