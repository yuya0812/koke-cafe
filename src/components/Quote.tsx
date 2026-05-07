import type { SiteConfig } from "@/config/siteConfig";
import { Reveal } from "./Reveal";

type QuoteProps = {
  config: SiteConfig;
};

export function Quote({ config }: QuoteProps) {
  const q = config.content.quote;

  return (
    <section className="bg-text px-8 py-20 text-center">
      <Reveal>
        <span className="font-head text-[80px] text-accent2 opacity-30 leading-[0.5] mb-6 block">
          &ldquo;
        </span>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="font-ital italic text-[clamp(22px,4vw,36px)] font-light text-white tracking-[0.05em] leading-[1.5] max-w-[600px] mx-auto mb-6">
          {q.text.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </p>
      </Reveal>
      <Reveal delay={0.28}>
        <p className="text-[11px] tracking-[0.3em] uppercase text-accent2">
          {q.author}
        </p>
      </Reveal>
    </section>
  );
}
