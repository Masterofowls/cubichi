export function SectionHeading({ eyebrow, title, description, align = "left" }) {
  const alignment = align === "center" ? "mx-auto text-center" : "";

  return (
    <header className={`mb-10 max-w-3xl ${alignment}`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.17em] text-[#a75037]">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-[#28231f] sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-[#71685f]">{description}</p>
      )}
    </header>
  );
}
