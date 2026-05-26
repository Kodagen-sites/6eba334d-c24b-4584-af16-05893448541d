"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

type Props = {
  frameCount: number;
  frameUrlTemplate: string; // e.g. "https://cdn.../frame-{NNNN}.jpg"
  posterUrl?: string;
  scrollDistance?: number; // multiplier of viewport height
  children?: React.ReactNode;
};

/**
 * Scroll-paced canvas frame scrubber.
 *
 * Renders a tall outer wrapper (scrollDistance × 100vh) with a sticky inner
 * stage. As the user scrolls through the wrapper, currentFrame advances from
 * 0 → frameCount-1. Falls back to a static poster image when frameCount = 0
 * (asset-gen mode 'prompt-only' or before frames have been extracted).
 *
 * Pinning is implemented with pure CSS sticky — no GSAP, no pin-spacer
 * removeChild crashes during client-side nav.
 */
export default function ScrollCanvas({
  frameCount,
  frameUrlTemplate,
  posterUrl,
  scrollDistance = 3.5,
  children,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imgsLoaded, setImgsLoaded] = useState(0);
  const [ready, setReady] = useState(false);
  const lastDrawn = useRef(-1);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const safeCount = Math.max(0, frameCount);
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, Math.max(0, safeCount - 1)]);

  useEffect(() => {
    if (safeCount <= 0 || !frameUrlTemplate) return;
    let cancelled = false;
    const images: HTMLImageElement[] = new Array(safeCount);
    let loaded = 0;

    const buildUrl = (i: number) => {
      const n = String(i + 1).padStart(4, "0");
      return frameUrlTemplate.replace(/\{NNNN\}|\{n+\}/i, n);
    };

    const load = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = img.onerror = () => {
          if (cancelled) return resolve();
          images[i] = img;
          loaded++;
          setImgsLoaded(loaded);
          resolve();
        };
        img.src = buildUrl(i);
      });

    (async () => {
      const first = Math.min(30, safeCount);
      await Promise.all(Array.from({ length: first }, (_, i) => load(i)));
      if (cancelled) return;
      imagesRef.current = images;
      setReady(true);

      // Lazy-load the rest in the background, 8-wide
      const queue = Array.from({ length: safeCount - first }, (_, i) => i + first);
      const workers = Array.from({ length: 8 }, async () => {
        while (queue.length && !cancelled) {
          const idx = queue.shift()!;
          await load(idx);
        }
      });
      await Promise.all(workers);
    })();

    return () => {
      cancelled = true;
    };
  }, [safeCount, frameUrlTemplate]);

  useMotionValueEvent(frameIndex, "change", (v) => {
    const idx = Math.round(v);
    if (idx === lastDrawn.current) return;
    const canvas = canvasRef.current;
    const img = imagesRef.current[idx];
    if (!canvas || !img || !img.complete) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
      canvas.width = img.naturalWidth || 1920;
      canvas.height = img.naturalHeight || 1080;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    lastDrawn.current = idx;
  });

  const usePoster = safeCount === 0 || !ready;

  return (
    <div
      ref={wrapperRef}
      className="relative w-full"
      style={{ height: `${Math.max(1, scrollDistance) * 100}vh` }}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-bg">
        {usePoster && posterUrl && (
          <img
            src={posterUrl}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {!usePoster && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ width: "100%", height: "100%" }}
          />
        )}
        {/* Atmospheric grade */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/20 via-transparent to-bg pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/70 via-transparent to-transparent pointer-events-none" />

        {/* Overlay slot (hero text) */}
        <div className="absolute inset-0">{children}</div>

        {/* Preloader progress in dev — invisible once ready */}
        {!ready && safeCount > 0 && (
          <div className="absolute bottom-6 left-6 font-mono text-[10px] text-ink/40 tracking-[0.3em] uppercase">
            Preloading {imgsLoaded}/{safeCount}
          </div>
        )}
      </div>
    </div>
  );
}
