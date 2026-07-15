"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PHONE_OVERLAY_ID } from "./PhoneFrame";

/**
 * iOS-style bottom action sheet. Slides up from the bottom of the phone
 * viewport with a scrim behind it; tapping the scrim or Cancel dismisses.
 * Portals into the PhoneFrame overlay root so it's anchored to the visible
 * 844px viewport, not to (possibly scrolled) page content.
 *
 * Use for any confirm-before-commit moment (submitting, advancing a stage).
 *
 * Reduced motion: faster, no overshoot.
 */

export type ConfirmSheetProps = {
  open: boolean;
  title: string;
  body: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const SHEET_ID = "phone-confirm-sheet";

export function ConfirmSheet({
  open,
  title,
  body,
  confirmLabel,
  onConfirm,
  onCancel,
}: ConfirmSheetProps) {
  const reduceMotion = useReducedMotion();
  const [overlay, setOverlay] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setOverlay(document.getElementById(PHONE_OVERLAY_ID));
  }, []);

  const sheet = (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onCancel}
            className="pointer-events-auto absolute inset-0 bg-ink-900/40"
            aria-hidden
          />
          <motion.div
            id={SHEET_ID}
            key="sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "tween",
              ease: [0.32, 0.72, 0, 1],
              duration: reduceMotion ? 0.15 : 0.34,
            }}
            className="pointer-events-auto absolute inset-x-0 bottom-0 rounded-t-[28px] bg-beige-50 shadow-2xl px-6 pt-3 pb-7"
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            {/* Grabber */}
            <div
              aria-hidden
              className="mx-auto mb-5 h-1 w-9 rounded-full bg-ink-300/70"
            />
            <h2 className="font-display text-[22px] leading-[1.12] tracking-[-0.01em] text-navy-900">
              {title}
            </h2>
            <p className="mt-2 text-[13.5px] leading-[1.55] text-ink-700">
              {body}
            </p>
            <button
              type="button"
              onClick={onConfirm}
              className="mt-6 block w-full rounded-[14px] bg-navy-900 px-5 py-4 text-center text-[15px] font-semibold text-beige-50 active:bg-navy-800 transition"
            >
              {confirmLabel}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="mt-2.5 block w-full rounded-[14px] px-5 py-3 text-center text-[14.5px] font-medium text-ink-700 active:bg-beige-100 transition"
            >
              Cancel
            </button>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );

  return overlay ? createPortal(sheet, overlay) : null;
}
