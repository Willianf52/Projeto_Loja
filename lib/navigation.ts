export type NavItem = {
  label: string;
  href: string;
  /** Links exibidos no mega menu / drawer mobile. */
  children?: Array<{ label: string; href: string }>;
};

export const MAIN_NAV: NavItem[] = [
  {
    label: "Masculino",
    href: "/produtos?genero=masculino",
    children: [
      { label: "Calças jeans", href: "/produtos?genero=masculino&familia=jeans" },
      { label: "Camisas", href: "/produtos?genero=masculino&familia=camisas" },
      { label: "Camisetas", href: "/produtos?genero=masculino&familia=camisetas" },
      { label: "Bermudas", href: "/produtos?genero=masculino&familia=jeans" },
    ],
  },
  {
    label: "Feminino",
    href: "/produtos?genero=feminino",
    children: [
      { label: "Calças jeans", href: "/produtos?genero=feminino&familia=jeans" },
      { label: "Vestidos", href: "/produtos?genero=feminino&familia=vestidos" },
      { label: "Jaquetas", href: "/produtos?genero=feminino&familia=jaquetas" },
      { label: "Shorts", href: "/produtos?genero=feminino&familia=jeans" },
    ],
  },
  { label: "Lançamentos", href: "/produtos?tag=lancamento" },
  { label: "Jeans", href: "/produtos?familia=jeans" },
  { label: "Ofertas", href: "/produtos?tag=oferta" },
];

export const FOOTER_NAV = [
  {
    title: "Institucional",
    links: [
      { label: "Sobre a loja", href: "/sobre" },
      { label: "Nossa loja física", href: "/#loja" },
      { label: "Política de privacidade", href: "/politicas/privacidade" },
      { label: "Trocas e devoluções", href: "/politicas/trocas" },
    ],
  },
  {
    title: "Comprar",
    links: [
      { label: "Masculino", href: "/produtos?genero=masculino" },
      { label: "Feminino", href: "/produtos?genero=feminino" },
      { label: "Lançamentos", href: "/produtos?tag=lancamento" },
      { label: "Ofertas", href: "/produtos?tag=oferta" },
    ],
  },
  {
    title: "Ajuda",
    links: [
      { label: "Guia de medidas", href: "/guia-de-medidas" },
      { label: "Formas de pagamento", href: "/#diferenciais" },
      { label: "Entrega e frete", href: "/#diferenciais" },
      { label: "Fale conosco", href: "/#contato" },
    ],
  },
];
