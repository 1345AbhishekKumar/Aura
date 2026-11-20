# 003 — Gate hover motion to pointer devices and give keyboard users the same state

- **Status**: TODO
- **Commit**: 77d20bf
- **Severity**: MEDIUM
- **Category**: Accessibility, Physicality
- **Estimated scope**: 4 files, ~70 lines
- **Covers finding**: #6

## Problem

### Touch devices fire hover state

`hooks/animations/use-cursor-interactions.ts:27-89` attaches pointer listeners unconditionally:

```ts
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    hoverElements.forEach(el => {
        el.addEventListener('pointerenter', () => cursor?.classList.add('cursor-hovering'));
        el.addEventListener('pointerleave', () => cursor?.classList.remove('cursor-hovering'));
    });

    // --- Magnetic Buttons ---
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('pointermove', (e: Event) => {
...
    // --- 3D Tilt Effect ---
    const tiltWrappers = document.querySelectorAll('.tilt-wrapper');
```

On a touch screen a tap fires `pointerenter`/`pointermove`, so magnetic buttons move under the finger, tilt cards rotate, and the diorama keeps a transform after the tap. The custom CSS `:hover` rules do the same for service rows and the nav underline.

### Hover-only content has no keyboard path

`components/sections/TestimonialsAndServices.tsx:61-102`: the service description (`.service-desc`), the arrow rotation and the black slide-up overlay are revealed only by `:hover` / `group-hover:`. `app/styles/components.css:106-130` confirms:

```css
.service-row .service-desc {
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.4s ease;
}
.service-row:hover .service-desc {
    opacity: 1;
    transform: translateY(0);
}
```

A keyboard user who tabs to the row gets the focus ring but never sees the description, the arrow state or the overlay.

## Target

### A. `hooks/animations/use-cursor-interactions.ts` — bail out on coarse pointers

At the start of the effect, before the cursor query:

```ts
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!canHover) return;
```

Place it before `const cursor = document.getElementById('magic-cursor')`. The cursor is already hidden on touch by `app/styles/base.css:38-42`; this also prevents the invisible work.

If plan 002 has already run, keep both:

```ts
    if (!canHover) return;
    if (prefersReducedMotion()) return;
```

### B. `app/styles/components.css` — wrap hover motion in a capability query

Replace the existing hover blocks with the following. Base (non-hover) styles stay untouched.

```css
@media (min-width: 768px) and (hover: hover) and (pointer: fine) {
    .arrow-container:hover .arrow-item {
        flex: 1;
    }
    .arrow-container .arrow-item:hover {
        flex: 2.5;
        filter: grayscale(0);
    }
}

@media (hover: hover) and (pointer: fine) {
    .step-row:hover {
        transform: translateX(20px);
    }

    .magnetic-btn:hover {
        transform: scale(1.02);
        box-shadow: 0 15px 30px -10px rgba(0,0,0,0.3);
    }
    .bg-white.magnetic-btn:hover {
        box-shadow: 0 15px 30px -10px rgba(255,255,255,0.3);
    }
    .magnetic-btn:hover::after {
        transform: translateY(0);
        border-radius: 0;
    }

    .services-wrapper:hover .service-row:not(:hover) {
        opacity: 0.3;
        filter: blur(4px);
    }
    .service-row:hover .service-text {
        transform: scale(1.05) rotateZ(-2deg);
        color: #ffffff;
    }
    .service-row:hover .service-desc {
        opacity: 1;
        transform: translateY(0);
    }

    .nav-link:hover::after {
        transform: scaleX(1);
        transform-origin: left;
    }
}
```

Delete the now-duplicated `.arrow-container:hover` block at `:14-22`, `.step-row:hover` at `:61-63`, the magnetic hover rules at `:87-97`, the service hover rules at `:109-130`, and `.nav-link:hover::after` at `:150-153`. Keep inert base styles such as `.arrow-item`, `.magnetic-btn::after`, `.service-text` and `.nav-link::after`. Keep `.magnetic-btn:active` outside the query — press feedback must work on touch and keyboard.

Add keyboard parity rules after the capability query:

```css
.nav-link:focus-visible::after {
    transform: scaleX(1);
    transform-origin: left;
}

.services-wrapper:focus-within .service-row:not(:focus-visible) {
    opacity: 0.3;
    filter: blur(4px);
}
.service-row:focus-visible .service-text {
    transform: scale(1.05) rotateZ(-2deg);
    color: #ffffff;
}
.service-row:focus-visible .service-desc {
    opacity: 1;
    transform: translateY(0);
}
```

### C. `app/styles/animations.css` — gate the glare and zoom

Move the hover rules into the same capability query:

```css
@media (hover: hover) and (pointer: fine) {
    .tilt-wrapper:hover .tilt-glare {
        opacity: 1;
        transform: translateX(100%);
        transition: transform 1.5s ease-in-out;
    }
    .zoom-img-container:hover .parallax-img {
        scale: 1.05;
    }
}
```

If plan 001 has not run yet, the zoom rule is still `transform: scale(1.05) translateY(0) !important;`; keep that declaration for now and note the dependency. Do not leave a duplicate copy outside the query.

### D. `components/sections/TestimonialsAndServices.tsx` — keyboard-visible state

For all three service rows, add `group-focus-visible:rotate-0` to the arrow SVG:

```tsx
<svg className="w-12 h-12 text-white transform -rotate-45 group-hover:rotate-0 group-focus-visible:rotate-0 transition-transform duration-500" ...>
```

Add `group-focus-visible:translate-y-0` to the black overlay:

```tsx
<div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-transform duration-500 ease-out z-0" aria-hidden="true"></div>
```

The third row (`:89`) is missing the focus ring that the first two have. Give its anchor the same classes:

```tsx
<a href="#" className="service-row group block border-b border-gray-800 py-12 px-6 bg-transparent relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset">
```

## Repo conventions to follow

- The repo already gates input capability in CSS: `app/styles/base.css:38-42` wraps the custom cursor in `@media (hover: none) and (pointer: coarse)`.
- Tailwind's `hover:` variant is already capability-gated in Tailwind v4; this plan only fixes the hand-written `:hover` rules and the JS listeners.
- Existing focus style exemplar: `TestimonialsAndServices.tsx:61` uses `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset`. Reuse it verbatim.

## Steps

1. Add the `canHover` early return to `use-cursor-interactions.ts`.
2. Restructure the hover rules in `components.css` into the two capability media queries and add the focus rules.
3. Move the glare/zoom hover rules in `animations.css` into a capability query.
4. Add the `group-focus-visible` classes to all three service rows and the missing focus ring to row three.
5. Run the mechanical checks.

## Boundaries

- Do NOT remove `.magnetic-btn:active` press feedback; it must remain for pointer and keyboard activation.
- Do NOT change colors, spacing, fonts, images or the text content of the service rows.
- Do NOT gate `:focus-visible` styles behind hover media; focus works on every input type.
- Do NOT touch the testimonial slider, reduced-motion block, scroll hook or hero; other plans own those.
- If plan 001 has not run, apply the zoom-rule equivalent described above instead of the `scale: 1.05` version.

## Verification

- **Mechanical**: `bun run lint`, `bunx tsc --noEmit`, `bun run build`.
- **Feel check**:
  - DevTools device emulation (touch): tap a magnetic button, a tilt card and a service row. No transform should stick after release; the page should not tilt from a tap-drag.
  - Desktop mouse: service rows still dim their siblings, show the description, rotate the arrow and slide the black overlay up; nav underline still sweeps.
  - Keyboard: Tab through the header; the underline appears on the focused nav link. Tab through the three service rows; the focused row reveals its description, rotates its arrow, slides the overlay and dims the others. The focus ring is visible on all three.
  - With reduced motion (if plan 002 applied), confirm the focus states remain but transforms are removed.
- **Done when**: no touch device leaves a stuck hover transform, and every hover-only state has an equivalent `:focus-visible` state.
