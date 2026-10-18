import { ArrowRight, Clock3, Headphones, Layers3, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";

export const metadata = {
  title: "Карточки-самоучки «Слушай и выбирай» — Кубики-Самоучки",
  description:
    "Карточная игра Елены Гуревич для развития слухового внимания, памяти и понимания устной речи. Для детей 5–10 лет.",
  alternates: { canonical: "https://cubichi.ru/cards/" },
};

const facts = [
  { icon: UsersRound, value: "от 2", label: "участников" },
  { icon: Headphones, value: "5–10 лет", label: "возраст" },
  { icon: Layers3, value: "25", label: "стихотворений" },
  { icon: Clock3, value: "от 15", label: "минут" },
];

const gallery = [
  {
    src: "/images/cards-self-study/card-samples-leaf.webp",
    alt: "Карточки со словами «гвоздик» и «листик»",
    caption: "Иллюстрированные карточки с предметами",
  },
  {
    src: "/images/cards-self-study/card-samples-wizard.webp",
    alt: "Карточка с волшебником и карточка-рубашка с узором",
    caption: "У каждого стихотворения — своя рубашка",
  },
  {
    src: "/images/cards-self-study/card-samples-bag.webp",
    alt: "Карточка с изображением саквояжа",
    caption: "Выбираем то, что услышали в стихотворении",
  },
  {
    src: "/images/cards-self-study/card-samples-birds.webp",
    alt: "Карточка с воробьями на ветке",
    caption: "Обсуждаем детали и вспоминаем порядок",
  },
  {
    src: "/images/cards-self-study/card-samples-dog.webp",
    alt: "Карточка с собакой, которая охотится",
    caption: "Картинки помогают удерживать внимание",
  },
];

const steps = [
  {
    number: "01",
    title: "Слушаем",
    description:
      "Взрослый читает стихотворение один или несколько раз. Ребёнок старается запомнить предметы, признаки и действия из текста.",
  },
  {
    number: "02",
    title: "Выбираем",
    description:
      "Разложите картинки к этому стихотворению вместе с похожими отвлекающими вариантами. Нужно оставить только то, что действительно прозвучало.",
  },
  {
    number: "03",
    title: "Проверяем",
    description:
      "Перечитайте стихотворение: ребёнок сверяет выбор с текстом, находит и исправляет ошибки. Обсудите, что было смешным или неожиданным.",
  },
];

export default function CardsPage() {
  return (
    <>
      <PageHero
        eyebrow="Карточки-самоучки · Елена Гуревич"
        current="Карточки-самоучки"
        title="Слушай и выбирай"
        description="Игра по шуточным стихотворениям с перечислениями: слушаем внимательно, удерживаем детали в памяти и находим нужные картинки среди похожих."
      >
        <Link
          to="/order/?product=cards"
          className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-[#a75037] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#763b2b]"
        >
          Заказать карточки <ArrowRight className="h-4 w-4" />
        </Link>
        <a
          href="#rules"
          className="inline-flex min-h-12 items-center rounded-lg border border-[#d9cfc0] bg-white/70 px-6 py-3 text-sm font-bold text-[#51483f] transition hover:border-[#a75037] hover:text-[#a75037]"
        >
          Посмотреть правила
        </a>
      </PageHero>

      <section className="border-b border-[#e9e3d8] bg-[#fffdf8] py-8">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-[#e9e3d8] px-4 sm:grid-cols-4 sm:px-6">
          {facts.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 px-2 text-center sm:flex-row sm:justify-center sm:gap-3"
            >
              <Icon className="h-5 w-5 text-[#a75037]" aria-hidden="true" />
              <span>
                <span className="block font-display text-lg font-bold text-[#28231f] sm:text-xl">
                  {value}
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8b8175] sm:text-xs">
                  {label}
                </span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-8">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.17em] text-[#a75037]">
              Что внутри
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-[#28231f] sm:text-4xl">
              Стихи, картинки и повод слушать внимательно
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-[#71685f]">
              <p>
                В комплекте — книжечка с 25 стихотворениями-перечислениями и набор иллюстрированных
                карточек к ним. На карточках есть и нужные изображения, и похожие отвлекающие
                варианты: ребёнку важно не просто угадать тему, а вспомнить, что было в тексте.
              </p>
              <p>
                Материал подходит для индивидуальных и групповых занятий дома, в детском саду,
                начальной школе или кабинете специалиста. Можно играть в своём темпе и возвращаться
                к стихотворению, чтобы проверить себя.
              </p>
            </div>
            <ul className="mt-7 grid gap-3 text-sm font-medium text-[#51483f] sm:grid-cols-2">
              {[
                "Слуховое внимание",
                "Слуховая память",
                "Понимание устной инструкции",
                "Активизация мышления",
              ].map((skill) => (
                <li key={skill} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#a75037]" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          <figure className="overflow-hidden rounded-2xl border border-[#e9e3d8] bg-[#f6f1e8] p-3 shadow-[0_24px_70px_-36px_rgba(40,35,31,0.35)]">
            <img
              src="/images/cards-self-study/card-deck-box.webp"
              alt="Коробка игры «Слушай и выбирай» — карточки-самоучки Елены Гуревич"
              className="aspect-[4/3] w-full rounded-xl object-cover"
              loading="lazy"
              decoding="async"
            />
            <figcaption className="px-3 py-4 text-sm font-medium text-[#71685f]">
              «Слушай и выбирай» — игровое пособие для дошкольников и младших школьников.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-[#f6f1e8] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Загляните в набор"
            title="Карточки крупным планом"
            description="Примеры иллюстраций и карточек из предоставленных материалов набора."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map(({ src, alt, caption }) => (
              <figure
                key={src}
                className="overflow-hidden rounded-xl border border-[#e9e3d8] bg-white"
              >
                <img
                  src={src}
                  alt={alt}
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption className="px-4 py-3 text-sm font-medium text-[#51483f]">
                  {caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="rules" className="scroll-mt-24 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Правила игры"
            title="Три шага: слушаем, выбираем, сверяем"
            description="Начните с одного стихотворения и подходящего набора картинок. Взрослый читает, ребёнок отвечает — темп и сложность можно менять."
          />
          <ol className="grid gap-5 md:grid-cols-3">
            {steps.map(({ number, title, description }) => (
              <li key={number} className="rounded-xl border border-[#e9e3d8] bg-white p-6 sm:p-7">
                <span className="font-display text-sm font-bold tracking-[0.15em] text-[#a75037]">
                  {number}
                </span>
                <h3 className="mt-3 font-display text-xl font-bold text-[#28231f]">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#71685f]">{description}</p>
              </li>
            ))}
          </ol>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <article className="rounded-xl bg-[#f6f1e8] p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#a75037]">
                Если пока трудно
              </p>
              <h3 className="mt-2 font-display text-xl font-bold text-[#28231f]">
                Играйте с паузами
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#71685f]">
                Договоритесь, какие предметы нужно услышать. Читайте стихотворение небольшими
                отрывками и предлагайте ребёнку выкладывать соответствующие картинки по ходу чтения.
                Постепенно убирайте паузы.
              </p>
            </article>
            <article className="rounded-xl bg-[#f4ead5] p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#763b2b]">
                Если хочется сложнее
              </p>
              <h3 className="mt-2 font-display text-xl font-bold text-[#28231f]">
                Вспомните порядок
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#71685f]">
                Предложите вместо картинок список слов: нужно отметить только услышанное. Следующий
                уровень — назвать или записать слова в том порядке, в каком они появлялись в
                стихотворении. Можно играть командами и по очереди выбирать карточки.
              </p>
            </article>
          </div>
          <p className="mt-6 text-xs leading-relaxed text-[#8b8175]">
            Правила и рекомендации составлены по материалам пособия «Слушай и выбирай» Елены
            Гуревич.
          </p>
        </div>
      </section>

      <section className="bg-[#28231f] py-14 text-white sm:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#ead4a6]">
              Готовы попробовать?
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
              Добавьте в занятия игру на слух и память
            </h2>
          </div>
          <Link
            to="/order/?product=cards"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#ead4a6] px-6 py-3 font-semibold text-[#3b241f] transition hover:bg-white"
          >
            Оставить заявку <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
