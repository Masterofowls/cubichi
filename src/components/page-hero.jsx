import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export function PageHero({ eyebrow, title, description, current, children }) {
  return (
    <section className="relative overflow-hidden border-b border-[#e9e3d8] bg-[#f6f1e8]">
      <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8">
        <nav aria-label="Навигационная цепочка" className="mb-12">
          <ol className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.08em] text-[#8b8175]">
            <li>
              <Link className="transition hover:text-[#a75037]" to="/">
                Главная
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-4 w-4" />
            </li>
            <li aria-current="page" className="font-bold text-[#51483f]">
              {current}
            </li>
          </ol>
        </nav>
        <div className="max-w-4xl">
          <p className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#a75037]">
            <span className="h-2 w-2 rounded-full bg-[#a75037]" />
            {eyebrow}
          </p>
          <h1 className="font-display text-4xl font-bold leading-[1.06] tracking-tight text-[#28231f] sm:text-5xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#71685f] sm:text-lg">
            {description}
          </p>
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </div>
    </section>
  );
}
