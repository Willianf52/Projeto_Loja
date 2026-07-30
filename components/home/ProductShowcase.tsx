"use client";

import { useState } from "react";

import { ProductCard } from "@/components/product/ProductCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import type { Product } from "@/lib/products";

type Tab = { id: string; label: string; href: string; products: Product[] };

/** Vitrine com abas (mais vendidos / lançamentos) e cards com hover. */
export function ProductShowcase({ tabs }: { tabs: Tab[] }) {
  const [activeId, setActiveId] = useState(tabs[0]?.id);
  const active = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  return (
    <section className="py-4 sm:py-6">
      <Container>
        <SectionHeading
          eyebrow="Vitrine"
          title="Escolhidos por quem já veste Espaço Jeans"
          description="Peças que saem da loja toda semana — com troca garantida em até 30 dias."
          action={{ label: "Ver catálogo completo", href: active.href }}
        />

        <div
          role="tablist"
          aria-label="Vitrines"
          className="mt-6 flex gap-2 overflow-x-auto pb-1"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={tab.id === active.id}
              onClick={() => setActiveId(tab.id)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-xs font-semibold tracking-[0.12em] uppercase transition-colors",
                tab.id === active.id
                  ? "bg-denim-900 text-white"
                  : "bg-ink-100 text-ink-700 hover:bg-ink-200",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {active.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
