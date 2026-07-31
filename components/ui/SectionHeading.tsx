import Link from "next/link";

import { ArrowRightIcon } from "@/components/ui/icons";

/** Cabeçalho padrão das seções da home: olho, título e link "ver tudo". */
export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="text-xs font-medium tracking-[0.22em] text-denim-600 uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-ink-900 sm:text-4xl">
          {title}
        </h2>
        {description ? <p className="mt-3 text-sm leading-relaxed text-ink-500">{description}</p> : null}
      </div>

      {action ? (
        <Link
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-denim-700 transition-colors duration-200 ease-out hover:text-denim-900"
        >
          {action.label}
          <ArrowRightIcon className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
        </Link>
      ) : null}
    </div>
  );
}
