import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { EASE_OUT } from '@/lib/motion';
import { cn } from '@/lib/utils';

export function WhyFind() {
  return (
    <section className="py-24 md:py-32 bg-white px-6" aria-labelledby="why-find-heading">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-up">
                <h2 id="why-find-heading" className="text-4xl md:text-5xl font-bold tracking-tight mb-8">Why STAY</h2>
                <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-lg">
                    You need a break. Don't just book a room — book an experience. 
                    <span className="font-serif italic text-black highlight-draw">We don't just book rooms. We curate experiences with clarity, comfort, and the right concierge by your side.</span>
                </p>
            </div>
            <div className="w-full h-[400px] md:h-[500px] rounded-lg curtain-container reveal-delay-1" aria-hidden="true">
                <img src="https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80" alt="" className="w-full h-full object-cover transform scale-105 transition-transform duration-1000 ease-out" />
            </div>
        </div>
    </section>
  );
}

export function ArrowsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const cards = [
    { title: "Arrival & Welcome", img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80", desc: "Step into a world of luxury where every detail is prepared for your arrival." },
    { title: "Experience & Dining", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80", desc: "Curated activities, world-class cuisine, and unforgettable moments." },
    { title: "Relaxation & Serenity", img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80", desc: "Unwind in absolute comfort, surrounded by tranquility and exceptional service." }
  ];

  return (
    <section className="py-32 bg-[#0a0a0a] px-6 overflow-hidden text-white" aria-labelledby="arrows-heading">
        <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-20"
            >
                <h2 id="arrows-heading" className="text-5xl md:text-7xl font-black tracking-tighter uppercase">
                    Beyond <br/>
                    <span className="font-serif italic font-light text-gray-400 lowercase tracking-normal">a vacation</span>
                </h2>
                <p className="mt-6 text-xl text-gray-400 max-w-2xl">
                    It's about relaxation. Comfort. Escaping the ordinary. You're not just looking for a room. You're looking for an experience.
                </p>
            </motion.div>

            <div className="flex flex-col md:flex-row h-[600px] gap-4 w-full">
                {cards.map((card, idx) => (
                    <motion.div
                        key={idx}
                        onHoverStart={() => setHoveredIndex(idx)}
                        onHoverEnd={() => setHoveredIndex(null)}
                        animate={{
                            flex: hoveredIndex === idx ? 3 : 1
                        }}
                        transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE_OUT }}
                        className="relative h-full rounded-2xl overflow-hidden cursor-pointer group flex-1"
                    >
                        <img
                            src={card.img}
                            alt={card.title}
                            className={cn(
                                "absolute inset-0 w-full h-full object-cover",
                                hoveredIndex !== null && hoveredIndex !== idx && "grayscale"
                            )}
                        />
                        <motion.div
                            className="absolute inset-0 bg-black pointer-events-none"
                            animate={{ opacity: hoveredIndex !== null && hoveredIndex !== idx ? 0.5 : 0 }}
                            transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE_OUT }}
                            aria-hidden="true"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        
                        <div className="absolute bottom-0 left-0 p-8 w-full">
                            <h3 className="text-2xl md:text-3xl font-bold mb-2 whitespace-nowrap">{card.title}</h3>
                            <motion.p 
                                animate={{ 
                                    opacity: hoveredIndex === idx ? 1 : 0,
                                    y: hoveredIndex === idx ? 0 : 20,
                                    height: hoveredIndex === idx ? "auto" : 0
                                }}
                                className="text-gray-300 text-sm md:text-base overflow-hidden"
                            >
                                {card.desc}
                            </motion.p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
  );
}

export function Rewired() {
  const cards = [
    { title: "OCEANFRONT VILLA", price: "$1,200 / night", img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=400" },
    { title: "PANORAMIC PENTHOUSE", price: "$2,500 / night", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=400" },
    { title: "PRESIDENTIAL SUITE", price: "$3,000 / night", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=400" },
  ];

  return (
    <section id="rooms" className="py-24 md:py-32 bg-white px-6" aria-labelledby="rewired-heading">
        <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side */}
            <div className="flex flex-col h-full justify-center">
                <div className="flex justify-between items-end mb-12">
                    <h2 id="rewired-heading" className="text-5xl md:text-7xl font-medium tracking-tight leading-none text-gray-900">
                        Signature<br/>
                        <span className="font-serif italic text-gray-600">Suites</span>
                    </h2>
                    <button className="w-12 h-12 bg-[#2a2a2a] rounded-full flex items-center justify-center text-white hover:bg-black transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </button>
                </div>
                
                <div className="flex gap-6 overflow-x-auto pb-8 snap-x hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {cards.map((card, i) => (
                        <div key={i} className="min-w-[280px] md:min-w-[320px] bg-[#e6ded5] rounded-xl p-6 snap-start flex flex-col relative group cursor-pointer h-[400px]">
                            <div className="flex justify-between items-start mb-8">
                                <span className="bg-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest text-gray-800">Featured Suite</span>
                                <button className="w-8 h-8 bg-white/50 rounded-full flex items-center justify-center text-gray-800">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                                </button>
                            </div>
                            <div className="flex-grow flex items-center justify-center mb-8 overflow-hidden rounded-lg">
                                <img src={card.img} alt={card.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="flex justify-between items-end mt-auto">
                                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wide max-w-[180px] leading-relaxed">{card.title}</h3>
                                <span className="text-xs font-semibold text-gray-800">{card.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-4 max-w-xs leading-relaxed">
                    Curated for absolute comfort and elegance.
                </p>
            </div>

            {/* Right Side */}
            <div className="h-[70vh] lg:h-[90vh] overflow-hidden relative rounded-2xl">
                <img src="https://images.unsplash.com/photo-1542314831-c6a4d1409e1c?auto=format&fit=crop&q=80&w=1200" alt="Luxury Resort Pool" className="w-full h-full object-cover" />
            </div>
        </div>
    </section>
  );
}
