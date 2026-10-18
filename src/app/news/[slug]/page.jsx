import { ArrowLeft, Calendar, Rss, Tag } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_BASE_URL, fetchPost } from "@/lib/content";
import { ImageCarousel } from "@/components/image-carousel";
import { MarkdownContent } from "@/components/markdown-content";
import { BADGE_COLOR_CLASSES, CATEGORY_LABELS, formatDate, getPostBySlug } from "@/lib/posts";
export default function PostPage() {
  const { slug } = useParams();
  const [remoteState, setRemoteState] = useState(() => ({
    slug,
    post: getPostBySlug(slug),
    error: null,
  }));
  useEffect(() => {
    if (!API_BASE_URL) return;
    let active = true;
    fetchPost(slug)
      .then((item) => {
        if (active) setRemoteState({ slug, post: item, error: null });
      })
      .catch((error) => {
        console.error("Post could not be loaded from the content API", error);
        if (active) {
          setRemoteState({
            slug,
            post: getPostBySlug(slug),
            error: error.message,
          });
        }
      });
    return () => {
      active = false;
    };
  }, [slug]);
  const currentState = API_BASE_URL
    ? remoteState.slug === slug
      ? remoteState
      : null
    : { slug, post: getPostBySlug(slug), error: null };
  const post = currentState?.post;
  if (!post) {
    const message =
      currentState?.error === "Публикация не найдена."
        ? "Публикация не найдена"
        : currentState
          ? "Не удалось загрузить публикацию. Попробуйте позже."
          : "Загрузка публикации…";
    return (
      <div className="container mx-auto min-h-[60vh] px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-slate-900">{message}</h1>
        <Link to="/#news" className="mt-6 inline-flex text-sky-700 underline">
          Вернуться к публикациям
        </Link>
      </div>
    );
  }
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-sky-50/20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 lg:py-16">
        {/* Back link */}
        <Link
          to="/#news"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-sky-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад к ленте
        </Link>

        {/* Header */}
        <header className="mb-8">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {CATEGORY_LABELS[post.category] ?? post.category}
            </span>
            {post.badge && (
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                  BADGE_COLOR_CLASSES[post.badgeColor] ?? BADGE_COLOR_CLASSES.blue
                }`}
              >
                {post.badge}
              </span>
            )}
            {post.publishedAt && (
              <span className="ml-auto text-xs text-gray-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(post.publishedAt)}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {post.title}
          </h1>

          {post.excerpt && <p className="text-lg text-gray-500 leading-relaxed">{post.excerpt}</p>}
        </header>

        {/* Images */}
        {post.images && post.images.length > 0 && (
          <div className="mb-8">
            <ImageCarousel images={post.images} title={post.title} />
          </div>
        )}

        {/* Video */}
        {post.videoUrl && (
          <div className="mb-8 rounded-2xl overflow-hidden aspect-video shadow-lg">
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

        {/* Content */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <MarkdownContent content={post.content} />
        </div>

        {/* Footer */}
        <footer className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-gray-100">
          <Link
            to="/#news"
            className="inline-flex items-center gap-2 text-sky-600 font-medium hover:text-sky-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Все публикации
          </Link>
          <Link
            to="/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-200 bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors text-sm font-medium"
          >
            <Rss className="w-4 h-4" />
            Подписаться на RSS
          </Link>
        </footer>
      </div>
    </main>
  );
}
