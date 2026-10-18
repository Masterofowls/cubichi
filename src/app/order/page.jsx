import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { OrderForm } from "@/components/order-form";
import { PageHero } from "@/components/page-hero";

export const metadata = {
  title: "Заявка на набор — Кубики-Самоучки",
  description: "Оставьте заявку на наборы «Кубики-Самоучки» или «Карточки-Самоучки».",
  alternates: { canonical: "https://cubichi.ru/order/" },
};

export default function OrderPage() {
  return (
    <>
      <PageHero
        eyebrow="Заявка"
        current="Оставить заявку"
        title="Расскажите, что вы ищете"
        description="Выберите тип набора и оставьте контакты. Мы свяжемся с вами, ответим на вопросы и обсудим детали."
      />
      <section className="bg-[#f7f6ef] py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
            <div className="border-b border-slate-100 px-5 py-5 sm:px-8">
              <p className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                <ShieldCheck className="h-5 w-5 text-sky-700" />
                Контактные данные используются только для ответа на заявку
              </p>
            </div>
            <OrderForm />
          </div>
          <Link
            to="/products/"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-800"
          >
            <ArrowLeft className="h-4 w-4" /> Вернуться к наборам
          </Link>
        </div>
      </section>
    </>
  );
}
