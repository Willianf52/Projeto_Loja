import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
      <body className={`${inter.variable} antialiased`}>
        <StoreProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppFab />
        </StoreProvider>
      </body>
    </html>
  );
}
