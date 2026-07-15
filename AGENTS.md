# Agent notes for this repo

## This is NOT the Next.js you know

This project pins a recent Next.js major. APIs, conventions, and file structure may differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code, and heed deprecation notices.

## Start here

Read `FRAMEWORK.md` — it defines the build method (context brief in, narrative spine first, routes, passes, polish). `PROMPTS.md` holds the standard prompts the SE may paste at you; treat them as the intended workflow.

## Repo conventions

- Every route renders inside `components/PhoneFrame.tsx` and uses `components/FlowLayout.tsx`. Never render outside the phone.
- Brand lives in exactly two places: token **values** in `app/globals.css` (never rename the tokens) and `components/BrandMark.tsx`. Rebranding touches nothing else.
- State threads through URL params between routes; there is no backend. Client pages that read `useSearchParams` wrap in `<Suspense>`.
- Every numeric figure (dollars, rates, IDs) carries the `.tabular` class.
- Every animation respects `prefers-reduced-motion` (`useReducedMotion` from framer-motion).
- Prefer the existing primitives (`FormField`, `CurrencyField`, `SelectField`, `ConfirmSheet`, `CountUp`) over new components.
- Verify with `npm run build` before declaring any change done.
