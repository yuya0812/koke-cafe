import type { SiteConfig } from "@/config/siteConfig";

/**
 * 店舗の構造化データ（schema.org の CafeOrCoffeeShop）。
 * Google検索のリッチリザルトやマップのナレッジパネルに使われる。
 */
export function buildCafeJsonLd(config: SiteConfig) {
  const { site, content } = config;

  return {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: site.shop.name,
    description: content.meta.description,
    image: new URL(site.images.og, site.url).toString(),
    url: new URL(config.homePath, site.url).toString(),
    email: site.social.email,
    address: {
      "@type": "PostalAddress",
      ...site.map.schemaAddress,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: site.map.openingHours.daysOfWeek,
        opens: site.map.openingHours.opens,
        closes: site.map.openingHours.closes,
      },
    ],
    sameAs: [site.social.instagramUrl],
  };
}
