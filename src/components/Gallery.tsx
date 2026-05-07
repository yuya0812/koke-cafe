import Image from "next/image";
import type { SiteConfig } from "@/config/siteConfig";
import { Reveal } from "./Reveal";

type GalleryProps = {
  config: SiteConfig;
};

export function Gallery({ config }: GalleryProps) {
  const { content, site } = config;
  const g = content.gallery;

  return (
    <section id="gallery" className="bg-bg2 overflow-hidden py-24 sm:py-28">
      <div className="max-w-[1100px] mx-auto px-8 mb-10">
        <Reveal>
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-accent mb-4">
            {g.label}
          </p>
          <h2 className="font-head text-[clamp(34px,5vw,54px)] font-light tracking-[0.06em] leading-[1.15] text-text mb-6">
            {g.title}
            <em className="not-italic font-head italic text-accent">
              {g.titleEm}
            </em>
          </h2>
          <div className="w-10 h-px bg-accent2" />
        </Reveal>
      </div>

      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
          {site.images.gallery.map((image, i) => {
            const isTall = image.span === "tall";
            const alt = g.altText[i] ?? "";
            return (
              <Reveal
                key={image.src}
                delay={i * 0.08}
                className={`group relative overflow-hidden cursor-pointer bg-bg ${
                  isTall ? "row-span-1 sm:row-span-2" : ""
                }`}
              >
                <div
                  className={`relative w-full ${
                    isTall ? "pb-[100%] sm:pb-[200%]" : "pb-[100%]"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={alt}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-text/0 group-hover:bg-text/25 transition-colors duration-400" />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
