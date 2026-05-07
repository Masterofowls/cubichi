import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AnnouncementBadge } from "@/components/announcement-badge";
import { VideoPlayer } from "@/components/video-player";
import {
  FadeIn,
  Stagger,
  StaggerItem,
  ScaleIn,
  Floating,
  CountUp,
  HoverCard,
  AnimatedIcon,
} from "@/components/motion";
import { NewsFeed } from "@/components/news-feed";
import { getPublishedPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Кубики-Самоучки — Игры-тренажеры по русскому языку",
  description:
    "Настольные игры с кубиками для детей 7–12 лет. 7 тренажеров: части речи, падежи, безударные гласные, слоги. Разработано логопедом-дефектологом.",
  openGraph: {
    title: "Кубики-Самоучки — Игры-тренажеры по русскому языку",
    description:
      "Настольные игры с кубиками для детей 7–12 лет. 7 тренажеров по русскому языку. Разработано логопедом-дефектологом.",
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
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Падежи и склонения",
    description:
      "2 кубика + 12 карточек с картинками + 24 карточки со словами. Три варианта игры для отработки всех 6 падежей русского языка.",
    age: "2–5 класс",
    gradient: "from-orange-500 to-amber-500",
  },
  {
    title: "Безударные гласные в корне",
    description:
      "2 кубика + 8 карточек. Тренируем проверку безударных гласных А, О, И, Е, Я в корне слова через подбор проверочных слов.",
    age: "2–4 класс",
    gradient: "from-violet-500 to-purple-500",
  },
];

const faqItems = [
  {
    q: "С какого возраста можно играть в Кубики-Самоучки?",
    a: "Игры рассчитаны на детей от 7 до 12 лет (1–6 класс). Для самых маленьких подойдет игра «Алфавит», а для старших — «Части речи» и «Падежи». Каждая игра имеет рекомендации по возрасту на упаковке.",
  },
  {
    q: "Чем настольные игры с кубиками лучше приложений?",
    a: "Настольный формат развивает мелкую моторику, навыки живого общения и не нагружает зрение ребенка. Кубики можно бросать, карточки — держать в руках, а правила обсуждать вслух. Это создает мультисенсорный опыт обучения, который эффективнее экранного взаимодействия.",
  },
  {
    q: "Можно ли использовать на уроках русского языка в школе?",
    a: "Да, Кубики-Самоучки активно используются учителями начальных классов и логопедами. Игры рассчитаны на 2–4 участника и вписываются в формат групповых занятий. Комплекты включают подробные правила и рекомендации для педагогов.",
  },
  {
    q: "Какие темы русского языка охватывают игры?",
    a: "В набор входят 7 тренажеров: алфавит, части речи и члены предложения, падежи и склонения, безударные гласные в корне, слоги и деление на слоги, составление слов и построение предложений. Этого достаточно для закрепления основных тем программы начальной школы.",
  },
  {
    q: "Как оформить заказ?",
    a: "Заполните форму заказа на нашем сайте или напишите нам в WhatsApp по номеру +7 921 908-17-12. Мы свяжемся с вами для уточнения деталей и отправки. Доставка осуществляется по всей России.",
  },
];

export default async function HomePage() {
  const posts = getPublishedPosts();
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Кубики-Самоучки",
      description:
        "Набор настольных обучающих игр с кубиками для изучения русского языка детьми 7–12 лет",
      brand: { "@type": "Brand", name: "Кубики-Самоучки" },
      audience: {
        "@type": "EducationalAudience",
        educationalRole: "student",
      },
      url: "https://cubichi.ru",
      image: "https://cubichi.ru/images/og-preview.jpg",
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Кубики-Самоучки",
      url: "https://cubichi.ru",
      logo: "https://cubichi.ru/images/og-preview.jpg",
      description:
        "Производитель настольных обучающих игр с кубиками для изучения русского языка",
      email: "gurevich_lena@mail.ru",
      telephone: "+79219081712",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Санкт-Петербург",
        addressCountry: "RU",
      },
      sameAs: ["https://vk.com/club237611844"],
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Кубики-Самоучки",
      url: "https://cubichi.ru",
      telephone: "+79219081712",
      email: "gurevich_lena@mail.ru",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Санкт-Петербург",
        addressCountry: "RU",
      },
      priceRange: "₽₽",
      image: "https://cubichi.ru/images/og-preview.jpg",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "С какого возраста можно играть в Кубики-Самоучки?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Игры рассчитаны на детей от 7 до 12 лет (1–6 класс). Для самых маленьких подойдет игра «Алфавит», а для старших — «Части речи» и «Падежи».",
          },
        },
        {
          "@type": "Question",
          name: "Какие темы русского языка охватывают игры?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "В набор входят 7 тренажеров: алфавит, части речи, падежи, безударные гласные, слоги, составление слов и построение предложений.",
          },
        },
        {
          "@type": "Question",
          name: "Можно ли использовать на уроках русского языка в школе?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Да, Кубики-Самоучки используются учителями начальных классов и логопедами. Игры рассчитаны на 2–4 участника и подходят для групповых занятий.",
          },
        },
      ],
    },
  ];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <AnnouncementBadge />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-sky-50/50 to-white py-16 sm:py-24">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-sky-100/40 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-emerald-100/30 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <FadeIn delay={0.1}>
                <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-slate-900 mb-6 leading-tight">
                  Кубики-Самоучки — настольные игры{" "}
                  <span className="bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">
                    для изучения русского языка
                  </span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.25}>
                <p className="text-lg text-slate-700 mb-4">
                  Развивающие настольные игры с кубиками, которые помогают детям
                  7–12 лет освоить правила русского языка в увлекательной форме.
                </p>
              </FadeIn>
              <FadeIn delay={0.35}>
                <p className="text-base text-slate-600 mb-8">
                  Разработаны логопедом-дефектологом для индивидуальных и
                  групповых занятий — дома, в школе или на приеме у специалиста.
                  Тренируем части речи, падежи, безударные гласные, слоги и
                  структуру предложений.
                </p>
              </FadeIn>
              <FadeIn delay={0.45}>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/games/"
                    className="inline-flex items-center px-7 py-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-sky-500 text-white font-semibold shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                  >
                    Выбрать игру
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                  <Link
                    href="/#features"
                    className="inline-flex items-center px-7 py-3.5 rounded-xl bg-white/80 backdrop-blur text-sky-600 font-semibold border border-sky-200/60 hover:bg-sky-50 hover:border-sky-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                  >
                    Узнать больше
                  </Link>
                </div>
              </FadeIn>
            </div>
            <FadeIn direction="right" delay={0.3}>
              <Floating amplitude={6} duration={4}>
                <div className="relative">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-sky-200/50 ring-1 ring-black/5">
                    <Image
                      src="/images/happy-learning.jpg"
                      alt="Ребенок увлеченно играет в образовательную настольную игру с кубиками"
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  {/* Decorative badge */}
                  <div className="absolute -bottom-4 -left-4 bg-white rounded-xl px-4 py-2 shadow-lg ring-1 ring-black/5">
                    <span className="text-2xl mr-1.5">🎲</span>
                    <span className="font-semibold text-slate-900">7 игр</span>
                  </div>
                </div>
              </Floating>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Video section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Как играть в Кубики-Самоучки — видео с занятий
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              Посмотрите видео, чтобы увидеть, как проходят занятия с нашими
              кубиками и карточками
            </p>
          </FadeIn>
          <Stagger
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            staggerDelay={0.15}
          >
            <StaggerItem>
              <VideoPlayer src="/media/0813.mp4" title="Демонстрация игры" />
            </StaggerItem>
            <StaggerItem>
              <VideoPlayer
                src="/media/video_2025-11-05_08-26-18.mp4"
                title="Занятие с учениками"
              />
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="py-16 sm:py-24 bg-slate-50 scroll-mt-20"
      >
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
              Почему выбирают игры с кубиками для русского языка
            </h2>
          </FadeIn>
          <Stagger
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            staggerDelay={0.12}
          >
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <HoverCard className="h-full">
                  <div className="p-6 rounded-2xl bg-white shadow-lg shadow-sky-100/50 ring-1 ring-black/[0.03] h-full">
                    <AnimatedIcon className="inline-block">
                      <div className="text-4xl mb-4">{feature.icon}</div>
                    </AnimatedIcon>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-gradient-to-r from-sky-600 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIvPjwvc3ZnPg==')] opacity-50" />
        <div className="container mx-auto px-4 relative">
          <Stagger
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            staggerDelay={0.1}
          >
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <CountUp
                  value={stat.value}
                  className="block text-4xl sm:text-5xl font-bold text-white mb-2"
                />
                <div className="text-sky-100 text-sm font-medium tracking-wide uppercase">
                  {stat.label}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Что входит в набор игр Кубики-Самоучки
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              Каждая игра — отдельный комплект с кубиками, карточками и
              подробными правилами. Материалы ламинированы для многоразового
              использования.
            </p>
          </FadeIn>
          <Stagger className="max-w-4xl mx-auto space-y-6" staggerDelay={0.12}>
            {productDetails.map((product) => (
              <StaggerItem key={product.title}>
                <HoverCard>
                  <div className="group flex flex-col sm:flex-row sm:items-start gap-5 p-6 rounded-2xl border border-slate-200/80 bg-white hover:bg-gradient-to-r hover:from-white hover:to-sky-50/50 hover:border-sky-200 hover:shadow-lg hover:shadow-sky-100/50 transition-all duration-300">
                    <div
                      className={`hidden sm:flex shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${product.gradient} items-center justify-center shadow-sm`}
                    >
                      <span className="text-white text-lg font-bold">
                        {product.title.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-slate-900 mb-1.5">
                        {product.title}
                      </h3>
                      <p className="text-slate-600 mb-3 leading-relaxed">
                        {product.description}
                      </p>
                      <span className="inline-block px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold tracking-wide">
                        {product.age}
                      </span>
                    </div>
                    <Link
                      href="/games/"
                      className="shrink-0 text-sky-600 hover:text-sky-700 text-sm font-semibold whitespace-nowrap group-hover:translate-x-1 transition-transform duration-200"
                    >
                      Подробнее →
                    </Link>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </Stagger>
          <FadeIn delay={0.3}>
            <div className="text-center mt-10">
              <Link
                href="/games/"
                className="inline-flex items-center px-7 py-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-sky-500 text-white font-semibold shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                Смотреть все 7 игр
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Credibility / Testimonial */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <h2 className="text-3xl font-bold text-slate-900 mb-10">
                Кому подходят игры с кубиками
              </h2>
            </FadeIn>
            <Stagger
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
              staggerDelay={0.12}
            >
              {[
                {
                  icon: "🏠",
                  title: "Родителям",
                  desc: "Для домашних занятий с ребенком. Не нужна педагогическая подготовка — правила просты и понятны.",
                },
                {
                  icon: "🏫",
                  title: "Учителям",
                  desc: "Для уроков русского языка и внеклассных занятий. Игровой формат повышает вовлеченность учеников.",
                },
                {
                  icon: "👩‍⚕️",
                  title: "Логопедам",
                  desc: "Для индивидуальных и групповых коррекционных занятий. Тренажеры разработаны с учетом логопедической практики.",
                },
              ].map((card) => (
                <StaggerItem key={card.title}>
                  <HoverCard className="h-full">
                    <div className="p-6 rounded-2xl bg-white shadow-md ring-1 ring-black/[0.03] h-full">
                      <AnimatedIcon className="inline-block">
                        <div className="text-3xl mb-3">{card.icon}</div>
                      </AnimatedIcon>
                      <h3 className="font-semibold text-slate-900 mb-2">
                        {card.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </HoverCard>
                </StaggerItem>
              ))}
            </Stagger>
            <FadeIn>
              <blockquote className="relative border-l-4 border-sky-400 pl-6 text-left bg-white/50 rounded-r-xl py-5 pr-6">
                <p className="text-lg text-slate-700 italic mb-3 leading-relaxed">
                  «Кубики-Самоучки созданы на основе 15 лет практической работы
                  с детьми, имеющими трудности в освоении русского языка. Каждая
                  игра проверена на сотнях учеников и доработана с учетом
                  реальных результатов.»
                </p>
                <cite className="text-sm text-slate-500 not-italic font-medium">
                  — Автор методики, логопед-дефектолог
                </cite>
              </blockquote>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <FadeIn>
            <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">
              Вопросы и ответы об играх с кубиками
            </h2>
          </FadeIn>
          <Stagger className="space-y-4" staggerDelay={0.08}>
            {faqItems.map((item, i) => (
              <StaggerItem key={i}>
                <div className="group p-6 rounded-2xl bg-slate-50 hover:bg-sky-50/50 border border-transparent hover:border-sky-100 transition-all duration-300">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 flex items-start gap-3">
                    <span className="shrink-0 w-7 h-7 rounded-lg bg-sky-100 text-sky-600 text-sm font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    {item.q}
                  </h3>
                  <p className="text-slate-600 leading-relaxed pl-10">
                    {item.a}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* News Feed */}
      <NewsFeed posts={posts} />

      {/* Contact */}
      <section id="contact" className="py-16 sm:py-24 bg-slate-50 scroll-mt-20">
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
              Свяжитесь с нами
            </h2>
          </FadeIn>
          <Stagger
            className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12"
            staggerDelay={0.1}
          >
            <StaggerItem>
              <HoverCard className="h-full">
                <a
                  href="mailto:gurevich_lena&#64;mail.ru"
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white shadow-md ring-1 ring-black/[0.03] hover:shadow-lg transition-shadow duration-300 h-full"
                >
                  <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-sky-100 text-2xl">
                    📧
                  </span>
                  <div>
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                      Email
                    </div>
                    <div className="font-semibold text-slate-900">
                      gurevich_lena&#64;mail.ru
                    </div>
                  </div>
                </a>
              </HoverCard>
            </StaggerItem>
            <StaggerItem>
              <HoverCard className="h-full">
                <a
                  href="https://vk.com/club237611844"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white shadow-md ring-1 ring-black/[0.03] hover:shadow-lg transition-shadow duration-300 h-full"
                >
                  <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-2xl">
                    📢
                  </span>
                  <div>
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                      ВКонтакте
                    </div>
                    <div className="font-semibold text-slate-900">Кубичи</div>
                  </div>
                </a>
              </HoverCard>
            </StaggerItem>
            <StaggerItem>
              <HoverCard className="h-full">
                <a
                  href="https://wa.me/79219081712"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white shadow-md ring-1 ring-black/[0.03] hover:shadow-lg transition-shadow duration-300 h-full"
                >
                  <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-100 text-2xl">
                    📱
                  </span>
                  <div>
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                      WhatsApp
                    </div>
                    <div className="font-semibold text-slate-900">
                      +7 921 908-17-12
                    </div>
                  </div>
                </a>
              </HoverCard>
            </StaggerItem>
          </Stagger>
          <FadeIn>
            <p className="text-center text-sm text-slate-400 mb-8">
              Обычно отвечаем в течение одного рабочего дня
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Order */}
      <section
        id="order"
        className="py-16 sm:py-24 bg-gradient-to-b from-sky-50 to-sky-100/50 scroll-mt-20"
      >
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Заказать кубики
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-slate-600 text-center mb-8 max-w-xl mx-auto">
              Заполните форму, и мы свяжемся с вами для оформления заказа
            </p>
          </FadeIn>
          <ScaleIn delay={0.2}>
            <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 bg-white">
              <iframe
                src="https://forms.yandex.ru/cloud/686581c502848f7370546c98/"
                className="w-full border-0"
                height="500"
                title="Форма заказа Кубики-Самоучки"
                loading="lazy"
              />
            </div>
          </ScaleIn>
        </div>
      </section>
    </>
  );
}
