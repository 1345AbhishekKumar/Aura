"use client";
import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

const shardsData = [
  {
    clipPath: "polygon(0% 0%, 35% 0%, 20% 45%, 0% 60%)",
    ox1: "-30vw", oy1: "-30vh", or1: -45,
    ox2: "-40vw", oy2: "10vh", or2: -90,
    px: -30, py: -20,
    f1: "grayscale(100%) blur(5px) hue-rotate(0deg)",
    fm: "grayscale(0%) blur(0px) hue-rotate(0deg)",
    f2: "grayscale(0%) blur(0px) hue-rotate(90deg)"
  },
  {
    clipPath: "polygon(35% 0%, 75% 0%, 85% 35%, 50% 55%, 20% 45%)",
    ox1: "0vw", oy1: "-40vh", or1: 20,
    ox2: "10vw", oy2: "-50vh", or2: 60,
    px: 15, py: -35,
    f1: "sepia(100%) invert(0%)",
    fm: "sepia(0%) invert(0%)",
    f2: "sepia(0%) invert(100%)"
  },
  {
    clipPath: "polygon(75% 0%, 100% 0%, 100% 50%, 85% 35%)",
    ox1: "30vw", oy1: "-20vh", or1: 45,
    ox2: "40vw", oy2: "0vh", or2: 120,
    px: 40, py: -15,
    f1: "brightness(150%) grayscale(0%) blur(0px)",
    fm: "brightness(100%) grayscale(0%) blur(0px)",
    f2: "brightness(100%) grayscale(100%) blur(10px)"
  },
  {
    clipPath: "polygon(0% 60%, 20% 45%, 50% 55%, 30% 100%, 0% 100%)",
    ox1: "-30vw", oy1: "30vh", or1: -30,
    ox2: "-10vw", oy2: "40vh", or2: -60,
    px: -25, py: 30,
    f1: "invert(100%) sepia(0%)",
    fm: "invert(0%) sepia(0%)",
    f2: "invert(0%) sepia(100%)"
  },
  {
    clipPath: "polygon(50% 55%, 85% 35%, 100% 50%, 100% 100%, 30% 100%)",
    ox1: "30vw", oy1: "30vh", or1: 35,
    ox2: "30vw", oy2: "40vh", or2: 90,
    px: 30, py: 40,
    f1: "hue-rotate(-90deg) brightness(100%)",
    fm: "hue-rotate(0deg) brightness(100%)",
    f2: "hue-rotate(0deg) brightness(40%)"
  }
];

const ShardItem = ({ shard, scrollYProgress, smoothX, smoothY }: any) => {
  const { clipPath, ox1, oy1, or1, ox2, oy2, or2, px, py, f1, fm, f2 } = shard;

  const x = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [ox1, "0vw", "0vw", ox2]);
  const y = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [oy1, "0vh", "0vh", oy2]);
  const rotate = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [or1, 0, 0, or2]);
  const filter = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [f1, fm, fm, f2]);

  const mouseX = useTransform(smoothX, (v: any) => v * px);
  const mouseY = useTransform(smoothY, (v: any) => v * py);

  return (
    <motion.div style={{ x: mouseX, y: mouseY }} className="absolute inset-0 w-full h-full z-10">
      <motion.div 
        style={{ x, y, rotate, clipPath, filter }} 
        className="absolute inset-0 w-full h-full origin-center drop-shadow-2xl"
      >
        <img 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2800&q=80" 
          alt="Deconstructed Architecture" 
          className="object-cover absolute inset-0 w-full h-full" 
        />
      </motion.div>
    </motion.div>
  );
};

export const DeconstructedArchitecture = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const controlledOpacity = useTransform(scrollYProgress, [0, 0.2, 0.35, 0.5], [0, 1, 1, 0]);
  const controlledScale = useTransform(scrollYProgress, [0, 0.35], [1.2, 1]);
  const controlledY = useTransform(scrollYProgress, [0, 0.35], ["20%", "0%"]);

  const chaosOpacity = useTransform(scrollYProgress, [0.5, 0.65, 0.8, 1], [0, 0, 1, 1]);
  const chaosScale = useTransform(scrollYProgress, [0.65, 1], [0.8, 1.2]);
  const chaosY = useTransform(scrollYProgress, [0.65, 1], ["0%", "-20%"]);

  const wireframeRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const wireframeScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#050505] text-[#F5F5F0] z-30">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ rotate: wireframeRotate, scale: wireframeScale }} 
          className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none"
        >
          <svg viewBox="0 0 100 100" className="w-[120vmin] h-[120vmin] overflow-visible">
            <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="0.2" strokeDasharray="2 4" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="white" strokeWidth="0.1" />
            <circle cx="50" cy="50" r="25" fill="none" stroke="white" strokeWidth="0.2" strokeDasharray="1 6" />
            <path d="M 5 50 L 95 50 M 50 5 L 50 95" stroke="white" strokeWidth="0.1" />
            <rect x="15" y="15" width="70" height="70" fill="none" stroke="white" strokeWidth="0.1" transform="rotate(45 50 50)" />
          </svg>
        </motion.div>

        <div className="relative w-[90vw] h-[60vh] md:w-[60vw] md:h-[70vh] max-w-[1200px]">
          {shardsData.map((shard, idx) => (
            <ShardItem 
              key={idx} 
              shard={shard} 
              scrollYProgress={scrollYProgress} 
              smoothX={smoothX} 
              smoothY={smoothY} 
            />
          ))}
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mix-blend-difference z-20">
          <motion.h2
            style={{ opacity: controlledOpacity, scale: controlledScale, y: controlledY }}
            className="text-[12vw] md:text-[8vw] font-serif tracking-tighter leading-none text-white"
          >
            CONTROLLED
          </motion.h2>
          <motion.h2
            style={{ opacity: chaosOpacity, scale: chaosScale, y: chaosY }}
            className="text-[12vw] md:text-[8vw] font-serif tracking-tighter leading-none text-white italic"
          >
            CHAOS.
          </motion.h2>
        </div>

        <div className="absolute bottom-10 left-10 text-white/50 font-mono text-sm uppercase tracking-widest z-30">
          Experimental Design
        </div>
      </div>
    </section>
  );
};
