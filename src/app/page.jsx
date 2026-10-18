import {
  AnimatedIcon,
  CountUp,
  FadeIn,
  HoverCard,
  ScaleIn,
  Stagger,
  StaggerItem,
} from "@/components/motion";
import { NewsFeed } from "@/components/news-feed";
import { VideoPlayer } from "@/components/video-player";
import { OrderForm } from "@/components/order-form";
import { ProductCatalog } from "@/components/product-catalog";
import { HomeHero } from "@/components/home-hero";
import { SectionHeading } from "@/components/section-heading";
import { initialProducts } from "@/lib/content";
import { getPublishedPosts } from "@/lib/posts";
export const metadata = {
  title: "Кубики-Самоучки — Игры-тренажеры по русскому языку",
  description:
    "Настольные игры с кубиками для детей 7–12 лет. 7 тренажеров: части речи, падежи, безударные гласные, слоги. Разработано логопедом-дефектологом.",
  openGraph: {
    title: "Кубики-Самоучки — Игры-тренажеры по русскому языку",
    description:
      "Настольные игры с кубиками для детей 7–12 лет. 7 тренажеров по русскому языку. Разработано логопедом-дефектологом.",
    images: [
      {
        url: "/images/og-preview.png",
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
    a: "Заполните форму заказа на сайте, напишите в Telegram (@gurevichlena), ВКонтакте или WhatsApp (+7 921 908-17-12). Также можно заказать через магазин ВКонтакте. Мы свяжемся с вами для уточнения деталей и отправки по всей России.",
  },
];
export default function HomePage() {
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
      image: "https://cubichi.ru/images/og-preview.png",
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Кубики-Самоучки",
      url: "https://cubichi.ru",
      logo: "https://cubichi.ru/images/pwa-icon.svg",
      description: "Производитель настольных обучающих игр с кубиками для изучения русского языка",
      email: "gurevich_lena@mail.ru",
      telephone: "+79219081712",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Санкт-Петербург",
        addressCountry: "RU",
      },
      sameAs: [
        "https://vk.com/club237611844",
        "https://vk.com/elenagur30",
        "https://t.me/gurevichlena",
      ],
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
      image: "https://cubichi.ru/images/og-preview.png",
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
      {jsonLd.map((schema) => (
        <script
          key={schema["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <HomeHero />

      {/* Video section */}
      <section className="below-fold-section py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            align="center"
            eyebrow="В действии"
            title="Как играют в Кубики-Самоучки"
            description="Посмотрите, как проходят занятия с нашими кубиками и карточками."
          />
          <Stagger
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            staggerDelay={0.15}
          >
            <StaggerItem>
              <VideoPlayer src="/media/0813.mp4" title="Демонстрация игры" />
            </StaggerItem>
            <StaggerItem>
              <VideoPlayer src="/media/video_2025-11-05_08-26-18.mp4" title="Занятие с учениками" />
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="below-fold-section py-16 sm:py-24 bg-slate-50 scroll-mt-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            align="center"
            eyebrow="Наш подход"
            title="Почему учиться легче через игру"
          />
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
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Stats */}
      <section className="below-fold-section relative overflow-hidden bg-[#28231f] py-14">
        <div className="container mx-auto px-4 relative">
          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center" staggerDelay={0.1}>
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <CountUp
                  value={stat.value}
                  className="block text-4xl sm:text-5xl font-bold text-white mb-2"
                />
                <div className="text-[#ead4a6] text-sm font-medium tracking-wide uppercase">
                  {stat.label}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Product Details */}
      <section className="below-fold-section py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            align="center"
            eyebrow="Наборы"
            title="Что входит в игровой комплект"
            description="Каждая игра — отдельный комплект с кубиками, карточками и понятными правилами. Материалы рассчитаны на многократное использование."
          />
          <ProductCatalog initialProducts={initialProducts} />
        </div>
      </section>

      {/* Credibility / Testimonial */}
      <section className="below-fold-section py-16 sm:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeading
              align="center"
              eyebrow="Вместе интереснее"
              title="Кому подходят игры с кубиками"
            />
            <Stagger className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12" staggerDelay={0.12}>
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
                      <h3 className="font-semibold text-slate-900 mb-2">{card.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{card.desc}</p>
                    </div>
                  </HoverCard>
                </StaggerItem>
              ))}
            </Stagger>
            <FadeIn>
              <blockquote className="relative rounded-r-xl border-l-4 border-[#a75037] bg-white/50 py-5 pl-6 pr-6 text-left">
                <p className="text-lg text-slate-700 italic mb-3 leading-relaxed">
                  «Кубики-Самоучки созданы на основе 15 лет практической работы с детьми, имеющими
                  трудности в освоении русского языка. Каждая игра проверена на сотнях учеников и
                  доработана с учетом реальных результатов.»
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
      <section className="below-fold-section py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <SectionHeading align="center" eyebrow="Полезно знать" title="Вопросы и ответы" />
          <div className="space-y-3">
            {faqItems.map((item) => (
              <details key={item.q} className="faq-details">
                <summary>{item.q}</summary>
                <p className="faq-answer">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* News Feed */}
      <NewsFeed posts={posts} />

      {/* Contact */}
      <section id="contact" className="below-fold-section py-16 sm:py-24 bg-slate-50 scroll-mt-20">
        <div className="container mx-auto px-4">
          <SectionHeading align="center" eyebrow="На связи" title="Свяжитесь с нами" />
          <Stagger
            className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12"
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
                    <div className="font-semibold text-slate-900">gurevich_lena&#64;mail.ru</div>
                  </div>
                </a>
              </HoverCard>
            </StaggerItem>
            <StaggerItem>
              <HoverCard className="h-full">
                <a
                  href="https://t.me/gurevichlena"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white shadow-md ring-1 ring-black/[0.03] hover:shadow-lg transition-shadow duration-300 h-full"
                >
                  <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-sky-100 text-sky-600">
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                  </span>
                  <div>
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                      Telegram
                    </div>
                    <div className="font-semibold text-slate-900">@gurevichlena</div>
                  </div>
                </a>
              </HoverCard>
            </StaggerItem>
            <StaggerItem>
              <HoverCard className="h-full">
                <a
                  href="https://vk.com/elenagur30"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white shadow-md ring-1 ring-black/[0.03] hover:shadow-lg transition-shadow duration-300 h-full"
                >
                  <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#f4ead5] text-[#a75037]">
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.72-1.033-1.01-1.49-1.135-1.745-1.135-.356 0-.458.102-.458.597v1.575c0 .424-.135.683-1.253.683-1.846 0-3.896-1.12-5.339-3.202-2.17-3.041-2.763-5.32-2.763-5.785 0-.255.102-.491.596-.491h1.744c.44 0 .61.237.779.797.846 2.424 2.257 4.542 2.837 4.542.22 0 .322-.102.322-.66v-2.56c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.408.44-.408h2.747c.373 0 .508.186.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.27-1.423 2.18-3.624 2.18-3.624.119-.237.305-.457.745-.457h1.744c.525 0 .644.27.525.643-.22 1.017-2.375 4.081-2.375 4.081-.186.305-.254.457 0 .813.186.271.796.813 1.202 1.304.745.915 1.32 1.685 1.473 2.206.17.542-.101.813-.626.813z" />
                    </svg>
                  </span>
                  <div>
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                      ВКонтакте
                    </div>
                    <div className="font-semibold text-slate-900">Елена Гуревич</div>
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
                  <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#f4ead5] text-2xl">
                    📢
                  </span>
                  <div>
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                      Сообщество
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
                  <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#e3e7dc] text-2xl">
                    📱
                  </span>
                  <div>
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                      WhatsApp
                    </div>
                    <div className="font-semibold text-slate-900">+7 921 908-17-12</div>
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
        className="below-fold-section py-16 sm:py-24 bg-gradient-to-b from-sky-50 to-sky-100/50 scroll-mt-20"
      >
        <div className="container mx-auto px-4">
          <FadeIn>
            <h2 className="font-display text-3xl font-bold text-slate-900 mb-4 text-center">
              Заказать кубики
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-slate-600 text-center mb-8 max-w-xl mx-auto">
              Заполните форму, напишите в мессенджер или закажите через магазин ВКонтакте
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a
                href="https://vk.com/market-237611844"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#a75037] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#763b2b]"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.72-1.033-1.01-1.49-1.135-1.745-1.135-.356 0-.458.102-.458.597v1.575c0 .424-.135.683-1.253.683-1.846 0-3.896-1.12-5.339-3.202-2.17-3.041-2.763-5.32-2.763-5.785 0-.255.102-.491.596-.491h1.744c.44 0 .61.237.779.797.846 2.424 2.257 4.542 2.837 4.542.22 0 .322-.102.322-.66v-2.56c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.408.44-.408h2.747c.373 0 .508.186.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.27-1.423 2.18-3.624 2.18-3.624.119-.237.305-.457.745-.457h1.744c.525 0 .644.27.525.643-.22 1.017-2.375 4.081-2.375 4.081-.186.305-.254.457 0 .813.186.271.796.813 1.202 1.304.745.915 1.32 1.685 1.473 2.206.17.542-.101.813-.626.813z" />
                </svg>
                Магазин ВКонтакте
              </a>
              <a
                href="https://vk.com/market/product/kubiki-samouchki-237611844-16703645"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[#e9e3d8] bg-white font-semibold text-[#763b2b] transition-colors hover:bg-[#fbf7ef] px-6 py-3"
              >
                Кубики-Самоучки в VK Market
              </a>
            </div>
          </FadeIn>
          <ScaleIn delay={0.2}>
            <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 bg-white p-1">
              <OrderForm />
            </div>
          </ScaleIn>
        </div>
      </section>
    </>
  );
}
