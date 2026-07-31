import Link from "next/link";

import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/ui/Container";
import {
  ClockIcon,
  InstagramIcon,
  MapPinIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import { FOOTER_NAV } from "@/lib/navigation";
import { STORE, WHATSAPP_MESSAGES, whatsappUrl } from "@/lib/store";

const PAYMENTS = ["Pix", "Visa", "Master", "Elo", "Amex", "Boleto"];

export function Footer() {
  return (
    <footer id="contato" className="mt-24 bg-denim-950 text-denim-100">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_repeat(3,1fr)]">
          <div>
            <Logo inverted />
            <p className="mt-4 max-w-xs text-sm text-denim-200/80">{STORE.tagline}</p>

            <address className="mt-6 space-y-3 text-sm not-italic">
              <p className="flex items-start gap-3">
                <MapPinIcon className="mt-0.5 size-5 shrink-0 text-denim-300" />
                <span>{STORE.address.full}</span>
              </p>
              <p className="flex items-start gap-3">
                <WhatsAppIcon className="mt-0.5 size-5 shrink-0 text-[#25d366]" />
                <a
                  href={whatsappUrl(WHATSAPP_MESSAGES.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 ease-out hover:text-white"
                >
                  {STORE.whatsapp.display}
                </a>
              </p>
              <p className="flex items-start gap-3">
                <ClockIcon className="mt-0.5 size-5 shrink-0 text-denim-300" />
                <span className="space-y-0.5">
                  {STORE.hours.map((hour) => (
                    <span key={hour.label} className="block text-denim-200/80">
                      {hour.label}: {hour.value}
                    </span>
                  ))}
                </span>
              </p>
            </address>

            <a
              href={`https://instagram.com/${STORE.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm text-denim-200/80 transition-colors duration-200 ease-out hover:text-white"
            >
              <InstagramIcon className="size-5" />
              {STORE.instagram}
            </a>
          </div>

          {FOOTER_NAV.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="text-xs font-medium tracking-[0.2em] text-white uppercase">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-denim-200/80 transition-colors duration-200 ease-out hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-white uppercase">
              Formas de pagamento
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {PAYMENTS.map((payment) => (
                <li
                  key={payment}
                  className="rounded-md border border-white/15 px-2.5 py-1 text-[11px] font-medium text-denim-100"
                >
                  {payment}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-denim-200/70">
            © {new Date().getFullYear()} {STORE.name}. Todos os direitos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}
