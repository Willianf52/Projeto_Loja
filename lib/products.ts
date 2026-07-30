export type Gender = "masculino" | "feminino";

export type ProductColor = {
  name: string;
  /** Cor de amostra exibida no card e na PDP. */
  hex: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  gender: Gender;
  /** Agrupamento do menu: jeans, camisetas, camisas, vestidos... */
  family: string;
  price: number;
  /** Preço "de", usado para calcular o desconto. */
  compareAt?: number;
  sizes: string[];
  colors: ProductColor[];
  tags: Array<"lancamento" | "mais-vendido" | "oferta">;
  /**
   * Enquanto o catálogo de fotos não é conectado, cada produto tem duas
   * composições de cor que fazem o efeito de troca de imagem no hover.
   * Ao plugar o CMS, basta preencher `images` que a foto real assume.
   */
  swatch: { front: string; back: string };
  images?: string[];
};

export const SIZES_CLOTHING = ["P", "M", "G", "GG"];
export const SIZES_DENIM = ["36", "38", "40", "42", "44", "46"];

export const PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "calca-jeans-skinny-indigo-escuro",
    name: "Calça Jeans Skinny Índigo Escuro",
    gender: "feminino",
    family: "jeans",
    price: 249.9,
    compareAt: 319.9,
    sizes: SIZES_DENIM,
    colors: [
      { name: "Índigo escuro", hex: "#25406b" },
      { name: "Preto lavado", hex: "#2b2b30" },
    ],
    tags: ["mais-vendido", "oferta"],
    swatch: { front: "#2a4a78", back: "#1d3557" },
  },
  {
    id: "2",
    slug: "calca-jeans-reta-masculina-stone",
    name: "Calça Jeans Reta Masculina Stone",
    gender: "masculino",
    family: "jeans",
    price: 229.9,
    sizes: SIZES_DENIM,
    colors: [
      { name: "Stone", hex: "#6f8db4" },
      { name: "Índigo médio", hex: "#3c5f8f" },
    ],
    tags: ["mais-vendido"],
    swatch: { front: "#5b7ea8", back: "#40628d" },
  },
  {
    id: "3",
    slug: "jaqueta-jeans-oversized",
    name: "Jaqueta Jeans Oversized",
    gender: "feminino",
    family: "jaquetas",
    price: 329.9,
    compareAt: 389.9,
    sizes: SIZES_CLOTHING,
    colors: [
      { name: "Azul claro", hex: "#8fb0d3" },
      { name: "Índigo", hex: "#33507d" },
    ],
    tags: ["lancamento", "oferta"],
    swatch: { front: "#7ea3c9", back: "#4a6f9d" },
  },
  {
    id: "4",
    slug: "camisa-jeans-manga-longa",
    name: "Camisa Jeans Manga Longa",
    gender: "masculino",
    family: "camisas",
    price: 199.9,
    sizes: SIZES_CLOTHING,
    colors: [
      { name: "Azul médio", hex: "#4f74a3" },
      { name: "Areia", hex: "#c8b8a1" },
    ],
    tags: ["lancamento"],
    swatch: { front: "#4f74a3", back: "#6c8cb4" },
  },
  {
    id: "5",
    slug: "short-jeans-cintura-alta",
    name: "Short Jeans Cintura Alta",
    gender: "feminino",
    family: "jeans",
    price: 159.9,
    compareAt: 199.9,
    sizes: SIZES_DENIM,
    colors: [
      { name: "Delavê", hex: "#9db8d6" },
      { name: "Branco", hex: "#eef1f5" },
    ],
    tags: ["mais-vendido", "oferta"],
    swatch: { front: "#93b2d4", back: "#6d90b8" },
  },
  {
    id: "6",
    slug: "camiseta-basica-algodao-pima",
    name: "Camiseta Básica Algodão Pima",
    gender: "masculino",
    family: "camisetas",
    price: 89.9,
    sizes: SIZES_CLOTHING,
    colors: [
      { name: "Off white", hex: "#f2efe9" },
      { name: "Grafite", hex: "#3a3f47" },
      { name: "Marinho", hex: "#1f2f4d" },
    ],
    tags: ["mais-vendido"],
    swatch: { front: "#3a3f47", back: "#1f2f4d" },
  },
  {
    id: "7",
    slug: "vestido-jeans-midi",
    name: "Vestido Jeans Midi",
    gender: "feminino",
    family: "vestidos",
    price: 289.9,
    sizes: SIZES_CLOTHING,
    colors: [
      { name: "Índigo", hex: "#2f4f7c" },
      { name: "Azul claro", hex: "#8db1d5" },
    ],
    tags: ["lancamento"],
    swatch: { front: "#2f4f7c", back: "#4d719d" },
  },
  {
    id: "8",
    slug: "bermuda-jeans-masculina-slim",
    name: "Bermuda Jeans Masculina Slim",
    gender: "masculino",
    family: "jeans",
    price: 179.9,
    compareAt: 209.9,
    sizes: SIZES_DENIM,
    colors: [
      { name: "Azul médio", hex: "#5a7fae" },
      { name: "Escuro", hex: "#28405f" },
    ],
    tags: ["oferta"],
    swatch: { front: "#5a7fae", back: "#3b5c85" },
  },
];

export function getBestSellers(limit = 8): Product[] {
  return PRODUCTS.filter((p) => p.tags.includes("mais-vendido")).slice(0, limit);
}

export function getNewArrivals(limit = 8): Product[] {
  return PRODUCTS.filter((p) => p.tags.includes("lancamento")).slice(0, limit);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export type ProductFilters = {
  genero?: string;
  familia?: string;
  tag?: string;
  busca?: string;
};

/** Filtro base do catálogo — compartilhado pela PLP e pela busca do header. */
export function filterProducts(filters: ProductFilters): Product[] {
  const term = filters.busca?.trim().toLowerCase();

  return PRODUCTS.filter((product) => {
    if (filters.genero && product.gender !== filters.genero) return false;
    if (filters.familia && product.family !== filters.familia) return false;
    if (filters.tag && !product.tags.includes(filters.tag as Product["tags"][number])) return false;
    if (term && !`${product.name} ${product.family}`.toLowerCase().includes(term)) return false;
    return true;
  });
}
