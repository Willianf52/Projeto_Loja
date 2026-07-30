/**
 * Dados institucionais da loja usados em toda a aplicação.
 * Ponto único de verdade: endereço, contato e links de atendimento.
 */
export const STORE = {
  name: "Espaço Jeans",
  tagline: "Jeanswear e vestuário para eles e elas",
  address: {
    street: "Av. Paulo Antunes Moreira, 149",
    full: "Av. Paulo Antunes Moreira, 149",
  },
  hours: [
    { label: "Segunda a sexta", value: "09h às 18h" },
    { label: "Sábado", value: "09h às 13h" },
  ],
  whatsapp: {
    display: "(15) 99700-4586",
    /** Formato internacional exigido pelo wa.me (sem espaços ou símbolos). */
    e164: "5515997004586",
  },
  instagram: "@espacojeans",
} as const;

/** Monta o link de atendimento do WhatsApp já com a mensagem codificada. */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${STORE.whatsapp.e164}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_MESSAGES = {
  general: `Olá, ${STORE.name}! Vim pelo site e gostaria de tirar uma dúvida.`,
  sizeHelp: `Olá, ${STORE.name}! Preciso de ajuda para escolher o tamanho.`,
  delivery: `Olá, ${STORE.name}! Gostaria de saber sobre entrega para a minha região.`,
} as const;
