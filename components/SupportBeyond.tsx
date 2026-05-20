"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";

export const SupportBeyond = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -250]);
  const y3 = useTransform(scrollYProgress, [0, 1], [50, -150]);
  const bgTextX = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section ref={sectionRef} className="py-24 md:py-48 bg-[#f4f4f5] relative overflow-hidden">
      <div className="absolute top-[30%] left-[20%] w-[30vw] h-[30vw] bg-[#111111] rounded-full blur-[100px] opacity-5 animate-slow-zoom pointer-events-none"></div>
      
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] pointer-events-none overflow-hidden">
         <motion.h2 style={{ x: bgTextX }} className="text-[25vw] font-black whitespace-nowrap font-serif tracking-tighter">BEYOND</motion.h2>
      </div>

      <div className="max-w-[90rem] mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-8">
          <div className="lg:w-5/12 relative">
            <div className="lg:sticky lg:top-40 reveal-up">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight text-[#111]">
                Support <br/>
                <span className="font-serif italic text-gray-400">Beyond</span> <br/>
                the Sale.
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-10 max-w-md">
                The real estate market never stands still — and neither do we. Our experts offer continued support, utilizing dynamic market insights to maximize your investment.
              </p>
              <a href="#" className="magnetic-btn hover-trigger inline-flex items-center gap-2 bg-[#111] text-white px-8 py-4 rounded-full text-sm font-semibold transition-all border border-transparent hover:bg-white hover:text-[#111] hover:border-[#111]">
                Discover Services
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </a>
            </div>
          </div>

          <div className="lg:w-7/12 relative lg:min-h-[140vh] mt-12 lg:mt-0 flex flex-col gap-12 lg:block">
            <motion.div style={{ y: y1 }} className="lg:absolute top-0 right-0 w-full lg:w-[70%] bg-white p-4 pb-8 md:p-6 md:pb-10 rounded-[2rem] shadow-xl z-10 tilt-wrapper group border border-gray-100 hover-trigger">
              <div className="w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-8 tilt-inner relative">
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                <img src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&q=80" alt="Mortgage Services" className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700" />
              </div>
              <div className="px-4">
                <h3 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight text-[#111]">Mortgage Services</h3>
                <p className="text-gray-600">Helping you secure your dream home with flexible, tailored mortgage options designed for your unique financial landscape.</p>
              </div>
            </motion.div>

            <motion.div style={{ y: y2 }} className="lg:absolute top-[35vh] left-0 w-full lg:w-[65%] bg-[#111] text-white p-4 pb-8 md:p-6 md:pb-10 rounded-[2rem] shadow-2xl z-20 tilt-wrapper group hover-trigger">
              <div className="w-full aspect-square rounded-[1.5rem] overflow-hidden mb-8 tilt-inner relative bg-black">
                <img src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80" alt="Property Management" className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700 opacity-70 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100" />
              </div>
              <div className="px-4">
                <h3 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">Property Management</h3>
                <p className="text-gray-400">Let us handle the intricate details. We maintain the highest standards of care so you can enjoy the rewards seamlessly.</p>
              </div>
            </motion.div>

            <motion.div style={{ y: y3 }} className="lg:absolute top-[75vh] right-[5%] w-full lg:w-[75%] bg-white/70 backdrop-blur-xl p-4 pb-8 md:p-6 md:pb-10 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.08)] z-30 tilt-wrapper group border border-white hover-trigger">
              <div className="w-full aspect-[16/9] rounded-[1.5rem] overflow-hidden mb-8 tilt-inner relative">
                <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80" alt="Construction and Development" className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-700" />
              </div>
              <div className="px-4">
                <h3 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight text-[#111]">Construction & Dev</h3>
                <p className="text-gray-600">Guiding you through the intricacies of building and developing properties with expert insight and architectural vision.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
