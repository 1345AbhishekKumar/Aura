import { useEffect } from 'react';

export function useCursorAndInteractions() {
  useEffect(() => {
    // 1. Magic Cursor
    const cursor = document.getElementById('magic-cursor');
    const hoverElements = document.querySelectorAll('a, button, .magnetic-btn, .h-scroll-item, .arrow-item, .service-row, .tilt-wrapper');
    const heroSection = document.getElementById('hero');
    const diorama = document.querySelector('.parallax-hero-wrapper') as HTMLElement;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let animationFrameId: number;

    const updateCursor = () => {
        if (cursor) {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            cursor.style.transform = `translate3d(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%), 0)`;
        }
        animationFrameId = requestAnimationFrame(updateCursor);
    };
    animationFrameId = requestAnimationFrame(updateCursor);

    const handlePointerMove = (e: PointerEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Diorama Hero Tilt
        if (heroSection && diorama) {
            const rect = heroSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const x = (e.clientX / window.innerWidth - 0.5) * 20;
                const y = (e.clientY / window.innerHeight - 0.5) * 20;
                diorama.style.transform = `rotateY(${x}deg) rotateX(${-y}deg) scale3d(1.05, 1.05, 1.05)`;
            }
        }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    hoverElements.forEach(el => {
        el.addEventListener('pointerenter', () => cursor?.classList.add('cursor-hovering'));
        el.addEventListener('pointerleave', () => cursor?.classList.remove('cursor-hovering'));
    });

    // --- Magnetic Buttons ---
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('pointermove', (e: Event) => {
            const pe = e as PointerEvent;
            const rect = (btn as HTMLElement).getBoundingClientRect();
            const x = pe.clientX - rect.left - rect.width / 2;
            const y = pe.clientY - rect.top - rect.height / 2;
            (btn as HTMLElement).style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
        }, { passive: true });
        btn.addEventListener('pointerleave', () => {
            (btn as HTMLElement).style.transform = `translate(0px, 0px) scale(1)`;
        });
        btn.addEventListener('pointerdown', () => {
            (btn as HTMLElement).style.transform = `scale(0.95)`;
        });
        btn.addEventListener('pointerup', () => {
            (btn as HTMLElement).style.transform = `translate(0px, 0px) scale(1)`;
        });
    });

    // --- 3D Tilt Effect ---
    const tiltWrappers = document.querySelectorAll('.tilt-wrapper');
    tiltWrappers.forEach(wrapper => {
        const inner = wrapper.querySelector('.tilt-inner') as HTMLElement;
        if (!inner) return;
        wrapper.addEventListener('pointermove', (e: Event) => {
            const pe = e as PointerEvent;
            const rect = (wrapper as HTMLElement).getBoundingClientRect();
            const x = pe.clientX - rect.left;
            const y = pe.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }, { passive: true });
        wrapper.addEventListener('pointerleave', () => {
            inner.style.transform = `rotateX(0deg) rotateY(0deg)`;
        });
    });

    // --- Cursor Image Trail ---
    const trailSection = document.getElementById('trail-section');
    const trailImages = document.querySelectorAll('.trail-img');
    let trailIndex = 0;
    let lastTrailTime = 0;

    if (trailSection && trailImages.length > 0) {
        trailSection.addEventListener('pointermove', (e: PointerEvent) => {
            const now = Date.now();
            if (now - lastTrailTime > 100) {
                const img = trailImages[trailIndex] as HTMLElement;
                const rect = trailSection.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                img.style.left = `${x}px`;
                img.style.top = `${y}px`;
                img.style.transform = `translate(-50%, -50%) scale(1) rotate(${(Math.random() - 0.5) * 20}deg)`;
                img.classList.add('active');
                
                setTimeout(() => {
                    img.classList.remove('active');
                    img.style.transform = `translate(-50%, -50%) scale(0.8) rotate(0deg)`;
                }, 1000);
                
                trailIndex = (trailIndex + 1) % trailImages.length;
                lastTrailTime = now;
            }
        }, { passive: true });
    }

    // --- Blueprint Lens Interaction ---
    const lensSection = document.querySelector('.lens-reveal-container') as HTMLElement;
    const interiorHidden = document.querySelector('.interior-hidden') as HTMLElement;
    const lensCursor = document.querySelector('.lens-cursor') as HTMLElement;

    if (lensSection && interiorHidden && lensCursor) {
        lensSection.addEventListener('pointermove', (e: PointerEvent) => {
            const rect = lensSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            interiorHidden.style.clipPath = `circle(150px at ${x}px ${y}px)`;
            lensCursor.style.left = `${x}px`;
            lensCursor.style.top = `${y}px`;
            lensCursor.style.opacity = '1';
            if (cursor) cursor.style.opacity = '0';
        }, { passive: true });
        
        lensSection.addEventListener('pointerleave', () => {
            interiorHidden.style.clipPath = `circle(0% at 50% 50%)`;
            lensCursor.style.opacity = '0';
            if (cursor) cursor.style.opacity = '1';
        });
    }

    // --- Cyberpunk Text Scramble ---
    const scrambleElements = document.querySelectorAll('.scramble-text');
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    
    scrambleElements.forEach(el => {
        const originalText = (el as HTMLElement).innerText;
        el.addEventListener('pointerenter', () => {
            let iteration = 0;
            let interval = setInterval(() => {
                (el as HTMLElement).innerText = originalText.split('').map((letter, index) => {
                    if(index < iteration) return originalText[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join('');
                
                if(iteration >= originalText.length) clearInterval(interval);
                iteration += 1 / 3;
            }, 30);
        });
    });

    return () => {
        window.removeEventListener('pointermove', handlePointerMove);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);
}
