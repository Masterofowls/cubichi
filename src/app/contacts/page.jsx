import { ArrowUpRight, Mail, MessageCircle, Phone, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHero } from "@/components/page-hero";

export const metadata = {
  title: "Контакты — Кубики-Самоучки",
  description: "Свяжитесь с автором проекта, чтобы задать вопрос или узнать о наборах.",
  alternates: { canonical: "https://cubichi.ru/contacts/" },
};

const contactMethods = [
  {
    icon: Mail,
    label: "Электронная почта",
    value: "gurevich_lena@mail.ru",
    href: "mailto:gurevich_lena@mail.ru",
  },
  {
    icon: Phone,
    label: "Телефон / WhatsApp",
    value: "+7 921 908-17-12",
    href: "https://wa.me/79219081712",
  },
  {
    icon: MessageCircle,
    label: "Telegram",
    value: "@gurevichlena",
    href: "https://t.me/gurevichlena",
  },
  {
    icon: Users,
    label: "ВКонтакте",
    value: "Сообщество «Кубичи»",
    href: "https://vk.com/club237611844",
  },
];

export default function ContactsPage() {
  return (
    <>
      <PageHero
        eyebrow="На связи"
        current="Контакты"
        title="Поможем выбрать набор и ответим на вопросы"
        description="Напишите нам удобным способом. Расскажем о форматах, материалах и доставке, а также поможем подобрать вариант для дома или занятий."
      >
        <Link
          to="/order/"
          className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-sky-700 px-6 py-3 font-semibold text-white shadow-lg shadow-sky-900/15 transition hover:-translate-y-0.5 hover:bg-sky-800"
        >
          Оставить заявку <ArrowUpRight className="h-4 w-4" />
        </Link>
      </PageHero>
      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.14em] text-sky-700">
              Контактные данные
            </p>
            <h2 className="font-display text-3xl font-bold text-slate-900">
              Выберите удобный канал
            </h2>
            <div className="mt-7 grid gap-4">
              {contactMethods.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-lg"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-sky-100 text-sky-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {label}
                    </span>
                    <span className="mt-1 block font-semibold text-slate-900">{value}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-sky-700" />
                </a>
              ))}
            </div>
          </div>
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/5">
            <div className="rounded-[1.35rem] bg-[#f7f6ef] p-6 sm:p-9">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-sky-700">
                Быстрый заказ
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-slate-900">
                Расскажите, что вам нужно
              </h2>
              <p className="mt-3 leading-relaxed text-slate-600">
                Оставьте контакты, и мы уточним наличие, подходящий формат и детали доставки.
              </p>
              <Link
                to="/order/"
                className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-sky-700 px-6 py-3 font-semibold text-white transition hover:bg-sky-800"
              >
                Перейти к форме заявки <ArrowUpRight className="h-4 w-4" />
              </Link>
              <p className="mt-4 text-xs leading-relaxed text-slate-500">
                Данные используются только для ответа на ваш запрос.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
