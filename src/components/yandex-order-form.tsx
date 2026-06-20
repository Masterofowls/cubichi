"use client";

import Script from "next/script";

const FORM_SRC =
  "https://forms.yandex.ru/cloud/6a37120595add53972241291?iframe=1";
const FORM_NAME = "ya-form-6a37120595add53972241291";

export function YandexOrderForm() {
  return (
    <>
      <Script
        src="https://forms.yandex.ru/_static/embed.js"
        strategy="lazyOnload"
      />
      <iframe
        src={FORM_SRC}
        name={FORM_NAME}
        title="Форма заказа Кубики-Самоучки"
        className="w-full border-0 min-h-[500px]"
        loading="lazy"
      />
    </>
  );
}
