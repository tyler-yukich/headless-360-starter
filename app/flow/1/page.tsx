"use client";

import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { PhoneFrame } from "@/components/PhoneFrame";
import { FlowLayout } from "@/components/FlowLayout";
import { CurrencyField, FormField, SelectField } from "@/components/FormField";

/**
 * Step 1 — capture. Shows the three form primitives and the URL-state
 * pattern: whatever gets typed here renders on every downstream screen.
 * Continue stays disabled until the required fields are filled.
 */

const PROJECT_PLACEHOLDER = "Select a project type";
const PROJECT_TYPES = [
  PROJECT_PLACEHOLDER,
  "Window replacement",
  "HVAC",
  "Roofing",
  "Solar",
  "Other",
];

function Step1Inner() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [project, setProject] = useState(PROJECT_PLACEHOLDER);

  const canContinue =
    name.trim() !== "" && amount.trim() !== "" && project !== PROJECT_PLACEHOLDER;

  function submit() {
    if (!canContinue) return;
    const next = new URLSearchParams();
    next.set("name", name.trim());
    next.set("amount", amount);
    next.set("project", project);
    router.push(`/flow/2?${next.toString()}`);
  }

  return (
    <PhoneFrame>
      <FlowLayout
        progress={{ current: 1, total: 2, label: "Details" }}
        primaryAction={{ onClick: submit, label: "Continue", disabled: !canContinue }}
        backAction={{ href: "/", label: "Back" }}
      >
        <div className="flex flex-col gap-5">
          <h1 className="font-display text-[26px] leading-[1.1] tracking-[-0.015em] text-navy-900">
            Let&apos;s get the details.
          </h1>
          <FormField
            label="Customer first name"
            variant="given-name"
            value={name}
            onChange={setName}
          />
          <CurrencyField
            label="Quote amount"
            value={amount}
            onChange={setAmount}
            hint="Whatever you type here follows the flow to the end."
          />
          <SelectField
            label="Project type"
            options={PROJECT_TYPES}
            value={project}
            onChange={setProject}
          />
        </div>
      </FlowLayout>
    </PhoneFrame>
  );
}

export default function Step1Page() {
  return (
    <Suspense fallback={null}>
      <Step1Inner />
    </Suspense>
  );
}
