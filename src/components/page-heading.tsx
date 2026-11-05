import type { ReactNode } from "react";

export function PageHeading({ eyebrow, title, description, id, className = "" }: {
  eyebrow: string; title: ReactNode; description?: string; id?: string; className?: string;
}) {
  return <header className={`mb-8 max-w-3xl ${className}`}>
    <p className="mb-5 text-xs uppercase tracking-[0.2em] text-[#783b18]">{eyebrow}</p>
    <h1 id={id} className="type-page-heading text-[#244536]">{title}</h1>
    {description && <p className="mt-6 text-sm leading-7 text-[#526356]">{description}</p>}
  </header>;
}
