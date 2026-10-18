import { ArrowRight, BookOpenCheck, Boxes, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHero } from "@/components/page-hero";
import { ProductCatalog } from "@/components/product-catalog";
import { initialProducts } from "@/lib/content";

export const metadata = {
  title: "Учебные наборы — Кубики-Самоучки",
  description:
    "Настольные наборы с кубиками и карточками для занятий по русскому языку дома, в школе и у логопеда.",
  alternates: { canonical: "https://cubichi.ru/products/" },
};

const formats = [
  {
    icon: Boxes,
    title: "Кубики-Самоучки",
    description:
      "Игровые кубики с заданиями, которые помогают повторять правила, составлять слова и разбирать предложения.",
    points: [
      "Для занятий в паре и небольшой группе",
      "Понятные правила и несколько вариантов игры",
    ],
    tone: "bg-[#f4e8dd] text-[#a75037]",
    href: "/games/",
  },
  {
    icon: BookOpenCheck,
    title: "Карточки-Самоучки",
    description:
      "«Слушай и выбирай» — карточная игра по 25 шуточным стихотворениям с перечислениями. Ребёнок слушает, запоминает детали и выбирает подходящие картинки.",
    points: ["Для детей 5–10 лет, от 2 участников", "Есть простые и усложнённые варианты"],
    tone: "bg-[#f4ead5] text-[#763b2b]",
    href: "/cards/",
  },
];

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Учебные наборы"
        current="Наборы"
        title="Инструменты для обучения, которые хочется взять в руки"
        description="Выберите игровой формат для дома, класса или занятий со специалистом. Начать можно с кубиков или карточек — оба помогают учиться без лишнего экранного времени."
      >
        <Link
          to="/order/"
          className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-sky-700 px-6 py-3 font-semibold text-white shadow-lg shadow-sky-900/15 transition hover:-translate-y-0.5 hover:bg-sky-800"
        >
          Подобрать набор <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          to="/games/"
          className="inline-flex min-h-12 items-center rounded-xl border border-slate-300 bg-white/80 px-6 py-3 font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-700"
        >
          Посмотреть игры
        </Link>
      </PageHero>
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.14em] text-sky-700">
              Два способа учиться
            </p>
            <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
              Выберите формат под задачу
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {formats.map(({ icon: Icon, title, description, points, tone, href }) => (
              <article
                key={title}
                className="group rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:p-9"
              >
                <div className={`mb-6 grid h-14 w-14 place-items-center rounded-2xl ${tone}`}>
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-2xl font-bold text-slate-900">{title}</h3>
                <p className="mt-3 max-w-xl leading-relaxed text-slate-600">{description}</p>
                <ul className="mt-6 space-y-3">
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-slate-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-sky-700" />
                      {point}
                    </li>
                  ))}
                </ul>
                <Link
                  to={href}
                  className="mt-7 inline-flex items-center gap-2 font-semibold text-sky-700 transition group-hover:gap-3"
                >
                  Подробнее о наборе <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#f7f6ef] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.14em] text-sky-700">
                Учебные темы
              </p>
              <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
                Игры и карточки каталога
              </h2>
            </div>
            <Link
              to="/rules/"
              className="inline-flex items-center gap-2 font-semibold text-sky-700 hover:text-sky-800"
            >
              Как играть <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ProductCatalog initialProducts={initialProducts} />
        </div>
      </section>
    </>
  );
}
