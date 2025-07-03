import React, { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-lg'
          : 'bg-transparent border-b-[px] border-[#2b2f62]'
      }`}
    >
      <div className="w-full px-6 md:px-16 lg:px-10 py-5 flex items-center justify-between">
        <div className={`text-[21px] font-medium transition-colors duration-300 ${
          scrolled ? 'text-gray-900' : 'text-white'
        }`}>
          LearnHub.
          <span className='text-[#a972ec]'>ai</span>
        </div>
        <nav className="hidden md:flex space-x-7 font-medium text-[15px]">
          <a
            href="#features"
            className={`transition-colors duration-300 ${
              scrolled ? 'text-gray-900 hover:text-[#DA70D6]' : 'text-white hover:text-[#DA70D6]'
            }`}
          >
            Features
          </a>
          <a
            href="#how"
            className={`transition-colors duration-300 ${
              scrolled ? 'text-gray-900 hover:text-[#DA70D6]' : 'text-white hover:text-[#DA70D6]'
            }`}
          >
            How It Works
          </a>
          <a
            href="#pricing"
            className={`transition-colors duration-300 ${
              scrolled ? 'text-gray-900 hover:text-[#DA70D6]' : 'text-white hover:text-[#DA70D6]'
            }`}
          >
            Pricing
          </a>
          <a
            href="#contact"
            className={`transition-colors duration-300 ${
              scrolled ? 'text-gray-900 hover:text-[#DA70D6]' : 'text-white hover:text-[#DA70D6]'
            }`}
          >
            Contact
          </a>
        </nav>
             <div className="flex gap-3">
          {/* Login Button */}
          <button
            className={`px-5 py-1.5 rounded-3xl text-[16px] hover:scale-105 transition border ${
              scrolled
                ? 'bg-white text-[#DA70D6] border-[#DA70D6] hover:bg-[#fbe9f3]'
                : 'bg-transparent text-white border-1 border-transparent hover:bg-white hover:text-[#2b2f62] hover:border-white'
            }`}
          >
            Login
          </button>


          {/* Sign Up Button */}
       <button
        className="px-5 py-1.5 text-[16px] text-white bg-gradient-to-tr from-[#9d5aff] to-[#d48cfa] rounded-3xl hover:scale-105 transition w-full h-full"
      >
        Sign Up
      </button>



        </div>
      </div>
    </header>
  );
}
