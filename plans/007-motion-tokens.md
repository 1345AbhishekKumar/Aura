# 007 — Add shared motion tokens and consolidate the duplicated curves

- **Status**: TODO
- **Commit**: 77d20bf
- **Severity**: LOW
- **Category**: Cohesion
- **Estimated scope**: 6 files, mechanical replacements
- **Covers finding**: #10
- **Recommended after**: 001, 002, 003, 005 and 006 (so the new declarations are included)

## Problem

The same four curves are hand-typed 19 times across CSS and TSX:

- `cubic-bezier(0.16, 1, 0.3, 1)` — the repo's strong ease-out.
- `cubic-bezier(0.77, 0, 0.175, 1)` — the strong ease-in-out.
- `cubic-bezier(0.86, 0, 0.07, 1)` — the nav underline.
- `cubic-bezier(0.32, 0.72, 0, 1)` / `[0.32, 0.72, 0, 1]` — the drawer/accordion curve in `Architecture.tsx:91`.

Five hand-typed values that almost match is how motion drifts. The values themselves are good: `0.16, 1, 0.3, 1` is this repo's deliberate strong ease-out (already used in `app/styles/animations.css:33` and `app/styles/components.css:10`), and it is stronger than the CSS built-ins. Tokenize the existing values; do not introduce a competing curve.

## Target

### A. `app/styles/base.css` — CSS tokens

Add at the top of `app/styles/base.css`, after the `/* Base styles */` comment (before `html`/`body`):

```css
:root {
    --motion-ease-out: cubic-bezier(0.16, 1, 0.3, 1);
    --motion-ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
    --motion-ease-elastic: cubic-bezier(0.86, 0, 0.07, 1);
}
```

Use `--motion-*` names, not `--ease-out`: Tailwind v4 already ships an `--ease-out` theme variable used by utilities such as `ease-out` (`TestimonialsAndServices.tsx:73`), and overriding it would silently change Tailwind utility behavior.

### B. `lib/motion.ts` — JS tokens

Create the file:

```ts
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_DRAWER: [number, number, number, number] = [0.32, 0.72, 0, 1];
export const EASE_CLIP: [number, number, number, number] = [0.76, 0, 0.24, 1];
```

### C. CSS replacements

Replace the curve literals with tokens. Keep durations and delays exactly as they are.

`app/styles/base.css`:
- Line 22 (`#magic-cursor` width/height transition, two occurrences) → `var(--motion-ease-out)`.
- Line 60 (`.reveal-up`, after plan 006 it has two occurrences) → `var(--motion-ease-out)`.
- Lines 75 (`.reveal-clip`) and 94 (`.curtain-container::after`) → `var(--motion-ease-in-out)`.

`app/styles/animations.css`:
- Line 33 (`.footer-reveal`) → `var(--motion-ease-out)`.
- Line 42 (`.counter-val`) → `var(--motion-ease-out)`.
- Line 93 (`.hero-blind`) → `var(--motion-ease-in-out)`.
- Line 123 (`entranceUp` animation timing) → `var(--motion-ease-out)`.
- Line 139 (`.parallax-img`; after plan 001 it is `transition: scale 0.8s ...`) → `var(--motion-ease-out)`.

`app/styles/components.css`:
- Lines 10, 40, 51, 59, 71, 82, 115 → `var(--motion-ease-out)`.
- Line 148 (`.nav-link::after`) → `var(--motion-ease-elastic)`.

`app/styles/sections.css`:
- Line 38 (`.trail-img` transform transition) → `var(--motion-ease-out)`.

### D. TSX replacements

Import from `@/lib/motion`:

```tsx
import { EASE_CLIP, EASE_OUT, EASE_DRAWER } from '@/lib/motion';
```

`components/sections/HeroSection.tsx`:
- Line 22 → `ease: EASE_CLIP`
- Lines 54 and 64 → `ease: EASE_OUT`
- Line 28 (image) → replace `ease: "easeOut"` with `ease: EASE_OUT`
- Line 76 → `ease: EASE_OUT`

`components/sections/Features.tsx`:
- Line 60 → `ease: EASE_OUT`
- Plan 005 adds a second transition on the overlay with the same curve; use `EASE_OUT` there too.

`components/sections/Architecture.tsx`:
- Line 91 → `ease: EASE_DRAWER`

Leave the unused `components/SupportBeyond.tsx` and `components/DeconstructedArchitecture.tsx` untouched.

## Repo conventions to follow

- Theme tokens live in `app/globals.css` under `@theme` (`:3-12`); plain custom properties that are not Tailwind utilities belong in `app/styles/base.css` `:root`.
- The repo's strong ease-out is `cubic-bezier(0.16, 1, 0.3, 1)`; it is the de facto convention and should be the token value, not a new `0.23, 1, 0.32, 1` curve. Introducing a second, slightly different ease-out would be the exact drift this plan removes.
- TSX animations already use tuple eases; `lib/motion.ts` gives them one import instead of repeated arrays.

## Steps

1. Add the `:root` block to `app/styles/base.css`.
2. Create `lib/motion.ts`.
3. Replace every CSS literal listed in Target C.
4. Update the three TSX files in Target D and their imports.
5. Run the mechanical checks and the final search in Verification.

## Boundaries

- Do NOT change any duration, delay, spring config or keyframe percentage.
- Do NOT replace the `ease`, `ease-in-out`, `linear` or `ease-out` keywords used by unrelated effects (e.g. `.service-row`, `.animate-float`).
- Do NOT rename or remove Tailwind's built-in `--ease-*` variables.
- Do NOT touch the unused component files.
- If a cited line has moved because earlier plans ran, replace the equivalent literal; do not revert earlier behavior.

## Verification

- **Mechanical**: `bun run lint`, `bunx tsc --noEmit`, `bun run build`.
- **Search**: under `app/styles/`, `components/` and `hooks/`, `cubic-bezier(` should only match the three token definitions in `app/styles/base.css`. `[0.16, 1, 0.3, 1]`, `[0.32, 0.72, 0, 1]` and `[0.76, 0, 0.24, 1]` should only match `lib/motion.ts`. The `.agents/` folder is out of scope.
- **Feel check**: re-run the main hover/scroll checks from plans 001, 003 and 005; nothing should change perceptibly.
- **Done when**: no duplicated curve literals remain, and the computed transitions still show the same cubic-bezier values.
