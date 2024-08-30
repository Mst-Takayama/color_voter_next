import "@/styles/globals.css";
import { Metadata, Viewport } from "next";

import { Providers } from "./providers";
import ClientLayout from "./client-layout"; // クライアントサイドのレイアウトをインポート

import { siteConfig } from "@/config/site";
import { fontSans, fontZilla, fontUbuntuMono } from "@/config/fonts";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="ja">
      <head />
      <body
        className={`min-h-screen bg-background font-sans antialiased w-full ${fontSans.variable} ${fontZilla.variable} ${fontUbuntuMono.variable}`}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
