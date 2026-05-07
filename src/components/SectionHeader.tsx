import { Reveal } from "./Reveal";

type SectionHeaderProps = {
  label: string;
  title: string;
  titleEm: string;
  className?: string;
};

export function SectionHeader({
  label,
  title,
  titleEm,
  className,
}: SectionHeaderProps) {
  return (
    <Reveal className={className}>
      <p className="font-body text-[10px] tracking-[0.4em] uppercase text-accent mb-4">
        {label}
      </p>
      <h2 className="font-head text-[clamp(34px,5vw,54px)] font-light tracking-[0.06em] leading-[1.15] text-text mb-6 whitespace-pre-line">
        {title}
        <em className="not-italic font-head italic text-accent">{titleEm}</em>
      </h2>
      <div className="w-10 h-px bg-accent2 mb-8" />
    </Reveal>
  );
}
