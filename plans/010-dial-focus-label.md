# 010 — Sync the dial's "Currently Focused" card with the active label

- **Status**: TODO
- **Commit**: 77d20bf
- **Severity**: LOW
- **Category**: Missed opportunity (state change)
- **Estimated scope**: 1 file, ~35 lines
- **Depends on**: 001 for the dial block's current shape (recommended run 001 first)
- **Covers**: the first missed opportunity from the audit

## Problem

`components/sections/ImpactAndDial.tsx:103-106` (current):

```tsx
                    <div className="mt-12 p-8 border border-gray-200 rounded-3xl bg-gray-50/50">
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Currently Focused</span>
                        <h4 id="dial-label" className="text-3xl font-serif italic mt-2">Oceanfront Access</h4>
                    </div>
```

The five dial labels rotate as the user scrolls (`components/sections/ImpactAndDial.tsx:111-115`), and the hook changes their color/scale (`hooks/animations/use-scroll-parallax.ts:148-157`), but the card heading never changes. The section promises live focus feedback and shows a permanent "Oceanfront Access". The state change teleports nowhere; it simply never happens.

## Target

Add a caption reference and a WAAPI crossfade in `hooks/animations/use-scroll-parallax.ts`.

### A. Add the element query

Near the other dial queries (`const dialLabels = ...`):

```ts
    const dialCaption = document.getElementById('dial-label');
```

### B. Add the animation handle

Near `let activeDialIndex = -1;`:

```ts
    let dialCaptionAnimation: Animation | null = null;
```

### C. Update the caption when the active index changes

Inside the same `if (nextIndex !== activeDialIndex)` block as the label class toggles, immediately after the `dialLabels.forEach(...)`:

```ts
          if (dialCaption) {
            const nextLabel = dialLabels[nextIndex]?.textContent?.trim() ?? '';
            if (nextLabel && dialCaption.textContent !== nextLabel) {
              dialCaptionAnimation?.cancel();

              if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                dialCaption.textContent = nextLabel;
              } else {
                const fadeOut = dialCaption.animate(
                  [
                    { opacity: 1, transform: 'translateY(0)' },
                    { opacity: 0, transform: 'translateY(-4px)' },
                  ],
                  { duration: 100, easing: 'ease-out' }
                );
                dialCaptionAnimation = fadeOut;
                fadeOut.onfinish = () => {
                  dialCaption.textContent = nextLabel;
                  dialCaptionAnimation = dialCaption.animate(
                    [
                      { opacity: 0, transform: 'translateY(4px)' },
                      { opacity: 1, transform: 'translateY(0)' },
                    ],
                    { duration: 150, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
                  );
                };
              }
            }
          }
```

This runs only when `nextIndex !== activeDialIndex`, so it fires once per label change, not every scroll frame. The 100 ms out / 150 ms in split prevents the old and new strings from ever being visible at the same time. If the scroll reverses quickly, `cancel()` drops the previous animation and the next change starts cleanly from the current text.

If plan 002 is applied, you may replace the inline `matchMedia` check with `prefersReducedMotion()` from `@/lib/utils`. Either is correct.

## Repo conventions to follow

- Scroll-driven writes live in `useScrollAndParallax`; keep the caption update in the same dial block rather than adding a listener or hook.
- The 150 ms in-ease uses the repo's strong ease-out `cubic-bezier(0.16, 1, 0.3, 1)`; the out phase uses `ease-out` because it is a 100 ms disappearance.
- The section already uses `reveal-up` for its left column; do not add another reveal to the card.

## Steps

1. Add the `dialCaption` query and `dialCaptionAnimation` variable.
2. Add the caption update at the end of the dial index-change block.
3. Run the mechanical checks.

## Boundaries

- Do NOT change the dial layout, label positions, angles, colors or the card markup.
- Do NOT update the caption while the section is offscreen; it lives inside the existing in-view guard.
- Do NOT animate on every scroll frame; only on index changes.
- Do NOT change `ImpactAndDial.tsx`; this is a JS-only change.
- If the dial block still uses the pre-001 `activeIndex` variable, use that name; do not rename unrelated code.

## Verification

- **Mechanical**: `bun run lint`, `bunx tsc --noEmit`, `bun run build`.
- **Feel check**:
  - Scroll slowly through "Explore Our Destinations": the card headline should change in this order — Oceanfront Access → Spa & Wellness → Fine Dining → Nightlife → Excursions — matching the label that turns black/scales up.
  - Each swap should fade down/up over ~250 ms total with no overlapping strings and no flicker.
  - Scroll back up: the caption should reverse correctly.
  - Scroll quickly: no stack of competing animations; the final active label should be correct.
  - With reduced motion on: the text changes instantly, no fade or translate.
- **Done when**: the card heading always equals the active dial label and updates with a single short crossfade.
