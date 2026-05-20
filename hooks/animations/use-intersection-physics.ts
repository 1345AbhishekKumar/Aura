import { useEffect } from 'react';

export function useIntersectionAndPhysics() {
  useEffect(() => {
    // --- Intersection Observer ---
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-clip, .curtain-container, .line-draw, .highlight-draw, .footer-reveal');
    const counters = document.querySelectorAll('.counter-val');
    const tSlides = document.querySelectorAll('.testimonial-slide');
    const well = document.getElementById('physics-well');
    const physicsObjs = Array.from(document.querySelectorAll('.physics-obj')) as HTMLElement[];

    let currentSlide = 0;
    let physicsActive = true;
    let mouseVX = 0, mouseVY = 0;
    let lastMouseX = 0, lastMouseY = 0;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let animationFrameId: number;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                if (entry.target.classList.contains('counter-val')) {
                    animateCounter(entry.target as HTMLElement);
                }
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
    counters.forEach(c => observer.observe(c));

    const animateCounter = (el: HTMLElement) => {
        if (el.dataset.animated) return;
        el.dataset.animated = 'true';
        const target = parseInt(el.getAttribute('data-target') || '0');
        const duration = 2000;
        const start = performance.now();
        
        const update = (currentTime: number) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * target);
            
            el.innerText = current.toString() + (el.getAttribute('data-suffix') || '');
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.innerText = target.toString() + (el.getAttribute('data-suffix') || '');
                el.classList.add('pop');
                setTimeout(() => el.classList.remove('pop'), 400);
            }
        };
        requestAnimationFrame(update);
    };

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

    // --- Physics Well Simulation ---
    const initPhysics = () => {
        if (!well) return;
        physicsObjs.forEach(obj => {
            (obj as any).x = Math.random() * 80; // 0 to 80%
            (obj as any).y = Math.random() * 80; // 0 to 80%
            (obj as any).vx = (Math.random() - 0.5) * 0.2; // % per frame
            (obj as any).vy = (Math.random() - 0.5) * 0.2;
            (obj as any).rot = Math.random() * 360;
            (obj as any).vrot = (Math.random() - 0.5) * 2;
        });
    };

    const updatePhysics = () => {
        if (!physicsActive || !well) return;
        
        const rect = well.getBoundingClientRect();
        // Only run physics if in view
        if (rect.top > window.innerHeight || rect.bottom < 0) {
            animationFrameId = requestAnimationFrame(updatePhysics);
            return;
        }

        physicsObjs.forEach(obj => {
            let o = obj as any;
            o.x += o.vx;
            o.y += o.vy;
            o.rot += o.vrot;

            // Gravity to center (50%, 50%)
            const dx = 50 - o.x;
            const dy = 50 - o.y;
            o.vx += dx * 0.0005;
            o.vy += dy * 0.0005;

            // Friction
            o.vx *= 0.99;
            o.vy *= 0.99;

            // Mouse repulsion
            if (mouseX > rect.left && mouseX < rect.right && mouseY > rect.top && mouseY < rect.bottom) {
                const mx = ((mouseX - rect.left) / rect.width) * 100;
                const my = ((mouseY - rect.top) / rect.height) * 100;
                const dist = Math.hypot(mx - o.x, my - o.y);
                if (dist < 20) { // 20% distance
                    o.vx -= (mx - o.x) * 0.05;
                    o.vy -= (my - o.y) * 0.05;
                    o.vrot += (Math.random() - 0.5) * 5;
                }
            }

            // Bounds (assuming object is roughly 10-20% of container)
            if (o.x < 0) { o.x = 0; o.vx *= -1; }
            if (o.x > 85) { o.x = 85; o.vx *= -1; }
            if (o.y < 0) { o.y = 0; o.vy *= -1; }
            if (o.y > 85) { o.y = 85; o.vy *= -1; }

            const pxX = (o.x / 100) * rect.width;
            const pxY = (o.y / 100) * rect.height;
            obj.style.transform = `translate(${pxX}px, ${pxY}px) rotate(${o.rot}deg)`;
        });
        animationFrameId = requestAnimationFrame(updatePhysics);
    };

    const handlePointerMove = (e: PointerEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    if (well && physicsObjs.length > 0) {
        initPhysics();
        animationFrameId = requestAnimationFrame(updatePhysics);
        well.addEventListener('pointermove', (e: PointerEvent) => {
            mouseVX = e.clientX - lastMouseX;
            mouseVY = e.clientY - lastMouseY;
            lastMouseX = e.clientX; lastMouseY = e.clientY;
        }, { passive: true });
    }

    return () => {
        observer.disconnect();
        clearInterval(slideInterval);
        physicsActive = false;
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);
}
