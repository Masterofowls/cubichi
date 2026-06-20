import { Rss } from "lucide-react";
import Link from "next/link";

const footerLinks = [
  { href: "/rules/", label: "Правила" },
  { href: "/games/", label: "Игры" },
  { href: "/for-parents/", label: "Родителям" },
  { href: "/methodology/", label: "Методика" },
  { href: "/#news", label: "Новости" },
  { href: "/#contact", label: "Контакты" },
];

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <nav
          className="flex flex-wrap justify-center gap-6 md:gap-12"
          aria-label="Навигация в подвале"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-600 hover:text-sky-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 flex justify-center gap-6 items-center">
          <a
            href="https://vk.com/club237611844"
            className="text-gray-400 hover:text-sky-600 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ВКонтакте"
          >
            <span className="sr-only">ВКонтакте</span>
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.72-1.033-1.01-1.49-1.135-1.745-1.135-.356 0-.458.102-.458.597v1.575c0 .424-.135.683-1.253.683-1.846 0-3.896-1.12-5.339-3.202-2.17-3.041-2.763-5.32-2.763-5.785 0-.255.102-.491.596-.491h1.744c.44 0 .61.237.779.797.846 2.424 2.257 4.542 2.837 4.542.22 0 .322-.102.322-.66v-2.56c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.408.44-.408h2.747c.373 0 .508.186.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.27-1.423 2.18-3.624 2.18-3.624.119-.237.305-.457.745-.457h1.744c.525 0 .644.27.525.643-.22 1.017-2.375 4.081-2.375 4.081-.186.305-.254.457 0 .813.186.271.796.813 1.202 1.304.745.915 1.32 1.685 1.473 2.206.17.542-.101.813-.626.813z" />
            </svg>
          </a>
          <Link
            href="/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="RSS-лента"
            className="text-gray-400 hover:text-orange-500 transition-colors"
          >
            <Rss className="h-5 w-5" />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500">
            <span className="text-lg">🎲</span>
            <p>
              &copy; {new Date().getFullYear()} Кубики-Самоучки. Все права
              защищены.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
