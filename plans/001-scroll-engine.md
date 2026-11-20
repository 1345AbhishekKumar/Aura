# 001 — Rebuild the scroll engine: decouple transitions, cache measurements, fix selectors

- **Status**: DONE
- **Commit**: 77d20bf
- **Severity**: HIGH
- **Category**: Performance, Interruptibility, Bug (scroll feedback)
- **Estimated scope**: 4 files, ~260 lines (mostly replacing one hook)
- **Covers findings**: #1 (scroll transitions), #3 (scroll-handler performance), #4 (horizontal smoothing), #5 (progress bar), plus the navbar selector bug and the unused scroll branches.

## Problem

### 1. Scroll-driven properties are also CSS-transitioned

`app/styles/animations.css:135-147` (current):

```css
.parallax-img {
    width: 100%;
    height: 120%;
    object-fit: cover;
    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform;
    position: absolute;
    top: -10%;
    left: 0;
}
.zoom-img-container:hover .parallax-img {
    transform: scale(1.05) translateY(0) !important;
}
```

`app/styles/animations.css:153-158` (current):

```css
.stack-card {
    transform-origin: top center;
    will-change: transform, filter;
    transition: transform 0.4s ease-out, filter 0.4s ease-out; 
}
```

`app/styles/sections.css:113` (current):

```css
.main-dial { position: absolute; right: -40vw; top: 50%; margin-top: -40vw; width: 80vw; height: 80vw; border: 1px dashed rgba(0,0,0,0.2); border-radius: 50%; transition: transform 0.1s linear; }
```

`hooks/animations/use-scroll-parallax.ts:66-87` (current):

```ts
        // Parallax Images
        parallaxImgs.forEach(img => {
            const rect = img.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const yPos = (rect.top / window.innerHeight) * 15;
                (img as HTMLElement).style.transform = `translateY(${yPos}%) scale(1.1)`;
            }
        });

        // Stacking Cards
        stackCards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            if (rect.top < 100) {
                const depth = (100 - rect.top) * 0.05;
                const scale = Math.max(0.9, 1 - depth * 0.01);
                const blur = Math.min(4, depth * 0.2);
                (card as HTMLElement).style.transform = `scale(${scale}) translateY(${depth * 2}px)`;
                (card as HTMLElement).style.filter = `blur(${blur}px) brightness(${Math.max(0.7, 1 - depth * 0.05)})`;
            } else {
                (card as HTMLElement).style.transform = `scale(1) translateY(0)`;
                (card as HTMLElement).style.filter = `blur(0px) brightness(1)`;
            }
        });
```

Because the transform is rewritten every scroll frame while a 400–800 ms CSS transition is active, every frame retargets the transition. Parallax images and stack cards trail the scroll by a visible half-second and never settle while scrolling. The dial (`hooks/animations/use-scroll-parallax.ts:140-159`) has the same problem with a 100 ms transition.

### 2. Scroll handler does layout work every frame

`hooks/animations/use-scroll-parallax.ts:29-160` currently:

- Writes navbar classes before reading layout.
- Reads `document.body.scrollHeight` on every scroll frame (`:60`).
- Reads `hScrollTrack.scrollWidth` on every frame (`:104`).
- Runs dead branches for `.fragment`, `.zenith-tunnel` and `.tunnel-frame` (`:12, :18-19, :90-97, :122-138`) that no component in `app/page.tsx` renders.
- Toggles the same class arrays on every scroll frame with no state guard (`:32-57`).

### 3. Horizontal scroll lerp is frame-rate dependent and never idles

`hooks/animations/use-scroll-parallax.ts:174-181` (current):

```ts
    const renderLoop = () => {
        if (hScrollTrack) {
            hCurrentX += (hTargetX - hCurrentX) * 0.1;
            hScrollTrack.style.transform = `translate3d(${hCurrentX}px, 0, 0)`;
        }
        animationFrameId = requestAnimationFrame(renderLoop);
    };
    animationFrameId = requestAnimationFrame(renderLoop);
```

`0.1` per *frame* converges twice as fast on a 120 Hz display as on 60 Hz. The loop also writes a transform every frame forever, even when the section is offscreen and the value has settled.

### 4. Progress bar and navbar selectors never match

`app/page.tsx:21` (current):

```tsx
      <div className="progress-bar" id="progressBar" aria-hidden="true" role="progressbar" aria-valuemin={0} aria-valuemax={100}></div>
```

but `hooks/animations/use-scroll-parallax.ts:6` queries:

```ts
    const progressBar = document.getElementById('progress-bar');
```

The progress bar never updates.

`components/sections/Navigation.tsx:7` and `:20` give the logo and CTA these classes only:

```tsx
<a href="#" aria-label="STAY Hotel & Resort" className="hover-trigger text-white flex-1 flex items-center nav-logo transition-colors">
...
<a href="#" className="hover-trigger hidden md:flex border border-white/40 hover:bg-white hover:text-black transition-colors duration-300 px-6 py-2.5 rounded-full text-[11px] font-semibold tracking-wider uppercase nav-cta">
```

but `hooks/animations/use-scroll-parallax.ts:7,9` query `getElementById('nav-logo')` and `getElementById('nav-cta')`. Both return `null`, so the `if (navbar && navLogo && navCta)` guard at `:33` prevents the entire navbar scroll-state block from ever running. After the hero, the fixed navbar keeps white text and white CTAs over white sections.

## Target

### A. `app/page.tsx` — restore the progress bar selector

Replace line 21 with:

```tsx
      <div className="progress-bar" id="progress-bar" aria-hidden="true"></div>
```

The bar is decorative; drop the redundant `progressbar` role because the element is `aria-hidden`.

### B. `app/styles/base.css` — compositor-only progress bar

Replace the `.progress-bar` block (`app/styles/base.css:44-54`) with:

```css
/* 1. Scroll Progress Bar */
.progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    width: 100%;
    background-color: #111111;
    z-index: 100;
    transform: scaleX(0);
    transform-origin: left center;
    will-change: transform;
    transition: none;
}
```

### C. `app/styles/animations.css` — no transitions on scroll-written properties

Replace `.parallax-img` / hover / outro rules (`:130-147`) with:

```css
/* Image hover zooms & Parallax Depth */
.zoom-img-container {
    overflow: hidden;
    position: relative;
}
.parallax-img {
    width: 100%;
    height: 120%;
    object-fit: cover;
    transition: scale 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: translate, scale;
    position: absolute;
    top: -10%;
    left: 0;
    scale: 1.1;
}
.zoom-img-container:hover .parallax-img {
    scale: 1.05;
}
#outroParallax {
    scale: 1.1;
    will-change: translate;
}
```

Replace `.stack-card` (`:153-158`) with:

```css
/* Stacking Depth Cards */
.stack-card {
    transform-origin: top center;
    will-change: transform, filter;
}
```

### D. `app/styles/sections.css` — no transition on the dial

Replace the `.main-dial` rule (`:113`) with:

```css
.main-dial { position: absolute; right: -40vw; top: 50%; margin-top: -40vw; width: 80vw; height: 80vw; border: 1px dashed rgba(0,0,0,0.2); border-radius: 50%; }
```

All other `.dial-*` rules stay unchanged.

### E. `hooks/animations/use-scroll-parallax.ts` — replace the whole effect body

Replace the file's contents with the code below. It keeps the current math and visual behavior but:

- Writes only `translate` for parallax (the `scale` lives in CSS).
- Caches page height and horizontal track width with a `ResizeObserver`.
- Reads all layout values before writing classes/styles.
- Skips the same work when the scroll direction/state has not changed.
- Removes the dead `.fragment` / `.zenith-tunnel` / `.tunnel-frame` branches.
- Uses `querySelector('.nav-logo')` / `querySelector('.nav-cta')`.
- Uses time-based exponential damping (`tau = 160 ms`) and parks the loop when settled.
- Writes the progress bar as `scaleX(progress)`.

```ts
import { useEffect } from 'react';

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export function useScrollAndParallax() {
  useEffect(() => {
    const navbar = document.getElementById('navbar');
    const progressBar = document.getElementById('progress-bar');
    const navLogo = document.querySelector<HTMLElement>('.nav-logo');
    const navLinks = document.querySelectorAll<HTMLElement>('.nav-link');
    const navCta = document.querySelector<HTMLElement>('.nav-cta');
    const parallaxImgs = document.querySelectorAll<HTMLElement>(
      '.parallax-img, #outroParallax'
    );
    const stackCards = document.querySelectorAll<HTMLElement>('.stack-card');
    const hScrollTrack = document.getElementById('h-scroll-track');
    const hScrollWrapper = document.getElementById('h-scroll-wrapper');
    const twinReal = document.querySelector<HTMLElement>('.twin-real');
    const scanLine = document.querySelector<HTMLElement>('.scan-line');
    const twinContainer = document.querySelector<HTMLElement>(
      '.digital-twin-container'
    );
    const dialContainer = document.querySelector<HTMLElement>('.dial-container');
    const mainDial = document.querySelector<HTMLElement>('.main-dial');
    const dialLabels = document.querySelectorAll<HTMLElement>('.dial-label');

    let docHeight = 0;
    let hMaxScroll = 0;

    const measure = () => {
      docHeight = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );
      hMaxScroll = hScrollTrack
        ? Math.max(0, hScrollTrack.scrollWidth - window.innerWidth)
        : 0;
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(document.documentElement);
    resizeObserver.observe(document.body);
    if (hScrollTrack) resizeObserver.observe(hScrollTrack);
    window.addEventListener('resize', measure);

    let ticking = false;
    let scrollRaf = 0;
    let navbarSolid: boolean | null = null;
    let activeDialIndex = -1;

    let hTargetX = 0;
    let hCurrentX = 0;
    let hRaf = 0;
    let hRunning = false;
    let hLastTime = 0;

    const applyHTrack = () => {
      if (hScrollTrack) {
        hScrollTrack.style.transform = `translate3d(${hCurrentX}px, 0, 0)`;
      }
    };

    const tickHScroll = (now: number) => {
      const dt = Math.min(now - hLastTime, 64);
      hLastTime = now;
      const alpha = 1 - Math.exp(-dt / 160);
      hCurrentX += (hTargetX - hCurrentX) * alpha;

      if (Math.abs(hTargetX - hCurrentX) < 0.1) {
        hCurrentX = hTargetX;
        applyHTrack();
        hRunning = false;
        hRaf = 0;
        return;
      }

      applyHTrack();
      hRaf = requestAnimationFrame(tickHScroll);
    };

    const startHScroll = () => {
      if (!hScrollTrack || hRunning) return;
      hRunning = true;
      hLastTime = performance.now();
      hRaf = requestAnimationFrame(tickHScroll);
    };

    const handleComplexScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const isSolid = scrollY > 50;

      // READ PHASE
      const parallaxReads: Array<{ el: HTMLElement; yPos: number }> = [];
      parallaxImgs.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < viewportHeight && rect.bottom > 0) {
          parallaxReads.push({ el, yPos: (rect.top / viewportHeight) * 15 });
        }
      });

      const stackReads: Array<{
        el: HTMLElement;
        transform: string;
        filter: string;
      }> = [];

      stackCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < 100) {
          const depth = (100 - rect.top) * 0.05;
          const scale = Math.max(0.9, 1 - depth * 0.01);
          const blur = Math.min(4, depth * 0.2);
          stackReads.push({
            el: card,
            transform: `scale(${scale}) translateY(${depth * 2}px)`,
            filter: `blur(${blur}px) brightness(${Math.max(
              0.7,
              1 - depth * 0.05
            )})`,
          });
        } else {
          stackReads.push({
            el: card,
            transform: 'scale(1) translateY(0)',
            filter: 'blur(0px) brightness(1)',
          });
        }
      });

      const hRect = hScrollWrapper?.getBoundingClientRect();
      const twinRect = twinContainer?.getBoundingClientRect();
      const dialRect = dialContainer?.getBoundingClientRect();

      // WRITE PHASE
      if (navbar && navLogo && navCta && isSolid !== navbarSolid) {
        navbarSolid = isSolid;

        if (isSolid) {
          navbar.classList.add(
            'bg-white/90',
            'backdrop-blur-md',
            'shadow-sm',
            'py-4'
          );
          navbar.classList.remove('bg-transparent', 'py-6');
          navLogo.classList.remove('text-white');
          navLogo.classList.add('text-black');
          navLinks.forEach(link => {
            link.classList.remove('text-white');
            link.classList.add('text-black');
          });
          navCta.classList.remove(
            'border-white/40',
            'text-white',
            'hover:bg-white',
            'hover:text-black'
          );
          navCta.classList.add(
            'border-black/20',
            'text-black',
            'hover:bg-black',
            'hover:text-white'
          );
        } else {
          navbar.classList.remove(
            'bg-white/90',
            'backdrop-blur-md',
            'shadow-sm',
            'py-4'
          );
          navbar.classList.add('bg-transparent', 'py-6');
          navLogo.classList.add('text-white');
          navLogo.classList.remove('text-black');
          navLinks.forEach(link => {
            link.classList.add('text-white');
            link.classList.remove('text-black');
          });
          navCta.classList.add(
            'border-white/40',
            'text-white',
            'hover:bg-white',
            'hover:text-black'
          );
          navCta.classList.remove(
            'border-black/20',
            'text-black',
            'hover:bg-black',
            'hover:text-white'
          );
        }
      }

      if (progressBar) {
        const progress = docHeight > 0 ? clamp(scrollY / docHeight, 0, 1) : 0;
        progressBar.style.transform = `scaleX(${progress})`;
      }

      parallaxReads.forEach(({ el, yPos }) => {
        el.style.translate = `0 ${yPos}%`;
      });

      stackReads.forEach(({ el, transform, filter }) => {
        el.style.transform = transform;
        el.style.filter = filter;
      });

      if (hScrollWrapper && hScrollTrack && hRect) {
        if (hRect.top <= 0 && hRect.bottom >= viewportHeight) {
          const scrollProgress =
            -hRect.top / Math.max(1, hRect.height - viewportHeight);
          const nextTarget = -scrollProgress * hMaxScroll;
          if (Math.abs(nextTarget - hTargetX) > 0.1) {
            hTargetX = nextTarget;
            startHScroll();
          }
        } else if (hRect.top > 0 && hTargetX !== 0) {
          hTargetX = 0;
          startHScroll();
        }
      }

      if (twinContainer && twinReal && scanLine && twinRect) {
        if (twinRect.top < viewportHeight && twinRect.bottom > 0) {
          const progress = clamp(
            (viewportHeight - twinRect.top) /
              (viewportHeight + twinRect.height),
            0,
            1
          );
          const percentage = progress * 100;
          twinReal.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
          scanLine.style.transform = `translateX(${percentage}vw)`;
        }
      }

      if (dialContainer && mainDial && dialRect) {
        if (dialRect.top < viewportHeight && dialRect.bottom > 0) {
          const progress = clamp(
            (viewportHeight - dialRect.top) /
              (viewportHeight + dialRect.height),
            0,
            1
          );
          mainDial.style.transform = `rotate(${progress * 180 - 90}deg)`;

          const nextIndex = Math.floor(progress * dialLabels.length);
          if (nextIndex !== activeDialIndex) {
            activeDialIndex = nextIndex;
            dialLabels.forEach((label, index) => {
              if (index === nextIndex) {
                label.classList.add('text-black', 'scale-110');
                label.classList.remove('text-gray-400', 'scale-100');
              } else {
                label.classList.remove('text-black', 'scale-110');
                label.classList.add('text-gray-400', 'scale-100');
              }
            });
          }
        }
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        scrollRaf = window.requestAnimationFrame(() => {
          handleComplexScroll();
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleComplexScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      resizeObserver.disconnect();
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      if (hRaf) cancelAnimationFrame(hRaf);
    };
  }, []);
}
```

## Repo conventions to follow

- The strong ease-out used throughout this repo is `cubic-bezier(0.16, 1, 0.3, 1)` (`app/styles/animations.css:33`, `app/styles/components.css:10`). Keep it when replacing the parallax hover transition.
- Direct scroll writes without CSS transitions are already done correctly for the Digital Twin: `hooks/animations/use-scroll-parallax.ts:111-120` sets `clipPath` and `transform` with no matching transition. Imitate that for parallax, stack cards and dial.
- The scroll listener is already passive and rAF-coalesced (`hooks/animations/use-scroll-parallax.ts:162-172`). Preserve both.
- Tailwind v4 is used; class names are literal strings in source. The navbar toggles live in the hook, which Tailwind scans.

## Steps

1. Edit `app/page.tsx:21`: replace the progress div exactly as in Target A.
2. Edit `app/styles/base.css:44-54`: replace `.progress-bar` with Target B.
3. Edit `app/styles/animations.css:130-158`: replace the parallax/hover/outro rules and `.stack-card` with Target C.
4. Edit `app/styles/sections.css:113`: remove only `transition: transform 0.1s linear;` from `.main-dial` (Target D).
5. Replace the contents of `hooks/animations/use-scroll-parallax.ts` with Target E.
6. Run the mechanical checks.

## Boundaries

- Do NOT touch `hooks/animations/use-cursor-interactions.ts` or `hooks/animations/use-intersection-physics.ts`; other plans own those.
- Do NOT change any section markup, copy, spacing, colors, or image URLs.
- Do NOT alter the scroll math (15% parallax, stack depth, twin reveal, dial angle); this is a correctness/perf change, not a redesign.
- Do NOT remove the `.zoom-img-container:hover` visual effect; it now lives on `scale` instead of `transform`.
- Do NOT add a scroll library or any dependency.
- If a file no longer matches these excerpts (drift since commit `77d20bf`), STOP and report instead of improvising.

## Verification

- **Mechanical**: run `bun run lint`, `bunx tsc --noEmit`, and `bun run build` from the repo root. All must pass.
- **Feel check**: run `bun dev` and open the page.
  - Scroll the hero and the `Why STAY` / `For Guests` images: the image should track the scroll with no half-second trailing lag; hover zoom should still ease in/out.
  - Scroll the sticky Architecture cards: they should scale/blur in sync with scroll, with no smeared 400 ms catch-up.
  - Scroll the Destinations dial: the dashed ring should rotate 1:1 with scroll.
  - Confirm the progress bar at the top fills from left to right and reaches 100% at the bottom.
  - Scroll past the hero and confirm the navbar becomes white with black logo/links/CTA; scroll back to the top and confirm it returns to transparent with white text.
  - Scroll the Exclusive Suites horizontal section at both 60 Hz and 120 Hz (or use DevTools CPU throttling): the horizontal motion should cover the same distance over the same wall-clock time.
  - Leave the page idle at the top and in the middle for 2 seconds; in DevTools Performance, no `transform` style writes should continue from the horizontal track.
  - In DevTools, set animation playback to 10% and confirm parallax/stack/dial follow the scrollbar without lag. Toggle `prefers-reduced-motion` (Rendering panel); this plan is not responsible for that behavior yet (plan 002), but the page must not break.
- **Done when**: `grep` shows no `transition: transform` on `.parallax-img` / `.stack-card` / `.main-dial`; the progress bar moves; the navbar changes state; the hook no longer references `.fragment`, `.zenith-tunnel`, `.tunnel-frame`, `document.body.scrollHeight`, or `getElementById('progress-bar')`; and there are no per-frame continuous writes when the horizontal section is settled.
