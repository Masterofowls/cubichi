import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL, fetchCollection } from "@/lib/content";
import { FadeIn, HoverCard, Stagger, StaggerItem } from "@/components/motion";

export function ProductCatalog({ initialProducts }) {
  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    if (!API_BASE_URL) return;
    let active = true;
    fetchCollection("products")
      .then((items) => {
        if (active) setProducts(items.filter((item) => item.published));
      })
      .catch((error) => console.error("Product catalog could not refresh", error));
    return () => {
      active = false;
    };
  }, []);

  if (products.length === 0) {
    return (
      <p className="text-center text-slate-600">
        Сейчас товары обновляются. Свяжитесь с нами, чтобы узнать о наборах.
      </p>
    );
  }

  return (
    <>
      <Stagger className="max-w-4xl mx-auto space-y-6" staggerDelay={0.12}>
        {products.map((product) => (
          <StaggerItem key={product.id ?? product.slug ?? product.title}>
            <HoverCard>
              <div className="group flex flex-col gap-5 rounded-2xl border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:border-sky-200 hover:bg-gradient-to-r hover:from-white hover:to-sky-50/50 hover:shadow-lg hover:shadow-sky-100/50 sm:flex-row sm:items-start">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-20 w-20 shrink-0 rounded-xl object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f4ead5] text-[#a75037] sm:flex">
                    <span className="text-lg font-bold">{product.title.charAt(0)}</span>
                  </div>
                )}
                <div className="flex-grow">
                  <h3 className="mb-1.5 text-lg font-semibold text-slate-900">{product.title}</h3>
                  <p className="mb-3 leading-relaxed text-slate-600">{product.description}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    {product.age && (
                      <span className="inline-block rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold tracking-wide text-sky-700">
                        {product.age}
                      </span>
                    )}
                    {product.price && (
                      <span className="text-sm font-semibold text-sky-700">{product.price}</span>
                    )}
                  </div>
                </div>
                <Link
                  to={product.href ?? "/games/"}
                  className="shrink-0 whitespace-nowrap text-sm font-semibold text-sky-600 transition-transform duration-200 group-hover:translate-x-1 hover:text-sky-700"
                >
                  Подробнее →
                </Link>
              </div>
            </HoverCard>
          </StaggerItem>
        ))}
      </Stagger>
      <FadeIn delay={0.3}>
        <div className="mt-10 text-center">
          <Link
            to="/games/"
            className="inline-flex items-center rounded-xl bg-sky-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-sky-900/15 transition-all hover:-translate-y-0.5 hover:bg-sky-700"
          >
            Смотреть все игры
          </Link>
        </div>
      </FadeIn>
    </>
  );
}
