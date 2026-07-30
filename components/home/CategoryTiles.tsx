import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { ArrowRightIcon } from "@/components/ui/icons";

const CATEGORIES = [
  {
    label: "Feminino",
    description: "Calças, vestidos e jaquetas",
    href: "/produtos?genero=feminino",
    gradient: "linear-gradient(150deg, #4f74a3 0%, #1f2f4d 100%)",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    label: "Masculino",
    description: "Retas, slim e camisaria",
    href: "/produtos?genero=masculino",
    gradient: "linear-gradient(150deg, #2f588e 0%, #131d31 100%)",
    span: "sm:col-span-2",
  },
  {
    label: "Jeans",
    description: "Do 36 ao 46",
    href: "/produtos?familia=jeans",
    gradient: "linear-gradient(150deg, #6390c4 0%, #284873 100%)",
    span: "",
  },
  {
    label: "Lançamentos",
    description: "Chegou essa semana",
    href: "/produtos?tag=lancamento",
    gradient: "linear-gradient(150deg, #98b7db 0%, #2f588e 100%)",
    span: "",
  },
];

export function CategoryTiles() {
  return (
    <section className="py-14 sm:py-16">
      <Container>
        <div className="grid auto-rows-[168px] grid-cols-2 gap-4 sm:grid-cols-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.label}
              href={category.href}
              className={`group relative flex flex-col justify-end overflow-hidden rounded-2xl p-5 text-white ${category.span}`}
              style={{ backgroundImage: category.gradient }}
            >
              <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/25" />
              <div className="relative">
                <h3 className="text-lg font-semibold tracking-tight sm:text-xl">{category.label}</h3>
                <p className="mt-0.5 text-xs text-white/80">{category.description}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase">
                  Comprar
                  <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
