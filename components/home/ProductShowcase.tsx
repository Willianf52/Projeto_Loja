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
          className="mt-8 flex gap-6 border-b border-ink-100"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              type="button"
              aria-selected={tab.id === active.id}
              onClick={() => setActiveId(tab.id)}
              className={cn(
                "relative shrink-0 pb-3 text-xs font-medium tracking-[0.14em] uppercase transition-colors duration-200 ease-out",
                tab.id === active.id ? "text-ink-900" : "text-ink-400 hover:text-ink-700",
              )}
            >
              {tab.label}
              <span
                className={cn(
                  "absolute inset-x-0 -bottom-px h-px bg-denim-900 transition-opacity duration-200 ease-out",
                  tab.id === active.id ? "opacity-100" : "opacity-0",
                )}
              />
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
          {active.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
