import type { ReactNode } from "react";
import { StatusBar } from "./StatusBar";

/**
 * iPhone-shaped chrome that wraps every demo screen.
 * Inner viewport is 390 x 844 (iPhone 14 logical pts) — matches what we'll
 * record. Padding + rounded corners + notch live outside that box so screen
 * recordings can crop cleanly to the inner frame if needed.
 *
 * Overlay slot: an absolute, full-bleed div with id="phone-overlay-root"
 * sits above the scroll container. Drawers / modals portal into that node
 * so they're anchored to the visible 844px phone viewport, not to the
 * (possibly multi-thousand-pixel) scrollable content.
 */
export const PHONE_OVERLAY_ID = "phone-overlay-root";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh w-full flex items-center justify-center bg-beige-100 p-6">
      <div className="relative">
        {/* outer device chassis */}
        <div className="relative w-[412px] h-[866px] rounded-[58px] bg-ink-900 p-[11px] shadow-2xl ring-1 ring-ink-700/40">
          {/* inner viewport */}
          <div className="relative w-[390px] h-[844px] overflow-hidden rounded-[48px] bg-beige-50 flex flex-col">
            <StatusBar />
            <div className="flex-1 overflow-y-auto">{children}</div>
            <HomeIndicator />
            {/* Portal target for full-bleed overlays (drawers, modals).
                Anchored to the visible phone viewport, not to scrolled content.
                pointer-events-none so it doesn't block touch when empty. */}
            <div
              id={PHONE_OVERLAY_ID}
              className="pointer-events-none absolute inset-0 z-40"
            />
          </div>
          {/* dynamic island */}
          <div
            aria-hidden
            className="absolute top-[22px] left-1/2 -translate-x-1/2 w-[120px] h-[34px] rounded-full bg-ink-900 z-10"
          />
        </div>
      </div>
    </div>
  );
}

function HomeIndicator() {
  return (
    <div
      aria-hidden
      className="flex justify-center pb-2 pt-1 bg-transparent"
    >
      <div className="h-[5px] w-[134px] rounded-full bg-ink-900/80" />
    </div>
  );
}
