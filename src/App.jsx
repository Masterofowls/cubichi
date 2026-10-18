import { lazy, Suspense, useEffect } from "react";
import { MotionConfig } from "motion/react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import "./app/globals.css";

const ForParentsPage = lazy(() => import("@/app/for-parents/page"));
const GamePage = lazy(() => import("@/app/games/[slug]/page"));
const GamesPage = lazy(() => import("@/app/games/page"));
const HomePage = lazy(() => import("@/app/page"));
const MethodologyPage = lazy(() => import("@/app/methodology/page"));
const PostPage = lazy(() => import("@/app/news/[slug]/page"));
const NotFound = lazy(() => import("@/app/not-found"));
const RulesPage = lazy(() => import("@/app/rules/page"));
const ProductsPage = lazy(() => import("@/app/products/page"));
const NewsPage = lazy(() => import("@/app/news/page"));
const AboutPage = lazy(() => import("@/app/about/page"));
const ContactsPage = lazy(() => import("@/app/contacts/page"));
const OrderPage = lazy(() => import("@/app/order/page"));
const CardsPage = lazy(() => import("@/app/cards/page"));

const pageMetadata = [
  {
    path: "/",
    title: "Кубики-Самоучки — учимся играя",
    description: "Настольные игры и карточки для изучения русского языка детьми.",
  },
  {
    path: "/products",
    title: "Учебные наборы — Кубики-Самоучки",
    description: "Выберите настольные учебные наборы с кубиками и карточками.",
  },
  {
    path: "/cards",
    title: "Карточки-самоучки «Слушай и выбирай»",
    description:
      "Карточная игра Елены Гуревич для развития слухового внимания и памяти у детей 5–10 лет.",
    image: "https://cubichi.ru/images/cards-self-study/card-deck-box.webp",
  },
  {
    path: "/games",
    title: "Игры с кубиками — Кубики-Самоучки",
    description: "Обучающие игры для занятий русским языком дома и в классе.",
  },
  {
    path: "/rules",
    title: "Правила игр — Кубики-Самоучки",
    description: "Правила и варианты настольных игр с кубиками и карточками.",
  },
  {
    path: "/for-parents",
    title: "Родителям — Кубики-Самоучки",
    description: "Как заниматься с ребёнком и выбрать игровой формат обучения.",
  },
  {
    path: "/methodology",
    title: "Методика — Кубики-Самоучки",
    description: "Методические материалы для педагогов и специалистов.",
  },
  {
    path: "/news",
    title: "Журнал — Кубики-Самоучки",
    description: "Новости проекта, идеи занятий и полезные материалы.",
  },
  {
    path: "/about",
    title: "О проекте — Кубики-Самоучки",
    description: "История и принципы проекта учебных игр для детей.",
  },
  {
    path: "/contacts",
    title: "Контакты — Кубики-Самоучки",
    description: "Свяжитесь с автором проекта и задайте вопрос о наборах.",
  },
  {
    path: "/order",
    title: "Оставить заявку — Кубики-Самоучки",
    description: "Заявка на наборы «Кубики-Самоучки» и «Карточки-Самоучки».",
  },
];

function updateMeta(selector, attribute, key, value) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.append(element);
  }
  element.setAttribute("content", value);
}

function PageMetadata() {
  const { pathname } = useLocation();
  const route = pathname.replace(/\/+$/, "") || "/";
  const meta =
    pageMetadata.find((item) => item.path === route) ??
    (route.startsWith("/games/")
      ? {
          title: "Правила игры — Кубики-Самоучки",
          description: "Описание и правила обучающей игры с кубиками.",
        }
      : route.startsWith("/news/")
        ? {
            title: "Материал журнала — Кубики-Самоучки",
            description: "Полезная публикация проекта «Кубики-Самоучки».",
          }
        : {
            title: "Страница не найдена — Кубики-Самоучки",
            description: "Запрошенная страница не найдена.",
          });
  const image = meta.image ?? "https://cubichi.ru/images/og-preview.png";
  const canonical = `https://cubichi.ru${route === "/" ? "/" : `${route}/`}`;

  useEffect(() => {
    document.title = meta.title;
    updateMeta('meta[name="description"]', "name", "description", meta.description);
    updateMeta('meta[property="og:type"]', "property", "og:type", "website");
    updateMeta('meta[property="og:site_name"]', "property", "og:site_name", "Кубики-Самоучки");
    updateMeta('meta[property="og:title"]', "property", "og:title", meta.title);
    updateMeta('meta[property="og:description"]', "property", "og:description", meta.description);
    updateMeta('meta[property="og:url"]', "property", "og:url", canonical);
    updateMeta('meta[property="og:image"]', "property", "og:image", image);

    let canonicalLink = document.head.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.append(canonicalLink);
    }
    canonicalLink.href = canonical;
  }, [canonical, image, meta.description, meta.title]);

  return null;
}

function ScrollToPage() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const timeout = window.setTimeout(() => {
        document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
      }, 50);
      return () => window.clearTimeout(timeout);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <PageMetadata />
      <ScrollToPage />
      <a href="#content" className="skip-link visually-hidden">
        Перейти к содержимому
      </a>
      <header className="w-full">
        <Navigation />
      </header>
      <main id="content" tabIndex={-1} className="flex-grow pt-[76px] outline-none">
        <Suspense
          fallback={
            <div className="container mx-auto px-4 py-20 text-center">Загрузка страницы…</div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cards" element={<CardsPage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/games/:slug" element={<GamePage />} />
            <Route path="/rules" element={<RulesPage />} />
            <Route path="/for-parents" element={<ForParentsPage />} />
            <Route path="/methodology" element={<MethodologyPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:slug" element={<PostPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </MotionConfig>
  );
}
