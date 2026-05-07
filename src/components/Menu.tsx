"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { SiteConfig } from "@/config/siteConfig";
import { Reveal } from "./Reveal";

type MenuProps = {
  config: SiteConfig;
};

export function Menu({ config }: MenuProps) {
  const { content, site } = config;
  const m = content.menu;
  const [activeId, setActiveId] = useState(m.categories[0].id);
  const activeCategory =
    m.categories.find((c) => c.id === activeId) ?? m.categories[0];

  return (
    <section id="menu" className="bg-bg py-24 sm:py-28">
      <div className="max-w-[900px] mx-auto px-8">
        <Reveal>
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-accent mb-4">
            {m.label}
          </p>
          <h2 className="font-head text-[clamp(34px,5vw,54px)] font-light tracking-[0.06em] leading-[1.15] text-text mb-6 whitespace-pre-line">
            {m.title}
            <em className="not-italic font-head italic text-accent">
              {m.titleEm}
            </em>
          </h2>
          <div className="w-10 h-px bg-accent2 mb-8" />
        </Reveal>

        <Reveal delay={0.15}>
          <div className="flex border-b border-line mb-12">
            {m.categories.map((cat) => {
              const isActive = cat.id === activeId;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveId(cat.id)}
                  className={`relative py-3.5 px-4 sm:px-7 font-body text-[10px] sm:text-[11px] tracking-[0.2em] uppercase bg-transparent border-0 cursor-pointer transition-colors duration-300 ${
                    isActive ? "text-text" : "text-text-mid"
                  }`}
                >
                  {cat.label}
                  <span
                    className={`absolute -bottom-px left-0 right-0 h-px bg-accent origin-left transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94] as const,
            }}
          >
            {activeCategory.items.map((item) => (
              <div
                key={item.name}
                className="grid grid-cols-[1fr_auto] gap-4 items-start py-6 border-b border-line last:border-b-0"
              >
                <div>
                  <div className="font-head text-[22px] font-normal tracking-[0.04em] mb-1">
                    {item.name}
                  </div>
                  <div className="text-[12px] text-text-mid tracking-[0.03em] leading-[1.7]">
                    {item.description}
                  </div>
                </div>
                <div className="font-head text-[18px] font-light text-accent whitespace-nowrap">
                  {item.price}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <Reveal delay={0.2}>
          <div className="mt-12 p-7 sm:p-10 bg-bg2 grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-6 sm:gap-10 items-center">
            <div className="relative w-32 h-32 sm:w-[140px] sm:h-[140px] bg-accent2 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={site.images.menuFeatured}
                alt={m.featured.name}
                fill
                sizes="140px"
                className="object-cover"
              />
            </div>
            <div>
              <div className="text-[9px] tracking-[0.35em] uppercase text-accent mb-2">
                {m.featured.label}
              </div>
              <div className="font-head text-[28px] font-light mb-2">
                {m.featured.name}
              </div>
              <div className="text-[13px] text-text-mid leading-[1.9]">
                {m.featured.description}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
