import { ChevronDown, Dice5, Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { usePathname } from "@/compat/navigation.jsx";
import { cn } from "@/lib/utils";

const primaryLinks = [
  { href: "/products/", label: "Наборы" },
  { href: "/games/", label: "Игры" },
  { href: "/news/", label: "Журнал" },
  { href: "/about/", label: "О проекте" },
  { href: "/contacts/", label: "Контакты" },
];
const resourceLinks = [
  { href: "/cards/", label: "Карточки-самоучки" },
  { href: "/cards/#rules", label: "Правила карточной игры" },
  { href: "/for-parents/", label: "Родителям" },
  { href: "/methodology/", label: "Педагогам" },
  { href: "/rules/", label: "Правила игр" },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (mobileOpen && !dialog.open) dialog.showModal();
    if (!mobileOpen && dialog.open) dialog.close();
  }, [mobileOpen]);

  const isActive = (href) => pathname === href || pathname?.startsWith(href);
  const linkClasses = (href) =>
    cn(
      "inline-flex min-h-11 items-center rounded-lg px-3 py-2 text-[11px] font-bold uppercase tracking-[0.08em] transition-colors",
      isActive(href)
        ? "bg-[#f4ead5] text-[#763b2b]"
        : "text-[#28231f] hover:bg-[#fbf7ef] hover:text-[#a75037]",
    );

  return (
    <nav
      aria-label="Основная"
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-[#e9e3d8] transition-all duration-300",
        scrolled ? "bg-white/95 shadow-sm shadow-[#28231f]/5" : "bg-white",
      )}
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 xl:px-10">
        <div className="flex h-[76px] items-center justify-between gap-5">
          <Link to="/" className="group flex shrink-0 items-center gap-3">
            <span
              className="grid h-11 w-11 place-items-center rounded-xl bg-[#28231f] text-2xl text-white"
              aria-hidden="true"
            >
              <Dice5 className="h-6 w-6" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-display text-lg font-bold tracking-tight text-[#28231f] sm:text-xl">
                Кубики-Самоучки
              </span>
              <span className="mt-1 hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b8175] sm:block">
                Учимся через игру
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 xl:flex">
            {primaryLinks.slice(0, 2).map((link) => (
              <Link key={link.href} to={link.href} className={linkClasses(link.href)}>
                {link.label}
              </Link>
            ))}
            <details className="group relative">
              <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-1 rounded-lg px-3 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#28231f] transition-colors hover:bg-[#fbf7ef] hover:text-[#a75037] [&::-webkit-details-marker]:hidden">
                Материалы
                <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
              </summary>
              <div className="absolute left-0 top-full z-50 mt-2 w-56 rounded-xl border border-[#e9e3d8] bg-white p-2 shadow-xl shadow-[#28231f]/10">
                {resourceLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="block rounded-lg px-4 py-3 text-sm font-medium text-[#51483f] transition-colors hover:bg-[#fbf7ef] hover:text-[#a75037]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </details>
            {primaryLinks.slice(2).map((link) => (
              <Link key={link.href} to={link.href} className={linkClasses(link.href)}>
                {link.label}
              </Link>
            ))}
            <Link
              to="/order/"
              className="ms-2 inline-flex min-h-11 shrink-0 items-center rounded-lg bg-[#a75037] px-5 py-2 text-xs font-bold uppercase tracking-[0.06em] text-white transition hover:-translate-y-0.5 hover:bg-[#763b2b]"
            >
              Оставить заявку
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-[#28231f] transition-colors hover:bg-[#fbf7ef] hover:text-[#a75037] xl:hidden"
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-dialog"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <dialog
        id="mobile-nav-dialog"
        ref={dialogRef}
        className="nav-dialog fixed inset-0 top-[76px] z-40 m-0 h-[calc(100%-4.75rem)] max-h-none w-full max-w-none border-0 bg-transparent p-0 open:flex open:flex-col xl:hidden"
        aria-label="Мобильное меню"
        onClose={() => setMobileOpen(false)}
      >
        <motion.div
          className="relative mt-auto border-t border-[#e9e3d8] bg-white shadow-xl"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="mx-auto w-full max-w-2xl space-y-1 px-4 py-4">
            {[...primaryLinks, ...resourceLinks].map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.04, duration: 0.2 }}
              >
                <Link
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block min-h-11 rounded-xl px-4 py-3 text-base font-semibold transition-colors",
                    isActive(link.href)
                      ? "bg-[#f4ead5] text-[#763b2b]"
                      : "text-[#51483f] hover:bg-[#fbf7ef] hover:text-[#a75037]",
                  )}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <Link
              to="/order/"
              onClick={() => setMobileOpen(false)}
              className="mt-3 flex min-h-12 items-center justify-center rounded-xl bg-[#a75037] px-4 py-3 font-semibold text-white transition hover:bg-[#763b2b]"
            >
              Оставить заявку
            </Link>
          </div>
        </motion.div>
      </dialog>
    </nav>
  );
}
