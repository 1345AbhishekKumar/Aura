import React from 'react';

export function FamilyStory() {
  return (
    <section id="about-us" className="py-24 bg-[#faf9f6] text-black border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <div className="text-center mb-20 reveal-up">
          <h2 className="text-5xl md:text-7xl font-serif font-normal tracking-tight mb-6 uppercase">
            A Legacy of Luxury<br />Since 1991
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base font-sans">
            Founded in Paris in 1991, The Grand Hotel provides discerning travelers with unmatched elegance and bespoke experiences.
          </p>
        </div>

        {/* Bottom Section: Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-gray-200 pt-16">
          {/* Left Column: Newsletter */}
          <div className="flex flex-col justify-center items-center text-center reveal-up reveal-delay-1">
            <h3 className="text-3xl md:text-4xl font-serif font-normal mb-6 uppercase">
              Join the<br />Exclusive<br />Club!
            </h3>
            <p className="text-gray-600 text-sm mb-10 font-sans max-w-xs">
              Subscribe to our newsletter to receive our news and get exclusive advantages!
            </p>
            <form className="w-full max-w-sm font-sans">
              <div className="flex border-b border-gray-300 pb-2 mb-4">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400"
                  required
                />
                <button type="submit" className="text-sm font-bold uppercase tracking-wider hover:text-gray-600 transition-colors">
                  Subscribe
                </button>
              </div>
              <div className="flex items-start text-left">
                <input type="checkbox" id="terms" className="mt-1 mr-2" required />
                <label htmlFor="terms" className="text-xs text-gray-400">
                  I have read and accepted the Terms & Privacy
                </label>
              </div>
            </form>
          </div>

          {/* Right Column: Instagram */}
          <div className="flex flex-col items-center reveal-up reveal-delay-2 md:border-l border-gray-200 md:pl-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-serif font-normal uppercase mb-1">Our Instagram</h3>
              <a href="#" className="text-sm font-sans text-gray-500 hover:text-black transition-colors">@thegrandhotel</a>
            </div>
            <div className="flex items-end justify-center gap-4 w-full h-[300px]">
                <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=400" alt="Luxury Hotel Spa" className="w-1/3 h-[150px] object-cover" />
                <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400" alt="Luxury Hotel Pool" className="w-1/3 h-[220px] object-cover" />
                <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=400" alt="Luxury Hotel Room" className="w-1/3 h-[300px] object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Impact() {
  return (
    <section id="trail-section" className="py-32 md:py-48 bg-brand-dark text-white relative overflow-hidden flex items-center justify-center" aria-labelledby="impact-heading">
        {/* Central Typography */}
        <div className="relative z-20 text-center max-w-5xl mx-auto px-6 pointer-events-none">
            <h2 id="impact-heading" className="sr-only">Your Perfect Escape</h2>
            <div className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-8 reveal-up" aria-hidden="true">By The Numbers</div>
            <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-24">
                <div className="reveal-up reveal-delay-1">
                    <div className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-2" aria-label="Over 10 Million Nights Booked"><span className="counter-val" data-target="10" aria-hidden="true">0</span><span aria-hidden="true">M+</span></div>
                    <div className="text-xl font-serif italic text-gray-400" aria-hidden="true">Nights Booked</div>
                </div>
                <div className="reveal-up reveal-delay-2">
                    <div className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-2" aria-label="Over 15,000 Happy Guests"><span className="counter-val" data-target="15000" aria-hidden="true">0</span><span aria-hidden="true">+</span></div>
                    <div className="text-xl font-serif italic text-gray-400" aria-hidden="true">Happy Guests</div>
                </div>
            </div>
        </div>
        {/* Dynamic Images */}
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5 pointer-events-none mix-blend-overlay" aria-hidden="true"></div>
        <img src="https://images.unsplash.com/photo-1542314831-c6a4d1409e1c?auto=format&fit=crop&q=80&w=400" className="trail-img" alt="" aria-hidden="true" />
        <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=400" className="trail-img" alt="" aria-hidden="true" />
        <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400" className="trail-img" alt="" aria-hidden="true" />
        <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=400" className="trail-img" alt="" aria-hidden="true" />
        <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=400" className="trail-img" alt="" aria-hidden="true" />
    </section>
  );
}

export function NeighborhoodDial() {
  return (
    <section id="experiences" className="bg-white py-24 border-t border-gray-100" aria-labelledby="neighborhood-heading">
        <div className="dial-container" id="neighborhood-dial" aria-hidden="true">
            <div className="max-w-7xl mx-auto px-6 w-full flex flex-col justify-center h-full">
                <div className="max-w-md reveal-up">
                    <h2 id="neighborhood-heading" className="text-5xl font-black mb-6">Explore Our <br/><span className="font-serif italic text-gray-400">Destinations</span></h2>
                    <p className="text-gray-500 text-lg leading-relaxed">Scroll to rotate the globe. Every location has its own vibration. We map the experience, not just the destination.</p>
                    <div className="mt-12 p-8 border border-gray-200 rounded-3xl bg-gray-50/50">
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Currently Focused</span>
                        <h4 id="dial-label" className="text-3xl font-serif italic mt-2">Oceanfront Access</h4>
                    </div>
                </div>
            </div>

            <div className="main-dial" id="pulse-dial">
                <div className="dial-item" style={{transform: 'rotate(0deg)'}}><div className="dial-label text-4xl font-bold text-gray-800">Oceanfront Access</div></div>
                <div className="dial-item" style={{transform: 'rotate(45deg)'}}><div className="dial-label text-4xl font-bold text-gray-300">Spa & Wellness</div></div>
                <div className="dial-item" style={{transform: 'rotate(90deg)'}}><div className="dial-label text-4xl font-bold text-gray-300">Fine Dining</div></div>
                <div className="dial-item" style={{transform: 'rotate(135deg)'}}><div className="dial-label text-4xl font-bold text-gray-300">Nightlife</div></div>
                <div className="dial-item" style={{transform: 'rotate(180deg)'}}><div className="dial-label text-4xl font-bold text-gray-300">Excursions</div></div>
            </div>
        </div>
    </section>
  );
}
