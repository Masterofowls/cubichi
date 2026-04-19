import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Правила игр — Кубики-Самоучки",
  description:
    "Подробные правила всех настольных игр с кубиками-самоучками: части речи, падежи, безударные гласные. Пошаговые инструкции для родителей и педагогов.",
  openGraph: {
    title: "Правила игр — Кубики-Самоучки",
    description:
      "Подробные правила всех настольных игр с кубиками-самоучками. Пошаговые инструкции.",
    images: [{ url: "/images/og-preview.jpg", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "https://cubichi.ru/rules/",
  },
};

const rulesSections = [
  {
    id: "parts-of-speech",
    title: "Найди свою часть речи",
    description:
      "Увлекательная игра для изучения частей речи и членов предложения. Развивает грамматический строй речи и помогает лучше понимать структуру предложений.",
    components: [
      "2 кубика: первый — части речи (существительное, прилагательное, глагол), второй — члены предложения (подлежащее, сказуемое, дополнение, определение, обстоятельство)",
      "4 ламинированных карточки с предложениями",
    ],
    rules: [
      "Каждый игрок получает карточку с предложениями.",
      "Бросайте кубики по очереди.",
      "Найдите на своей карточке слово, соответствующее выпавшей части речи или члену предложения.",
      "Отмечайте найденные слова маркером на ламинированной карточке.",
      "Можно использовать один или оба кубика для поиска.",
      "Побеждает тот, кто наберет больше всего очков!",
    ],
  },
  {
    id: "cases",
    title: "Собери падежи",
    description:
      "Тренировка падежей и склонений существительных в игровой форме. Помогает развить грамматический строй речи и память.",
    components: [
      "2 кубика: первый — названия падежей, второй — вопросы-подсказки",
      "12 карточек с картинками",
      "24 карточки со словами во всех падежах",
    ],
    variants: [
      {
        name: "Вариант 1",
        description:
          "Кто первый изменит название картинки по всем 6 падежам. Бонусные очки за подбор прилагательного к каждому падежу.",
      },
      {
        name: "Вариант 2",
        description:
          "Собери 6 карточек со словами в разных падежах. Бросай кубик и бери карточку с нужным падежом.",
      },
      {
        name: "Вариант 3",
        description:
          "Зарабатывай очки быстрее всех, правильно называя падеж по выпавшему вопросу. Играйте до 10 очков.",
      },
    ],
  },
  {
    id: "root-vowels",
    title: "Безударная гласная в корне",
    description:
      "Игра для отработки правила проверки безударных гласных в корне слова. Помогает развить орфографическую зоркость и навык подбора проверочных слов.",
    components: [
      "2 кубика: первый — корень с ударением/без, второй — гласные (А, О, И, Е, Я, любая)",
      "4 карточки со словами",
      "4 карточки с пропущенными гласными",
    ],
    variants: [
      {
        name: "Вариант 1",
        description:
          "Кто первый зачеркнет все слова, бросая кубики с ударными/безударными корнями и гласными.",
      },
      {
        name: "Вариант 2",
        description:
          "Бросай кубик с гласными и находи слова, в которых пропущена выпавшая буква.",
      },
    ],
  },
];

export default function RulesPage() {
  return (
    <div className="min-h-screen bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 mb-6 text-center">
            Правила игр с Кубиками-Самоучками
          </h1>
          <p className="text-lg text-slate-600 text-center mb-16">
            Подробные инструкции для каждой игры. Все правила просты и понятны —
            начать играть можно сразу.
          </p>

          <div className="space-y-16">
            {rulesSections.map((section) => (
              <article
                key={section.id}
                id={section.id}
                className="scroll-mt-24"
              >
                <div className="bg-gradient-to-r from-sky-50 to-white rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    {section.title}
                  </h2>
                  <p className="text-slate-700 mb-6">{section.description}</p>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">
                      Компоненты игры
                    </h3>
                    <ul className="space-y-2">
                      {section.components.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-slate-600"
                        >
                          <span className="text-sky-500 mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {"rules" in section && section.rules && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-slate-800 mb-3">
                        Как играть
                      </h3>
                      <ol className="space-y-2">
                        {section.rules.map((rule, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-slate-600"
                          >
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-sky-100 text-sky-600 text-sm font-semibold flex items-center justify-center">
                              {i + 1}
                            </span>
                            {rule}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {"variants" in section && section.variants && (
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-3">
                        Варианты игры
                      </h3>
                      <div className="space-y-4">
                        {section.variants.map((variant) => (
                          <div
                            key={variant.name}
                            className="bg-white rounded-lg p-4 border border-sky-100"
                          >
                            <h4 className="font-semibold text-slate-800 mb-1">
                              {variant.name}
                            </h4>
                            <p className="text-slate-600">
                              {variant.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/games/"
              className="inline-flex items-center px-8 py-3 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 transition-colors"
            >
              Перейти к играм
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
