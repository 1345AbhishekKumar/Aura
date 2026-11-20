# 011 — Add a scroll-spy active state to the navigation

- **Status**: TODO
- **Commit**: 77d20bf
- **Severity**: LOW
- **Category**: Missed opportunity (state change)
- **Estimated scope**: 1 new file, 2 edits, ~50 lines
- **Depends on**: 001 for the navbar selector fix and 003 for the hover media-query split
- **Covers**: the second missed opportunity from the audit

## Problem

The navbar links (`components/sections/Navigation.tsx:11-16`) point at page sections but never indicate which section is in view. The only nav feedback is the hover underline (`app/styles/components.css:141-154`), which disappears as soon as the pointer leaves. On a long one-page site, the user has no persistent "you are here" signal.

## Target

### A. New file — `hooks/animations/use-active-section.ts`

```ts
import { useEffect } from 'react';

const SECTION_IDS = ['rooms', 'amenities', 'experiences', 'about-us', 'guest-portal'] as const;

export function useActiveSection() {
    useEffect(() => {
        const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.nav-link'));
        const sections = SECTION_IDS
            .map((id) => document.getElementById(id))
            .filter((section): section is HTMLElement => section !== null);

        if (links.length === 0 || sections.length === 0) return;

        const setActive = (activeId: string) => {
            links.forEach((link) => {
                const isActive = activeId !== '' && link.getAttribute('href') === `#${activeId}`;
                link.classList.toggle('is-active', isActive);
                if (isActive) {
                    link.setAttribute('aria-current', 'location');
                } else {
                    link.removeAttribute('aria-current');
                }
            });
        };

        const visibleSections = new Set<string>();

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        visibleSections.add(entry.target.id);
                    } else {
                        visibleSections.delete(entry.target.id);
                    }
                });

                if (visibleSections.size === 0) {
                    setActive('');
                    return;
                }

                const center = window.innerHeight / 2;
                const activeId = sections.find((section) => {
                    const rect = section.getBoundingClientRect();
                    return rect.top <= center && rect.bottom > center;
                })?.id;

                if (activeId) setActive(activeId);
            },
            { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);
}
```

The 10%-tall viewport band gates when the callback runs; the `getBoundingClientRect` check then picks the one section that actually contains the viewport center. This is deterministic even during the brief overlap when two sections touch the band, and it does not depend on the nav link order (the nav lists Experiences before About Us, while the page renders About Us first). The rect reads happen only when the observer fires at a band boundary, not on every scroll frame. Clearing on an empty set removes the active state in the hero above the first tracked section.

### B. `hooks/use-vanilla-animations.ts` — call the hook

```ts
import { useActiveSection } from './animations/use-active-section';
```

Add `useActiveSection();` to the aggregator alongside the existing three hooks. Order does not matter; the hooks are independent.

### C. `app/styles/components.css` — active underline

The existing hover rule is:

```css
.nav-link:hover::after {
    transform: scaleX(1);
    transform-origin: left;
}
```

After plan 003, this sits inside an `@media (hover: hover) and (pointer: fine)` block. Add a separate, unconditional rule at top level, after that block:

```css
.nav-link.is-active::after {
    transform: scaleX(1);
    transform-origin: left;
}
```

This must be outside the hover media query so the active underline appears on touch devices too. The base `.nav-link::after` already provides the 2px bar, the `scaleX(0)` start and the elastic 400 ms transition; no other CSS is needed.

If plan 007 is applied, the base transition uses `var(--motion-ease-elastic)` automatically. Do not add a second transition to the active rule.

## Repo conventions to follow

- Behavioral hooks live in `hooks/animations/` and are composed in `hooks/use-vanilla-animations.ts`; follow the existing `useEffect` + DOM-query pattern (`use-scroll-parallax.ts`, `use-cursor-interactions.ts`).
- Use `classList.toggle` and `setAttribute` instead of React state; the navbar is a server-rendered component and the rest of the motion layer is imperative.
- `<a aria-current="location">` is valid for a link that points to the current location in a set of navigation links.
- The nav underline's elastic curve is intentional (`cubic-bezier(0.86, 0, 0.07, 1)`); the active state reuses it rather than adding a new animation.

## Steps

1. Create `hooks/animations/use-active-section.ts`.
2. Import and call it in `hooks/use-vanilla-animations.ts`.
3. Add the `.nav-link.is-active::after` rule in `components.css`.
4. Run the mechanical checks.

## Boundaries

- Do NOT change the nav markup, link labels, hrefs, spacing or the Guest Portal CTA.
- Do NOT add a scroll listener; this uses `IntersectionObserver`.
- Do NOT add a background, color, pill or border to the active link; the underline is the existing language.
- Do NOT observe sections that have no nav link.
- Do NOT remove the hover underline or the group hover behavior.
- Keep the rule outside the hover media query so touch devices get the state.

## Verification

- **Mechanical**: `bun run lint`, `bunx tsc --noEmit`, `bun run build`.
- **Feel check**:
  - Scroll from top: the hero has no active link. Enter Rooms: "Rooms" gets the underline. Continue: Amenities → Experiences → About Us → Guest Portal, one at a time.
  - Scroll back up: the active link follows in reverse.
  - Hover another link: its hover underline appears; the active link keeps its underline. Both can be underlined at once, which is expected (hover vs. location).
  - Click a nav link (with plan 004): after the smooth scroll, the destination link is active.
  - Inspect the active link: exactly one has `aria-current="location"`; all others have none.
  - Toggle reduced motion: the underline changes without transition; state behavior is unchanged.
- **Done when**: the current section is always indicated after the first tracked section entry, and the state is exposed via `aria-current`.
