"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { PhoneFrame } from "@/components/PhoneFrame";
import { FlowLayout } from "@/components/FlowLayout";
import { CountUp } from "@/components/CountUp";

/**
 * Finish — the hero moment. Count-up on the amount, spring entrance on the
 * check. In a real demo this is where your persona's payoff lands (funded,
 * booked, approved — whatever the story's last line is).
 */

function parseAmount(raw: string | null): number {
  if (!raw) return 0;
  const digits = raw.replace(/[^0-9]/g, "");
  const n = Number(digits);
  return Number.isFinite(n) ? n : 0;
}

function DoneInner() {
  const reduceMotion = useReducedMotion();
  const params = useSearchParams();
  const name = params.get("name") ?? "Customer";
  const amount = parseAmount(params.get("amount"));

  return (
    <PhoneFrame>
      <FlowLayout
        enterFrom="none"
        primaryAction={{ href: "/", label: "Restart" }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-4 pb-10 text-center">
          <motion.div
            initial={reduceMotion ? false : { scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={
              reduceMotion
                ? { duration: 0.15 }
                : { type: "spring", stiffness: 260, damping: 18 }
            }
          >
            <CheckCircle size={64} weight="fill" className="text-success" />
          </motion.div>
          <h1 className="font-display text-[28px] leading-[1.1] tracking-[-0.015em] text-navy-900">
            All set, {name}.
          </h1>
          {amount > 0 ? (
            <p className="font-display text-[40px] leading-none tracking-[-0.02em] text-navy-900 tabular">
              <CountUp target={amount} prefix="$" durationMs={900} />
            </p>
          ) : null}
          <p className="text-[14px] leading-[1.6] text-ink-500 max-w-[260px]">
            Confirmed and on its way. This screen is where your demo&apos;s
            last visual punctuation goes.
          </p>
        </div>
      </FlowLayout>
    </PhoneFrame>
  );
}

export default function DonePage() {
  return (
    <Suspense fallback={null}>
      <DoneInner />
    </Suspense>
  );
}
