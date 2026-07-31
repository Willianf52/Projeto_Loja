import { Container } from "@/components/ui/Container";
import {
  CreditCardIcon,
  StoreIcon,
  TruckIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import { STORE } from "@/lib/store";

const BENEFITS = [
  {
    icon: TruckIcon,
    title: "Envio para a região",
    description: "Entrega rápida na cidade e frete grátis acima de R$ 299.",
  },
  {
    icon: CreditCardIcon,
    title: "Pagamento facilitado",
    description: "Até 6x sem juros no cartão e 5% de desconto no Pix.",
  },
  {
    icon: WhatsAppIcon,
    title: "Atendimento no WhatsApp",
    description: `Tire dúvidas e finalize a compra pelo ${STORE.whatsapp.display}.`,
  },
  {
    icon: StoreIcon,
    title: "Retire na loja",
    description: `Compre online e retire na ${STORE.address.street}.`,
  },
];

export function Benefits() {
  return (
    <section id="diferenciais" className="border-y border-ink-200 bg-ink-50 py-12 sm:py-14">
      <Container>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit) => (
            <li key={benefit.title} className="flex gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full border border-ink-200 text-denim-700">
                <benefit.icon className="size-5" />
              </span>
              <div>
                <h3 className="text-sm font-medium text-ink-900">{benefit.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{benefit.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
