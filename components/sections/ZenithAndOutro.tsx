import React from 'react';

export function ZenithGate() {
  return (
    <section className="py-24 md:py-32 bg-[#faf9f6] px-6 text-[#1a1a1a]">
        <div className="max-w-[90rem] mx-auto">
            {/* Top Section */}
            <div className="text-center mb-24 md:mb-32">
                <h2 className="text-5xl md:text-8xl lg:text-[9rem] font-serif tracking-tight leading-none mb-8 uppercase">
                    A Legacy of<br/>Luxury Since 1991
                </h2>
                <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto font-serif italic">
                    Founded in Paris in 1991, we curate experiences for independent travelers with casual elegance.
                </p>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 border-t border-gray-200 pt-16 md:pt-24">
                {/* Left: Newsletter */}
                <div className="flex flex-col justify-center max-w-md mx-auto md:mx-0">
                    <h3 className="text-3xl md:text-5xl font-serif mb-6 leading-tight uppercase">
                        Join The<br/>Exclusive<br/>Family!
                    </h3>
                    <p className="text-gray-500 text-sm mb-12 font-serif italic">
                        Subscribe to our newsletter to receive our news and get exclusive advantages!
                    </p>
                    
                    <form className="w-full">
                        <div className="flex border-b border-gray-300 pb-2 mb-4">
                            <input 
                                type="email" 
                                placeholder="Your email address" 
                                className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400 font-serif"
                            />
                            <button type="submit" className="text-sm font-bold uppercase tracking-wider hover:text-gray-500 transition-colors">
                                Subscribe
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="privacy" className="w-3 h-3 border-gray-300" />
                            <label htmlFor="privacy" className="text-[10px] text-gray-400 uppercase tracking-wider">
                                I have read and accepted the Terms & Privacy
                            </label>
                        </div>
                    </form>
                </div>

                {/* Right: Instagram Grid */}
                <div className="flex flex-col">
                    <div className="text-center mb-10">
                        <h3 className="text-2xl font-serif uppercase mb-1">Our Instagram</h3>
                        <p className="text-sm text-gray-500 font-serif italic">@luxuryresorts</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="aspect-[3/4] bg-gray-200 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1542314831-c6a4d1409e1c?auto=format&fit=crop&q=80&w=600" alt="Instagram 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="aspect-[3/4] bg-gray-200 overflow-hidden mt-12">
                            <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=600" alt="Instagram 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}

export function Outro() {
  return (
    <section className="relative py-48 flex items-center justify-center text-center overflow-hidden" aria-labelledby="outro-heading">
        <div className="absolute inset-0 z-0" aria-hidden="true">
            <img id="outroParallax" src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2800&q=80" alt="Luxury Resort View" className="w-full h-[130%] object-cover brightness-50" style={{transform: 'translateY(0)'}} />
        </div>
        <div className="relative z-10 px-4 reveal-up">
            <h2 id="outro-heading" className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-10">
                Find Your Escape.<br/>
                <span className="font-serif italic text-gray-300 highlight-draw" style={{backgroundImage: 'linear-gradient(120deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.2) 100%)'}}>We'll Handle the Rest.</span>
            </h2>
            <a href="#" className="magnetic-btn items-center gap-2 bg-white text-black px-8 py-4 rounded-full text-sm font-semibold hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white focus-visible:outline-none inline-flex">
                Reserve Now
                <svg className="w-4 h-4 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </a>
        </div>
    </section>
  );
}
