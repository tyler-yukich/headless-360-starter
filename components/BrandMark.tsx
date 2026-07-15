/**
 * Placeholder brand lockup — logomark + wordmark. Swap this file for your
 * customer's brand: replace the rounded-square mark with their logo SVG and
 * the wordmark text with their name. Everything else in the kit renders the
 * brand through this one component, so this is the only file to touch.
 */
export function BrandMark({ size = "small" }: { size?: "small" | "large" }) {
  const markPx = size === "small" ? 18 : 28;
  const textClass =
    size === "small"
      ? "text-[15px] tracking-[-0.01em]"
      : "text-[24px] tracking-[-0.015em]";
  return (
    <span className="inline-flex items-center gap-2 select-none">
      <span
        aria-hidden
        className="rounded-[6px] bg-teal-500"
        style={{ width: markPx, height: markPx }}
      />
      <span className={`font-display font-semibold text-navy-900 ${textClass}`}>
        yourbrand
      </span>
    </span>
  );
}
