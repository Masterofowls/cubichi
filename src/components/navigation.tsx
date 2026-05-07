"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-client";

const navLinks = [
  { href: "/rules/", label: "Правила" },
  { href: "/games/", label: "Игры" },
  { href: "/for-parents/", label: "Родителям" },
  { href: "/methodology/", label: "Методика" },
  { href: "/#news", label: "Новости" },
  { href: "/#contact", label: "Контакты" },
  { href: "/#order", label: "Заказ" },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-white/80 backdrop-blur-sm",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="text-3xl">🎲</span>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
              Кубики-Самоучки
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href ||
                    (link.href !== "/" &&
                      !link.href.startsWith("/#") &&
                      pathname?.startsWith(link.href))
                    ? "text-sky-600 bg-sky-50"
                    : "text-gray-600 hover:text-sky-600 hover:bg-sky-50",
                )}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://vk.com/club237611844"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-600 text-white text-sm font-medium hover:bg-sky-700 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.72-1.033-1.01-1.49-1.135-1.745-1.135-.356 0-.458.102-.458.597v1.575c0 .424-.135.683-1.253.683-1.846 0-3.896-1.12-5.339-3.202-2.17-3.041-2.763-5.32-2.763-5.785 0-.255.102-.491.596-.491h1.744c.44 0 .61.237.779.797.846 2.424 2.257 4.542 2.837 4.542.22 0 .322-.102.322-.66v-2.56c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.408.44-.408h2.747c.373 0 .508.186.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.27-1.423 2.18-3.624 2.18-3.624.119-.237.305-.457.745-.457h1.744c.525 0 .644.27.525.643-.22 1.017-2.375 4.081-2.375 4.081-.186.305-.254.457 0 .813.186.271.796.813 1.202 1.304.745.915 1.32 1.685 1.473 2.206.17.542-.101.813-.626.813z" />
              </svg>
              ВКонтакте
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-sky-600 hover:bg-sky-50 transition-colors"
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <m.div className="lg:hidden fixed inset-0 top-16 z-40">
          <m.div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setMobileOpen(false)}
          />
          <m.div
            className="relative bg-white border-t border-gray-100 shadow-xl"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link, i) => (
                <m.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block px-4 py-3 rounded-lg text-base font-medium transition-colors",
                      pathname === link.href ||
                        (link.href !== "/" &&
                          !link.href.startsWith("/#") &&
                          pathname?.startsWith(link.href))
                        ? "text-sky-600 bg-sky-50"
                        : "text-gray-600 hover:text-sky-600 hover:bg-sky-50",
                    )}
                  >
                    {link.label}
                  </Link>
                </m.div>
              ))}
              <m.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05, duration: 0.25 }}
              >
                <a
                  href="https://vk.com/club237611844"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 mx-4 mt-3 px-4 py-3 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.72-1.033-1.01-1.49-1.135-1.745-1.135-.356 0-.458.102-.458.597v1.575c0 .424-.135.683-1.253.683-1.846 0-3.896-1.12-5.339-3.202-2.17-3.041-2.763-5.32-2.763-5.785 0-.255.102-.491.596-.491h1.744c.44 0 .61.237.779.797.846 2.424 2.257 4.542 2.837 4.542.22 0 .322-.102.322-.66v-2.56c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.408.44-.408h2.747c.373 0 .508.186.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.27-1.423 2.18-3.624 2.18-3.624.119-.237.305-.457.745-.457h1.744c.525 0 .644.27.525.643-.22 1.017-2.375 4.081-2.375 4.081-.186.305-.254.457 0 .813.186.271.796.813 1.202 1.304.745.915 1.32 1.685 1.473 2.206.17.542-.101.813-.626.813z" />
                  </svg>
                  ВКонтакте
                </a>
              </m.div>
            </div>
          </m.div>
        </m.div>
      )}
    </nav>
  );
}
