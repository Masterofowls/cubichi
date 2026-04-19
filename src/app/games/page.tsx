import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Игры с кубиками — 7 обучающих тренажеров по русскому языку",
  description:
    "Каталог из 7 настольных образовательных игр с кубиками: алфавит, части речи, падежи, безударные гласные, слоги, слова и предложения. Для детей 7–12 лет.",
  openGraph: {
    title: "Игры с кубиками — 7 обучающих тренажеров",
    description:
      "Каталог из 7 настольных образовательных игр с кубиками для детей 7–12 лет.",
    images: [{ url: "/images/og-preview.jpg", width: 1200, height: 630 }],
  },
  alternates: {
    canonical: "https://cubichi.ru/games/",
  },
};

const games = [
  {
    slug: "alphabet",
    title: "Алфавит",
    icon: "🔤",
    description: "Изучаем буквы русского алфавита",
    color: "from-blue-400 to-cyan-400",
    btnColor: "bg-blue-500 hover:bg-blue-600",
  },
  {
    slug: "parts-of-speech",
    title: "Части речи",
    icon: "📝",
    description:
      "Находим существительные, прилагательные и глаголы в предложениях",
    color: "from-emerald-400 to-green-400",
    btnColor: "bg-emerald-500 hover:bg-emerald-600",
  },
  {
    slug: "root-vowels",
    title: "Корневые гласные",
    icon: "🌱",
    description: "Тренируем проверку безударных гласных в корне слова",
    color: "from-yellow-400 to-amber-400",
    btnColor: "bg-yellow-500 hover:bg-yellow-600",
  },
  {
    slug: "cases",
    title: "Падежи",
    icon: "📐",
    description: "Осваиваем падежи и склонения русского языка",
    color: "from-orange-400 to-red-400",
    btnColor: "bg-orange-500 hover:bg-orange-600",
  },
  {
    slug: "words",
    title: "Слова",
    icon: "💭",
    description: "Расширяем словарный запас и изучаем значения слов",
    color: "from-indigo-400 to-purple-400",
    btnColor: "bg-indigo-500 hover:bg-indigo-600",
  },
  {
    slug: "syllables",
    title: "Слоги",
    icon: "🔗",
    description: "Изучаем деление слов на слоги",
    color: "from-teal-400 to-blue-400",
    btnColor: "bg-teal-500 hover:bg-teal-600",
  },
  {
    slug: "sentences",
    title: "Предложения",
    icon: "📖",
    description: "Учимся составлять и анализировать предложения",
    color: "from-rose-400 to-pink-400",
    btnColor: "bg-rose-500 hover:bg-rose-600",
  },
];

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-slate-900 mb-4 text-center">
          Образовательные игры с кубиками
        </h1>
        <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
          Выберите игру, которая подходит вашему ребенку. Каждая игра рассчитана
          на 2–4 участников и содержит подробные правила.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {games.map((game) => (
            <div
              key={game.slug}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`h-32 bg-gradient-to-br ${game.color}`} />
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{game.icon}</span>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {game.title}
                  </h2>
                </div>
                <p className="text-gray-600 mb-4">{game.description}</p>
                <Link
                  href={`/games/${game.slug}/`}
                  className={`inline-flex items-center px-4 py-2 rounded-lg text-white transition-colors ${game.btnColor}`}
                >
                  Подробнее
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
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Следите за новыми играми
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Подписывайтесь на нашу группу ВКонтакте, чтобы не пропустить новые
            игры и обновления
          </p>
          <a
            href="https://vk.com/club237611844"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 transition-colors gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.72-1.033-1.01-1.49-1.135-1.745-1.135-.356 0-.458.102-.458.597v1.575c0 .424-.135.683-1.253.683-1.846 0-3.896-1.12-5.339-3.202-2.17-3.041-2.763-5.32-2.763-5.785 0-.255.102-.491.596-.491h1.744c.44 0 .61.237.779.797.846 2.424 2.257 4.542 2.837 4.542.22 0 .322-.102.322-.66v-2.56c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.408.44-.408h2.747c.373 0 .508.186.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.27-1.423 2.18-3.624 2.18-3.624.119-.237.305-.457.745-.457h1.744c.525 0 .644.27.525.643-.22 1.017-2.375 4.081-2.375 4.081-.186.305-.254.457 0 .813.186.271.796.813 1.202 1.304.745.915 1.32 1.685 1.473 2.206.17.542-.101.813-.626.813z" />
            </svg>
            Подписаться на группу
          </a>
        </div>
      </div>
    </div>
  );
}
