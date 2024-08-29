import {
  Fira_Code as FontMono,
  Inter as FontSans,
  Zilla_Slab_Highlight as ZillaSlabHighlight,
  Ubuntu_Mono as UbuntuMono,
  Shippori_Mincho as ShipporiMincho,
  Roboto_Serif as RobotoSerif,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontZilla = ZillaSlabHighlight({
  subsets: ["latin"],
  variable: "--font-zilla",
  weight: "400",
});

export const fontUbuntuMono = UbuntuMono({
  subsets: ["latin"],
  variable: "--font-ubuntu-mono",
  weight: "400", // ウェイトを必要に応じて指定
});

export const fontShipporiMincho = ShipporiMincho({
  subsets: ["latin"],
  variable: "--font-shippori-mincho",
  weight: "400", // ウェイトを必要に応じて指定
});

export const fontRobotoSerif = RobotoSerif({
  subsets: ["latin"],
  variable: "--font-roboto-serif",
  weight: "400", // ウェイトを必要に応じて指定
});
