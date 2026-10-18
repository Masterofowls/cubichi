import { ArrowRight, HeartHandshake, Lightbulb, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHero } from "@/components/page-hero";

export const metadata = {
  title: "О проекте — Кубики-Самоучки",
  description:
    "История и принципы проекта «Кубики-Самоучки» — учебных игр, созданных практикующим логопедом-дефектологом.",
  alternates: { canonical: "https://cubichi.ru/about/" },
};

const principles = [
  {
    icon: HeartHandshake,
    title: "Создано в практике",
    description:
      "Игровые задания выросли из реальных занятий с детьми и адаптированы под понятные учебные цели.",
  },
  {
    icon: Lightbulb,
    title: "Понятно и последовательно",
    description:
      "Материал разбит на короткие шаги: ребёнок пробует, проговаривает решение и закрепляет навык.",
  },
  {
    icon: Sparkles,
    title: "Живое обучение",
    description:
      "Кубики и карточки помогают учиться вместе — с родителем, педагогом или другими детьми.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="О проекте"
        current="О проекте"
        title="Учиться легче, когда можно играть"
        description="«Кубики-Самоучки» — это настольные игры и карточки для практики русского языка. Мы превращаем повторение правил в совместное занятие, где есть действие, разговор и маленькие победы."
      >
        <Link
          to="/products/"
          className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-sky-700 px-6 py-3 font-semibold text-white shadow-lg shadow-sky-900/15 transition hover:-translate-y-0.5 hover:bg-sky-800"
        >
          Посмотреть наборы <ArrowRight className="h-4 w-4" />
        </Link>
      </PageHero>
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.14em] text-sky-700">
                Наш подход
              </p>
              <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                Практика, внимание и интерес ребёнка
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-relaxed text-slate-600">
              <p>
                Проект создан логопедом-дефектологом Еленой Гуревич на основе практической работы с
                детьми. В центре каждой игры — конкретный навык: заметить часть речи, подобрать
                проверочное слово или разобраться с падежом.
              </p>
              <p>
                Взрослому не нужно придумывать занятие с нуля: к наборам прилагаются понятные
                правила, а партии можно адаптировать под возраст и темп ребёнка.
              </p>
              <p>
                Мы верим, что уверенность появляется через спокойную практику, поддержку и
                возможность пробовать снова.
              </p>
            </div>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {principles.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-sky-100 text-sky-700">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="font-display text-xl font-bold text-slate-900">{title}</h3>
                <p className="mt-3 leading-relaxed text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#28231f] py-14 text-white sm:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#ead4a6]">
              Давайте знакомиться
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold">
              Подберём формат под вашу задачу
            </h2>
          </div>
          <Link
            to="/contacts/"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[#28231f] transition hover:bg-[#f6f1e8]"
          >
            Связаться с нами <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
