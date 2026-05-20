import React from 'react';

export function ForAgents() {
  return (
    <section className="py-24 md:py-32 bg-white px-6" aria-labelledby="agents-heading">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="hidden lg:block lg:col-span-4 curtain-container" aria-hidden="true">
                <div className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-6 absolute z-20 top-0 left-0 bg-white/80 p-2">For Guests</div>
                <div className="w-full aspect-[3/4] rounded-lg overflow-hidden zoom-img-container">
                    <img src="https://images.unsplash.com/photo-1542314831-c6a4d1409e1c?auto=format&fit=crop&q=80" alt="" className="parallax-img grayscale opacity-80 hover:grayscale-0 transition-all duration-700" />
                </div>
            </div>
            <div className="lg:col-span-8 relative reveal-up reveal-delay-1">
                <h2 id="agents-heading" className="text-4xl md:text-6xl font-bold tracking-tight mb-8 z-10 relative">
                    Don't Just Stay.<br/>
                    <span className="font-serif italic text-gray-400">Belong.</span>
                </h2>
                <div className="w-full h-[400px] rounded-lg overflow-hidden mb-8 relative zoom-img-container" aria-hidden="true">
                    <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80" alt="" className="parallax-img" />
                </div>
                <p className="max-w-2xl text-lg md:text-xl text-gray-600 leading-relaxed mb-10">
                    At STAY, our guests don't just visit—they become part of our story.
                    <span className="font-serif italic text-black highlight-draw">We provide personalized experiences, so you're invested in more than just a room.</span> Our staff is dedicated, attentive, and equipped to deliver five-star service.
                </p>
                <a href="#" className="magnetic-btn items-center gap-2 bg-black text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-gray-800 min-h-[44px] min-w-[44px]">
                    Reserve Now
                    <svg className="w-4 h-4 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </a>
            </div>
        </div>
    </section>
  );
}

export function SupportBeyond() {
  return (
    <section id="h-scroll-wrapper" className="h-[300vh] relative bg-brand-light border-y border-gray-200">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
            
            <div className="px-6 md:px-24 mb-12 absolute top-20 left-0 reveal-up">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-black">
                    Exclusive <br/>
                    <span className="font-serif italic text-gray-500">Suites</span>
                </h2>
            </div>

            <div id="h-scroll-track" className="flex gap-8 md:gap-16 px-6 md:px-24 w-max mt-20 items-center">
                
                <div className="h-scroll-item group">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80')] bg-cover bg-center transform group-hover:scale-105 transition-transform duration-1000"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-10 left-10 text-white pr-10">
                        <p className="font-mono text-sm tracking-widest text-gray-300 mb-2">01 / OCEAN VIEW</p>
                        <h3 className="text-3xl md:text-5xl font-serif italic mb-4">The Grand Penthouse</h3>
                        <a href="#" className="inline-flex items-center text-sm font-bold uppercase tracking-wider hover:text-gray-300 transition-colors">Book Now &rarr;</a>
                    </div>
                </div>

                <div className="h-scroll-item group">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80')] bg-cover bg-center transform group-hover:scale-105 transition-transform duration-1000"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-10 left-10 text-white pr-10">
                        <p className="font-mono text-sm tracking-widest text-gray-300 mb-2">02 / GARDEN VIEW</p>
                        <h3 className="text-3xl md:text-5xl font-serif italic mb-4">Heritage Suite</h3>
                        <a href="#" className="inline-flex items-center text-sm font-bold uppercase tracking-wider hover:text-gray-300 transition-colors">Book Now &rarr;</a>
                    </div>
                </div>

                <div className="h-scroll-item group">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80')] bg-cover bg-center transform group-hover:scale-105 transition-transform duration-1000"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-10 left-10 text-white pr-10">
                        <p className="font-mono text-sm tracking-widest text-gray-300 mb-2">03 / CITY VIEW</p>
                        <h3 className="text-3xl md:text-5xl font-serif italic mb-4">Modern Executive</h3>
                        <a href="#" className="inline-flex items-center text-sm font-bold uppercase tracking-wider hover:text-gray-300 transition-colors">Book Now &rarr;</a>
                    </div>
                </div>

                <div className="h-scroll-item group">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80')] bg-cover bg-center transform group-hover:scale-105 transition-transform duration-1000"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-10 left-10 text-white pr-10">
                        <p className="font-mono text-sm tracking-widest text-gray-300 mb-2">04 / POOL VIEW</p>
                        <h3 className="text-3xl md:text-5xl font-serif italic mb-4">Lakeside Cabana</h3>
                        <a href="#" className="inline-flex items-center text-sm font-bold uppercase tracking-wider hover:text-gray-300 transition-colors">Book Now &rarr;</a>
                    </div>
                </div>

            </div>
        </div>
    </section>
  );
}

export function DeconstructedArchitecture() {
  return (
    <section className="py-24 md:py-32 bg-[#1a1a1a] px-6 text-white">
        <div className="max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Featured Card */}
            <div className="bg-white text-black rounded-sm overflow-hidden flex flex-col h-full">
                <div className="relative h-[60vh] w-full bg-[#f4ece4] p-8 flex items-center justify-center">
                    <span className="absolute top-6 left-6 bg-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">Featured</span>
                    <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800" alt="Featured" className="w-3/4 h-3/4 object-cover shadow-2xl" />
                </div>
                <div className="p-8 md:p-12 flex flex-col flex-grow">
                    <h3 className="text-2xl md:text-3xl font-medium mb-4 leading-tight">
                        Beauty Secrets from Around the World: Rituals and Ingredients You Need to Try
                    </h3>
                    <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                        Drawing from our rich ayurvedic legacy of over 30 years and embracing dermal science, we aim to create transparent skincare that is incredibly effective, safe and without harming the environment or the planet.
                    </p>
                    <div className="flex justify-between items-center mt-auto text-xs text-gray-400 uppercase tracking-wider">
                        <span>8 Feb 2025</span>
                        <a href="#" className="underline hover:text-black transition-colors">Read more</a>
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex flex-col h-full">
                <div className="text-center lg:text-left mb-16 lg:mt-12">
                    <h2 className="text-5xl md:text-7xl font-serif italic font-light mb-2">clean</h2>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tight uppercase mb-6">Journal</h2>
                    <p className="text-gray-400 text-sm max-w-sm mx-auto lg:mx-0">
                        Healthy tips on skincare, regimen and overall a better lifestyle.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-auto">
                    {/* Small Card 1 */}
                    <div className="bg-white text-black rounded-sm overflow-hidden flex flex-col">
                        <div className="h-48 bg-[#e8cbb8] flex items-center justify-center p-6">
                            <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=400" alt="Article 1" className="w-full h-full object-cover shadow-lg" />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <h4 className="text-sm font-medium mb-6 leading-snug">
                                Your Skincare and Makeup Routine Impacts Your Well-Being
                            </h4>
                            <div className="flex justify-between items-center mt-auto text-[10px] text-gray-400 uppercase tracking-wider">
                                <span>20 Dec 2024</span>
                                <a href="#" className="underline hover:text-black transition-colors">Read more</a>
                            </div>
                        </div>
                    </div>

                    {/* Small Card 2 */}
                    <div className="bg-white text-black rounded-sm overflow-hidden flex flex-col">
                        <div className="h-48 bg-[#d4e0d8] flex items-center justify-center p-6">
                            <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=400" alt="Article 2" className="w-full h-full object-cover shadow-lg" />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <h4 className="text-sm font-medium mb-6 leading-snug">
                                How to Make Your Routine More Eco-Friendly
                            </h4>
                            <div className="flex justify-between items-center mt-auto text-[10px] text-gray-400 uppercase tracking-wider">
                                <span>25 Jan 2025</span>
                                <a href="#" className="underline hover:text-black transition-colors">Read more</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center mt-16">
                    <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform mb-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </button>
                    <span className="text-xs uppercase tracking-widest text-gray-400">See All</span>
                </div>
            </div>
        </div>
    </section>
  );
}
