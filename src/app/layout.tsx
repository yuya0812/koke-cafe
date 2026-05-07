import { Cormorant_Garamond, Noto_Sans_JP } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { isLocale, type Locale } from "@/config/siteConfig";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

// メタデータは各ページ (app/page.tsx, app/en/page.tsx) 側で生成する。
// ここでは <html lang> をリクエスト時にロケール判定して付与するだけ。

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerStore = await headers();
  const localeHeader = headerStore.get("x-locale") ?? undefined;
  const locale: Locale = isLocale(localeHeader) ? localeHeader : "ja";

  return (
    <html
      lang={locale}
      className={`${cormorant.variable} ${notoSansJp.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
