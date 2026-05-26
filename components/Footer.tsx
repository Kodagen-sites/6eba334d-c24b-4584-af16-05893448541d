import Link from "next/link";
import { siteConfig } from "@/content/site-config";
import SocialIcons from "@/components/SocialIcons";

/**
 * FT1 — Classic 5-Column.
 * Brand statement column + 4 link columns. Bottom bar: copyright left,
 * legal + socials right.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-bg border-t border-white/10 mt-0">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4">
            <Link
              href="/"
              className="font-display font-bold tracking-[0.18em] uppercase text-sm text-ink inline-flex items-center gap-2"
            >
              <span
                aria-hidden
                className="inline-block w-2 h-2 rounded-full bg-primary shadow-[0_0_12px_2px_rgba(6,182,212,0.7)]"
              />
              {siteConfig.company.name}
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-ink/65 max-w-sm">
              {siteConfig.footer.statement}
            </p>
            <div className="mt-6">
              <SocialIcons socials={siteConfig.socials} />
            </div>
          </div>

          {siteConfig.footer.columns.map((col) => (
            <div key={col.heading} className="col-span-1 md:col-span-2">
              <div className="eyebrow mb-4">{col.heading}</div>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label + link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink/70 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="text-xs font-mono text-ink/50 tracking-wider">
            © {year} {siteConfig.company.legalName}. All rights reserved.
          </div>
          <div className="flex items-center gap-5">
            {siteConfig.legal.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs font-mono uppercase tracking-[0.2em] text-ink/55 hover:text-primary transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <span className="text-[10px] font-mono text-ink/40 tracking-wider">
              SOC 2 · GDPR · 99.99% YTD
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
