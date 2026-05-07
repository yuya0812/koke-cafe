import type { Metadata } from "next";
import { getSiteConfig, type Locale } from "@/config/siteConfig";

/**
 * 言語別の <head> メタデータを生成。
 * - 検索エンジンには hreflang で日英の対応を伝える
 * - SNSシェア時は OG / Twitter Card で画像つきカードに
 */
export function buildMetadata(locale: Locale): Metadata {
  const config = getSiteConfig(locale);
  const { content, site, homePath, altLocalePath, altLocale, ogLocale } =
    config;

  return {
    metadataBase: new URL(site.url),
    title: content.meta.title,
    description: content.meta.description,
    alternates: {
      canonical: homePath,
      languages: {
        ja: "/",
        en: "/en",
        "x-default": "/",
      },
    },
    openGraph: {
      type: "website",
      url: homePath,
      siteName: site.shop.name,
      title: content.meta.title,
      description: content.meta.description,
      locale: ogLocale,
      alternateLocale: altLocale === "ja" ? "ja_JP" : "en_US",
      images: [
        {
          url: site.images.og,
          width: 1200,
          height: 630,
          alt: site.shop.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.meta.title,
      description: content.meta.description,
      images: [site.images.og],
    },
    other: {
      "alt-locale-path": altLocalePath,
    },
  };
}
