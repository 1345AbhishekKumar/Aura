import { useEffect } from 'react';

export function useScrollAndParallax() {
  useEffect(() => {
    const navbar = document.getElementById('navbar');
    const progressBar = document.getElementById('progress-bar');
    const navLogo = document.getElementById('nav-logo');
    const navLinks = document.querySelectorAll('.nav-link');
    const navCta = document.getElementById('nav-cta');
    const parallaxImgs = document.querySelectorAll('.parallax-img, #outroParallax');
    const stackCards = document.querySelectorAll('.stack-card');
    const fragments = document.querySelectorAll('.fragment');
    const hScrollTrack = document.getElementById('h-scroll-track');
    const hScrollWrapper = document.getElementById('h-scroll-wrapper');
    const twinReal = document.querySelector('.twin-real') as HTMLElement;
    const scanLine = document.querySelector('.scan-line') as HTMLElement;
    const twinContainer = document.querySelector('.digital-twin-container') as HTMLElement;
    const tunnelFrames = document.querySelectorAll('.tunnel-frame');
    const zenithTunnel = document.querySelector('.zenith-tunnel') as HTMLElement;
    const dialContainer = document.querySelector('.dial-container') as HTMLElement;
    const mainDial = document.querySelector('.main-dial') as HTMLElement;
    const dialLabels = document.querySelectorAll('.dial-label');

    let ticking = false;
    let hTargetX = 0;
    let hCurrentX = 0;
    let animationFrameId: number;

    const handleComplexScroll = () => {
        const scrollY = window.scrollY;
        
        // Navbar & Progress
        if (navbar && navLogo && navCta) {
            if (scrollY > 50) {
                navbar.classList.add('bg-white/90', 'backdrop-blur-md', 'shadow-sm', 'py-4');
                navbar.classList.remove('bg-transparent', 'py-6');
                navLogo.classList.remove('text-white');
                navLogo.classList.add('text-black');
                navLinks.forEach(l => {
                    l.classList.remove('text-white');
                    l.classList.add('text-black');
                });
                navCta.classList.remove('border-white/40', 'text-white', 'hover:bg-white', 'hover:text-black');
                navCta.classList.add('border-black/20', 'text-black', 'hover:bg-black', 'hover:text-white');
            } else {
                navbar.classList.remove('bg-white/90', 'backdrop-blur-md', 'shadow-sm', 'py-4');
                navbar.classList.add('bg-transparent', 'py-6');
                navLogo.classList.add('text-white');
                navLogo.classList.remove('text-black');
                navLinks.forEach(l => {
                    l.classList.add('text-white');
                    l.classList.remove('text-black');
                });
                navCta.classList.add('border-white/40', 'text-white', 'hover:bg-white', 'hover:text-black');
                navCta.classList.remove('border-black/20', 'text-black', 'hover:bg-black', 'hover:text-white');
            }
        }

        if (progressBar) {
            const totalHeight = document.body.scrollHeight - window.innerHeight;
            const progress = (scrollY / totalHeight) * 100;
            progressBar.style.width = `${progress}%`;
        }

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

        // Sensory Fragments
        fragments.forEach((frag, i) => {
            const rect = frag.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = (i % 3 + 1) * 0.1;
                const yPos = (rect.top - window.innerHeight / 2) * speed;
                (frag as HTMLElement).style.transform = `translateY(${yPos}px) rotate(${yPos * 0.05}deg)`;
            }
        });

        // Horizontal Scroll
        if (hScrollWrapper && hScrollTrack) {
            const rect = hScrollWrapper.getBoundingClientRect();
            if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
                const scrollProgress = -rect.top / (rect.height - window.innerHeight);
                const maxScroll = hScrollTrack.scrollWidth - window.innerWidth;
                hTargetX = -scrollProgress * maxScroll;
            } else if (rect.top > 0) {
                hTargetX = 0;
            }
        }

        // Digital Twin Scan
        if (twinContainer && twinReal && scanLine) {
            const rect = twinContainer.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
                const percentage = progress * 100;
                twinReal.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
                scanLine.style.transform = `translateX(${percentage}vw)`;
            }
        }

        // Zenith Tunnel
        if (zenithTunnel && tunnelFrames.length > 0) {
            const rect = zenithTunnel.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
                tunnelFrames.forEach((frame, i) => {
                    const offset = i * 0.25;
                    let zPos = ((progress * 2) - offset) * 1000;
                    let opacity = 1;
                    if (zPos > 800) opacity = 1 - (zPos - 800) / 200;
                    if (zPos < -500) opacity = 1 - (-500 - zPos) / 500;
                    
                    (frame as HTMLElement).style.transform = `translateZ(${zPos}px)`;
                    (frame as HTMLElement).style.opacity = Math.max(0, opacity).toString();
                });
            }
        }

        // Neighborhood Dial
        if (dialContainer && mainDial) {
            const rect = dialContainer.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
                const rotation = progress * 180 - 90;
                mainDial.style.transform = `rotate(${rotation}deg)`;
                
                const activeIndex = Math.floor(progress * dialLabels.length);
                dialLabels.forEach((label, i) => {
                    if (i === activeIndex) {
                        label.classList.add('text-black', 'scale-110');
                        label.classList.remove('text-gray-400', 'scale-100');
                    } else {
                        label.classList.remove('text-black', 'scale-110');
                        label.classList.add('text-gray-400', 'scale-100');
                    }
                });
            }
        }
    };

    const onScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleComplexScroll();
                ticking = false;
            });
            ticking = true;
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const renderLoop = () => {
        if (hScrollTrack) {
            hCurrentX += (hTargetX - hCurrentX) * 0.1;
            hScrollTrack.style.transform = `translate3d(${hCurrentX}px, 0, 0)`;
        }
        animationFrameId = requestAnimationFrame(renderLoop);
    };
    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
        window.removeEventListener('scroll', onScroll);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);
}
