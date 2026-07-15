"use client";

import { useId, useState, type ChangeEvent } from "react";

/**
 * Mobile-first form-field primitive used by /apply/1..6.
 *
 * Variants drive `inputMode`, `autoComplete`, `enterKeyHint` so the OS
 * keyboard shows the right key set on real iOS / Android. All inputs are
 * 56px tall, mono-label-above-field, navy-900 ink, teal focus ring.
 */

type Variant =
  | "text"
  | "given-name"
  | "family-name"
  | "email"
  | "tel"
  | "date"
  | "currency"
  | "street-address"
  | "address-level2"
  | "postal-code";

export type FormFieldProps = {
  label: string;
  variant: Variant;
  defaultValue?: string;
  /** Placeholder shown when the field is empty. Defaults to a variant-specific example. */
  placeholder?: string;
  /** "next" advances on Enter, "done" dismisses. Default "next". */
  enterKeyHint?: "next" | "done" | "go" | "send";
  /** Helper text shown below the input. */
  hint?: string;
  /** Controlled value. When provided alongside onChange, the field is controlled. */
  value?: string;
  onChange?: (next: string) => void;
};

export function FormField({
  label,
  variant,
  defaultValue,
  placeholder,
  enterKeyHint = "next",
  hint,
  value: controlledValue,
  onChange: controlledOnChange,
}: FormFieldProps) {
  const id = useId();
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const isControlled = controlledValue !== undefined && controlledOnChange !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const setValue = (next: string) => {
    if (isControlled) controlledOnChange(next);
    else setInternalValue(next);
  };

  const cfg = configFor(variant);
  const ph = placeholder ?? cfg.placeholder;

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500"
      >
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        type={cfg.type}
        inputMode={cfg.inputMode}
        autoComplete={cfg.autoComplete}
        enterKeyHint={enterKeyHint}
        placeholder={ph}
        className={[
          "h-14 rounded-[14px] border border-ink-300 bg-beige-50 px-4",
          "text-[17px] tracking-[-0.01em] text-navy-900",
          "placeholder:text-ink-300",
          variant === "currency" || variant === "tel" || variant === "date"
            ? "tabular"
            : "",
          "focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500",
          "transition",
        ].join(" ")}
      />
      {hint ? (
        <span className="font-mono text-[10px] tracking-[0.04em] text-ink-500">
          {hint}
        </span>
      ) : null}
    </div>
  );
}

export type SelectFieldProps = {
  label: string;
  options: string[];
  defaultValue?: string;
  hint?: string;
  value?: string;
  onChange?: (next: string) => void;
};

export function SelectField({
  label,
  options,
  defaultValue,
  hint,
  value: controlledValue,
  onChange: controlledOnChange,
}: SelectFieldProps) {
  const id = useId();
  const [internalValue, setInternalValue] = useState(defaultValue ?? options[0] ?? "");
  const isControlled = controlledValue !== undefined && controlledOnChange !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const setValue = (next: string) => {
    if (isControlled) controlledOnChange(next);
    else setInternalValue(next);
  };
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={[
          "h-14 rounded-[14px] border border-ink-300 bg-beige-50 px-4",
          "text-[17px] tracking-[-0.01em] text-navy-900 appearance-none",
          "focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500",
          "transition",
          // Native arrow on iOS is fine; this puts a chevron on the right for desktop.
          "bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 16 16%22 fill=%22none%22 stroke=%22%235b6473%22 stroke-width=%221.5%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><polyline points=%224 6 8 10 12 6%22/></svg>')] bg-no-repeat bg-[right_1rem_center] pr-10",
        ].join(" ")}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {hint ? (
        <span className="font-mono text-[10px] tracking-[0.04em] text-ink-500">
          {hint}
        </span>
      ) : null}
    </div>
  );
}

/**
 * Currency input with sticky "$" prefix on the left, auto-comma formatting
 * as the user types, and a lighter/smaller ".00" suffix on the right. Stores
 * the displayed value as a formatted string ("$38,500"); parseAmount
 * downstream strips non-digits.
 */
export type CurrencyFieldProps = {
  label: string;
  hint?: string;
  value?: string;
  onChange?: (formatted: string) => void;
  defaultValue?: string;
  enterKeyHint?: "next" | "done" | "go" | "send";
};

function digitsOnly(s: string): string {
  return s.replace(/[^0-9]/g, "");
}

function formatWithCommas(digits: string): string {
  if (!digits) return "";
  const n = Number(digits);
  if (!Number.isFinite(n)) return "";
  return n.toLocaleString("en-CA");
}

function toFormatted(digits: string): string {
  return digits ? `$${formatWithCommas(digits)}` : "";
}

export function CurrencyField({
  label,
  hint,
  value: controlled,
  onChange,
  defaultValue,
  enterKeyHint = "next",
}: CurrencyFieldProps) {
  const id = useId();
  const isControlled = controlled !== undefined && onChange !== undefined;
  const [internal, setInternal] = useState(digitsOnly(defaultValue ?? ""));
  const digits = isControlled ? digitsOnly(controlled) : internal;

  function handleChange(raw: string) {
    const next = digitsOnly(raw);
    if (isControlled) {
      onChange(toFormatted(next));
    } else {
      setInternal(next);
    }
  }

  const display = formatWithCommas(digits);

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-500"
      >
        {label}
      </label>
      <div className="h-14 rounded-[14px] border border-ink-300 bg-beige-50 px-4 flex items-center gap-1 focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500 transition">
        <span
          className="text-[17px] tracking-[-0.01em] text-navy-900 select-none"
          aria-hidden
        >
          $
        </span>
        <input
          id={id}
          value={display}
          onChange={(e) => handleChange(e.target.value)}
          inputMode="numeric"
          autoComplete="off"
          enterKeyHint={enterKeyHint}
          placeholder="0"
          className="flex-1 bg-transparent text-[17px] tracking-[-0.01em] text-navy-900 placeholder:text-ink-300 focus:outline-none tabular min-w-0"
        />
        <span
          className="text-[13px] text-ink-500/70 tabular select-none"
          aria-hidden
        >
          .00
        </span>
      </div>
      {hint ? (
        <span className="font-mono text-[10px] tracking-[0.04em] text-ink-500">
          {hint}
        </span>
      ) : null}
    </div>
  );
}

function configFor(variant: Variant): {
  type: string;
  inputMode: "text" | "numeric" | "decimal" | "tel" | "email" | "url" | "search";
  autoComplete: string;
  placeholder?: string;
} {
  switch (variant) {
    case "given-name":
      return { type: "text", inputMode: "text", autoComplete: "given-name", placeholder: "First name" };
    case "family-name":
      return { type: "text", inputMode: "text", autoComplete: "family-name", placeholder: "Last name" };
    case "email":
      return { type: "email", inputMode: "email", autoComplete: "email", placeholder: "name@example.com" };
    case "tel":
      return { type: "tel", inputMode: "tel", autoComplete: "tel-national", placeholder: "(416) 555-0000" };
    case "date":
      return { type: "date", inputMode: "numeric", autoComplete: "bday" };
    case "currency":
      return { type: "text", inputMode: "decimal", autoComplete: "off", placeholder: "$0" };
    case "street-address":
      return { type: "text", inputMode: "text", autoComplete: "street-address", placeholder: "123 Main St" };
    case "address-level2":
      return { type: "text", inputMode: "text", autoComplete: "address-level2", placeholder: "City" };
    case "postal-code":
      return { type: "text", inputMode: "text", autoComplete: "postal-code", placeholder: "A1A 1A1" };
    case "text":
    default:
      return { type: "text", inputMode: "text", autoComplete: "off" };
  }
}
