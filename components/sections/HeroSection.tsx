import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} id="hero" className="relative w-full h-screen min-h-[800px] flex flex-col justify-center items-center overflow-hidden bg-[#050505]">
      
      {/* Animated Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <motion.div 
          initial={{ clipPath: "polygon(15% 15%, 85% 15%, 85% 85%, 15% 85%)" }}
          animate={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
          transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1] }}
          className="w-full h-full"
        >
          <motion.img 
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2800&q=80" 
            alt="Luxury Resort" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </motion.div>
      </motion.div>

      {/* Typography */}
      <div className="relative z-10 text-center px-6 w-full max-w-7xl mx-auto flex flex-col items-center justify-center h-full pt-20 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="overflow-hidden mb-4"
        >
          <span className="uppercase tracking-[0.4em] text-xs md:text-sm font-semibold text-white/90">
            Experience Unrivaled Luxury
          </span>
        </motion.div>
        
        <div className="overflow-hidden">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-[11rem] font-black text-white leading-[0.85] tracking-tighter uppercase"
          >
            THE <span className="font-serif italic font-light text-white/90 lowercase tracking-normal">perfect</span>
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.2, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-[11rem] font-black text-white leading-[0.85] tracking-tighter uppercase"
          >
            ESCAPE
          </motion.h1>
        </div>
      </div>

      {/* Booking Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-10 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:right-auto z-20"
      >
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-2 rounded-2xl md:rounded-full flex flex-col md:flex-row items-center gap-2 md:gap-6 shadow-2xl">
          <div className="flex flex-row items-center gap-4 px-6 py-2 w-full md:w-auto justify-between md:justify-start">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-gray-300 font-semibold">Arrival</span>
              <span className="text-white text-sm font-medium">Select Date</span>
            </div>
            <div className="w-[1px] h-8 bg-white/20"></div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-gray-300 font-semibold">Departure</span>
              <span className="text-white text-sm font-medium">Select Date</span>
            </div>
            <div className="w-[1px] h-8 bg-white/20 hidden md:block"></div>
            <div className="flex flex-col hidden md:flex">
              <span className="text-[10px] uppercase tracking-wider text-gray-300 font-semibold">Guests</span>
              <span className="text-white text-sm font-medium">2 Adults</span>
            </div>
          </div>
          <button className="w-full md:w-auto px-8 py-4 bg-white text-black rounded-xl md:rounded-full font-bold text-sm hover:bg-gray-200 transition-colors duration-300">
            Check Availability
          </button>
        </div>
      </motion.div>
    </section>
  );
}
