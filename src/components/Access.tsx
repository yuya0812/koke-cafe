import type { SiteConfig } from "@/config/siteConfig";
import { Reveal } from "./Reveal";

type AccessProps = {
  config: SiteConfig;
};

type Detail = { label: string; value: React.ReactNode };

export function Access({ config }: AccessProps) {
  const { content, site } = config;
  const a = content.access;

  const details: Detail[] = [
    {
      label: a.addressLabel,
      value: a.addressLines.map((line, i) => (
        <span key={i} className="block">
          {line}
        </span>
      )),
    },
    {
      label: a.hoursLabel,
      value: (
        <>
          {a.hoursLines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
          <span className="block text-[12px] text-text-mid">{a.holiday}</span>
        </>
      ),
    },
    { label: a.directionLabel, value: a.direction },
    {
      label: a.contactLabel,
      value: (
        <a
          href={`mailto:${site.social.email}`}
          className="text-accent no-underline hover:opacity-80"
        >
          {site.social.email}
        </a>
      ),
    },
  ];

  return (
    <section id="access" className="bg-white py-24 sm:py-28">
      <div className="max-w-[900px] mx-auto px-8">
        <Reveal>
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-accent mb-4">
            {a.label}
          </p>
          <h2 className="font-head text-[clamp(34px,5vw,54px)] font-light tracking-[0.06em] leading-[1.15] text-text mb-6">
            {a.title}
            <em className="not-italic font-head italic text-accent">
              {a.titleEm}
            </em>
          </h2>
          <div className="w-10 h-px bg-accent2 mb-8" />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          <Reveal direction="left" delay={0.1}>
            {details.map((d, i) => (
              <div
                key={d.label}
                className={`py-5 border-b border-line ${
                  i === 0 ? "border-t" : ""
                }`}
              >
                <div className="text-[10px] tracking-[0.3em] uppercase text-accent mb-1.5">
                  {d.label}
                </div>
                <div className="text-[15px] leading-[1.8] text-text">
                  {d.value}
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal direction="right" delay={0.2}>
            <div className="relative w-full aspect-[4/3] bg-bg2 overflow-hidden">
              <iframe
                src={site.map.embedUrl}
                title="Google Map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
              />
            </div>
            <a
              href={site.map.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 text-[11px] tracking-[0.2em] uppercase text-accent no-underline hover:text-text"
            >
              {a.mapOpenLabel}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
