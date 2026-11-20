# 009 — Make the magic cursor compositor-friendly and idle-aware

- **Status**: TODO
- **Commit**: 77d20bf
- **Severity**: LOW
- **Category**: Performance
- **Estimated scope**: 2 files, ~45 lines
- **Covers finding**: #12
- **Depends on**: 002 and 003 for existing early returns (preserve them)

## Problem

`app/styles/base.css:11-36` (current):

```css
#magic-cursor {
    position: fixed;
    top: 0; left: 0;
    width: 32px; height: 32px;
    background: white;
    border-radius: 50%;
    mix-blend-mode: difference;
    pointer-events: none;
    z-index: 9999;
    transform: translate3d(calc(50vw - 50%), calc(50vh - 50%), 0);
    transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform, width, height;
}
#magic-cursor.cursor-hovering {
    width: 100px; height: 100px;
}
#magic-cursor.cursor-fill {
    width: 64px; height: 64px;
    background: #ffffff;
}
@media (min-width: 768px) {
    #magic-cursor.cursor-fill {
        width: 96px; height: 96px;
    }
}
```

Animating `width`/`height` is layout, not compositing. `hooks/animations/use-cursor-interactions.ts:17-25` also runs a requestAnimationFrame loop forever, writing a transform every frame even when the pointer is still:

```ts
    const updateCursor = () => {
        if (cursor) {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            cursor.style.transform = `translate3d(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%), 0)`;
        }
        animationFrameId = requestAnimationFrame(updateCursor);
    };
    animationFrameId = requestAnimationFrame(updateCursor);
```

The `0.15` lerp is also per-frame, so the trailing dot follows faster on a 120 Hz display.

## Target

### A. `app/styles/base.css` — animate scale, not width/height

Replace the block above with:

```css
#magic-cursor {
    position: fixed;
    top: 0; left: 0;
    width: 32px; height: 32px;
    background: white;
    border-radius: 50%;
    mix-blend-mode: difference;
    pointer-events: none;
    z-index: 9999;
    transform: translate3d(calc(50vw - 50%), calc(50vh - 50%), 0);
    scale: 1;
    transition: scale 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform, scale;
}
#magic-cursor.cursor-hovering {
    scale: 3.125;
}
#magic-cursor.cursor-fill {
    scale: 2;
    background: #ffffff;
}
@media (min-width: 768px) {
    #magic-cursor.cursor-fill {
        scale: 3;
    }
}
```

The scale multipliers preserve the current sizes: 32px × 3.125 = 100px, 32px × 2 = 64px, 32px × 3 = 96px. If plan 007 is applied, use `var(--motion-ease-out)` for the curve.

### B. `hooks/animations/use-cursor-interactions.ts` — time-based, idle-parked loop

Replace the cursor variables and loop (`:11-25`) with:

```ts
    let cursorRaf = 0;
    let cursorRunning = false;
    let lastCursorTime = 0;

    const updateCursor = (now: number) => {
        if (!cursor) return;

        const dt = lastCursorTime ? Math.min(now - lastCursorTime, 64) : 16.7;
        lastCursorTime = now;
        const alpha = 1 - Math.exp(-dt / 100);

        cursorX += (mouseX - cursorX) * alpha;
        cursorY += (mouseY - cursorY) * alpha;
        cursor.style.transform = `translate3d(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%), 0)`;

        if (Math.abs(mouseX - cursorX) < 0.1 && Math.abs(mouseY - cursorY) < 0.1) {
            cursorX = mouseX;
            cursorY = mouseY;
            cursorRunning = false;
            cursorRaf = 0;
            lastCursorTime = 0;
            return;
        }

        cursorRaf = requestAnimationFrame(updateCursor);
    };

    const startCursor = () => {
        if (!cursor || cursorRunning) return;
        cursorRunning = true;
        cursorRaf = requestAnimationFrame(updateCursor);
    };
```

In `handlePointerMove`, after setting `mouseX`/`mouseY`, add:

```ts
        startCursor();
```

Remove the unconditional `animationFrameId = requestAnimationFrame(updateCursor);` start. The CSS initial transform keeps the dot centered until the first pointer move.

Update the cleanup:

```ts
    return () => {
        window.removeEventListener('pointermove', handlePointerMove);
        if (cursorRaf) cancelAnimationFrame(cursorRaf);
    };
```

Keep the existing early returns from plans 002/003 (`!canHover`, `prefersReducedMotion()`) at the top of the effect.

## Repo conventions to follow

- The cursor is already driven by `translate3d` (`base.css:21`); the split keeps translation in JS and size in CSS, so neither overwrites the other.
- `will-change` currently lists `width, height`; the repo uses `transform, opacity` elsewhere (`app/styles/base.css:61`); use `transform, scale` here.
- The new damping (tau = 100 ms) matches the current feel: `0.15` per 16.7 ms frame is approximately `1 - exp(-16.7 / 100)`.

## Steps

1. Replace the `#magic-cursor` CSS block.
2. Replace the cursor loop and add `startCursor()` in the pointer handler.
3. Update the cleanup.
4. Run the mechanical checks.

## Boundaries

- Do NOT change the cursor's colors, blend mode, border radius, z-index or base size.
- Do NOT change the hover/fill class names; only the property they animate.
- Do NOT touch the tilt, magnetic, trail, lens or scramble code.
- Do NOT remove the reduced-motion/touch early returns.
- If plan 007 is applied, use the motion token; otherwise keep the literal.

## Verification

- **Mechanical**: `bun run lint`, `bunx tsc --noEmit`, `bun run build`.
- **Feel check**:
  - Move the pointer: the dot follows with the same trailing feel at 60 Hz and 120 Hz.
  - Hover a link/button: the dot grows to 100px smoothly; unhover: it returns.
  - Stop moving for 1 second: in DevTools Performance, no per-frame cursor style writes should continue.
  - Move again: the loop restarts from the current position with no jump.
  - With reduced motion on (plan 002), the custom cursor is hidden and the native cursor is visible.
- **Done when**: the cursor's computed `transition-property` is `scale` only, and the rAF loop parks when the pointer is idle.
