"use client";

import Link from "next/link";
import { useState } from "react";

import { ProductMedia } from "@/components/product/ProductMedia";
import { useStore } from "@/components/store/StoreProvider";
import { HeartIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { bestInstallment, discountPercent, formatPrice } from "@/lib/format";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleFavorite, isFavorite } = useStore();
  const [addedSize, setAddedSize] = useState<string | null>(null);

  const discount = discountPercent(product.price, product.compareAt);
  const installment = bestInstallment(product.price);
  const favorited = isFavorite(product.id);

  function handleQuickAdd(size: string) {
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      size,
    });
    setAddedSize(size);
    window.setTimeout(() => setAddedSize(null), 1600);
  }

  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
        <Link href={`/produtos/${product.slug}`} aria-label={product.name} className="absolute inset-0">
          <ProductMedia product={product} className="size-full" />
        </Link>

        <div className="pointer-events-none absolute top-3 left-3 flex flex-col items-start gap-1.5">
          {product.tags.includes("lancamento") ? (
            <span className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-denim-900 uppercase">
              Lançamento
            </span>
          ) : null}
          {discount ? (
            <span className="rounded-full bg-denim-900 px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-white uppercase">
              -{discount}%
            </span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => toggleFavorite(product.id)}
          aria-pressed={favorited}
          aria-label={favorited ? `Remover ${product.name} dos favoritos` : `Favoritar ${product.name}`}
          className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-white/95 text-ink-700 shadow-sm transition-colors hover:text-denim-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-denim-900"
        >
          <HeartIcon className={cn("size-5", favorited && "fill-denim-900 text-denim-900")} />
        </button>

        {/* Compra rápida: aparece no hover (desktop) e fica sempre visível no toque. */}
        <div className="absolute inset-x-2 bottom-2 rounded-xl bg-white/95 p-2 backdrop-blur-sm transition-all duration-300 sm:translate-y-3 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100">
          {addedSize ? (
            <p className="py-1.5 text-center text-xs font-semibold text-denim-900">
              Tamanho {addedSize} na sacola
            </p>
          ) : (
            <>
              <p className="mb-1.5 text-center text-[10px] font-semibold tracking-[0.14em] text-ink-500 uppercase">
                Compra rápida
              </p>
              <div className="flex flex-wrap justify-center gap-1">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleQuickAdd(size)}
                    className="min-w-9 rounded-md border border-ink-200 px-2 py-1 text-xs font-medium text-ink-900 transition-colors hover:border-denim-900 hover:bg-denim-900 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-denim-900"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-3 flex flex-1 flex-col">
        <p className="text-[11px] font-medium tracking-[0.12em] text-ink-400 uppercase">
          {product.gender === "masculino" ? "Masculino" : "Feminino"}
        </p>
        <h3 className="mt-1 text-sm font-medium text-ink-900">
          <Link href={`/produtos/${product.slug}`} className="hover:text-denim-700">
            {product.name}
          </Link>
        </h3>

        <div className="mt-2 flex items-baseline gap-2">
          {product.compareAt ? (
            <span className="text-xs text-ink-400 line-through">{formatPrice(product.compareAt)}</span>
          ) : null}
          <span className="text-base font-semibold text-ink-900">{formatPrice(product.price)}</span>
        </div>
        <p className="mt-0.5 text-xs text-ink-500">
          ou {installment.count}x de {formatPrice(installment.value)} sem juros
        </p>

        <div className="mt-2 flex items-center gap-1.5">
          {product.colors.map((color) => (
            <span
              key={color.name}
              title={color.name}
              className="size-3.5 rounded-full ring-1 ring-ink-200 ring-offset-1"
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
