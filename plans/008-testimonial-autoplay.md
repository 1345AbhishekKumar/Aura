# 008 — Fix testimonial autoplay, ARIA state and the raw crossfade

- **Status**: TODO
- **Commit**: 77d20bf
- **Severity**: MEDIUM
- **Category**: Accessibility, Cohesion
- **Estimated scope**: 3 files, ~60 lines
- **Covers finding**: #11
- **Depends on**: 002 for the reduced-motion CSS override (this plan updates it)

## Problem

`hooks/animations/use-intersection-physics.ts:61-70` (current):

```ts
    // --- Testimonial Slider ---
    const nextSlide = () => {
        if (tSlides.length === 0) return;
        tSlides[currentSlide].classList.remove('opacity-100', 'z-10');
        tSlides[currentSlide].classList.add('opacity-0', 'z-0');
        currentSlide = (currentSlide + 1) % tSlides.length;
        tSlides[currentSlide].classList.remove('opacity-0', 'z-0');
        tSlides[currentSlide].classList.add('opacity-100', 'z-10');
    };
    let slideInterval = setInterval(nextSlide, 5000);
```

Problems:

- Autoplay runs forever with no pause on hover, focus or hidden tab.
- `app/styles/animations.css:149-151` uses `transition: opacity 0.5s ease`, so both quotes are partially visible during the swap — visibly double-exposed text.
- `components/sections/TestimonialsAndServices.tsx:14-37` hardcodes `aria-hidden="true"` on the second slide and never updates it. When slide 2 becomes visible, screen readers still skip it; slide 1 stays exposed after it fades out. The parent also has `aria-live="polite"`, which would announce an updating carousel if the text changed.
- There is no reduced-motion shortcut; plan 002 only shortens the CSS transition.

## Target

### A. `components/sections/TestimonialsAndServices.tsx` — state classes and ARIA

On the wrapper `:14`, remove `aria-live`:

```tsx
                <div className="relative min-h-[300px] reveal-up">
```

First slide `:17`:

```tsx
                        <div className="testimonial-slide is-active absolute top-0 left-0 w-full">
```

Second slide `:27`:

```tsx
                        <div className="testimonial-slide absolute top-0 left-0 w-full" aria-hidden="true">
```

Do not change the quote content, metadata or star markup. The `min-h-[300px]` container keeps the absolute slides from collapsing.

### B. `app/styles/animations.css` — blurred crossfade

Replace the existing `.testimonial-slide` rule (`:149-151`) with:

```css
.testimonial-slide {
    opacity: 0;
    z-index: 0;
    filter: blur(2px);
    pointer-events: none;
    transition: opacity 150ms ease-out, filter 150ms ease-out;
}
.testimonial-slide.is-active {
    opacity: 1;
    z-index: 10;
    filter: blur(0);
    pointer-events: auto;
    transition-duration: 200ms;
}
```

Also update plan 002's reduced-motion rule (it may be in `app/styles/base.css` or wherever 002 placed it) to include the active selector:

```css
@media (prefers-reduced-motion: reduce) {
    .testimonial-slide,
    .testimonial-slide.is-active {
        transition: none;
        filter: none;
    }
}
```

### C. `hooks/animations/use-intersection-physics.ts` — pause + ARIA sync

Replace the testimonial block (`:61-70`) with:

```ts
    // --- Testimonial Slider ---
    const slides = Array.from(tSlides) as HTMLElement[];
    let currentSlide = 0;
    let slideInterval: ReturnType<typeof setInterval> | undefined;

    const showSlide = (nextIndex: number) => {
        slides.forEach((slide, index) => {
            const isActive = index === nextIndex;
            slide.classList.toggle('is-active', isActive);
            if (isActive) {
                slide.removeAttribute('aria-hidden');
            } else {
                slide.setAttribute('aria-hidden', 'true');
            }
        });
        currentSlide = nextIndex;
    };

    const nextSlide = () => {
        if (slides.length < 2) return;
        showSlide((currentSlide + 1) % slides.length);
    };

    const testimonialContainer = document.getElementById('testimonial-container');

    const stopSlides = () => {
        if (slideInterval) {
            clearInterval(slideInterval);
            slideInterval = undefined;
        }
    };

    const startSlides = () => {
        stopSlides();
        if (!document.hidden && slides.length > 1) {
            slideInterval = setInterval(nextSlide, 5000);
        }
    };

    if (testimonialContainer) {
        testimonialContainer.addEventListener('pointerenter', stopSlides);
        testimonialContainer.addEventListener('pointerleave', startSlides);
        testimonialContainer.addEventListener('focusin', stopSlides);
        testimonialContainer.addEventListener('focusout', startSlides);
    }

    const onVisibilityChange = () => {
        if (document.hidden) stopSlides();
        else startSlides();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    showSlide(0);
    startSlides();
```

Update the cleanup (`:153-159`) to:

```ts
    return () => {
        observer.disconnect();
        stopSlides();
        document.removeEventListener('visibilitychange', onVisibilityChange);
        if (testimonialContainer) {
            testimonialContainer.removeEventListener('pointerenter', stopSlides);
            testimonialContainer.removeEventListener('pointerleave', startSlides);
            testimonialContainer.removeEventListener('focusin', stopSlides);
            testimonialContainer.removeEventListener('focusout', startSlides);
        }
        physicsActive = false;
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('pointermove', handlePointerMove);
    };
```

`showSlide(0)` normalizes the initial `aria-hidden` state: slide 1 exposed, slide 2 hidden.

Autoplay continues under reduced motion, but the CSS override makes the swap instantaneous so it is a content change, not an animation. This keeps both quotes reachable (there are no manual slide controls).

## Repo conventions to follow

- Auto-advance is assembled in the same effect as the intersection observer (`use-intersection-physics.ts`); keep the slider there instead of adding a new hook.
- The site uses 400 ms class-based opacity transitions elsewhere; the 150/200 ms asymmetric timings above are deliberate because text crossfades read as smeared past ~250 ms.
- The AUDIT curve for UI opacity is `ease-out`; the existing `ease-out` keyword is fine for a 150–200 ms fade.
- `@media (prefers-reduced-motion: reduce)` blocks live at the end of `app/styles/base.css` (plan 002).

## Steps

1. Update the two slide wrappers in `TestimonialsAndServices.tsx` and remove `aria-live` from the parent.
2. Replace the `.testimonial-slide` CSS and extend the reduced-motion rule.
3. Replace the slider JS and the cleanup in `use-intersection-physics.ts`.
4. Run the mechanical checks.

## Boundaries

- Do NOT change the quotes, names, stars, dates, section layout or typography.
- Do NOT add previous/next buttons or a visible pause control; this plan only adds hover/focus pause and correct ARIA.
- Do NOT stop autoplay permanently under reduced motion; the instant swap keeps the second quote reachable.
- Do NOT change the 5-second interval.
- Do NOT touch the counters, physics well or activation observer in the same hook.

## Verification

- **Mechanical**: `bun run lint`, `bunx tsc --noEmit`, `bun run build`.
- **Feel check**:
  - Wait 5 seconds: slide 2 fades in with a 2px blur mask; the two quotes should not visibly double-expose as overlapping opacity layers.
  - Hover the quote area: the interval stops and does not advance. Move away: it resumes.
  - Tab into/out of any focusable content inside the container (if present): autoplay pauses/resumes.
  - Hide the tab for 10 seconds, return: it should start from the current slide, not fast-forward through missed cycles.
  - In DevTools, inspect both `.testimonial-slide` elements: only the active one should omit `aria-hidden`; the other should have `aria-hidden="true"`.
  - Toggle `prefers-reduced-motion: reduce`: the quote swap is instant with no blur/opacity animation; content still advances and pauses on hover.
- **Done when**: autoplay pauses on hover/focus/hidden tab, ARIA follows the visible slide, and the crossfade has no raw double exposure.
