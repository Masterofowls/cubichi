import { ArrowUpRight, Dice5, Mail, Rss } from "lucide-react";
import { Link } from "react-router-dom";

const linkGroups = [
  {
    title: "Открыть",
    links: [
      { href: "/products/", label: "Учебные наборы" },
      { href: "/games/", label: "Игры" },
      { href: "/rules/", label: "Правила" },
    ],
  },
  {
    title: "Узнать",
    links: [
      { href: "/for-parents/", label: "Родителям" },
      { href: "/methodology/", label: "Педагогам" },
      { href: "/news/", label: "Журнал" },
    ],
  },
  {
    title: "Связаться",
    links: [
      { href: "/about/", label: "О проекте" },
      { href: "/contacts/", label: "Контакты" },
      { href: "/order/", label: "Оставить заявку" },
    ],
  },
];

const copyrightYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#3b241f] bg-[#28231f] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-2xl">
                <Dice5 className="h-6 w-6" />
              </span>
              <span className="font-display text-xl font-bold">Кубики-Самоучки</span>
            </Link>
            <p className="mt-5 leading-relaxed text-white/70">
              Настольные учебные игры и карточки, которые помогают детям осваивать русский язык
              через игру и живое общение.
            </p>
            <a
              href="mailto:gurevich_lena@mail.ru"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#ead4a6] transition hover:text-white"
            >
              <Mail className="h-4 w-4" />
              gurevich_lena@mail.ru
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {linkGroups.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[#ead4a6]">
                  {group.title}
                </h2>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="text-sm text-white/75 transition hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {copyrightYear} Кубики-Самоучки. Все права защищены.</p>
          <div className="flex items-center gap-5">
            <a
              href="https://vk.com/club237611844"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition hover:text-white"
            >
              ВКонтакте <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="/rss.xml"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="RSS-лента"
              className="transition hover:text-white"
            >
              <Rss className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
