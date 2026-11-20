# Aura — Animation improvement plans

Audit baseline: commit `77d20bf`. These plans cover the 12 findings from the motion audit plus the 2 missed opportunities. No source files have been changed; each plan is self-contained and safe to hand to another agent.

## Execution order

Run the plans sequentially, top to bottom. They frequently touch the same files (`use-scroll-parallax.ts`, `base.css`, `components.css`, the hero sections), so they are not parallel-safe.

| Order | Plan | Covers | Depends on |
|---|---|---|---|
| 1 | `001-scroll-engine.md` | Findings #1, #3, #4, #5; fixes the navbar/progress-bar selector bugs | — |
| 2 | `002-reduced-motion.md` | Finding #2 | 001 |
| 3 | `003-pointer-gating-keyboard.md` | Finding #6 | 002 |
| 4 | `004-smooth-anchors.md` | Finding #7 | 002 |
| 5 | `005-hover-accordion-compositor.md` | Finding #8 | 002 |
| 6 | `006-transition-all.md` | Finding #9 | 001, 003, 005 |
| 7 | `007-motion-tokens.md` | Finding #10 | 001, 002, 003, 005, 006 |
| 8 | `008-testimonial-autoplay.md` | Finding #11 | 002 |
| 9 | `009-magic-cursor.md` | Finding #12 | 002, 003 |
| 10 | `010-dial-focus-label.md` | Missed opportunity: dial caption | 001 |
| 11 | `011-nav-scroll-spy.md` | Missed opportunity: nav active state | 001, 003 |

## Finding map

| Finding | Severity | Plan |
|---|---|---|
| #1 Scroll transitions couple progress, layout and DOM writes | HIGH | 001 |
| #2 No reduced-motion handling | MEDIUM | 002 |
| #3 Scroll handler reads layout every frame | MEDIUM | 001 |
| #4 Horizontal scroll lerp is frame-rate dependent | MEDIUM | 001 |
| #5 Progress bar is dead and label is fake | MEDIUM | 001 |
| #6 Hover-only interactions have no touch/keyboard parity | MEDIUM | 003 |
| #7 Anchor links jump; no smooth scroll | MEDIUM | 004 |
| #8 Hover accordion animates flex and filter | MEDIUM | 005 |
| #9 `transition: all` in six places | LOW | 006 |
| #10 Motion curves are duplicated, no tokens | LOW | 007 |
| #11 Testimonial autoplay never pauses and ARIA is stale | MEDIUM | 008 |
| #12 Magic cursor animates width/height and never stops | LOW | 009 |
| Missed | Dial "Currently Focused" card never updates | LOW | 010 |
| Missed | No nav scroll-spy active state | LOW | 011 |

## What changed in the audit

The audit was read-only. Two additional bugs were found while writing plan 001 and folded into it because they are in the same scroll code:

- `app/page.tsx` renders `id="progressBar"` but the hook queries `progress-bar`, so the progress bar never updates.
- `components/sections/Navigation.tsx` gives the logo and CTA only the classes `nav-logo`/`nav-cta`, but the hook queries IDs, so the navbar's scrolled style never activates.

Plan 001 fixes both by using the same selectors the markup actually has.

## How to execute a plan

1. Read the whole plan, especially `Boundaries`.
2. Apply the steps in order; do not pull in changes from another plan.
3. Run the plan's verification plus the repo checks below.
4. Mark the plan `Status: DONE` and note the commit when it lands.

Repo checks:

```powershell
bun run lint
bunx tsc --noEmit
bun run build
```

## Global boundaries

- No redesigns: layouts, copy, colors, images and section order stay as they are.
- No new animation libraries or dependencies.
- Preserve the existing visual identity; the changes are timing, compositing, accessibility and state feedback.
- Do not weaken the scroll-driven storytelling (pinned suite scroll, stack cards, dial) while making it cheaper.
- Do not add `will-change` to long-lived elements beyond the declarations the plans already specify.

## Plan status

| Plan | Status |
|---|---|
| 001 | TODO |
| 002 | TODO |
| 003 | TODO |
| 004 | TODO |
| 005 | TODO |
| 006 | TODO |
| 007 | TODO |
| 008 | TODO |
| 009 | TODO |
| 010 | TODO |
| 011 | TODO |
