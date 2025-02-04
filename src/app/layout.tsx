import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/Providers/Providers";
import SessionWrapper from "@/components/SessionWrapper";
// import { ThemeProvider } from "@/components/theme-provider";

// Charger les polices localement
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  display: "swap", // Ajout pour éviter des erreurs de FOUT
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  display: "swap", // Idem pour la deuxième police
});

export const metadata: Metadata = {
  title: "Gestion Boite Postale",
  description:
    "le GBP est une app qui gère efficacement les opérations liées aux boîtes postales",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        > */}
        <SessionWrapper>
          <Providers>
            {children}
          </Providers>
        </SessionWrapper>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
