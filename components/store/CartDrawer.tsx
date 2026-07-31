"use client";

import { useEffect } from "react";

import { useStore } from "@/components/store/StoreProvider";
import { BagIcon, CloseIcon } from "@/components/ui/icons";
import { buttonStyles } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";
import { WHATSAPP_MESSAGES, whatsappUrl } from "@/lib/store";

/** Monta a mensagem de checkout com os itens da sacola para o WhatsApp. */
function checkoutMessage(cart: ReturnType<typeof useStore>["cart"], total: number): string {
  const lines = cart.map(
    (item) => `• ${item.name} — tam. ${item.size} (x${item.quantity})`,
  );
  return [WHATSAPP_MESSAGES.general, "", "Minha sacola:", ...lines, "", `Total: ${formatPrice(total)}`].join(
    "\n",
  );
}

/** Sacola em slide-over lateral — abre a partir do ícone de sacola no header. */
export function CartDrawer() {
  const { cart, cartTotal, isCartOpen, closeCart, removeFromCart } = useStore();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeCart();
    }
    if (isCartOpen) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isCartOpen, closeCart]);

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Sacola">
      <button
        type="button"
        aria-label="Fechar sacola"
        onClick={closeCart}
        className="animate-overlay-in absolute inset-0 bg-ink-900/40"
      />

      <div className="animate-drawer-in absolute inset-y-0 right-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-ink-100 px-6 py-5">
          <h2 className="font-serif text-lg text-ink-900">Sua sacola</h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Fechar sacola"
            className="grid size-9 place-items-center rounded-full text-ink-500 transition-colors duration-200 ease-out hover:bg-ink-50 hover:text-ink-900"
          >
            <CloseIcon className="size-5" />
          </button>
        </div>

        {cart.length ? (
          <>
            <ul className="flex-1 overflow-y-auto px-6">
              {cart.map((item) => (
                <li
                  key={`${item.productId}-${item.size}`}
                  className="flex items-start justify-between gap-4 border-b border-ink-100 py-5"
                >
                  <div>
                    <p className="text-sm font-medium text-ink-900">{item.name}</p>
                    <p className="mt-1 text-xs tracking-wide text-ink-400 uppercase">
                      Tam. {item.size} · Qtd. {item.quantity}
                    </p>
                    <p className="mt-1.5 text-sm text-ink-900">{formatPrice(item.price)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.productId, item.size)}
                    className="shrink-0 text-xs font-medium text-ink-400 underline-offset-2 transition-colors duration-200 ease-out hover:text-denim-800 hover:underline"
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>

            <div className="border-t border-ink-100 px-6 py-6">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-ink-500">Subtotal</span>
                <span className="text-lg font-medium text-ink-900">{formatPrice(cartTotal)}</span>
              </div>
              <a
                href={whatsappUrl(checkoutMessage(cart, cartTotal))}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles({ variant: "primary", size: "lg", className: "mt-5 w-full" })}
              >
                Finalizar pelo WhatsApp
              </a>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <BagIcon className="size-8 text-ink-300" />
            <p className="text-sm text-ink-500">Sua sacola está vazia.</p>
          </div>
        )}
      </div>
    </div>
  );
}
