'use client';

import { Navbar, Footer } from '@/components/sections/Navigation';
import { Hero } from '@/components/sections/HeroSection';
import { WhyFind, ArrowsSection, Rewired } from '@/components/sections/Features';
import { ArchitectureDeal, DigitalTwin, SensoryPalette } from '@/components/sections/Architecture';
import { ForAgents, SupportBeyond, DeconstructedArchitecture } from '@/components/sections/Services';
import { Testimonials, ServicesList } from '@/components/sections/TestimonialsAndServices';
import { Support, BlogInsights } from '@/components/sections/SupportAndBlog';
import { FamilyStory, Impact, NeighborhoodDial } from '@/components/sections/ImpactAndDial';
import { ZenithGate, Outro } from '@/components/sections/ZenithAndOutro';
import { useVanillaAnimations } from '@/hooks/use-vanilla-animations';

export default function Home() {
  useVanillaAnimations();

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div id="magic-cursor" aria-hidden="true"></div>
      <div className="progress-bar" id="progressBar" aria-hidden="true" role="progressbar" aria-valuemin={0} aria-valuemax={100}></div>
      
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Hero />
        <WhyFind />
        <ArrowsSection />
        <Rewired />
        <ArchitectureDeal />
        <DigitalTwin />
        <SensoryPalette />
        <ForAgents />
        <SupportBeyond />
        <DeconstructedArchitecture />
        <Testimonials />
        <ServicesList />
        <Support />
        <BlogInsights />
        <FamilyStory />
        <Impact />
        <NeighborhoodDial />
        <ZenithGate />
        <Outro />
      </main>
      <Footer />
    </>
  );
}
