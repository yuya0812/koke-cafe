import Image from "next/image";
import type { SiteConfig } from "@/config/siteConfig";
import { Reveal } from "./Reveal";

type ConceptProps = {
  config: SiteConfig;
};

export function Concept({ config }: ConceptProps) {
  const { content, site } = config;
  const c = content.concept;

  return (
    <section id="concept" className="bg-white py-24 sm:py-28">
      <div className="max-w-[900px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <Reveal direction="left">
            <p className="font-body text-[10px] tracking-[0.4em] uppercase text-accent mb-4">
              {c.label}
            </p>
            <h2 className="font-head text-[clamp(34px,5vw,54px)] font-light tracking-[0.06em] leading-[1.15] text-text mb-6 whitespace-pre-line">
              {c.title}
              <em className="not-italic font-head italic text-accent">
                {c.titleEm}
              </em>
            </h2>
            <div className="w-10 h-px bg-accent2 mb-8" />
            {c.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-[15px] leading-[2] text-text-mid mb-5 last:mb-0"
              >
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal direction="right">
            <div className="relative w-full aspect-[4/5] bg-bg2 overflow-hidden">
              <Image
                src={site.images.concept}
                alt={c.titleEm}
                fill
                sizes="(max-width: 768px) 100vw, 450px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {c.values.map((value, i) => (
            <Reveal key={value.num} delay={0.1 + i * 0.12}>
              <div className="py-8 px-6 border-t border-line">
                <div className="font-head text-[40px] font-light text-accent2 opacity-50 leading-none mb-3">
                  {value.num}
                </div>
                <div className="font-head text-[20px] font-normal tracking-[0.05em] mb-2">
                  {value.title}
                </div>
                <div className="text-[13px] leading-[1.9] text-text-mid">
                  {value.description}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
