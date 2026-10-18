import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const API_URL = (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");

export function OrderForm() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [submitting, setSubmitting] = useState(false);

  async function submitOrder(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "idle", message: "" });

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Не удалось отправить заявку.");
      }
      form.reset();
      setStatus({
        type: "success",
        message: "Спасибо! Заявка отправлена. Мы скоро свяжемся с вами.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error ? error.message : "Не удалось отправить заявку. Попробуйте позже.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submitOrder} className="space-y-5 p-5 sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-800">
          Ваше имя
          <input
            name="name"
            autoComplete="name"
            required
            maxLength={120}
            className="order-input mt-2"
            placeholder="Как к вам обращаться"
          />
        </label>
        <label className="block text-sm font-semibold text-slate-800">
          Телефон
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            maxLength={40}
            className="order-input mt-2"
            placeholder="+7 (___) ___-__-__"
          />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-800">
          Email <span className="font-normal text-slate-500">— необязательно</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            className="order-input mt-2"
            placeholder="name@example.ru"
          />
        </label>
        <label className="block text-sm font-semibold text-slate-800">
          Интересующий набор
          <select
            name="product"
            className="order-input mt-2"
            defaultValue={searchParams.get("product") === "cards" ? "Карточки-Самоучки" : ""}
          >
            <option value="">Выберите набор</option>
            <option>Кубики-Самоучки</option>
            <option>Карточки-Самоучки</option>
          </select>
        </label>
      </div>
      <label className="block text-sm font-semibold text-slate-800">
        Комментарий <span className="font-normal text-slate-500">— необязательно</span>
        <textarea
          name="message"
          rows={4}
          maxLength={3000}
          className="order-input mt-2 resize-y"
          placeholder="Задайте вопрос или уточните детали заказа"
        />
      </label>
      <label className="absolute -left-[10000px]" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex min-h-12 items-center justify-center rounded-xl bg-sky-600 px-7 py-3 font-semibold text-white shadow-lg shadow-sky-900/15 transition hover:bg-sky-700 disabled:cursor-wait disabled:opacity-60"
      >
        {submitting ? "Отправляем…" : "Отправить заявку"}
      </button>
      <p
        role="status"
        aria-live="polite"
        className={`min-h-6 text-sm ${status.type === "error" ? "text-red-700" : "text-slate-600"}`}
      >
        {status.message}
      </p>
      <p className="text-xs leading-relaxed text-slate-500">
        Нажимая кнопку, вы соглашаетесь на обработку данных для ответа на заявку.
      </p>
    </form>
  );
}
