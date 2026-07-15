"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BrandMark } from "./BrandMark";

/**
 * Persistent inner-flow shell. Replaces StubScreen for chapters that have real
 * content. Provides:
 *   - sticky brand header (no hamburger; this is in-flow, not navigation)
 *   - optional 6-dot progress strip (apply/1..6)
 *   - optional "Customer's phone" chyron pill (consent + sign chapters)
 *   - scrollable content well
 *   - sticky button tray (primary + back)
 *   - entrance animation (mount-only, gated on prefers-reduced-motion)
 */

export type FlowLayoutProps = {
  children: ReactNode;
  progress?: { current: number; total: number; label: string };
  chyron?: string;
  primaryAction?: {
    href?: string;
    onClick?: () => void;
    label: string;
    disabled?: boolean;
  };
  backAction?: { href?: string; onClick?: () => void; label: string };
  /** Direction the screen entered from. Default "right" (forward in flow). */
  enterFrom?: "right" | "left" | "up" | "none";
};

export function FlowLayout({
  children,
  progress,
  chyron,
  primaryAction,
  backAction,
  enterFrom = "right",
}: FlowLayoutProps) {
  const reduceMotion = useReducedMotion();

  const initial =
    reduceMotion || enterFrom === "none"
      ? { x: 0, y: 0, opacity: 0 }
      : enterFrom === "right"
        ? { x: 20, y: 0, opacity: 0 }
        : enterFrom === "left"
          ? { x: -20, y: 0, opacity: 0 }
          : { x: 0, y: 24, opacity: 0 };

  const duration = reduceMotion
    ? 0.15
    : enterFrom === "up"
      ? 0.55
      : 0.28;

  return (
    <motion.div
      initial={initial}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{
        duration,
        ease: [0.32, 0.72, 0, 1],
      }}
      className="relative flex flex-col h-full"
    >
      {/* Sticky brand header */}
      <header className="border-b border-beige-200/60 px-5 h-12 flex items-center justify-center bg-beige-50/85 backdrop-blur supports-[backdrop-filter]:bg-beige-50/70">
        <BrandMark size="small" />
      </header>

      {/* Optional chyron pill — top-center, fades in 0.5s after mount */}
      {chyron ? (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="absolute top-3 left-1/2 -translate-x-1/2 z-10"
        >
          <span className="inline-flex items-center justify-center text-center bg-teal-500/95 text-beige-50 px-3 py-1.5 rounded-full font-mono text-[10px] leading-[1.3] uppercase tracking-[0.18em] whitespace-nowrap">
            {chyron}
          </span>
        </motion.div>
      ) : null}

      {/* Progress strip */}
      {progress ? (
        <div className="px-6 pt-5 pb-1">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500 tabular">
              {progress.current} of {progress.total}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500">
              {progress.label}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            {Array.from({ length: progress.total }).map((_, i) => {
              const state =
                i + 1 < progress.current
                  ? "done"
                  : i + 1 === progress.current
                    ? "current"
                    : "upcoming";
              return (
                <span
                  key={i}
                  className={
                    "h-1 flex-1 rounded-full transition-colors " +
                    (state === "current"
                      ? "bg-teal-500"
                      : state === "done"
                        ? "bg-navy-900/60"
                        : "bg-ink-300/60")
                  }
                />
              );
            })}
          </div>
        </div>
      ) : null}

      {/* Content well */}
      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-4">{children}</div>

      {/* Sticky button tray */}
      {primaryAction || backAction ? (
        <div className="border-t border-beige-200/60 bg-beige-50 px-6 pt-3 pb-4 flex flex-col gap-2.5">
          {primaryAction ? <PrimaryAction {...primaryAction} /> : null}
          {backAction ? <BackAction {...backAction} /> : null}
        </div>
      ) : null}
    </motion.div>
  );
}

function PrimaryAction({
  href,
  onClick,
  label,
  disabled,
}: NonNullable<FlowLayoutProps["primaryAction"]>) {
  const className = [
    "block w-full rounded-[14px] px-5 py-4 text-center text-[15px] font-semibold transition",
    disabled
      ? "bg-ink-300/40 text-ink-500 cursor-not-allowed"
      : "bg-navy-900 text-beige-50 active:bg-navy-800",
  ].join(" ");

  if (disabled) {
    return (
      <span aria-disabled className={className}>
        {label}
      </span>
    );
  }
  if (href) {
    return (
      <Link href={href} className={className}>
        {label}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={className}>
      {label}
    </button>
  );
}

function BackAction({
  href,
  onClick,
  label,
}: NonNullable<FlowLayoutProps["backAction"]>) {
  const className =
    "block w-full rounded-[14px] border border-navy-900/20 px-5 py-3.5 text-center text-[14.5px] font-medium text-navy-900 active:bg-beige-100 transition";
  if (href) {
    return (
      <Link href={href} className={className}>
        {label}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={className}>
      {label}
    </button>
  );
}
