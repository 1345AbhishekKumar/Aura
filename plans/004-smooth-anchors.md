# 004 — Smooth in-page anchor scrolling with nav offset

- **Status**: TODO
- **Commit**: 77d20bf
- **Severity**: MEDIUM
- **Category**: Smooth scrolling (missed opportunity)
- **Estimated scope**: 1 file, ~10 lines
- **Covers finding**: #7
- **Depends on**: 002 for the existing reduced-motion CSS block (optional; this plan includes the reset)

## Problem

The header links point at in-page sections:

`components/sections/Navigation.tsx:13-17` (current):

```tsx
                <a href="#rooms" className="nav-link hover-trigger text-white transition-colors">Rooms</a>
                <a href="#amenities" className="nav-link hover-trigger text-white transition-colors">Amenities</a>
                <a href="#experiences" className="nav-link hover-trigger text-white transition-colors">Experiences</a>
                <a href="#about-us" className="nav-link hover-trigger text-white transition-colors">About Us</a>
                <a href="#guest-portal" className="nav-link hover-trigger text-white transition-colors">Guest Portal</a>
```

There is no `scroll-behavior` rule in the app (grep for `scroll-behavior` returns nothing), so every anchor jumps instantly. The fixed header (`components/sections/Navigation.tsx:5`, `fixed top-0`) also covers the top of the target section after the jump because no `scroll-padding-top` is set.

## Target

Add to the top of `app/styles/base.css`, immediately after the `/* Base styles */` comment and before `body`:

```css
html {
    scroll-behavior: smooth;
    scroll-padding-top: 6rem;
}
```

If plan 002 is not applied, also add at the end of the same file:

```css
@media (prefers-reduced-motion: reduce) {
    html {
        scroll-behavior: auto;
    }
}
```

If plan 002 is already applied, do not add a second media block; verify its existing block contains:

```css
    html {
        scroll-behavior: auto;
    }
```

`6rem` clears the scrolled navbar (`py-4` = 2rem total vertical padding plus the 24px logo; `6rem` = 96px).

## Repo conventions to follow

- Global base rules live in `app/styles/base.css`, imported from `app/globals.css:14`.
- Reduced-motion overrides are grouped at the end of `app/styles/base.css` (plan 002).
- The site already uses native scrolling and passive scroll listeners; do not introduce a smooth-scroll library.

## Steps

1. Add the `html` rule at the top of `app/styles/base.css`.
2. Confirm the reduced-motion reset exists (add it only if plan 002 has not run).
3. Run the mechanical checks.

## Boundaries

- Do NOT add Lenis, Locomotive Scroll or any dependency.
- Do NOT change the anchor `href` values or the header markup.
- Do NOT change `scroll-padding-top` to a value below `5rem`; the fixed nav will overlap the target heading.
- Do NOT touch the scroll-linked JS; native smooth scrolling emits normal scroll events and works with the existing hooks.

## Verification

- **Mechanical**: `bun run lint`, `bunx tsc --noEmit`, `bun run build`.
- **Feel check**:
  - Click Rooms, Amenities, Experiences, About Us and Guest Portal from the top of the page. The page should glide rather than jump, and the section heading should land below the fixed navbar, not underneath it.
  - Click the logo (`href="#"`) and the skip link; both should behave normally.
  - Toggle DevTools → Rendering → `prefers-reduced-motion: reduce` and click each link again. Jumps should be instant.
  - Scroll manually during a smooth jump; user input should cancel the programmatic scroll (native behavior).
- **Done when**: all five nav anchors scroll smoothly on a normal preference and instantly under reduced motion, with target headings visible below the navbar.
