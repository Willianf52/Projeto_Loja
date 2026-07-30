const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

/** Formata um valor em reais: 199.9 -> "R$ 199,90". */
export function formatPrice(value: number): string {
  return brl.format(value);
}

/** Percentual de desconto arredondado entre o preço cheio e o preço atual. */
export function discountPercent(price: number, compareAt?: number): number | null {
  if (!compareAt || compareAt <= price) return null;
  return Math.round(((compareAt - price) / compareAt) * 100);
}

export type Installment = { count: number; value: number };

/**
 * Calcula o maior parcelamento sem juros respeitando um valor mínimo por parcela.
 * Ex.: 249,90 em até 6x com mínimo de R$ 30 -> 6x de R$ 41,65.
 */
export function bestInstallment(
  price: number,
  { max = 6, minValue = 30 }: { max?: number; minValue?: number } = {},
): Installment {
  const count = Math.max(1, Math.min(max, Math.floor(price / minValue)));
  return { count, value: price / count };
}

/** Preço à vista com desconto no Pix. */
export function pixPrice(price: number, discount = 0.05): number {
  return price * (1 - discount);
}
