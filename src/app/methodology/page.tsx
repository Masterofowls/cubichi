import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Методика обучения — Кубики-Самоучки",
  description:
    "Методика обучения русскому языку через настольные игры с кубиками. Принципы и подходы к развитию грамотности у детей, разработанные логопедом-дефектологом.",
  openGraph: {
    title: "Методика обучения — Кубики-Самоучки",
    description:
      "Методика обучения русскому языку через настольные игры с кубиками. Разработано логопедом-дефектологом.",
    images: [{ url: "/images/og-preview.jpg", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "https://cubichi.ru/methodology/",
  },
};

const approaches = [
  {
    icon: "🎯",
    title: "Игровой подход",
    description:
      "Ребенок усваивает правила русского языка в процессе увлекательной игры, что повышает мотивацию и эффективность обучения.",
  },
  {
    icon: "🧠",
    title: "Мультисенсорное обучение",
    description:
      "Задействуем зрение, слух, тактильные ощущения и моторику для более глубокого усвоения материала.",
  },
  {
    icon: "📈",
    title: "Постепенное усложнение",
    description:
      "Материал подается от простого к сложному, позволяя ребенку накапливать знания и уверенность.",
  },
  {
    icon: "🔄",
    title: "Многократное повторение",
    description:
      "Игровая форма обеспечивает естественное повторение правил без утомления и скуки.",
  },
];

const principles = [
  "Обучение через активное действие — бросание кубиков, перемещение карточек, письмо маркером",
  "Соревновательный элемент поддерживает интерес и мотивацию ребенка",
  "Немедленная обратная связь — ребенок сразу видит результат своих действий",
  "Возможность самоконтроля и взаимопроверки между игроками",
  "Адаптация сложности под уровень каждого конкретного ребенка",
  "Развитие не только грамотности, но и логического мышления, памяти, внимания",
];

const results = [
  "Улучшение орфографической зоркости",
  "Расширение активного словарного запаса",
  "Уверенное определение частей речи и членов предложения",
  "Правильное склонение существительных по падежам",
  "Навык подбора проверочных слов для безударных гласных",
  "Развитие коммуникативных навыков через групповую игру",
];

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-sky-50 to-white py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              Методика обучения
            </h1>
            <p className="text-lg text-slate-700">
              Наша методика основана на принципах игрового обучения и
              разработана логопедом-дефектологом с многолетним опытом работы с
              детьми.
            </p>
          </div>
        </div>
      </section>

      {/* Approaches */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Наш подход
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {approaches.map((approach) => (
              <div
                key={approach.title}
                className="p-6 rounded-xl bg-white shadow-lg shadow-sky-100/50"
              >
                <div className="text-4xl mb-4">{approach.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {approach.title}
                </h3>
                <p className="text-slate-600">{approach.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
              Принципы методики
            </h2>
            <div className="space-y-4">
              {principles.map((principle, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-start p-5 rounded-xl bg-white shadow-sm"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-sky-100 text-sky-600 text-sm font-semibold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="text-slate-700">{principle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
              Результаты занятий
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.map((result, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 rounded-lg bg-emerald-50"
                >
                  <span className="text-emerald-500 text-lg">✓</span>
                  <p className="text-slate-700">{result}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-sky-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Попробуйте наши игры
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Убедитесь в эффективности методики — выберите игру и начните
              занятия уже сегодня
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/games/"
                className="inline-flex items-center px-8 py-3 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 transition-colors"
              >
                Посмотреть все игры
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center px-8 py-3 rounded-lg bg-white text-sky-600 font-medium border border-sky-200 hover:bg-sky-50 transition-colors"
              >
                Связаться с нами
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
