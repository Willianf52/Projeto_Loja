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
  const { cartCount, favorites } = useStore();
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

      <div className="border-b border-ink-200">
        <Container>
          <div className="flex h-18 items-center gap-4">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
              className="grid size-10 place-items-center rounded-full text-ink-700 hover:bg-ink-100 lg:hidden"
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
                className="grid size-10 place-items-center rounded-full text-ink-700 hover:bg-ink-100 lg:hidden"
              >
                <SearchIcon className="size-5" />
              </button>

              <Link
                href="/conta"
                className="hidden size-10 place-items-center rounded-full text-ink-700 hover:bg-ink-100 sm:grid"
                aria-label="Minha conta"
              >
                <UserIcon className="size-5" />
              </Link>

              <Link
                href="/favoritos"
                className="relative grid size-10 place-items-center rounded-full text-ink-700 hover:bg-ink-100"
                aria-label={`Favoritos (${favorites.length})`}
              >
                <HeartIcon className="size-5" />
                <Counter value={favorites.length} />
              </Link>

              <Link
                href="/sacola"
                className="relative grid size-10 place-items-center rounded-full text-ink-700 hover:bg-ink-100"
                aria-label={`Sacola (${cartCount})`}
              >
                <BagIcon className="size-5" />
                <Counter value={cartCount} />
              </Link>
            </div>
          </div>

          {searchOpen ? (
            <div className="pb-4 lg:hidden">
              <SearchField autoFocus onSubmitted={() => setSearchOpen(false)} />
            </div>
          ) : null}
        </Container>
      </div>

      {/* Navegação principal (desktop) */}
      <nav aria-label="Categorias" className="hidden border-b border-ink-200 lg:block">
        <Container>
          <ul className="flex items-center gap-8">
            {MAIN_NAV.map((item) => (
              <li key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className={cn(
                    "flex h-12 items-center text-xs font-semibold tracking-[0.14em] uppercase transition-colors",
                    item.label === "Ofertas"
                      ? "text-denim-600 hover:text-denim-900"
                      : "text-ink-700 hover:text-denim-900",
                  )}
                >
                  {item.label}
                </Link>

                {item.children ? (
                  <div className="invisible absolute top-full left-0 z-10 w-56 rounded-b-xl border border-ink-200 border-t-0 bg-white p-2 opacity-0 shadow-lg transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <ul>
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={child.href}
                            className="block rounded-lg px-3 py-2 text-sm text-ink-700 hover:bg-ink-50 hover:text-denim-900"
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

      {menuOpen ? <MobileMenu onClose={() => setMenuOpen(false)} /> : null}
    </header>
  );
}

function Counter({ value }: { value: number }) {
  if (value <= 0) return null;
  return (
    <span className="absolute top-1 right-1 grid min-w-4.5 place-items-center rounded-full bg-denim-900 px-1 text-[10px] font-semibold text-white">
      {value > 9 ? "9+" : value}
    </span>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label="Fechar menu"
        onClick={onClose}
        className="absolute inset-0 bg-ink-900/40"
      />

      <div className="relative flex h-full w-[85%] max-w-sm flex-col bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-ink-200 px-5 py-4">
          <Logo />
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar menu"
            className="grid size-10 place-items-center rounded-full text-ink-700 hover:bg-ink-100"
          >
            <CloseIcon className="size-6" />
          </button>
        </div>

        <nav aria-label="Menu" className="flex-1 overflow-y-auto px-5 py-4">
          <ul className="space-y-1">
            {MAIN_NAV.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block py-2.5 text-sm font-semibold tracking-[0.12em] text-ink-900 uppercase"
                >
                  {item.label}
                </Link>
                {item.children ? (
                  <ul className="mb-2 ml-1 space-y-1 border-l border-ink-200 pl-4">
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          onClick={onClose}
                          className="block py-1.5 text-sm text-ink-500 hover:text-denim-900"
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

        <div className="border-t border-ink-200 px-5 py-4">
          <Link
            href="/conta"
            onClick={onClose}
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
