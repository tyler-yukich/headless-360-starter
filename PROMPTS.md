# PROMPTS — copy-paste blocks from the canvas

Every prompt from *How I built a Headless 360 demo with Claude Code*, in build order. Fill the `[brackets]`, paste, go.

## Slackbot — account briefing + pressure test

```
Summarize #[account-channel] for me: account overview, active pipeline, and the
specific ask behind [use case]. Then pressure-test it: does this actually need a
custom front end, or would standard Experience Cloud cover it? Be honest about
the gaps either way.
```

## Slackbot — research grounding

```
Research how real [category] products handle [the flow you're building], for
example [two or three named competitors]. What fields do they actually collect
and in what order? What do they deliberately skip? How long do their processing
states really take? Flag anything a practitioner in the room would call fake.
```

## Slackbot — the context brief

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

(Or run the *Headless 360 Demo Briefer* Slackbot skill, which does all three.)

## Claude Code — narrative spine

```
Here is the context brief: [paste from Slackbot]. Before any code, help me lock
the narrative: a persona with a name and a business, a one-sentence thesis, one
hero number that will appear in every chapter, a chapter-by-chapter arc (8 to 10
chapters, each with the persona's intent, the capability shown, and a specific
number), and at least one reversal moment where the story flips. Write it as
narrative-spine.md at the repo root; it will drive every build decision.
```

## Claude Code — scaffold

```
Using narrative-spine.md, replace the sample flow with the real chapters: every
chapter becomes a route rendered inside PhoneFrame with FlowLayout. Thread state
through URL params so whatever I type live on stage renders on every downstream
screen. This build is front-stage: no live backend. Get the entire flow walking
end to end as stubs before any single screen gets real content.
```

## Claude Code — the phone frame (if starting from scratch instead of this kit)

```
Render the entire app inside an iPhone frame so it reads as a phone product on
any screen. Build a PhoneFrame component: a fixed 390x844 viewport with a
rounded bezel, notch/dynamic island, and status bar, centered on a neutral page
background on desktop. On real mobile viewports, drop the frame and render the
app full-bleed. Put an overlay root inside the frame so toasts and bottom
sheets portal inside the phone, never over the page behind it. Every route
renders through this frame.
```

## Claude Code — initial UI build

```
Build out each chapter's screen for real, in spine order. Use the kit
primitives first (FormField, CurrencyField, SelectField, ConfirmSheet, CountUp)
before writing anything new. Respect the real-world pattern notes in the brief:
field order, processing durations, credible service names. Keep every dollar
figure, rate, and ID on the .tabular class.
```

## Claude Code — polish pass

```
Run a design review of every screen through separate lenses: typography, color,
spacing, visual hierarchy, motion, copy, mobile ergonomics, and leftover stubs.
Rank every finding NOW / NEXT / LATER with a one-line reason, then apply the
NOW tier. Then verify every flow path end to end before reporting done.
```
