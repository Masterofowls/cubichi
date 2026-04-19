import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AnnouncementBadge } from "@/components/announcement-badge";
import { VideoPlayer } from "@/components/video-player";

export const metadata: Metadata = {
  title:
    "Кубики-Самоучки — Логопедический тренажер по русскому языку для детей",
  description:
    "Настольные обучающие игры с кубиками для детей 7–12 лет. 7 тренажеров: части речи, падежи, безударные гласные, слоги, алфавит. Разработано логопедом-дефектологом с 15-летним стажем.",
  openGraph: {
    title: "Кубики-Самоучки — Логопедический тренажер по русскому языку",
    description:
      "Настольные обучающие игры с кубиками для детей 7–12 лет. 7 тренажеров по русскому языку. Разработано логопедом-дефектологом.",
    images: [
      {
        url: "/images/og-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Кубики-Самоучки — настольные обучающие игры для детей",
      },
    ],
  },
  alternates: {
    canonical: "https://cubichi.ru",
  },
};

const features = [
  {
    icon: "👩‍🏫",
    title: "Разработано специалистом",
    description:
      "Все 7 игр созданы практикующим логопедом-дефектологом с 15-летним стажем работы с детьми. Методика прошла апробацию в школах и логопедических центрах Санкт-Петербурга.",
  },
  {
    icon: "🎲",
    title: "Настольный игровой формат",
    description:
      "Комплект включает специальные кубики, ламинированные карточки и поля для многоразового использования. Ребенок учится, бросая кубики и выполняя задания — без экранов и гаджетов.",
  },
  {
    icon: "🤲",
    title: "Развитие моторики и речи",
    description:
      "Бросание кубиков, работа с карточками и письмо маркером развивают мелкую моторику. Устные задания тренируют связную речь и расширяют словарный запас ребенка.",
  },
  {
    icon: "👥",
    title: "Для 2–4 игроков",
    description:
      "Игры рассчитаны на индивидуальные и групповые занятия: дома с родителями, в школе на уроке или на приеме у логопеда. Подходят для детей 7–12 лет (1–6 класс).",
  },
];

const stats = [
  { value: "7", label: "обучающих игр" },
  { value: "15+", label: "лет опыта автора" },
  { value: "1–6", label: "классы школы" },
  { value: "2–4", label: "игрока" },
];

const productDetails = [
  {
    title: "Части речи и члены предложения",
    description:
      "2 кубика + 4 ламинированных карточки. Ребенок бросает кубик и находит на карточке слово нужной части речи или члена предложения.",
    age: "3–6 класс",
  },
  {
    title: "Падежи и склонения",
    description:
      "2 кубика + 12 карточек с картинками + 24 карточки со словами. Три варианта игры для отработки всех 6 падежей русского языка.",
    age: "2–5 класс",
  },
  {
    title: "Безударные гласные в корне",
    description:
      "2 кубика + 8 карточек. Тренируем проверку безударных гласных А, О, И, Е, Я в корне слова через подбор проверочных слов.",
    age: "2–4 класс",
  },
];

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Кубики-Самоучки",
    description:
      "Набор настольных обучающих игр с кубиками для изучения русского языка детьми 7–12 лет",
    brand: { "@type": "Brand", name: "Кубики-Самоучки" },
    audience: { "@type": "EducationalAudience", educationalRole: "student" },
    url: "https://cubichi.ru",
    image: "https://cubichi.ru/images/og-preview.jpg",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AnnouncementBadge />

      {/* Hero */}
      <section className="relative bg-gradient-to-b from-sky-50 to-white py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
                Кубики-Самоучки — логопедический тренажер{" "}
                <span className="text-sky-600">по русскому языку</span>
              </h1>
              <p className="text-lg text-slate-700 mb-4">
                Развивающие настольные игры с кубиками, которые помогают детям
                7–12 лет освоить правила русского языка в увлекательной форме.
              </p>
              <p className="text-base text-slate-600 mb-8">
                Разработаны логопедом-дефектологом для индивидуальных и
                групповых занятий — дома, в школе или на приеме у специалиста.
                Тренируем части речи, падежи, безударные гласные, слоги и
                структуру предложений.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/games/"
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 transition-colors"
                >
                  Выбрать игру
                </Link>
                <Link
                  href="/#features"
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-sky-600 font-medium border border-sky-200 hover:bg-sky-50 transition-colors"
                >
                  Узнать больше
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/happy-learning.jpg"
                  alt="Ребенок увлеченно играет в образовательную настольную игру с кубиками"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
            Как играть в Кубики-Самоучки
          </h2>
          <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            Посмотрите видео, чтобы увидеть, как проходят занятия с нашими
            кубиками и карточками
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <VideoPlayer src="/media/0813.mp4" title="Демонстрация игры" />
            <VideoPlayer
              src="/media/video_2025-11-05_08-26-18.mp4"
              title="Занятие с учениками"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 sm:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Почему родители и педагоги выбирают нас
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl bg-white shadow-lg shadow-sky-100/50"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-sky-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sky-100 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
            Что входит в набор Кубики-Самоучки
          </h2>
          <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            Каждая игра — отдельный комплект с кубиками, карточками и подробными
            правилами. Материалы ламинированы для многоразового использования.
          </p>
          <div className="max-w-4xl mx-auto space-y-6">
            {productDetails.map((product) => (
              <div
                key={product.title}
                className="flex flex-col sm:flex-row sm:items-start gap-4 p-6 rounded-xl border border-slate-200 hover:border-sky-200 transition-colors"
              >
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">
                    {product.title}
                  </h3>
                  <p className="text-slate-600 mb-2">{product.description}</p>
                  <span className="inline-block px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-medium">
                    {product.age}
                  </span>
                </div>
                <Link
                  href="/games/"
                  className="shrink-0 text-sky-600 hover:text-sky-700 text-sm font-medium whitespace-nowrap"
                >
                  Подробнее →
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/games/"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 transition-colors"
            >
              Смотреть все 7 игр
            </Link>
          </div>
        </div>
      </section>

      {/* Credibility / Testimonial */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              Кому подходят наши тренажеры
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              <div className="p-6 rounded-xl bg-white shadow-sm">
                <div className="text-3xl mb-3">🏠</div>
                <h3 className="font-semibold text-slate-900 mb-2">Родителям</h3>
                <p className="text-sm text-slate-600">
                  Для домашних занятий с ребенком. Не нужна педагогическая
                  подготовка — правила просты и понятны.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-white shadow-sm">
                <div className="text-3xl mb-3">🏫</div>
                <h3 className="font-semibold text-slate-900 mb-2">Учителям</h3>
                <p className="text-sm text-slate-600">
                  Для уроков русского языка и внеклассных занятий. Игровой
                  формат повышает вовлеченность учеников.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-white shadow-sm">
                <div className="text-3xl mb-3">👩‍⚕️</div>
                <h3 className="font-semibold text-slate-900 mb-2">Логопедам</h3>
                <p className="text-sm text-slate-600">
                  Для индивидуальных и групповых коррекционных занятий.
                  Тренажеры разработаны с учетом логопедической практики.
                </p>
              </div>
            </div>
            <blockquote className="border-l-4 border-sky-400 pl-6 text-left">
              <p className="text-lg text-slate-700 italic mb-3">
                «Кубики-Самоучки созданы на основе 15 лет практической работы с
                детьми, имеющими трудности в освоении русского языка. Каждая
                игра проверена на сотнях учеников и доработана с учетом реальных
                результатов.»
              </p>
              <cite className="text-sm text-slate-500 not-italic">
                — Автор методики, логопед-дефектолог
              </cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Свяжитесь с нами
          </h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            <a
              href="mailto:gurevich_lena@mail.ru"
              className="flex items-center gap-4 p-5 rounded-xl bg-sky-50 hover:bg-sky-100 transition-colors"
            >
              <span className="text-2xl">📧</span>
              <div>
                <div className="text-sm text-slate-500">Email</div>
                <div className="font-medium text-slate-900">
                  gurevich_lena@mail.ru
                </div>
              </div>
            </a>
            <a
              href="https://vk.com/club237611844"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-xl bg-sky-50 hover:bg-sky-100 transition-colors"
            >
              <span className="text-2xl">📢</span>
              <div>
                <div className="text-sm text-slate-500">Группа ВКонтакте</div>
                <div className="font-medium text-slate-900">Кубичи</div>
              </div>
            </a>
            <a
              href="https://wa.me/79219081712"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-xl bg-sky-50 hover:bg-sky-100 transition-colors"
            >
              <span className="text-2xl">📱</span>
              <div>
                <div className="text-sm text-slate-500">WhatsApp</div>
                <div className="font-medium text-slate-900">
                  +7 921 908-17-12
                </div>
              </div>
            </a>
          </div>
          <p className="text-center text-sm text-slate-500 mb-8">
            Обычно отвечаем в течение одного рабочего дня
          </p>
        </div>
      </section>

      {/* Order */}
      <section id="order" className="py-16 sm:py-24 bg-sky-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
            Заказать кубики
          </h2>
          <p className="text-lg text-slate-600 text-center mb-8 max-w-xl mx-auto">
            Заполните форму, и мы свяжемся с вами для оформления заказа
          </p>
          <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-white">
            <iframe
              src="https://forms.yandex.ru/cloud/686581c502848f7370546c98/"
              className="w-full border-0"
              height="500"
              title="Форма заказа Кубики-Самоучки"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}
