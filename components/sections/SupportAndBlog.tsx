import React from 'react';

export function Support() {
  return (
    <section id="guest-portal" className="py-24 md:py-32 bg-white px-6" aria-labelledby="support-heading">
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-between gap-12 mb-20">
                <div className="lg:w-1/2 reveal-up">
                    <h2 id="support-heading" className="text-4xl md:text-6xl font-bold tracking-tight">
                        Exceptional <br/> Service <br/>
                        <span className="font-serif italic text-gray-400">Beyond <br/> Expectations</span>
                    </h2>
                </div>
                <div className="lg:w-1/2 flex flex-col items-start justify-end reveal-up reveal-delay-1">
                    <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8">
                        Your comfort is our priority — and we never compromise.
                        <span className="font-serif italic text-black highlight-draw">Our dedicated staff offers continued support throughout your stay, ensuring every moment is perfect.</span>
                    </p>
                    <a href="#" className="magnetic-btn items-center gap-2 bg-white border border-black text-black px-8 py-4 rounded-full text-sm font-semibold hover:bg-gray-50 min-h-[44px] min-w-[44px]">
                        Discover Our Amenities
                        <svg className="w-4 h-4 inline-block ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </a>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <article className="group reveal-up">
                    <div className="w-full aspect-[4/5] rounded-lg zoom-img-container mb-6" aria-hidden="true">
                        <img src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80" alt="" className="parallax-img" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 transition-colors group-hover:text-gray-500">Spa & Wellness</h3>
                    <p className="text-gray-600 mb-6">Rejuvenate your body and mind with our world-class spa treatments.</p>
                    <a href="#" className="inline-flex items-center text-sm font-bold uppercase tracking-wider hover:text-gray-500 transition-colors min-h-[44px] min-w-[44px]">Learn More <span aria-hidden="true">&rarr;</span></a>
                </article>
                
                <article className="group reveal-up reveal-delay-1">
                    <div className="w-full aspect-[4/5] rounded-lg zoom-img-container mb-6" aria-hidden="true">
                        <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80" alt="" className="parallax-img" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 transition-colors group-hover:text-gray-500">Fine Dining</h3>
                    <p className="text-gray-600 mb-6">Savor exquisite culinary creations prepared by our renowned chefs.</p>
                    <a href="#" className="inline-flex items-center text-sm font-bold uppercase tracking-wider hover:text-gray-500 transition-colors min-h-[44px] min-w-[44px]">Learn More <span aria-hidden="true">&rarr;</span></a>
                </article>

                <article className="group reveal-up reveal-delay-2">
                    <div className="w-full aspect-[4/5] rounded-lg zoom-img-container mb-6" aria-hidden="true">
                        <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80" alt="" className="parallax-img" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 transition-colors group-hover:text-gray-500">Curated Experiences</h3>
                    <p className="text-gray-600 mb-6">Let us arrange unforgettable local tours and exclusive activities just for you.</p>
                    <a href="#" className="inline-flex items-center text-sm font-bold uppercase tracking-wider hover:text-gray-500 transition-colors min-h-[44px] min-w-[44px]">Learn More <span aria-hidden="true">&rarr;</span></a>
                </article>
            </div>
        </div>
    </section>
  );
}

export function BlogInsights() {
  return (
    <section className="py-24 md:py-32 bg-brand-light px-6 border-t border-gray-100" aria-labelledby="blog-heading">
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">
                <div className="lg:w-1/2 reveal-up">
                    <h2 id="blog-heading" className="text-4xl md:text-6xl font-bold tracking-tight">
                        Resort <br/>
                        <span className="font-serif italic text-gray-400">Insights</span>
                    </h2>
                </div>
                <div className="lg:w-1/2 flex flex-col items-start justify-end reveal-up reveal-delay-1">
                    <p className="text-xl text-gray-600 leading-relaxed mb-8">
                        See how we've helped guests achieve their perfect vacation, one unforgettable stay at a time.
                    </p>
                    <a href="#" className="magnetic-btn items-center gap-2 bg-black text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-gray-800 min-h-[44px] min-w-[44px]">
                        Read Our Stories
                        <svg className="w-4 h-4 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </a>
                </div>
            </div>

            <div className="space-y-12">
                <article className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-gray-200 pb-12 group reveal-up">
                    <div className="md:col-span-5 rounded-lg aspect-video tilt-wrapper" aria-hidden="true">
                        <div className="w-full h-full tilt-inner shadow-lg rounded-lg overflow-hidden">
                            <div className="tilt-glare"></div>
                            <img src="https://images.unsplash.com/photo-1542314831-c6a4d1409e1c?auto=format&fit=crop&q=80" alt="" className="w-full h-full object-cover transform scale-105"/>
                        </div>
                    </div>
                    <div className="md:col-span-7 flex flex-col justify-center">
                        <time dateTime="2026-02-23" className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">2026-02-23</time>
                        <a href="#" className="text-2xl md:text-3xl font-bold hover:text-gray-600 transition-colors mb-4">5 Ways to Unwind on Your Next Tropical Escape</a>
                        <p className="text-gray-600 mb-6">When the world speeds up, slow down. Five curated ways to make the most of your resort stay.</p>
                        <div>
                            <a href="#" className="magnetic-btn items-center gap-2 bg-white border border-black text-black px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-50 min-h-[44px] min-w-[44px]" aria-label="Read more about 5 Ways to Unwind on Your Next Tropical Escape">
                                Read More
                                <svg className="w-4 h-4 inline-block ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </a>
                        </div>
                    </div>
                </article>

                <article className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-gray-200 pb-12 group reveal-up">
                    <div className="md:col-span-5 rounded-lg aspect-video tilt-wrapper" aria-hidden="true">
                        <div className="w-full h-full tilt-inner shadow-lg rounded-lg overflow-hidden">
                            <div className="tilt-glare"></div>
                            <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80" alt="" className="w-full h-full object-cover transform scale-105"/>
                        </div>
                    </div>
                    <div className="md:col-span-7 flex flex-col justify-center">
                        <time dateTime="2026-02-02" className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">2026-02-02</time>
                        <a href="#" className="text-2xl md:text-3xl font-bold hover:text-gray-600 transition-colors mb-4">January 2026 Resort Highlights</a>
                        <p className="text-gray-600 mb-6">New amenities are open across our properties. See how our oceanfront, garden, and city locations are shaping up heading into spring.</p>
                        <div>
                            <a href="#" className="magnetic-btn items-center gap-2 bg-white border border-black text-black px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-50 min-h-[44px] min-w-[44px]" aria-label="Read more about January 2026 Resort Highlights">
                                Read More
                                <svg className="w-4 h-4 inline-block ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </a>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </section>
  );
}
