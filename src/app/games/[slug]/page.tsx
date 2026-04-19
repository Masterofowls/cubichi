import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const gamesData: Record<
  string,
  {
    title: string;
    icon: string;
    description: string;
    content: React.ReactNode;
  }
> = {
  alphabet: {
    title: "Алфавит",
    icon: "🔤",
    description: "Изучаем буквы русского алфавита в игровой форме.",
    content: (
      <div className="space-y-6">
        <p className="text-slate-700">
          Интерактивная игра для изучения букв русского алфавита. Ребенок
          бросает кубик с буквами и выполняет задание: находит букву, называет
          слово на эту букву или показывает её на клавиатуре.
        </p>
        <div className="bg-sky-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Чему научится ребенок
          </h3>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-sky-500">•</span>
              Распознавать все 33 буквы русского алфавита
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-500">•</span>
              Различать гласные и согласные звуки
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-500">•</span>
              Подбирать слова на заданную букву
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  "parts-of-speech": {
    title: "Части речи",
    icon: "📝",
    description:
      "Увлекательная игра для изучения частей речи и членов предложения.",
    content: (
      <div className="space-y-6">
        <p className="text-slate-700">
          Увлекательная игра для изучения частей речи и членов предложения.
          Развивает грамматический строй речи и помогает лучше понимать
          структуру предложений.
        </p>
        <div className="bg-sky-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Компоненты
          </h3>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-sky-500">•</span>2 кубика: части речи и
              члены предложения
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-500">•</span>4 ламинированных карточки с
              предложениями
            </li>
          </ul>
        </div>
        <div className="bg-emerald-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Как играть
          </h3>
          <p className="text-slate-700">
            Бросайте кубики по очереди и находите на карточке слово,
            соответствующее выпавшей части речи или члену предложения. Отмечайте
            найденные слова маркером. Побеждает набравший больше очков!
          </p>
        </div>
      </div>
    ),
  },
  "root-vowels": {
    title: "Безударные гласные",
    icon: "🌱",
    description: "Тренируем проверку безударных гласных в корне слова.",
    content: (
      <div className="space-y-6">
        <p className="text-slate-700">
          Игра для отработки правила проверки безударных гласных в корне слова.
          Помогает развить орфографическую зоркость и навык подбора проверочных
          слов.
        </p>
        <div className="bg-sky-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Компоненты
          </h3>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-sky-500">•</span>2 кубика: корень с
              ударением/без и гласные (А, О, И, Е, Я, любая)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-500">•</span>4 карточки со словами и 4
              карточки с пропущенными гласными
            </li>
          </ul>
        </div>
        <div className="bg-emerald-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Варианты игры
          </h3>
          <div className="space-y-3 text-slate-700">
            <p>
              <strong>Вариант 1:</strong> Кто первый зачеркнет все слова, бросая
              кубики с корнями и гласными.
            </p>
            <p>
              <strong>Вариант 2:</strong> Бросай кубик с гласными и находи слова
              с пропущенной выпавшей буквой.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  cases: {
    title: "Падежи",
    icon: "📐",
    description:
      "Тренировка падежей и склонений существительных в игровой форме.",
    content: (
      <div className="space-y-6">
        <p className="text-slate-700">
          Тренировка падежей и склонений существительных в игровой форме.
          Помогает развить грамматический строй речи и память.
        </p>
        <div className="bg-sky-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Компоненты
          </h3>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-sky-500">•</span>2 кубика: названия падежей
              и вопросы-подсказки
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-500">•</span>
              12 карточек с картинками и 24 карточки со словами
            </li>
          </ul>
        </div>
        <div className="bg-emerald-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Три варианта игры
          </h3>
          <div className="space-y-3 text-slate-700">
            <p>
              <strong>Вариант 1:</strong> Кто первый изменит слово по всем 6
              падежам.
            </p>
            <p>
              <strong>Вариант 2:</strong> Собери 6 карточек в разных падежах.
            </p>
            <p>
              <strong>Вариант 3:</strong> Назови падеж по вопросу-подсказке.
              Играйте до 10 очков.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  words: {
    title: "Слова",
    icon: "💭",
    description: "Расширяем словарный запас и изучаем значения слов.",
    content: (
      <div className="space-y-6">
        <p className="text-slate-700">
          Игра для расширения словарного запаса и изучения значений слов.
          Ребенок учится подбирать синонимы, антонимы и объяснять значения
          различных слов.
        </p>
        <div className="bg-sky-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Чему научится ребенок
          </h3>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-sky-500">•</span>
              Подбирать синонимы и антонимы
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-500">•</span>
              Объяснять значения слов
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-500">•</span>
              Использовать новые слова в речи
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  syllables: {
    title: "Слоги",
    icon: "🔗",
    description: "Изучаем деление слов на слоги.",
    content: (
      <div className="space-y-6">
        <p className="text-slate-700">
          Игра для обучения делению слов на слоги. Ребенок учится правильно
          определять количество слогов в слове и выполнять перенос слов.
        </p>
        <div className="bg-sky-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Чему научится ребенок
          </h3>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-sky-500">•</span>
              Правильно делить слова на слоги
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-500">•</span>
              Определять количество слогов в слове
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-500">•</span>
              Переносить слова по правилам
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  sentences: {
    title: "Предложения",
    icon: "📖",
    description: "Учимся составлять и анализировать предложения.",
    content: (
      <div className="space-y-6">
        <p className="text-slate-700">
          Игра для обучения составлению и анализу предложений. Ребенок учится
          определять структуру предложения, находить главные и второстепенные
          члены.
        </p>
        <div className="bg-sky-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Чему научится ребенок
          </h3>
          <ul className="space-y-2 text-slate-700">
            <li className="flex items-start gap-2">
              <span className="text-sky-500">•</span>
              Составлять предложения из слов
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-500">•</span>
              Определять главные и второстепенные члены предложения
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-500">•</span>
              Анализировать структуру предложения
            </li>
          </ul>
        </div>
      </div>
    ),
  },
};

const slugs = Object.keys(gamesData);

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = gamesData[slug];
  if (!game) return {};
  return {
    title: `${game.title} — Игра`,
    description: game.description,
  };
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = gamesData[slug];
  if (!game) notFound();

  return (
    <div className="min-h-screen bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/games/"
            className="inline-flex items-center text-sky-600 hover:text-sky-700 mb-8 text-sm font-medium"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Все игры
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-5xl">{game.icon}</span>
            <h1 className="text-4xl font-bold text-slate-900">{game.title}</h1>
          </div>

          {game.content}

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/rules/"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 transition-colors"
            >
              Подробные правила
            </Link>
            <Link
              href="/#order"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-sky-600 font-medium border border-sky-200 hover:bg-sky-50 transition-colors"
            >
              Заказать кубики
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
