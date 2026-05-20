import React from 'react';

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-500 py-6 text-white border-b border-transparent" id="navbar">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 flex items-center justify-between">
            <a href="#" aria-label="STAY Hotel & Resort" className="hover-trigger text-white flex-1 flex items-center nav-logo transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12 2L2 21H7.5L12 12.5L16.5 21H22L12 2Z" fill="currentColor"/>
                </svg>
            </a>
            <nav aria-label="Main Navigation" className="hidden md:flex flex-1 justify-center items-center gap-8 text-[11px] font-medium tracking-[0.15em] uppercase">
                <a href="#rooms" className="nav-link hover-trigger text-white transition-colors">Rooms</a>
                <a href="#amenities" className="nav-link hover-trigger text-white transition-colors">Amenities</a>
                <a href="#experiences" className="nav-link hover-trigger text-white transition-colors">Experiences</a>
                <a href="#about-us" className="nav-link hover-trigger text-white transition-colors">About Us</a>
                <a href="#guest-portal" className="nav-link hover-trigger text-white transition-colors">Guest Portal</a>
            </nav>
            <div className="flex flex-1 items-center justify-end">
                <a href="#" className="hover-trigger hidden md:flex border border-white/40 hover:bg-white hover:text-black transition-colors duration-300 px-6 py-2.5 rounded-full text-[11px] font-semibold tracking-wider uppercase nav-cta">
                    Book Now
                </a>
                <button aria-label="Open Menu" aria-expanded="false" className="md:hidden flex flex-col gap-1.5 focus:outline-none hover-trigger w-8 items-end nav-hamburger">
                    <span className="block w-full h-[1.5px] bg-white transition-colors" aria-hidden="true"></span>
                    <span className="block w-2/3 h-[1.5px] bg-white transition-colors" aria-hidden="true"></span>
                </button>
            </div>
        </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#050505] text-white pt-24 pb-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="md:col-span-2">
                    <a href="#" aria-label="STAY Hotel & Resort" className="flex items-center mb-6">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M12 2L2 21H7.5L12 12.5L16.5 21H22L12 2Z" fill="currentColor"/>
                        </svg>
                    </a>
                    <p className="text-gray-400 max-w-sm">
                        Redefining luxury hospitality through personalized experiences and uncompromising service.
                    </p>
                </div>
                <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider mb-6">Explore</h4>
                    <ul className="space-y-4 text-gray-400">
                        <li><a href="#rooms" className="hover:text-white transition-colors">Rooms & Suites</a></li>
                        <li><a href="#amenities" className="hover:text-white transition-colors">Dining</a></li>
                        <li><a href="#amenities" className="hover:text-white transition-colors">Spa & Wellness</a></li>
                        <li><a href="#experiences" className="hover:text-white transition-colors">Experiences</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider mb-6">Contact</h4>
                    <ul className="space-y-4 text-gray-400">
                        <li>1-800-STAY-LUX</li>
                        <li>reservations@stayresort.com</li>
                        <li>123 Paradise Lane<br/>Tropical Island, TI 12345</li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-sm text-gray-500">
                <p>&copy; 2026 STAY Resort. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>
  );
}
