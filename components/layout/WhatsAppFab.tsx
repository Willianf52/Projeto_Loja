import { WhatsAppIcon } from "@/components/ui/icons";
import { STORE, WHATSAPP_MESSAGES, whatsappUrl } from "@/lib/store";

/** Botão flutuante de atendimento, presente em todas as páginas da loja. */
export function WhatsAppFab() {
  return (
    <a
      href={whatsappUrl(WHATSAPP_MESSAGES.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Falar com a loja no WhatsApp ${STORE.whatsapp.display}`}
      className="group fixed right-4 bottom-4 z-40 flex items-center gap-3 rounded-full bg-[#25d366] py-3 pr-5 pl-3 text-sm font-medium text-[#0b3b1e] shadow-lg shadow-black/15 transition-transform duration-200 ease-out hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25d366] sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-6" />
      <span className="hidden sm:inline">Fale conosco</span>
    </a>
  );
}
