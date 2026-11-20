# 006 — Replace `transition: all` with explicit property lists

- **Status**: TODO
- **Commit**: 77d20bf
- **Severity**: LOW
- **Category**: Performance
- **Estimated scope**: 2 files, ~8 declarations
- **Covers finding**: #9

## Problem

`transition: all` forces the browser to watch every animatable property, including ones that trigger layout and paint. It also makes future edits accidentally animate things nobody intended.

Current occurrences:

`app/styles/base.css:56-62`:

```css
.reveal-up {
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform, opacity;
}
```

`app/styles/animations.css:30-34`:

```css
.footer-reveal {
    transform: translateY(100px) scale(0.9);
    opacity: 0;
    transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}
```

`app/styles/animations.css:41-44`:

```css
.counter-val {
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    display: inline-block;
}
```

`app/styles/components.css:103-129`:

```css
.services-wrapper {
    transition: all 0.4s ease;
}
.service-row {
    transition: all 0.4s ease;
}
...
.service-row .service-desc {
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.4s ease;
}
```

## Target

### A. `app/styles/base.css`

```css
.reveal-up {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform, opacity;
}
```

### B. `app/styles/animations.css`

```css
.footer-reveal {
    transform: translateY(100px) scale(0.9);
    opacity: 0;
    transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1),
                transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}
```

```css
.counter-val {
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                text-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    display: inline-block;
}
```

### C. `app/styles/components.css`

Delete the `transition: all 0.4s ease;` declaration from `.services-wrapper` entirely. The wrapper itself changes no properties; the hover rule at `:109` targets its children.

```css
.service-row {
    transition: opacity 0.4s ease, filter 0.4s ease;
}
```

```css
.service-row .service-desc {
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.4s ease, transform 0.4s ease;
}
```

Leave `.service-text` (`:115`) and every other explicit transition unchanged. If plan 003 has moved the hover rules into a media query, only the base declarations change.

## Repo conventions to follow

- Explicit transition lists already exist: `app/styles/components.css:8-13` (`.arrow-item`) and `:66-72` (`.magnetic-btn`).
- The strong ease-out is `cubic-bezier(0.16, 1, 0.3, 1)`; the service hover easing is plain `ease`.
- Reduced-motion overrides live in `app/styles/base.css` (plan 002) and take precedence through the cascade.

## Steps

1. Replace the `.reveal-up` transition in `base.css`.
2. Replace the `.footer-reveal` and `.counter-val` transitions in `animations.css`.
3. Replace the three service transitions in `components.css` as above.
4. Run the mechanical checks.

## Boundaries

- Do NOT change durations, easings, delays, keyframes or hover behavior.
- Do NOT remove the `.services-wrapper` class itself; only its unused transition declaration.
- Do NOT replace deliberate transition lists with `all` anywhere else.
- Do NOT touch `TestimonialsAndServices.tsx`, the scroll hook or the hero.

## Verification

- **Mechanical**: `bun run lint`, `bunx tsc --noEmit`, `bun run build`. Also run a text search for `transition: all` under `app/styles/`; expect zero matches.
- **Feel check**:
  - Scroll sections with `.reveal-up`: they still fade/slide in; `.reveal-delay-*` still offsets them.
  - Hover a service row: sibling dim/blur, description reveal, arrow rotation and text scale are unchanged.
  - Trigger a counter: the final `.pop` scale/shadow still plays.
- **Done when**: `transition: all` is gone, and the affected interactions feel identical.
