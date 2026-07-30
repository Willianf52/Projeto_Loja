"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";

import { SearchIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

export function SearchField({
  className,
  autoFocus = false,
  onSubmitted,
}: {
  className?: string;
  autoFocus?: boolean;
  onSubmitted?: () => void;
}) {
  const router = useRouter();
  const [term, setTerm] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = term.trim();
    router.push(query ? `/produtos?busca=${encodeURIComponent(query)}` : "/produtos");
    onSubmitted?.();
  }

  return (
    <form role="search" onSubmit={handleSubmit} className={cn("relative", className)}>
      <label htmlFor="busca" className="sr-only">
        Buscar produtos
      </label>
      <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink-400" />
      <input
        id="busca"
        name="busca"
        type="search"
        autoFocus={autoFocus}
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder="Buscar por calça jeans, camisa, tamanho…"
        className="h-11 w-full rounded-full border border-ink-200 bg-ink-50 pr-4 pl-11 text-sm text-ink-900 placeholder:text-ink-400 focus:border-denim-500 focus:bg-white focus:outline-none"
      />
    </form>
  );
}
