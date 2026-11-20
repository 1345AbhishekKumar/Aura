import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { EASE_DRAWER } from '@/lib/motion';

export function ArchitectureDeal() {
  return (
    <section className="py-24 md:py-48 bg-white relative" aria-labelledby="architecture-heading">
        <div className="max-w-7xl mx-auto px-6 mb-20 text-center reveal-up">
            <h2 id="architecture-heading" className="text-4xl md:text-6xl font-bold tracking-tight">
                The Architecture <br/>
                <span className="font-serif italic text-gray-400">of Comfort</span>
            </h2>
            <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto">We craft every detail of your stay to ensure a seamless, relaxing journey.</p>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 relative pb-24">
            <div className="stack-card sticky top-32 w-full h-80 md:h-96 bg-brand-dark text-white rounded-[2rem] p-10 flex flex-col justify-between mb-8 shadow-2xl z-10 overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 mix-blend-luminosity group-hover:scale-105 transition-transform duration-1000" aria-hidden="true"></div>
                <div className="relative z-10 flex justify-between items-start">
                    <h3 className="text-3xl md:text-4xl font-bold">Arrival & <br/><span className="font-serif italic font-normal text-gray-300">Welcome</span></h3>
                    <span className="text-5xl md:text-7xl font-serif text-gray-700 font-light opacity-50 tracking-tighter" aria-hidden="true">01</span>
                </div>
                <p className="relative z-10 text-lg md:text-xl text-gray-300 max-w-md">Step into a world of luxury where every detail is prepared for your arrival.</p>
            </div>
            
            <div className="stack-card sticky top-40 w-full h-80 md:h-96 bg-brand-gray text-black rounded-[2rem] p-10 flex flex-col justify-between mb-8 shadow-2xl z-20 border border-gray-200 overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-multiply group-hover:scale-105 transition-transform duration-1000" aria-hidden="true"></div>
                <div className="relative z-10 flex justify-between items-start">
                    <h3 className="text-3xl md:text-4xl font-bold">Experience & <br/><span className="font-serif italic font-normal text-gray-600">Dining</span></h3>
                    <span className="text-5xl md:text-7xl font-serif text-gray-300 font-light opacity-50 tracking-tighter" aria-hidden="true">02</span>
                </div>
                <p className="relative z-10 text-lg md:text-xl text-gray-600 max-w-md">Curated activities, world-class cuisine, and unforgettable moments.</p>
            </div>

            <div className="stack-card sticky top-48 w-full h-80 md:h-96 bg-white text-black rounded-[2rem] p-10 flex flex-col justify-between shadow-2xl z-30 border border-gray-100 overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000" aria-hidden="true"></div>
                <div className="relative z-10 flex justify-between items-start">
                    <h3 className="text-3xl md:text-4xl font-bold">Relaxation & <br/><span className="font-serif italic font-normal text-gray-400">Serenity</span></h3>
                    <span className="text-5xl md:text-7xl font-serif text-gray-200 font-light opacity-50 tracking-tighter" aria-hidden="true">03</span>
                </div>
                <p className="relative z-10 text-lg md:text-xl text-gray-500 max-w-md">Unwind in absolute comfort, surrounded by tranquility and exceptional service.</p>
            </div>
        </div>
    </section>
  );
}

export function DigitalTwin() {
  return (
    <section className="digital-twin-container" id="twin-section" aria-labelledby="twin-heading">
        <div className="twin-layer twin-wireframe flex items-center justify-center" aria-hidden="true">
            <div className="text-[15vw] font-black text-white/5 tracking-tighter uppercase select-none">Experience</div>
        </div>
        <div className="twin-layer twin-real" id="twin-real" aria-hidden="true"></div>
        <div className="scan-line" id="scan-line" aria-hidden="true"></div>
        <div className="absolute bottom-20 left-10 z-20 max-w-md">
            <h2 id="twin-heading" className="text-5xl font-bold text-white tracking-tight reveal-up">Unrivaled <br/><span className="font-serif italic text-gray-500 font-light">Comfort</span></h2>
            <p className="text-gray-400 mt-6 reveal-up reveal-delay-1">Preview your perfect stay. Immerse yourself in the luxury and tranquility that awaits you.</p>
        </div>
    </section>
  );
}

export function SensoryPalette() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion() ?? false;
  
  const items = [
    { title: "Texture", desc: "Egyptian cotton & raw silk", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800" },
    { title: "Aroma", desc: "Bespoke cedar & bergamot", img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800" },
    { title: "Sound", desc: "Curated ambient acoustics", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800" },
    { title: "Light", desc: "Circadian rhythm lighting", img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800" },
  ];

  return (
    <section id="amenities" className="py-32 bg-[#050505] text-white relative flex flex-col items-center justify-center overflow-hidden min-h-screen">
        <div className="max-w-7xl w-full mx-auto px-6 mb-16 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-8">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">
                The Sensory<br/><span className="font-serif italic font-light text-white/70 lowercase">Palette</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-md">
                We don't just provide rooms. We curate textures, aromas, and experiences that define your stay at a molecular level.
            </p>
        </div>
        
        <div className="w-full max-w-7xl mx-auto px-6 h-[60vh] flex gap-4">
            {items.map((item, i) => (
                <motion.div
                    key={i}
                    className="relative rounded-2xl overflow-hidden cursor-pointer"
                    initial={{ flex: 1 }}
                    animate={{ flex: hoveredIndex === i ? 3 : hoveredIndex === null ? 1 : 0.5 }}
                    transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE_DRAWER }}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <motion.img 
                        src={item.img} 
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        animate={{ scale: hoveredIndex === i ? 1.05 : 1 }}
                        transition={{ duration: reduceMotion ? 0 : 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <motion.div 
                        className="absolute bottom-0 left-0 p-8 w-full"
                        animate={{ opacity: hoveredIndex === i ? 1 : 0.6 }}
                    >
                        <div className="flex items-center gap-4 mb-2">
                            <span className="text-xs font-mono text-brand-gold">0{i + 1}</span>
                            <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wide">{item.title}</h3>
                        </div>
                        <motion.p 
                            className="text-gray-300 text-sm md:text-base overflow-hidden whitespace-nowrap"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ 
                                opacity: hoveredIndex === i ? 1 : 0,
                                height: hoveredIndex === i ? "auto" : 0
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            {item.desc}
                        </motion.p>
                    </motion.div>
                </motion.div>
            ))}
        </div>
    </section>
  );
}
