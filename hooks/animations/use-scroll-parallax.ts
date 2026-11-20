import { useEffect } from 'react';
import { prefersReducedMotion } from '@/lib/utils';

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
    const dialCaption = document.getElementById('dial-label');

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
    let dialCaptionAnimation: Animation | null = null;

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
      if (!reduceMotion) {
        parallaxImgs.forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.top < viewportHeight && rect.bottom > 0) {
            parallaxReads.push({ el, yPos: (rect.top / viewportHeight) * 15 });
          }
        });
      }

      const stackReads: Array<{
        el: HTMLElement;
        transform: string;
        filter: string;
      }> = [];

      if (!reduceMotion) {
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
      }

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
      }

      if (!reduceMotion && twinContainer && twinReal && scanLine && twinRect) {
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

      if (!reduceMotion && dialContainer && mainDial && dialRect) {
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

            if (dialCaption) {
              const nextLabel = dialLabels[nextIndex]?.textContent?.trim() ?? '';
              if (nextLabel && dialCaption.textContent !== nextLabel) {
                dialCaptionAnimation?.cancel();

                if (reduceMotion) {
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
                      {
                        duration: 150,
                        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
                      }
                    );
                  };
                }
              }
            }
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
