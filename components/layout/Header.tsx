"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Logo } from "@/components/layout/Logo";
import { SearchField } from "@/components/layout/SearchField";
import { useStore } from "@/components/store/StoreProvider";
import { Container } from "@/components/ui/Container";
import {
  BagIcon,
  CloseIcon,
  HeartIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { MAIN_NAV } from "@/lib/navigation";

export function Header() {
  const { cartCount, favorites, openCart } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Bloqueia o scroll do fundo enquanto o menu mobile está aberto.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <AnnouncementBar />

      <div className="border-b border-ink-100">
        <Container>
          <div className="flex h-20 items-center gap-5">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
              className="grid size-10 place-items-center rounded-full text-ink-700 transition-colors duration-200 ease-out hover:bg-ink-100 lg:hidden"
            >
              <MenuIcon className="size-6" />
            </button>

            <Logo className="shrink-0" />

            <SearchField className="hidden flex-1 lg:block" />

            <div className="ml-auto flex items-center gap-1 lg:ml-0">
              <button
                type="button"
                onClick={() => setSearchOpen((open) => !open)}
                aria-label="Buscar"
                aria-expanded={searchOpen}
                className="grid size-10 place-items-center rounded-full text-ink-700 transition-colors duration-200 ease-out hover:bg-ink-100 lg:hidden"
              >
                <SearchIcon className="size-5" />
              </button>

              <Link
                href="/conta"
                className="hidden size-10 place-items-center rounded-full text-ink-700 transition-colors duration-200 ease-out hover:bg-ink-100 sm:grid"
                aria-label="Minha conta"
              >
                <UserIcon className="size-5" />
              </Link>

              <Link
                href="/favoritos"
                className="relative grid size-10 place-items-center rounded-full text-ink-700 transition-colors duration-200 ease-out hover:bg-ink-100"
                aria-label={`Favoritos (${favorites.length})`}
              >
                <HeartIcon className="size-5" />
                <Counter value={favorites.length} />
              </Link>

              <button
                type="button"
                onClick={openCart}
                className="relative grid size-10 place-items-center rounded-full text-ink-700 transition-colors duration-200 ease-out hover:bg-ink-100"
                aria-label={`Abrir sacola (${cartCount})`}
              >
                <BagIcon className="size-5" />
                <Counter value={cartCount} />
              </button>
            </div>
          </div>

          <div
            className={cn(
              "grid transition-[grid-template-rows,opacity] duration-200 ease-out lg:hidden",
              searchOpen ? "grid-rows-[1fr] pb-4 opacity-100" : "grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="overflow-hidden">
              <SearchField autoFocus={searchOpen} onSubmitted={() => setSearchOpen(false)} />
            </div>
          </div>
        </Container>
      </div>

      {/* Navegação principal (desktop) */}
      <nav aria-label="Categorias" className="hidden border-b border-ink-100 lg:block">
        <Container>
          <ul className="flex items-center gap-10">
            {MAIN_NAV.map((item) => (
              <li key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className={cn(
                    "flex h-14 items-center text-xs font-medium tracking-[0.18em] uppercase transition-colors duration-200 ease-out",
                    item.label === "Ofertas"
                      ? "text-denim-600 hover:text-denim-900"
                      : "text-ink-700 hover:text-denim-900",
                  )}
                >
                  {item.label}
                </Link>

                {item.children ? (
                  <div className="invisible absolute top-full left-0 z-10 w-56 -translate-y-1 bg-white p-2 opacity-0 shadow-[0_16px_40px_-12px_rgb(0_0_0/0.15)] transition-[opacity,transform,visibility] duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <ul>
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={child.href}
                            className="block px-3 py-2 text-sm text-ink-700 transition-colors duration-200 ease-out hover:bg-ink-50 hover:text-denim-900"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}

function Counter({ value }: { value: number }) {
  if (value <= 0) return null;
  return (
    <span
      key={value}
      className="animate-heart-pop absolute top-1 right-1 grid min-w-4.5 place-items-center rounded-full bg-denim-900 px-1 text-[10px] font-semibold text-white"
    >
      {value > 9 ? "9+" : value}
    </span>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      className={cn("fixed inset-0 z-50 lg:hidden", !open && "pointer-events-none")}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Fechar menu"
        onClick={onClose}
        tabIndex={open ? 0 : -1}
        className={cn(
          "absolute inset-0 bg-ink-900/40 transition-opacity duration-200 ease-out",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        className={cn(
          "relative flex h-full w-[85%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out will-change-transform",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-ink-100 px-6 py-5">
          <Logo />
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar menu"
            tabIndex={open ? 0 : -1}
            className="grid size-10 place-items-center rounded-full text-ink-700 transition-colors duration-200 ease-out hover:bg-ink-100"
          >
            <CloseIcon className="size-6" />
          </button>
        </div>

        <nav aria-label="Menu" className="flex-1 overflow-y-auto px-6 py-5">
          <ul className="space-y-1">
            {MAIN_NAV.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  tabIndex={open ? 0 : -1}
                  className="block py-2.5 text-sm font-medium tracking-[0.14em] text-ink-900 uppercase"
                >
                  {item.label}
                </Link>
                {item.children ? (
                  <ul className="mb-2 ml-1 space-y-1 border-l border-ink-100 pl-4">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          onClick={onClose}
                          tabIndex={open ? 0 : -1}
                          className="block py-1.5 text-sm text-ink-500 transition-colors duration-200 ease-out hover:text-denim-900"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-ink-100 px-6 py-5">
          <Link
            href="/conta"
            onClick={onClose}
            tabIndex={open ? 0 : -1}
            className="flex items-center gap-2 text-sm font-medium text-ink-700"
          >
            <UserIcon className="size-5" />
            Minha conta
          </Link>
        </div>
      </div>
    </div>
  );
}
