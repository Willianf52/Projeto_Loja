import Link from "next/link";

import { cn } from "@/lib/cn";

/** Marca tipográfica do Espaço Jeans. */
export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex flex-col leading-none", className)}
      aria-label="Espaço Jeans — página inicial"
    >
      <span
        className={cn(
          "font-serif text-xl tracking-[0.04em] italic sm:text-2xl",
          inverted ? "text-white" : "text-denim-900",
        )}
      >
        Espaço
      </span>
      <span
        className={cn(
          "text-[11px] font-medium tracking-[0.42em] uppercase sm:text-xs",
          inverted ? "text-denim-200" : "text-denim-600",
        )}
      >
        Jeans
      </span>
    </Link>
  );
}
