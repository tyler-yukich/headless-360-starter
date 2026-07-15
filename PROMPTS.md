# PROMPTS — copy-paste blocks

The prompts from the *How I built a Headless 360 demo* canvas. Two paths: the default (you cloned this kit) and from-scratch (you didn't). Fill the `[brackets]`, paste, go.

## Default path — working in this kit

FRAMEWORK.md carries the build mechanics, so these are short handoffs and pass gates. Your agent (Claude Code, Cursor, or anything that reads AGENTS.md) picks up the detail from the repo.

### Hand over the brief (start here)

```
Here is the context brief from Slackbot: [paste]. Follow FRAMEWORK.md: narrative
spine first, and no code until I've signed off on the spine.
```

### Gate 1 — scaffold pass

```
Spine signed off. Run the scaffold pass from FRAMEWORK.md: rebrand the tokens,
then get every chapter walking end to end as stubs. Stop there so I can review.
```

### Gate 2 — initial UI build pass

```
Stubs approved. Run the build pass: real screens in spine order, kit primitives
first, per FRAMEWORK.md. Stop before polish.
```

### Gate 3 — polish pass

```
Run the polish pass from FRAMEWORK.md. Show me the ranked NOW / NEXT / LATER
list, apply the NOW tier, then verify every flow path end to end.
```

## Building from scratch — no kit

Self-contained versions that carry the full instructions, for when you're not starting from this repo.

### Narrative spine

```
I'm building a demo for [customer]. The audience is [names and roles]. Here is
the context brief: [paste from Slackbot]. Before any code, help me lock the
narrative: a persona with a name and a business, a one-sentence thesis, one
hero number that will appear in every chapter, a chapter-by-chapter arc (8 to 10
chapters, each with the persona's intent, the capability shown, and a specific
number), and at least one reversal moment where the story flips. Write it as
narrative-spine.md at the repo root; it will drive every build decision.
```

### Scaffold

```
Scaffold a mobile-first demo app: Next.js App Router, Tailwind, Framer Motion,
TypeScript. It simulates [product] for [persona]. The routes follow this
narrative spine: [paste your chapter list as routes]. This build is front-stage:
no live backend. Thread state through URL params so whatever I type live on
stage renders on every downstream screen. Build shared primitives first (a flow
layout with progress strip, form field, currency field with auto-comma,
bottom-sheet confirm, count-up number) and stub every route so the entire flow
walks end to end before any single screen gets real content.
```

### The phone frame

```
Render the entire app inside an iPhone frame so it reads as a phone product on
any screen. Build a PhoneFrame component: a fixed 390x844 viewport with a
rounded bezel, notch/dynamic island, and status bar, centered on a neutral page
background on desktop. On real mobile viewports, drop the frame and render the
app full-bleed. Put an overlay root inside the frame so toasts and bottom
sheets portal inside the phone, never over the page behind it. Every route
renders through this frame.
```

### Initial UI build

```
Build out each chapter's screen for real, in spine order. Respect the
real-world pattern notes in the brief: field order, processing durations,
credible service names. Keep every dollar figure, rate, and ID in
tabular-nums.
```

### Polish pass

```
Run a design review of every screen through separate lenses: typography, color,
spacing, visual hierarchy, motion, copy, mobile ergonomics, and leftover stubs.
Rank every finding NOW / NEXT / LATER with a one-line reason, then apply the
NOW tier. Then verify every flow path end to end before reporting done.
```

## Slackbot — manual fallback

The *Headless 360 Demo Briefer* Slackbot skill does all of this in one run. If you can't use the skill, these three prompts reproduce it:

### Account briefing + pressure test

```
Summarize #[account-channel] for me: account overview, active pipeline, and the
specific ask behind [use case]. Then pressure-test it: does this actually need a
custom front end, or would standard Experience Cloud cover it? Be honest about
the gaps either way.
```

### Research grounding

```
Research how real [category] products handle [the flow you're building], for
example [two or three named competitors]. What fields do they actually collect
and in what order? What do they deliberately skip? How long do their processing
states really take? Flag anything a practitioner in the room would call fake.
```

### The context brief

```
Write the context brief a coding agent needs to build this demo. Use exactly
these sections: 1. Use case (one sentence). 2. Business context. 3. Audience
and decision. 4. End user and their day. 5. Data model as Salesforce objects.
6. Brand direction plus two or three reference apps for the feel. 7. Hero-number
candidates with where each came from. 8. Constraints and guardrails. 9. Real-world
pattern notes from the research above. 10. Open questions. Keep it under a page
and a half. Specific numbers over adjectives. If a section is thin, say so
rather than padding it.
```
