"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/content/site-config";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);
  return scrolled;
}

function useIsMobile(breakpoint = 768) {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return mobile;
}

export default function Header() {
  const scrolled = useScrolled(20);
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 md:top-5 inset-x-4 md:inset-x-0 z-40 flex justify-center pointer-events-none"
      >
        <div
          className={`pointer-events-auto flex items-center gap-1 md:gap-2 rounded-full border backdrop-blur-2xl transition-all duration-500 ${
            scrolled
              ? "bg-bg/75 border-accent/20 shadow-[0_10px_40px_-10px_rgba(6,182,212,0.25)]"
              : "bg-white/[0.04] border-white/10"
          }`}
          style={{ padding: "6px 8px" }}
        >
          <Link
            href="/"
            className="px-3 md:px-4 py-2 font-display font-bold tracking-[0.18em] uppercase text-xs md:text-sm text-ink inline-flex items-center gap-2"
          >
            <span
              aria-hidden
              className="inline-block w-2 h-2 rounded-full bg-primary shadow-[0_0_12px_2px_rgba(6,182,212,0.7)]"
            />
            {siteConfig.company.name}
          </Link>

          {!isMobile && (
            <nav className="flex items-center gap-1 mx-2">
              {NAV_LINKS.slice(1).map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-[0.22em] transition-colors ${
                      active ? "text-ink" : "text-ink/65 hover:text-ink"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="pill-active"
                        className="absolute inset-0 bg-primary/15 rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          )}

          {!isMobile ? (
            <Link
              href="/contact"
              className="px-4 py-2 rounded-full bg-primary text-bg text-xs font-display font-medium hover:brightness-110 transition-all"
            >
              Start free
            </Link>
          ) : (
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="w-9 h-9 rounded-full flex items-center justify-center text-ink hover:bg-white/10"
            >
              <Menu size={18} />
            </button>
          )}
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-bg md:hidden"
          >
            <div className="flex items-center justify-between p-6">
              <div className="font-display font-bold tracking-[0.18em] uppercase text-sm text-ink">
                {siteConfig.company.name}
              </div>
              <button onClick={() => setOpen(false)} className="text-ink" aria-label="Close menu">
                <X size={22} />
              </button>
            </div>
            <ul className="flex flex-col gap-6 p-6">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-3xl text-ink hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="absolute bottom-6 inset-x-6">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block text-center w-full px-5 py-4 rounded-full bg-primary text-bg font-display font-medium"
              >
                Start free trial →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
