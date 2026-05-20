import React from 'react';

export function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-white px-6" aria-labelledby="testimonial-heading">
        <div className="max-w-7xl mx-auto">
            <div className="mb-16 reveal-up">
                <h2 id="testimonial-heading" className="text-4xl md:text-6xl font-bold tracking-tight">
                    Don't Take <br/>
                    <span className="font-serif italic text-gray-400">Our Word for It.</span>
                </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="relative min-h-[300px] reveal-up" aria-live="polite">
                    <div className="w-16 h-1 bg-black mb-8 transition-all duration-500" id="sliderIndicator" aria-hidden="true"></div>
                    <div id="testimonial-container" className="relative">
                        <div className="testimonial-slide absolute top-0 left-0 w-full opacity-100 z-10">
                            <blockquote className="text-xl md:text-3xl font-serif italic text-black leading-snug mb-8">
                                "The concierge was incredible. Such a dedicated team, helping us find the perfect activities, dining, and relaxation spots. They were available morning, noon and night. Tireless and dedicated. Would recommend them 100%!"
                            </blockquote>
                            <div className="flex items-center gap-4 text-sm font-medium tracking-wider uppercase text-gray-500">
                                <span>Bernadette Hogan</span>
                                <span aria-hidden="true">/</span>
                                <div className="flex text-black" aria-label="5 out of 5 stars">★★★★★</div>
                            </div>
                        </div>
                        <div className="testimonial-slide absolute top-0 left-0 w-full opacity-0 z-0 pointer-events-none" aria-hidden="true">
                            <blockquote className="text-xl md:text-3xl font-serif italic text-black leading-snug mb-8">
                                "Our stay was truly a blessing. The staff helped us find our perfect rhythm in a great resort. They were patient and very understanding. I would recommend booking here if you are in need of someone who will go out of their way to make sure you have the vacation of your dreams."
                            </blockquote>
                            <div className="flex items-center gap-4 text-sm font-medium tracking-wider uppercase text-gray-500">
                                <span>Tyleen</span>
                                <span aria-hidden="true">/</span>
                                <div className="flex text-black" aria-label="5 out of 5 stars">★★★★★</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full aspect-[4/3] rounded-lg overflow-hidden reveal-up reveal-delay-1 zoom-img-container" aria-hidden="true">
                    <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80" alt="" className="parallax-img" />
                </div>
            </div>
        </div>
    </section>
  );
}

export function ServicesList() {
  return (
    <section className="bg-brand-dark text-white pt-24 pb-12" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto px-6 mb-16 reveal-up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="text-sm font-semibold uppercase tracking-wider text-gray-400">Services</div>
                <h2 id="services-heading" className="text-4xl md:text-6xl font-bold tracking-tight">
                    How STAY <br/>
                    <span className="font-serif italic text-gray-400">Can Help You</span>
                </h2>
            </div>
        </div>
        <div className="border-t border-gray-800 reveal-up reveal-delay-1 services-wrapper">
            <a href="#" className="service-row group block border-b border-gray-800 py-12 px-6 bg-transparent relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10 pointer-events-none">
                    <div className="md:w-1/2 service-desc">
                        <h3 className="text-xl md:text-2xl font-serif italic text-gray-300">
                            Book smarter with expert concierges backed by local guides, chefs, and wellness pros—dialed in to get you the best experience, fast.
                        </h3>
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="service-text text-6xl md:text-8xl font-black uppercase text-gray-600 tracking-tighter transition-colors">Book</span>
                        <svg className="w-12 h-12 text-white transform -rotate-45 group-hover:rotate-0 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </div>
                </div>
                <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" aria-hidden="true"></div>
            </a>
            <a href="#" className="service-row group block border-b border-gray-800 py-12 px-6 bg-transparent relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10 pointer-events-none">
                    <div className="md:w-1/2 service-desc">
                        <h3 className="text-xl md:text-2xl font-serif italic text-gray-300">
                            Relax fully, unwind deeply. Your stay gets pro planning, strategic itineraries, and staff who never stop working until you're completely satisfied.
                        </h3>
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="service-text text-6xl md:text-8xl font-black uppercase text-gray-600 tracking-tighter transition-colors">Relax</span>
                        <svg className="w-12 h-12 text-white transform -rotate-45 group-hover:rotate-0 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </div>
                </div>
                <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
            </a>
            <a href="#" className="service-row group block border-b border-gray-800 py-12 px-6 bg-transparent relative overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10 pointer-events-none">
                    <div className="md:w-1/2 service-desc">
                        <h3 className="text-xl md:text-2xl font-serif italic text-gray-300">
                            Access world-class culinary experiences, from private chefs to exclusive reservations at our award-winning restaurants.
                        </h3>
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="service-text text-6xl md:text-8xl font-black uppercase text-gray-600 tracking-tighter transition-colors">Dine</span>
                        <svg className="w-12 h-12 text-white transform -rotate-45 group-hover:rotate-0 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </div>
                </div>
                <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
            </a>
        </div>
    </section>
  );
}
