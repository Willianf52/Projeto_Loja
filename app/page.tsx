import { Benefits } from "@/components/home/Benefits";
import { CategoryTiles } from "@/components/home/CategoryTiles";
import { Hero } from "@/components/home/Hero";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { StoreSection } from "@/components/home/StoreSection";
import { getBestSellers, getNewArrivals } from "@/lib/products";

export default function HomePage() {
  const tabs = [
    {
      id: "mais-vendidos",
      label: "Mais vendidos",
      href: "/produtos",
      products: getBestSellers(),
    },
    {
      id: "lancamentos",
      label: "Lançamentos",
      href: "/produtos?tag=lancamento",
      products: getNewArrivals(),
    },
  ];

  return (
    <>
      <Hero />
      <CategoryTiles />
      <ProductShowcase tabs={tabs} />
      <Benefits />
      <StoreSection />
    </>
  );
}
