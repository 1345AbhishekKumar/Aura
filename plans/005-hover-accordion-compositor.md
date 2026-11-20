# 005 — Replace the animated hover filter with a compositor-only overlay

- **Status**: TODO
- **Commit**: 77d20bf
- **Severity**: MEDIUM
- **Category**: Performance, Accessibility
- **Estimated scope**: 2 files, ~35 lines
- **Covers finding**: #8

## Problem

`components/sections/Features.tsx:52-63` (current):

```tsx
                    <motion.div
                        key={idx}
                        onHoverStart={() => setHoveredIndex(idx)}
                        onHoverEnd={() => setHoveredIndex(null)}
                        animate={{
                            flex: hoveredIndex === idx ? 3 : 1,
                            filter: hoveredIndex !== null && hoveredIndex !== idx ? "grayscale(100%) brightness(0.5)" : "grayscale(0%) brightness(1)"
                        }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="relative h-full rounded-2xl overflow-hidden cursor-pointer group flex-1"
                    >
                        <img src={card.img} alt={card.title} className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
```

Animating `filter` on three full-bleed images repaints every frame during a 500 ms hover transition. `grayscale()` and `brightness()` are not compositor properties. The `flex` change is layout, but it is intrinsic to the accordion design and low-frequency; this plan leaves it alone.

`components/sections/Architecture.tsx:86-101` animates only `flex` plus an image `scale` (transform), so it has no filter problem; it is included only for the reduced-motion duration guard.

## Target

### A. `components/sections/Features.tsx`

Add the reduced-motion hook:

```tsx
import { motion, useReducedMotion } from 'motion/react';
...
  const reduceMotion = useReducedMotion() ?? false;
```

Remove `filter` from the card animation:

```tsx
                        animate={{
                            flex: hoveredIndex === idx ? 3 : 1
                        }}
                        transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
```

Add a conditional grayscale class to the image and an overlay after it:

```tsx
                        <img
                            src={card.img}
                            alt={card.title}
                            className={`absolute inset-0 w-full h-full object-cover ${
                                hoveredIndex !== null && hoveredIndex !== idx ? 'grayscale' : ''
                            }`}
                        />
                        <motion.div
                            className="absolute inset-0 bg-black pointer-events-none"
                            animate={{ opacity: hoveredIndex !== null && hoveredIndex !== idx ? 0.5 : 0 }}
                            transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
                            aria-hidden="true"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
```

The overlay is inserted before the gradient and the text block, so the existing DOM order keeps the title and description above it. The grayscale class toggles in a single style change (one paint), while the 0.5 black overlay fades over it, masking the snap. The visual intent (dim + desaturate non-hovered cards) is preserved.

### B. `components/sections/Architecture.tsx` — reduced-motion duration only

Add the import and hook:

```tsx
import { motion, useReducedMotion } from 'motion/react';
...
  const reduceMotion = useReducedMotion() ?? false;
```

Change the flex transition and the image scale transition:

```tsx
                    transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.32, 0.72, 0, 1] }}
...
                        transition={{ duration: reduceMotion ? 0 : 0.5 }}
```

Do not change any other property.

## Repo conventions to follow

- Motion is imported from `motion/react` in this repo (`HeroSection.tsx:2`, `Features.tsx:2`).
- The strong ease-out used for these hover effects is `cubic-bezier(0.16, 1, 0.3, 1)` (`Features.tsx:60`); keep it.
- Existing overlay pattern: `components/sections/Features.tsx:64` already places a gradient overlay over the image, and the text block comes after it. Add to that stack rather than changing z-indexes.
- Tailwind provides the static `grayscale` utility; no custom CSS is needed.

## Steps

1. Update `Features.tsx`: import `useReducedMotion`, add the hook, remove `filter` from the card animation, add the conditional grayscale class, insert the overlay.
2. Update `Architecture.tsx`: import `useReducedMotion`, add the hook, gate the two transition durations.
3. Run the mechanical checks.

## Boundaries

- Do NOT remove the `flex` size change; that is the accordion interaction and replacing it would be a redesign.
- Do NOT use `backdrop-filter` or animate `filter` through a CSS class; the point is to remove per-frame repaint.
- Do NOT change the images, titles, descriptions, card dimensions, gradients or text position.
- Do NOT touch `SensoryPalette` beyond the two transition durations in Target B.
- Do NOT alter the unused `components/SupportBeyond.tsx` or `components/DeconstructedArchitecture.tsx`.

## Verification

- **Mechanical**: `bun run lint`, `bunx tsc --noEmit`, `bun run build`.
- **Feel check**:
  - Hover each of the three "Beyond a vacation" cards. The hovered card keeps its color and expands; the other two dim and desaturate at the same perceived rate as before.
  - The title and description remain above the dim overlay and are not tinted.
  - In DevTools Performance, record a hover. There should be no `filter` interpolation frames; only opacity/transform/composite work and the unavoidable flex layout.
  - With `prefers-reduced-motion: reduce` on, hovering changes state instantly with no 500 ms interpolation.
- **Done when**: no `filter` property is animated in `Features.tsx`, the hover state looks equivalent, and the reduced-motion durations are zero.
