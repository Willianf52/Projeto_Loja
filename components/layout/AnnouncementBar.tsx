const MESSAGES = [
  "Frete grátis na região a partir de R$ 299",
  "Até 6x sem juros no cartão",
  "5% de desconto no Pix",
  "Retire na loja em até 1 hora",
];

/** Barra superior com os avisos que rodam em loop no mobile. */
export function AnnouncementBar() {
  return (
    <div className="overflow-hidden bg-denim-950 py-2.5 text-[11px] font-medium tracking-[0.16em] text-denim-100 uppercase">
      <div className="hidden justify-center gap-8 px-4 sm:flex">
        {MESSAGES.map((message) => (
          <span key={message}>{message}</span>
        ))}
      </div>

      <div className="flex w-max animate-marquee gap-8 pl-4 sm:hidden">
        {[...MESSAGES, ...MESSAGES].map((message, index) => (
          <span key={`${message}-${index}`} className="whitespace-nowrap">
            {message}
          </span>
        ))}
      </div>
    </div>
  );
}
