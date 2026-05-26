import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="eyebrow mb-5">404 · No span found</div>
      <h1 className="font-display text-5xl md:text-7xl text-ink font-medium tracking-tight">
        That route never emitted a trace.
      </h1>
      <p className="mt-5 max-w-md text-ink/65 leading-relaxed">
        The page you tried to query doesn't exist on this site. Try the docs, or head home.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center px-6 py-3 rounded-full bg-primary text-bg font-display font-medium text-sm hover:brightness-110 transition-all"
      >
        Back to home →
      </Link>
    </div>
  );
}
