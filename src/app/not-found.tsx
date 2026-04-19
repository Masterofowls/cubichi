import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="text-7xl mb-6">🎲</div>
      <h1 className="text-6xl font-bold text-sky-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-slate-900 mb-2">
        Страница не найдена
      </h2>
      <p className="text-slate-600 mb-8 text-center max-w-md">
        Кубик укатился не туда! Запрашиваемая страница не существует или была
        перемещена.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 transition-colors"
        >
          На главную
        </Link>
        <Link
          href="/games/"
          className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-sky-600 font-medium border border-sky-200 hover:bg-sky-50 transition-colors"
        >
          Смотреть игры
        </Link>
      </div>
    </div>
  );
}
