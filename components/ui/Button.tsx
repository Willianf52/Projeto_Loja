import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps } from "react";

import { cn } from "@/lib/cn";

type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "whatsapp"
  /** Sobre fundos escuros (hero, seção da loja). */
  | "light"
  | "outlineLight";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-denim-900 text-white hover:bg-denim-800 focus-visible:outline-denim-900",
  secondary: "bg-ink-100 text-ink-900 hover:bg-ink-200 focus-visible:outline-ink-900",
  outline:
    "border border-ink-200 bg-white text-ink-900 hover:border-denim-900 hover:text-denim-900 focus-visible:outline-denim-900",
  ghost: "text-ink-700 hover:bg-ink-100 hover:text-ink-900 focus-visible:outline-ink-900",
  whatsapp: "bg-[#25d366] text-[#0b3b1e] hover:bg-[#1fbb59] focus-visible:outline-[#25d366]",
  light: "bg-white text-denim-950 hover:bg-denim-100 focus-visible:outline-white",
  outlineLight:
    "border border-white/40 text-white hover:border-white hover:bg-white/10 focus-visible:outline-white",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-4 text-[11px]",
  md: "h-11 px-6 text-[13px]",
  lg: "h-13 px-8 text-[13px]",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[0.1em] uppercase",
    "transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    VARIANTS[variant],
    SIZES[size],
    className,
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={buttonStyles({ variant, size, className })} {...props} />;
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
};

export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <Link className={buttonStyles({ variant, size, className })} {...props} />;
}
