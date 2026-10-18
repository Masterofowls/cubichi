import { PageHero } from "@/components/page-hero";
import { NewsFeed } from "@/components/news-feed";
import { getPublishedPosts } from "@/lib/posts";

export const metadata = {
  title: "Журнал — новости и материалы",
  description: "Новости проекта, идеи для занятий и полезные материалы для родителей и педагогов.",
  alternates: { canonical: "https://cubichi.ru/news/" },
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Журнал проекта"
        current="Журнал"
        title="Идеи для занятий и новости проекта"
        description="Здесь собраны заметки об обучении через игру, новости и материалы для семей и специалистов."
      />
      <NewsFeed posts={getPublishedPosts()} />
    </>
  );
}
