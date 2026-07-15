"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Tabular-number count-up to `target`, mount-only. Locale: en-CA.
 * Default easing matches ApprovalCard (easeOutQuart over 0.6s).
 * `prefers-reduced-motion` is respected — renders the final value statically.
 */
export function CountUp({
  target,
  durationMs = 600,
  className,
  prefix,
  suffix,
}: {
  target: number;
  durationMs?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}) {
  const reduceMotion = useReducedMotion();
  const animate = !reduceMotion;
  const [value, setValue] = useState(animate ? 0 : target);

  useEffect(() => {
    if (!animate) {
      setValue(target);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 4);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, animate]);

  return (
    <span className={className}>
      {prefix}
      {value.toLocaleString("en-CA")}
      {suffix}
    </span>
  );
}
