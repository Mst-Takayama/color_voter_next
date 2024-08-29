import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import Image from "next/image";
import clsx from "clsx";

import { Providers } from "./providers";

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
        className={clsx(
          "min-h-screen bg-background font-sans antialiased w-full",
          fontSans.variable,
          fontZilla.variable,
          fontUbuntuMono.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="flex flex-col h-screen">
            <main className="container mx-auto max-w-7xl flex-grow relative">
              <div className="relative w-full h-[499px]">
                <Image
                  priority
                  alt="Picture of the author"
                  layout="fill"
                  objectFit="cover"
                  src="/1000151615.jpg"
                />
                <div className="absolute top-[5%] left-[5%]  text-white">
                  <div
                    className={clsx(
                      "text-4xl font-normal",
                      fontZilla.className,
                    )}
                  >
                    Guess
                    <br />
                    The Bride’s
                    <br />
                    Perfect Dress Hue
                  </div>
                </div>
                <div className="absolute left-[46%] bottom-[4%]">
                  <div
                    className={clsx(
                      "mt-4 text-base font-normal text-white",
                      fontUbuntuMono.className,
                    )}
                  >
                    Scroll
                  </div>
                  <div className="w-[42px] h-[0px] mt-5 border-t-1 border-white transform -rotate-90 " />
                </div>
              </div>
              {children}
            </main>
            <footer className="w-full flex items-center justify-center flex-col mt-10">
              <div className="w-52 h-[0px] border border-black" />
              <div className="flex justify-center w-full py-4">
                <div
                  className={clsx(
                    "text-black text-base font-normal flex items-end mb-1",
                    fontUbuntuMono.className,
                  )}
                >
                  Created By
                </div>
                <div
                  className={clsx(
                    "ml-3 text-black text-5xl font-normal bg-gradient-to-r from-[#000] to-[#666] text-transparent bg-clip-text",
                    fontUbuntuMono.className,
                  )}
                >
                  Onikukirai
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
