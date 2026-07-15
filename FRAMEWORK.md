# FRAMEWORK — how to build a headless demo from this kit

These instructions are for the coding agent (Claude Code) working in this repo. A Salesforce SE will give you a **context brief** (usually produced by the *Headless 360 Demo Briefer* Slackbot skill). Your job: turn that brief into a recorded-demo-quality mobile experience, story first, code second.

## The context brief you should expect

Ten sections. If the SE hasn't pasted one yet, ask for it (or ask the questions below yourself):

1. **Use case** — one sentence
2. **Business context** — who the customer is, what's changing, why now
3. **Audience and decision** — who watches the demo, and what they're deciding
4. **End user and their day** — role, environment, the exact moment they'd pull out their phone
5. **Data model** — the Salesforce objects behind the experience, standard vs. custom, key fields
6. **Brand direction** — the customer's brand, or a placeholder direction, plus reference apps for the feel
7. **Hero-number candidates** — specific figures from the account, with provenance
8. **Constraints and guardrails** — deadline, what must not be shown or claimed
9. **Real-world pattern notes** — how real products in this category handle the flow (field order, processing times, credible naming)
10. **Open questions** — what the SE still needs to fill in

If sections are thin or missing, ask before building. Do not invent account facts.

## The build order (do not reorder)

### 1. Narrative spine first

Before touching code, produce a `narrative-spine.md` at the repo root: a persona with a name and a business, a one-sentence thesis, ONE hero number that appears in every chapter, a chapter-by-chapter arc (8–10 chapters: persona intent, capability shown, specific number, behavioral outcome), and at least one reversal moment where the story flips (e.g., the device changes hands, or the easy case pivots to the hard case). Get the SE's sign-off on the spine before scaffolding.

The spine decides the routes. Every chapter maps to a route or a moment inside one.

### 2. Rebrand the kit

- `app/globals.css`: swap token **values** for the brand direction in the brief. Never rename tokens.
- `components/BrandMark.tsx`: the customer's (or placeholder) logo and name.
- `app/layout.tsx`: brand font if there is one (self-host via `next/font`; keep the mono voice for IDs/timestamps).
- Keep the taste rules: off-white surface, near-black ink, muted success/danger, `.tabular` on every figure.

### 3. Scaffold all routes as walking stubs

Replace the sample flow (`/flow/1`, `/flow/2`, `/done`) with the spine's chapters. Every route renders inside `PhoneFrame`, uses `FlowLayout`, and links to the next chapter. The full flow must walk end to end — ugly is fine — before any screen gets real content.

Thread state through URL params (see the sample flow) so whatever the SE types live on stage renders downstream. No backend, no database: this is a front-stage simulation unless the SE explicitly asks for live Salesforce wiring (Connected App + REST).

### 4. Real screens

Build each chapter's screen using the kit primitives first (`FormField`, `CurrencyField`, `SelectField`, `ConfirmSheet`, `CountUp`) before writing new components. Respect the real-world pattern notes from the brief: field order, processing durations, credible service names. Processing states should take as long as the real category takes (seconds, not instant).

### 5. Polish pass

Run a design review of every screen through separate lenses: typography, color, spacing, visual hierarchy, motion, copy, mobile ergonomics, leftover stubs. Rank findings NOW / NEXT / LATER, apply the NOW tier. Verify every flow path end to end (Playwright or manual) before declaring done.

## Standing rules

- Everything renders inside `PhoneFrame`. Never break out of the phone.
- `prefers-reduced-motion` is respected in every animation you add.
- One hero number, everywhere. Consistency beats variety.
- Cut before you add: fewer fields, fewer words, fewer flourishes.
- Never claim a live integration exists when it doesn't — copy can name real services (per the pattern notes) but the SE presents this as a simulation.
