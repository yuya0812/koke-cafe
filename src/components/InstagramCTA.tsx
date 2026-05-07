import type { SiteConfig } from "@/config/siteConfig";
import { Reveal } from "./Reveal";

type InstagramCTAProps = {
  config: SiteConfig;
};

const InstagramIcon = ({
  size = 40,
  stroke = "#8B5E3C",
  strokeWidth = 1.5,
}: {
  size?: number;
  stroke?: string;
  strokeWidth?: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <rect
      x="4"
      y="4"
      width="32"
      height="32"
      rx="9"
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
    <circle cx="20" cy="20" r="7" stroke={stroke} strokeWidth={strokeWidth} />
    <circle cx="29.5" cy="10.5" r="1.5" fill={stroke} />
  </svg>
);

export function InstagramCTA({ config }: InstagramCTAProps) {
  const { content, site } = config;
  const ig = content.instagram;

  return (
    <section className="bg-bg px-8 py-20 text-center">
      <Reveal>
        <div className="w-10 h-10 mx-auto mb-5">
          <InstagramIcon />
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="font-head text-[clamp(28px,5vw,42px)] font-light tracking-[0.06em] mb-3">
          {ig.title}
        </h2>
      </Reveal>
      <Reveal delay={0.18}>
        <p className="text-[13px] text-text-mid mb-8 tracking-[0.05em]">
          {ig.subtitle}
        </p>
      </Reveal>
      <Reveal delay={0.26}>
        <a
          href={site.social.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 py-4 px-10 bg-accent text-white font-body text-[11px] tracking-[0.2em] uppercase no-underline transition-all duration-300 hover:bg-text hover:-translate-y-px"
        >
          <InstagramIcon size={16} stroke="white" strokeWidth={2} />
          {ig.followLabel}
        </a>
      </Reveal>
    </section>
  );
}
