import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Для родителей — Кубики-Самоучки",
  description:
    "Информация для родителей об обучающих настольных играх Кубики-Самоучки. Как выбрать игру, организовать занятия дома и поддержать ребенка в изучении русского языка.",
  openGraph: {
    title: "Для родителей — Кубики-Самоучки",
    description:
      "Как выбрать обучающую игру и организовать занятия дома. Кубики-Самоучки для детей 7–12 лет.",
    images: [{ url: "/images/og-preview.jpg", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "https://cubichi.ru/for-parents/",
  },
};

const benefits = [
  {
    icon: "👩‍🏫",
    title: "Эффективное обучение",
    description:
      "Игры разработаны логопедом-дефектологом с учетом современных методик обучения русскому языку.",
  },
  {
    icon: "🎲",
    title: "Игровой формат",
    description:
      "Обучение проходит в увлекательной форме с использованием реальных кубиков, что помогает удерживать внимание ребенка.",
  },
  {
    icon: "🤲",
    title: "Развитие моторики",
    description:
      "Использование физических кубиков помогает развивать мелкую моторику и координацию движений.",
  },
  {
    icon: "👥",
    title: "Групповые занятия",
    description:
      "Возможность играть в группе до 4 человек или командами развивает коммуникативные навыки.",
  },
];

const extras = [
  {
    title: "Комплексное развитие",
    description:
      "Игры помогают одновременно развивать речь, память, внимание и логическое мышление.",
  },
  {
    title: "Методические рекомендации",
    description:
      "К каждой игре прилагается подробная инструкция и рекомендации по эффективному использованию.",
  },
  {
    title: "Индивидуальный подход",
    description:
      "Возможность адаптировать темп и сложность занятий под особенности каждого ребенка.",
  },
];

const faq = [
  {
    question: "Для какого возраста подходят игры?",
    answer:
      "Наши игры рекомендуются для детей школьного возраста (7–12 лет), но могут быть адаптированы для более младшего возраста при участии родителей или педагогов.",
  },
  {
    question: "Сколько времени занимает одна игра?",
    answer:
      "Средняя продолжительность одной игровой сессии составляет 15–20 минут, что оптимально для поддержания внимания ребенка. Рекомендуется проводить 2–3 сессии в день.",
  },
  {
    question: "Нужна ли специальная подготовка?",
    answer:
      "Нет, к каждой игре прилагается подробная инструкция и методические рекомендации. Родители могут легко организовать занятия дома, а педагоги — использовать игры в классе.",
  },
];

export default function ForParentsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-sky-50 to-white py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
                Эффективное обучение{" "}
                <span className="text-sky-600">через игру</span>
              </h1>
              <p className="text-lg text-slate-700 mb-8">
                Наши развивающие игры с кубиками помогают детям освоить правила
                русского языка в увлекательной форме. Разработаны
                логопедом-дефектологом для эффективных занятий как дома, так и в
                классе.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/games/"
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 transition-colors"
                >
                  Выбрать игру
                </Link>
                <Link
                  href="#benefits"
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
                  alt="Счастливый ребенок учится играя"
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

      {/* Benefits */}
      <section id="benefits" className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Почему родители выбирают нас
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="p-6 rounded-xl bg-white shadow-lg shadow-sky-100/50"
              >
                <div className="text-4xl mb-4">{b.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {b.title}
                </h3>
                <p className="text-slate-600">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extras */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
              Дополнительные возможности
            </h2>
            <div className="space-y-6">
              {extras.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-start p-6 rounded-xl bg-white shadow-lg shadow-sky-100/50"
                >
                  <span className="flex-shrink-0 w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center">
                    <span className="text-sky-600 font-semibold">{i + 1}</span>
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
              Частые вопросы
            </h2>
            <div className="space-y-6">
              {faq.map((item) => (
                <div
                  key={item.question}
                  className="p-6 rounded-xl bg-white shadow-lg shadow-sky-100/50"
                >
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {item.question}
                  </h3>
                  <p className="text-slate-600">{item.answer}</p>
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
              Готовы начать обучение?
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Выберите игру, которая подходит вашему ребенку, и начните
              увлекательное путешествие в мир русского языка
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
