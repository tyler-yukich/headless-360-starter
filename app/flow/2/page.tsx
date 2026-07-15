"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PhoneFrame } from "@/components/PhoneFrame";
import { FlowLayout } from "@/components/FlowLayout";
import { ConfirmSheet } from "@/components/ConfirmSheet";

/**
 * Step 2 — review + confirm. Reads the URL state from step 1, shows the
 * chyron pill (the "hand the phone over" pattern), and gates the finish
 * behind an iOS-style bottom sheet.
 */

function parseAmount(raw: string | null): number {
  if (!raw) return 0;
  const digits = raw.replace(/[^0-9]/g, "");
  const n = Number(digits);
  return Number.isFinite(n) ? n : 0;
}

function Step2Inner() {
  const router = useRouter();
  const params = useSearchParams();
  const [sheetOpen, setSheetOpen] = useState(false);

  const name = params.get("name") ?? "Customer";
  const amount = parseAmount(params.get("amount"));
  const project = params.get("project") ?? "Project";
  const principal = `$${amount.toLocaleString("en-CA")}`;

  function confirm() {
    setSheetOpen(false);
    router.push(`/done?${params.toString()}`);
  }

  return (
    <PhoneFrame>
      <FlowLayout
        progress={{ current: 2, total: 2, label: "Review" }}
        chyron="Hand phone to customer"
        primaryAction={{ onClick: () => setSheetOpen(true), label: "Submit" }}
        backAction={{ href: `/flow/1`, label: "Back" }}
      >
        <div className="flex flex-col gap-6">
          <h1 className="font-display text-[26px] leading-[1.1] tracking-[-0.015em] text-navy-900">
            One last look, {name}.
          </h1>
          <dl className="flex flex-col divide-y divide-beige-200/80 rounded-[18px] border border-beige-200 bg-beige-50">
            <ReviewRow label="Customer" value={name} />
            <ReviewRow label="Project" value={project} />
            <ReviewRow label="Amount" value={principal} numeric />
          </dl>
          <p className="text-[13.5px] leading-[1.55] text-ink-500">
            In a real demo this is the trust beat: the customer, not the rep,
            reviews and approves on the same device.
          </p>
        </div>
      </FlowLayout>
      <ConfirmSheet
        open={sheetOpen}
        title="Ready to submit?"
        body={`${principal} for ${name}'s ${project.toLowerCase()}. This is the point of no return (in the demo, anyway).`}
        confirmLabel="Submit"
        onConfirm={confirm}
        onCancel={() => setSheetOpen(false)}
      />
    </PhoneFrame>
  );
}

function ReviewRow({
  label,
  value,
  numeric,
}: {
  label: string;
  value: string;
  numeric?: boolean;
}) {
  return (
    <div className="flex items-center justify-between px-5 py-4">
      <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500">
        {label}
      </dt>
      <dd
        className={
          "text-[15px] font-medium text-navy-900" + (numeric ? " tabular" : "")
        }
      >
        {value}
      </dd>
    </div>
  );
}

export default function Step2Page() {
  return (
    <Suspense fallback={null}>
      <Step2Inner />
    </Suspense>
  );
}
