import { ArrowRight, BookOpen, Dice5, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const learningSteps = [
  { label: "Бросаем", value: "01" },
  { label: "Думаем", value: "02" },
  { label: "Запоминаем", value: "03" },
];

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-[#e9e3d8] bg-[#f6f1e8]">
      <div className="pointer-events-none absolute -right-32 -top-40 h-[34rem] w-[34rem] rounded-full border border-[#e8dcc8] sm:right-[-5rem] sm:top-[-13rem]" />
      <div className="pointer-events-none absolute -right-16 -top-24 h-[26rem] w-[26rem] rounded-full border border-[#e8dcc8] sm:right-[1rem] sm:top-[-7rem]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 md:grid-cols-[1.05fr_0.95fr] md:gap-10 lg:gap-16 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#a75037]">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Учимся через игру
          </p>
          <h1 className="font-display text-5xl font-bold leading-[0.98] tracking-[-0.055em] text-[#28231f] sm:text-6xl md:text-5xl lg:text-7xl">
            Русский язык
            <span className="mt-2 block font-normal text-[#a75037]">в движении.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#71685f] sm:text-xl">
            Настольные игры и карточки, которые превращают правила в понятную практику — дома, в
            классе и на занятиях со специалистом.
          </p>
          <p className="mt-4 text-sm font-medium uppercase tracking-[0.09em] text-[#8b8175]">
            Для детей 7–12 лет · разработано логопедом-дефектологом
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/products/"
              className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-[#a75037] px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#763b2b]"
            >
              Выбрать набор <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/for-parents/"
              className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-[#d9cfc0] bg-white/70 px-6 py-3 text-sm font-bold text-[#51483f] transition hover:border-[#a75037] hover:text-[#a75037]"
            >
              Как это работает
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute -inset-4 rotate-2 rounded-[2rem] border border-[#e3d6c4]" />
          <div className="relative rounded-[1.5rem] border border-[#e9e3d8] bg-[#fffdf8] p-6 shadow-[0_24px_70px_-36px_rgba(40,35,31,0.35)] sm:p-9">
            <div className="flex items-center justify-between border-b border-[#eee8de] pb-5">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#8b8175]">
                Учебная игра
              </span>
              <Dice5 className="h-5 w-5 text-[#a75037]" aria-hidden="true" />
            </div>
            <div className="py-8 sm:py-10">
              <BookOpen className="mb-4 h-7 w-7 text-[#a75037]" aria-hidden="true" />
              <p className="font-display text-3xl font-bold leading-tight tracking-tight text-[#28231f] sm:text-4xl">
                Не зубрить.
                <br />
                <span className="text-[#a75037]">Играть и понимать.</span>
              </p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#71685f]">
                Короткие раунды, живой разговор и нужный навык — в каждом ходе.
              </p>
            </div>
            <ol className="grid grid-cols-3 divide-x divide-[#eee8de] border-t border-[#eee8de] pt-5">
              {learningSteps.map(({ label, value }) => (
                <li key={value} className="px-3 first:pl-0 last:pr-0">
                  <span className="block text-[10px] font-bold tracking-[0.14em] text-[#a75037]">
                    {value}
                  </span>
                  <span className="mt-1 block text-xs font-semibold text-[#51483f] sm:text-sm">
                    {label}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="absolute -bottom-5 -left-3 rounded-lg bg-[#ead4a6] px-4 py-3 text-xs font-bold uppercase tracking-[0.08em] text-[#572f25] shadow-md sm:-left-8">
            Маленькие шаги — большие открытия
          </div>
        </div>
      </div>
    </section>
  );
}
