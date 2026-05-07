import type { SiteConfig } from "@/config/siteConfig";
import { buildCafeJsonLd } from "@/lib/jsonLd";
import { JsonLd } from "./JsonLd";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { Concept } from "./Concept";
import { Menu } from "./Menu";
import { Gallery } from "./Gallery";
import { Quote } from "./Quote";
import { Access } from "./Access";
import { InstagramCTA } from "./InstagramCTA";
import { Footer } from "./Footer";

type LandingPageProps = {
  config: SiteConfig;
};

export function LandingPage({ config }: LandingPageProps) {
  return (
    <main>
      <JsonLd data={buildCafeJsonLd(config)} />
      <Nav config={config} />
      <Hero config={config} />
      <Concept config={config} />
      <Menu config={config} />
      <Gallery config={config} />
      <Quote config={config} />
      <Access config={config} />
      <InstagramCTA config={config} />
      <Footer config={config} />
    </main>
  );
}
