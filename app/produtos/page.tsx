import type { Metadata } from "next";
import Link from "next/link";

import { ProductCard } from "@/components/product/ProductCard";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { filterProducts } from "@/lib/products";
import type { ProductFilters } from "@/lib/products";

export const metadata: Metadata = {
  title: "Catálogo",
};

const QUICK_FILTERS: Array<{ label: string; href: string; match: ProductFilters }> = [
  { label: "Tudo", href: "/produtos", match: {} },
  { label: "Masculino", href: "/produtos?genero=masculino", match: { genero: "masculino" } },
  { label: "Feminino", href: "/produtos?genero=feminino", match: { genero: "feminino" } },
  { label: "Jeans", href: "/produtos?familia=jeans", match: { familia: "jeans" } },
  { label: "Lançamentos", href: "/produtos?tag=lancamento", match: { tag: "lancamento" } },
  { label: "Ofertas", href: "/produtos?tag=oferta", match: { tag: "oferta" } },
];

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filters: ProductFilters = {
    genero: typeof params.genero === "string" ? params.genero : undefined,
    familia: typeof params.familia === "string" ? params.familia : undefined,
    tag: typeof params.tag === "string" ? params.tag : undefined,
    busca: typeof params.busca === "string" ? params.busca : undefined,
  };

  const products = filterProducts(filters);

  return (
    <Container className="py-10">
      <nav aria-label="Você está em" className="text-xs text-ink-400">
        <Link href="/" className="hover:text-denim-700">
          Início
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-ink-700">Catálogo</span>
      </nav>

      <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
        {filters.busca ? `Resultados para “${filters.busca}”` : "Catálogo"}
      </h1>
      <p className="mt-1 text-sm text-ink-500">
        {products.length} {products.length === 1 ? "produto" : "produtos"}
      </p>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
        {QUICK_FILTERS.map((filter) => {
          const active =
            filter.match.genero === filters.genero &&
            filter.match.familia === filters.familia &&
            filter.match.tag === filters.tag;

          return (
            <Link
              key={filter.label}
              href={filter.href}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-xs font-semibold tracking-[0.12em] uppercase transition-colors",
                active ? "bg-denim-900 text-white" : "bg-ink-100 text-ink-700 hover:bg-ink-200",
              )}
            >
              {filter.label}
            </Link>
          );
        })}
      </div>

      {products.length ? (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-sm text-ink-500">
          Nenhum produto encontrado. Tente outra busca ou fale com a gente no WhatsApp.
        </p>
      )}
    </Container>
  );
}
