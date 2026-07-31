import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SparkleIcon } from "@/components/ui/icons";

const HIGHLIGHTS = [
  "Novos modelos toda semana",
  "Numeração do 36 ao 46",
  "Provador na loja física",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-denim-950 text-white">
      {/* Fundo em camadas de índigo */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(120% 90% at 85% 10%, #3f6faa 0%, transparent 55%), linear-gradient(160deg, #131d31 0%, #1f2f4d 55%, #253d60 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fff 0 1px, transparent 1px 5px), repeating-linear-gradient(-45deg, #fff 0 1px, transparent 1px 7px)",
        }}
      />

      <Container className="relative py-16 sm:py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-medium tracking-[0.2em] uppercase backdrop-blur-sm">
              <SparkleIcon className="size-3.5" />
              Coleção Inverno 2026
            </p>

            <h1 className="mt-7 font-serif text-5xl leading-[1.08] font-medium tracking-tight sm:text-6xl lg:text-7xl">
              O jeans que veste
              <span className="block text-denim-300 italic">o seu dia inteiro.</span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-denim-100/85">
              Lavagens exclusivas, modelagens que assentam de verdade e peças
              masculinas e femininas para montar o look completo.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/produtos?tag=lancamento" size="lg" variant="light">
                Ver lançamentos
              </ButtonLink>
              <ButtonLink href="/produtos?familia=jeans" size="lg" variant="outlineLight">
                Explorar jeans
              </ButtonLink>
            </div>

            <ul className="mt-11 flex flex-wrap gap-x-8 gap-y-3 text-sm text-denim-100/80">
              {HIGHLIGHTS.map((highlight) => (
                <li key={highlight} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-denim-300" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          {/* Composição visual: mosaico de lavagens do denim */}
          <div className="relative hidden aspect-[4/5] w-full lg:block">
            <div className="absolute inset-0 flex gap-4">
              <div className="flex flex-1 flex-col gap-4">
                <div className="flex-[2] rounded-3xl bg-gradient-to-br from-[#5b7ea8] to-[#28405f] shadow-xl shadow-black/20" />
                <div className="flex-1 rounded-3xl bg-gradient-to-br from-[#93b2d4] to-[#4f74a3] shadow-xl shadow-black/20" />
              </div>
              <div className="flex flex-1 flex-col gap-4 pt-10">
                <div className="flex-1 rounded-3xl bg-gradient-to-br from-[#c6d8ec] to-[#6390c4] shadow-xl shadow-black/20" />
                <div className="flex-[2] rounded-3xl bg-gradient-to-br from-[#2f4f7c] to-[#131d31] shadow-xl shadow-black/20" />
              </div>
            </div>

            <div className="absolute -bottom-2 left-1/2 w-max -translate-x-1/2 rounded-2xl bg-white px-6 py-4 text-center shadow-xl">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-ink-400 uppercase">
                Até
              </p>
              <p className="text-2xl font-semibold text-denim-900">40% OFF</p>
              <p className="text-xs text-ink-500">em peças selecionadas</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
