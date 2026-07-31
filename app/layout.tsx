import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";

import { CartDrawer } from "@/components/store/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { StoreProvider } from "@/components/store/StoreProvider";
import { STORE } from "@/lib/store";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

/** Serif editorial usada nos títulos — contraste de alta costura com o corpo em Inter. */
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: `${STORE.name} — Jeanswear masculino e feminino`,
    template: `%s | ${STORE.name}`,
  },
  description: `${STORE.tagline}. Loja em ${STORE.address.full}. Atendimento pelo WhatsApp ${STORE.whatsapp.display}.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${fraunces.variable} antialiased`}>
        <StoreProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppFab />
          <CartDrawer />
        </StoreProvider>
      </body>
    </html>
  );
}
