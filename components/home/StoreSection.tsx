import { Container } from "@/components/ui/Container";
import { buttonStyles } from "@/components/ui/Button";
import { ClockIcon, MapPinIcon, WhatsAppIcon } from "@/components/ui/icons";
import { STORE, WHATSAPP_MESSAGES, whatsappUrl } from "@/lib/store";

/** Bloco da loja física com endereço, horários e atalho para o WhatsApp. */
export function StoreSection() {
  return (
    <section id="loja" className="py-14 sm:py-20">
      <Container>
        <div className="grid overflow-hidden rounded-3xl bg-denim-900 text-white lg:grid-cols-2">
          <div className="p-8 sm:p-12">
            <p className="text-xs font-semibold tracking-[0.2em] text-denim-300 uppercase">
              Loja física
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Prove, ajuste e leve na hora
            </h2>
            <p className="mt-3 max-w-md text-sm text-denim-100/85">
              Nosso time ajuda você a encontrar a modelagem certa. Reserve a peça
              pelo WhatsApp e retire no mesmo dia.
            </p>

            <dl className="mt-8 space-y-5 text-sm">
              <div className="flex gap-3">
                <MapPinIcon className="mt-0.5 size-5 shrink-0 text-denim-300" />
                <div>
                  <dt className="font-semibold">Endereço</dt>
                  <dd className="text-denim-100/85">{STORE.address.full}</dd>
                </div>
              </div>
              <div className="flex gap-3">
                <ClockIcon className="mt-0.5 size-5 shrink-0 text-denim-300" />
                <div>
                  <dt className="font-semibold">Horários</dt>
                  {STORE.hours.map((hour) => (
                    <dd key={hour.label} className="text-denim-100/85">
                      {hour.label}: {hour.value}
                    </dd>
                  ))}
                </div>
              </div>
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappUrl(WHATSAPP_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles({ variant: "whatsapp" })}
              >
                <WhatsAppIcon className="size-5" />
                {STORE.whatsapp.display}
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(STORE.address.full)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles({ variant: "outlineLight" })}
              >
                Como chegar
              </a>
            </div>
          </div>

          {/* Placeholder do mapa/fachada até a foto oficial entrar. */}
          <div
            className="relative min-h-64 lg:min-h-full"
            style={{
              backgroundImage:
                "radial-gradient(90% 70% at 30% 20%, #3f6faa 0%, transparent 60%), linear-gradient(140deg, #253d60 0%, #131d31 100%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, #fff 0 1px, transparent 1px 6px)",
              }}
            />
            <div className="absolute inset-0 grid place-items-center p-8 text-center">
              <div>
                <MapPinIcon className="mx-auto size-8 text-denim-200" />
                <p className="mt-3 text-sm font-medium text-denim-100">{STORE.address.full}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
