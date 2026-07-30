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
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="text-xs font-semibold tracking-[0.2em] text-denim-600 uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
          {title}
        </h2>
        {description ? <p className="mt-2 text-sm text-ink-500">{description}</p> : null}
      </div>

      {action ? (
        <Link
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-denim-700 transition-colors hover:text-denim-900"
        >
          {action.label}
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      ) : null}
    </div>
  );
}
