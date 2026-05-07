import type { Metadata } from "next";
import { LandingPage } from "@/components/LandingPage";
import { getSiteConfig } from "@/config/siteConfig";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata("en");

export default function HomeEn() {
  const config = getSiteConfig("en");
  return <LandingPage config={config} />;
}
