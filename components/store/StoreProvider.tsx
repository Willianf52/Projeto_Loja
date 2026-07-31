"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
};

type StoreState = {
  cart: CartItem[];
  favorites: string[];
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeFromCart: (productId: string, size: string) => void;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  openCart: () => void;
  closeCart: () => void;
};

const StoreContext = createContext<StoreState | null>(null);

const CART_KEY = "espaco-jeans:cart";
const FAVORITES_KEY = "espaco-jeans:favorites";

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Estado de sacola e favoritos persistido no localStorage.
 * Serve de ponte até a integração com o checkout/back-end.
 */
export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);

  // Hidrata depois da montagem para não divergir do HTML renderizado no servidor.
  useEffect(() => {
    setCart(readStorage<CartItem[]>(CART_KEY, []));
    setFavorites(readStorage<string[]>(FAVORITES_KEY, []));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = useCallback<StoreState["addToCart"]>((item) => {
    const quantity = item.quantity ?? 1;
    setCart((current) => {
      const index = current.findIndex(
        (entry) => entry.productId === item.productId && entry.size === item.size,
      );
      if (index === -1) return [...current, { ...item, quantity }];

      const next = [...current];
      next[index] = { ...next[index], quantity: next[index].quantity + quantity };
      return next;
    });
  }, []);

  const removeFromCart = useCallback<StoreState["removeFromCart"]>((productId, size) => {
    setCart((current) =>
      current.filter((entry) => !(entry.productId === productId && entry.size === size)),
    );
  }, []);

  const toggleFavorite = useCallback<StoreState["toggleFavorite"]>((productId) => {
    setFavorites((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  }, []);

  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  const value = useMemo<StoreState>(() => {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return {
      cart,
      favorites,
      cartCount,
      cartTotal,
      isCartOpen,
      addToCart,
      removeFromCart,
      toggleFavorite,
      isFavorite: (productId) => favorites.includes(productId),
      openCart,
      closeCart,
    };
  }, [cart, favorites, isCartOpen, addToCart, removeFromCart, toggleFavorite, openCart, closeCart]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreState {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore precisa estar dentro de <StoreProvider>.");
  return context;
}
