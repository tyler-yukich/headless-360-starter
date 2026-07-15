# Headless 360 Starter

A starter kit for **headless Customer 360 demos**: a custom, animated, phone-framed front end with Salesforce as the (simulated) system of record. Clone it, reskin it, and you have the bones of a consumer-grade mobile demo in minutes instead of days.

Built by a Salesforce SE, for Salesforce SEs. The method behind it lives in the companion canvas: *How I built a Headless 360 demo with Claude Code* `[link in your org's SE asset library]`.

## Quickstart

```bash
git clone https://github.com/tyler-yukich/headless-360-starter.git
cd headless-360-starter
npm install
npm run dev
```

Open http://localhost:3000. You get a walking, animated, iPhone-framed sample flow: a form step (text, currency, and select primitives), a review step with a bottom-sheet confirm and the "hand phone to customer" chyron, and a count-up finish. Whatever you type on step 1 renders on every downstream screen — that's the URL-state pattern your live demo will use.

## How to use it for a real demo

1. **Qualify the fit** with the checklist in the canvas. Not every portal ask should go headless.
2. **Get your context brief from Slackbot** (the canvas's Step 2, packaged as the *Headless 360 Demo Briefer* skill). It ends with a ten-section brief.
3. **Open Claude Code in this repo** and paste the brief. `FRAMEWORK.md` tells Claude what to do with it: narrative spine first, then routes, then build passes.
4. **Build in passes, polish, record.** Every prompt you need is in `PROMPTS.md`.

## What's inside

| Piece | What it gives you |
|---|---|
| `components/PhoneFrame.tsx` | The iPhone chassis every screen renders in — status bar, dynamic island, home indicator, and an overlay root that keeps sheets/toasts inside the phone |
| `components/FlowLayout.tsx` | The in-flow shell: brand header, progress strip, chyron pill, sticky button tray, entrance animation |
| `components/FormField.tsx` | `FormField` (variant-aware inputs with correct mobile keyboards), `SelectField`, and `CurrencyField` (sticky `$`, auto-commas) |
| `components/ConfirmSheet.tsx` | iOS-style bottom action sheet, portaled into the phone viewport |
| `components/CountUp.tsx` | Tabular-number count-up for hero figures |
| `components/BrandMark.tsx` | The one file to swap for your customer's logo and name |
| `app/globals.css` | Placeholder brand tokens — change the values, keep the names, and the whole app rebrands |
| `app/` (`/`, `/flow/1`, `/flow/2`, `/done`) | The sample flow: replace these routes with your narrative's chapters |
| `FRAMEWORK.md` | The build method, written for Claude Code — reads your context brief and drives the build |
| `PROMPTS.md` | Every prompt from the canvas, copy-paste ready |

## Design rules baked in

- **Everything renders inside the phone.** Recordings read as a product, not a shrunk website, and work on any screen.
- **Placeholder palette, real taste.** Off-white surfaces (never `#fff`), near-black ink (never `#000`), muted success/danger. Swap the values in `globals.css` for your customer's brand; keep the token names.
- **Numbers get the numeric voice.** Every figure uses `tabular-nums slashed-zero` (the `.tabular` class).
- **Motion respects `prefers-reduced-motion`** everywhere, out of the box.
- **State threads through the URL**, so whatever you type live on stage flows to the end of the demo.

## The honest note

Demos built from this kit are **front-stage simulations**: no live backend, no real integrations, and you should say so when you present. If you want it live, the same app authenticates to Salesforce through a Connected App and reads and writes over the REST API — nothing about the front end changes.
