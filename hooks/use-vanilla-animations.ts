"use client";

import { useCursorAndInteractions } from './animations/use-cursor-interactions';
import { useScrollAndParallax } from './animations/use-scroll-parallax';
import { useIntersectionAndPhysics } from './animations/use-intersection-physics';

export function useVanillaAnimations() {
  useCursorAndInteractions();
  useScrollAndParallax();
  useIntersectionAndPhysics();
}
