# 002 — Honor prefers-reduced-motion across CSS and scroll effects

- **Status**: DONE
- **Commit**: 77d20bf
- **Severity**: MEDIUM
- **Category**: Accessibility
- **Estimated scope**: 7 files, ~180 lines
- **Depends on**: 001 for the current shape of `use-scroll-parallax.ts` (recommended order: run 001 first)
- **Covers finding**: #2

## Problem

There is no `prefers-reduced-motion` handling anywhere in the application:

- `app/styles/base.css` reveal and curtain animations.
- `app/styles/animations.css` slow zoom, float, parallax zoom, stack-card filters.
- `app/styles/components.css` magnetic buttons, service-row motion, underlines.
- `hooks/animations/use-scroll-parallax.ts` parallax, stack-card scale/blur, twin scan, dial rotation, horizontal smoothing.
- `hooks/animations/use-cursor-interactions.ts` magic cursor, diorama tilt, magnetic buttons, 3D tilt.
- `hooks/animations/use-intersection-physics.ts` 2-second counters.
- `components/sections/HeroSection.tsx` clip-path reveal, image zoom, slide-up text, booking bar.
- `TestimonialsAndServices.tsx` + `use-intersection-physics.ts` auto-advance every 5 seconds.

Reduced motion means fewer and gentler animations, not zero. Keep opacity/color feedback; drop position changes, parallax, blur and auto-movement.

## Target

### A. `lib/utils.ts` — shared check

Append:

```ts
export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}
```

### B. `app/styles/base.css` — global reduced-motion block

Append to the end of the file:

```css
/* Reduced motion: keep opacity/color feedback, drop movement */
@media (prefers-reduced-motion: reduce) {
    html {
        scroll-behavior: auto;
    }

    .reveal-up {
        transform: none;
        transition: opacity 200ms ease;
    }

    .reveal-clip {
        clip-path: none;
        opacity: 0;
        transition: opacity 200ms ease;
    }
    .reveal-clip.in-view {
        opacity: 1;
    }

    .curtain-container::after {
        display: none;
    }

    .line-draw {
        width: 100%;
        transition: none;
    }

    .highlight-draw {
        background-size: 100% 100%;
        transition: none;
    }

    .services-wrapper:hover .service-row:not(:hover) {
        filter: none;
    }

    .service-text,
    .service-row:hover .service-text {
        transform: none;
        transition: color 200ms ease;
    }

    .nav-link::after {
        transition: none;
    }

    .magnetic-btn,
    .magnetic-btn:hover,
    .magnetic-btn:active {
        transform: none;
    }

    .tilt-wrapper:hover .tilt-glare {
        opacity: 0;
        transform: translateX(-100%);
    }

    .zoom-img-container:hover .parallax-img {
        scale: 1.1;
    }

    .testimonial-slide {
        transition: opacity 150ms ease;
        filter: none !important;
    }

    .animate-slow-zoom,
    .animate-float,
    .animate-float-delayed {
        animation: none;
    }

    #magic-cursor {
        display: none;
    }

    body {
        cursor: auto;
    }
}
```

Note: this block assumes plan 001 set `.parallax-img { scale: 1.1; }`. If plan 001 has not run, add `transform: none;` instead of `scale: 1.1` and remove that line later when 001 lands.

### C. `hooks/animations/use-cursor-interactions.ts` — disable pointer-driven motion

At the top of the effect (before the magic-cursor query), add:

```ts
    if (prefersReducedMotion()) return;
```

Import the helper:

```ts
import { prefersReducedMotion } from '@/lib/utils';
```

This disables the magic cursor, diorama tilt, magnetic motion, 3D tilt, cursor trail, lens and scramble. The CSS already hides the custom cursor on touch; the reduced-motion CSS hides it here.

### D. `components/sections/HeroSection.tsx` — no entrance movement

Add the import and hook:

```tsx
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
...
  const reduceMotion = useReducedMotion() ?? false;
```

Replace the scroll transform:

```tsx
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
```

Replace the background reveal props (`HeroSection.tsx:19-28`):

```tsx
        <motion.div 
          initial={{ clipPath: reduceMotion ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" : "polygon(15% 15%, 85% 15%, 85% 85%, 15% 85%)" }}
          animate={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
          transition={{ duration: reduceMotion ? 0 : 1.8, ease: [0.76, 0, 0.24, 1] }}
          className="w-full h-full"
        >
          <motion.img 
            initial={{ scale: reduceMotion ? 1 : 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 2.5, ease: "easeOut" }}
```

Replace the eyebrow motion (`:39-42`):

```tsx
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0.2 : 1, delay: reduceMotion ? 0 : 1 }}
```

Replace both headline motions (`:51-64`):

```tsx
          <motion.h1 
            initial={{ y: reduceMotion ? "0%" : "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: reduceMotion ? 0 : 1.2, delay: reduceMotion ? 0 : 1.2, ease: [0.16, 1, 0.3, 1] }}
...
          <motion.h1 
            initial={{ y: reduceMotion ? "0%" : "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: reduceMotion ? 0 : 1.2, delay: reduceMotion ? 0 : 1.3, ease: [0.16, 1, 0.3, 1] }}
```

Replace the booking bar motion (`:73-77`):

```tsx
      <motion.div 
        initial={{ opacity: 0, y: reduceMotion ? 0 : 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0.2 : 1.2, delay: reduceMotion ? 0 : 1.8, ease: [0.16, 1, 0.3, 1] }}
```

Opacity fades remain — they are feedback, not movement.

### E. `hooks/animations/use-scroll-parallax.ts` — skip decorative scroll motion

Add the import:

```ts
import { prefersReducedMotion } from '@/lib/utils';
```

Inside the effect, after the element queries:

```ts
    const reduceMotion = prefersReducedMotion();

    if (reduceMotion) {
      parallaxImgs.forEach(el => {
        el.style.translate = '0 0%';
      });
      stackCards.forEach(el => {
        el.style.transform = 'scale(1) translateY(0)';
        el.style.filter = 'blur(0px) brightness(1)';
      });
      if (twinReal) twinReal.style.clipPath = 'inset(0 0 0 0)';
      if (scanLine) scanLine.style.display = 'none';
    }
```

Then in the read phase, skip collecting parallax and stack updates when reduced motion is on:

```ts
      const parallaxReads: Array<{ el: HTMLElement; yPos: number }> = [];
      if (!reduceMotion) {
        parallaxImgs.forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.top < viewportHeight && rect.bottom > 0) {
            parallaxReads.push({ el, yPos: (rect.top / viewportHeight) * 15 });
          }
        });
      }
```

```ts
      const stackReads: Array<{
        el: HTMLElement;
        transform: string;
        filter: string;
      }> = [];

      if (!reduceMotion) {
        stackCards.forEach(card => {
          // existing stack-card body unchanged
        });
      }
```

In the horizontal section block, replace the target-start branch with:

```ts
          if (Math.abs(nextTarget - hTargetX) > 0.1) {
            hTargetX = nextTarget;
            if (reduceMotion) {
              hCurrentX = hTargetX;
              applyHTrack();
            } else {
              startHScroll();
            }
          }
        } else if (hRect.top > 0 && hTargetX !== 0) {
          hTargetX = 0;
          if (reduceMotion) {
            hCurrentX = 0;
            applyHTrack();
          } else {
            startHScroll();
          }
        }
```

Keep the horizontal pin itself: it is the only way to reach the suite cards. Only the smoothing and decorative effects are removed.

Wrap the twin scan and dial blocks so they do not run:

```ts
      if (!reduceMotion && twinContainer && twinReal && scanLine && twinRect) {
        // existing body unchanged
      }

      if (!reduceMotion && dialContainer && mainDial && dialRect) {
        // existing body unchanged
      }
```

The navbar and progress bar keep updating — they are state feedback.

### F. `hooks/animations/use-intersection-physics.ts` — no count-up animation

Add the import:

```ts
import { prefersReducedMotion } from '@/lib/utils';
```

Inside the effect:

```ts
    const reduceMotion = prefersReducedMotion();
```

In `animateCounter`, after reading `target`:

```ts
        if (reduceMotion) {
            el.innerText = target.toString() + (el.getAttribute('data-suffix') || '');
            return;
        }
```

The testimonial autoplay and ARIA are handled by plan 008. This plan only makes its crossfade instantaneous via the CSS `.testimonial-slide` rule above.

## Repo conventions to follow

- Media-query gating already exists in this repo: `app/styles/base.css:38-42` uses `@media (hover: none) and (pointer: coarse)` to hide the cursor; follow that placement style.
- The repo keeps all global CSS under `app/styles/` and imports it from `app/globals.css`. Put the reduced-motion block at the end of `app/styles/base.css`.
- Motion components already import from `motion/react`; use `useReducedMotion` from the same package rather than a custom hook.
- Existing curve: `cubic-bezier(0.16, 1, 0.3, 1)` remains the strong ease-out for any CSS you touch.

## Steps

1. Add `prefersReducedMotion()` to `lib/utils.ts`.
2. Append the CSS block in Target B to `app/styles/base.css`.
3. Add the early return in `use-cursor-interactions.ts`.
4. Add `useReducedMotion` branches in `HeroSection.tsx` (Target D).
5. Add reduced-motion guards in `use-scroll-parallax.ts` (Target E).
6. Add the counter shortcut in `use-intersection-physics.ts` (Target F).
7. Run the mechanical checks.

## Boundaries

- Do NOT stop all animation. Keep opacity/color transitions; keep the horizontal pin and anchor navigation usable.
- Do NOT change the page layout, copy, spacing, colors, or image URLs.
- Do NOT touch `TestimonialsAndServices.tsx`, `Features.tsx`, or `Architecture.tsx`; plan 005 and plan 008 own those.
- Do NOT add a media-query library or dependency.
- If the scroll hook differs because plan 001 has not been applied, apply the equivalent guards to the current code and note the dependency in the PR/commit.
- The preference is read once per mount. Do not add change listeners in this plan; that is a follow-up, not required for correctness.

## Verification

- **Mechanical**: `bun run lint`, `bunx tsc --noEmit`, `bun run build`.
- **Feel check**: open DevTools → Rendering → set `prefers-reduced-motion: reduce`, then reload.
  - Hero: content fades in place; no clip-path expansion, no image zoom, no slide-up; booking bar fades in immediately.
  - Scroll: no parallax translation on section images; stack cards stay flat; twin scan is fully revealed with no scan line; dial does not rotate.
  - Hover: no magnetic movement, 3D tilt, glow sweep or service-text rotation; color/underline/opacity feedback still works.
  - Cursor: native cursor is visible; the custom dot is gone.
  - Counters: the final numbers appear immediately when scrolled into view.
  - Exclusive Suites: the horizontal section still moves as you scroll, but without easing lag; the cards are readable.
- **Done when**: with reduced motion on, there is no position/scale/parallax motion, but all content is reachable and state changes (navbar, progress, hover colors) still work.
