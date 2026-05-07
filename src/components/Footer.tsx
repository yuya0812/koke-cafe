import type { SiteConfig } from "@/config/siteConfig";

type FooterProps = {
  config: SiteConfig;
};

export function Footer({ config }: FooterProps) {
  const { content, site } = config;
  const f = content.footer;
  const a = content.access;

  return (
    <footer className="bg-text text-white/50 px-8 pt-12 pb-8">
      <div className="max-w-[900px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 pb-10 border-b border-white/10 mb-8">
        <div>
          <div className="font-head text-[22px] font-light tracking-[0.2em] text-white mb-2.5">
            {site.shop.name}
          </div>
          <div className="text-[11px] tracking-[0.12em] leading-[1.8]">
            {f.tagline}
            <br />
            {f.locationLabel}
          </div>
        </div>
        <div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-accent2 mb-4">
            {f.hoursTitle}
          </div>
          {a.hoursLines.map((line) => (
            <p key={line} className="text-[13px] leading-[2] text-white/50">
              {line}
            </p>
          ))}
          <p className="text-[13px] leading-[2] text-white/50">{a.holiday}</p>
        </div>
        <div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-accent2 mb-4">
            {f.linksTitle}
          </div>
          <a
            href={site.social.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-[13px] leading-[2] text-white/50 no-underline hover:text-accent2"
          >
            {f.instagramLinkLabel}
          </a>
          <a
            href={`mailto:${site.social.email}`}
            className="block text-[13px] leading-[2] text-white/50 no-underline hover:text-accent2"
          >
            {site.social.email}
          </a>
        </div>
      </div>
      <div className="max-w-[900px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] tracking-[0.08em] text-center sm:text-left">
        <span>{f.copyright}</span>
        <span>{f.locationLabel}</span>
      </div>
    </footer>
  );
}
