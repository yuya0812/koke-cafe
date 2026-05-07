"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { SiteConfig } from "@/config/siteConfig";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: EASE },
});

type HeroProps = {
  config: SiteConfig;
};

export function Hero({ config }: HeroProps) {
  const { content, site } = config;

  return (
    <section
      id="hero"
      className="relative h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#6B4226]">
        <Image
          src={site.images.hero}
          alt={site.shop.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(20,10,5,0.45) 0%, rgba(20,10,5,0.2) 50%, rgba(20,10,5,0.55) 100%)",
        }}
      />
      <div className="relative z-20 text-center px-6 text-white">
        <motion.p
          {...fadeUp(0.3)}
          className="font-body text-[11px] tracking-[0.35em] uppercase text-accent2 mb-5"
        >
          {content.hero.eyebrow}
        </motion.p>
        <motion.h1
          {...fadeUp(0.55)}
          className="font-head text-[clamp(52px,10vw,96px)] font-light tracking-[0.12em] leading-[1.05] mb-6"
        >
          {site.shop.titleLines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </motion.h1>
        <motion.p
          {...fadeUp(0.9)}
          className="font-ital italic text-[clamp(16px,3vw,22px)] font-light tracking-[0.06em] text-white/80 mb-12"
        >
          {content.hero.subtitle}
        </motion.p>
        <motion.div {...fadeUp(1.2)}>
          <a
            href={content.hero.ctaHref}
            className="inline-block py-3.5 px-10 border border-white/60 text-white font-body text-[11px] tracking-[0.25em] uppercase no-underline transition-all duration-300 hover:bg-white hover:border-white hover:text-text"
          >
            {content.hero.ctaLabel}
          </a>
        </motion.div>
      </div>
      <motion.div
        {...fadeUp(1.6)}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-white/50">
          {content.hero.scrollLabel}
        </span>
        <span
          className="w-px h-10 bg-white/40 block"
          style={{ animation: "scrollPulse 2s ease-in-out 2s infinite" }}
        />
      </motion.div>
    </section>
  );
}
