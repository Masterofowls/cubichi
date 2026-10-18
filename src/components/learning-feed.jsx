import { useEffect, useState } from "react";
import { API_BASE_URL, fetchCollection } from "@/lib/content";
import { MarkdownContent } from "@/components/markdown-content";

export function LearningFeed({ initialMaterials }) {
  const [materials, setMaterials] = useState(initialMaterials);

  useEffect(() => {
    if (!API_BASE_URL) return;
    let active = true;
    fetchCollection("learning")
      .then((items) => {
        if (active) setMaterials(items.filter((item) => item.published));
      })
      .catch((error) => console.error("Learning materials could not refresh", error));
    return () => {
      active = false;
    };
  }, []);

  if (materials.length === 0) return null;

  return (
    <section className="below-fold-section bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-center text-3xl font-bold text-slate-900">Учебные материалы</h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-slate-600">
          Практические рекомендации для занятий дома, в школе и у специалиста.
        </p>
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {materials.map((item) => (
            <article
              key={item.id ?? item.slug}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-3 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-sky-700">
                {item.subject && <span>{item.subject}</span>}
                {item.ageRange && <span>· {item.ageRange}</span>}
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">{item.title}</h3>
              {item.summary && <p className="mb-4 text-slate-600">{item.summary}</p>}
              <MarkdownContent content={item.content ?? ""} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
