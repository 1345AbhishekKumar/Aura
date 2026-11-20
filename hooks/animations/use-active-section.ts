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
