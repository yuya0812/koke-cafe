"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { SiteConfig } from "@/config/siteConfig";

type NavProps = {
  config: SiteConfig;
};

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export function Nav({ config }: NavProps) {
  const { content, site, altLocalePath } = config;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (!menuOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [menuOpen]);

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const scrollToSection = (href: string) => {
    if (!href.startsWith("#")) return;
    const id = href.slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    setMenuOpen(false);
    // 少し待ってからスクロール（ドロワーのbody-overflow解除を反映）
    requestAnimationFrame(() => scrollToSection(href));
  };

  // ドロワー展開中は常にスクロール後の見た目（不透明背景）にする
  const navOpaque = scrolled || menuOpen;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 px-6 sm:px-8 py-5 flex justify-between items-center transition-[background,backdrop-filter] duration-500 ${
          navOpaque
            ? "bg-bg/90 backdrop-blur-md border-b border-line"
            : "bg-transparent"
        }`}
      >
        <a
          href={config.homePath}
          className={`font-head text-[20px] font-normal tracking-[0.18em] no-underline transition-colors duration-400 ${
            navOpaque ? "text-text" : "text-white"
          }`}
        >
          {site.shop.nameShort}
        </a>
        <div className="flex items-center gap-5 sm:gap-7">
          <ul className="hidden sm:flex gap-7 list-none">
            {content.nav.items.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className={`font-body text-[11px] tracking-[0.2em] uppercase no-underline transition-colors duration-300 hover:text-accent2 ${
                    navOpaque ? "text-text-mid" : "text-white/80"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Link
            href={altLocalePath}
            aria-label={`Switch language to ${config.altLocale.toUpperCase()}`}
            className={`font-body text-[11px] tracking-[0.2em] uppercase no-underline transition-colors duration-300 border px-2.5 py-1 ${
              navOpaque
                ? "text-text-mid border-line hover:text-accent2 hover:border-accent2"
                : "text-white/80 border-white/40 hover:text-accent2 hover:border-accent2"
            }`}
          >
            {content.nav.switchToOtherLocale}
          </Link>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setMenuOpen((v) => !v)}
            className={`sm:hidden relative w-8 h-8 flex items-center justify-center transition-colors duration-300 ${
              navOpaque ? "text-text" : "text-white"
            }`}
          >
            <span className="sr-only">Menu</span>
            <span
              aria-hidden
              className={`absolute left-1.5 right-1.5 h-px bg-current transition-transform duration-300 ${
                menuOpen ? "translate-y-0 rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              aria-hidden
              className={`absolute left-1.5 right-1.5 h-px bg-current transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              aria-hidden
              className={`absolute left-1.5 right-1.5 h-px bg-current transition-transform duration-300 ${
                menuOpen ? "translate-y-0 -rotate-45" : "translate-y-1.5"
              }`}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-40 sm:hidden bg-bg/98 backdrop-blur-md flex flex-col items-center justify-center px-8"
          >
            <ul className="list-none flex flex-col items-center gap-8">
              {content.nav.items.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + i * 0.08,
                    ease: EASE,
                  }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="font-head text-[28px] font-light tracking-[0.08em] text-text no-underline hover:text-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
