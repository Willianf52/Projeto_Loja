import Image from "next/image";

import { cn } from "@/lib/cn";
import type { Product } from "@/lib/products";

function gradient(from: string, to: string) {
  return `linear-gradient(150deg, ${from} 0%, ${to} 55%, ${from} 100%)`;
}

/**
 * Área visual do produto com troca de composição no hover do card.
 * Enquanto não há fotos cadastradas, renderiza um placeholder de tecido
 * derivado das cores do produto; com `images`, usa as fotos reais.
 */
export function ProductMedia({ product, className }: { product: Product; className?: string }) {
  const [front, back] = product.images ?? [];

  return (
    <div className={cn("relative overflow-hidden bg-ink-100", className)}>
      <div
        className="absolute inset-0 transition-[opacity,transform] duration-[420ms] ease-out group-hover:scale-[1.03] group-hover:opacity-0"
        style={front ? undefined : { backgroundImage: gradient(product.swatch.front, product.swatch.back) }}
      >
        {front ? (
          <Image
            src={front}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : null}
      </div>

      <div
        className="absolute inset-0 scale-[1.03] opacity-0 transition-[opacity,transform] duration-[420ms] ease-out group-hover:scale-100 group-hover:opacity-100"
        style={back ? undefined : { backgroundImage: gradient(product.swatch.back, product.swatch.front) }}
      >
        {back ? (
          <Image
            src={back}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : null}
      </div>

      {/* Textura sutil de denim sobre o placeholder. */}
      {front ? null : (
        <div
          className="pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(255,255,255,.35) 0 1px, transparent 1px 4px)",
          }}
        />
      )}
    </div>
  );
}
