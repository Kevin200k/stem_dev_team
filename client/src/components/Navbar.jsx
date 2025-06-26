import React, { useEffect, useState } from 'react';
import imageIcon from "../assets/icon/image2.png";

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
      className={`fixed w-full px-10 top-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black shadow-lg'
          : 'bg-transparent border-b-[px] border-[#2b2f62]'
      }`}
    >
      <div className="w-full px-6 md:px-16 lg:px-10 py-5 flex items-center justify-between">
        <img src={imageIcon} className='h-7' alt="Icon" />
        <nav className="hidden md:flex space-x-7 font-medium text-[15px]">
          <a
            href="#features"
            className={`transition-colors duration-300 ${
              scrolled ? 'text-gray-900 hover:text-[#DA70D6]' : 'text-black hover:text-[#DA70D6]'
            }`}
          >
            Features
          </a>
          <a
            href="#how"
            className={`transition-colors duration-300 ${
              scrolled ? 'text-gray-900 hover:text-[#DA70D6]' : 'text-black hover:text-[#DA70D6]'
            }`}
          >
            How It Works
          </a>
          <a
            href="#pricing"
            className={`transition-colors duration-300 ${
              scrolled ? 'text-gray-900 hover:text-[#DA70D6]' : 'text-black hover:text-[#DA70D6]'
            }`}
          >
            Pricing
          </a>
          <a
            href="#contact"
            className={`transition-colors duration-300 ${
              scrolled ? 'text-gray-900 hover:text-[#DA70D6]' : 'text-black hover:text-[#DA70D6]'
            }`}
          >
            Contact
          </a>
        </nav>
             <div className="flex gap-3">
          {/* Login Button */}
          <button
            className={`ibm-font px-5 py-1.5 rounded-3xl text-[16px] hover:scale-105 transition border ${
              scrolled
                ? 'bg-black text-[#DA70D6] border-[#DA70D6] hover:bg-[#fbe9f3]'
                : 'bg-transparent text-black border-1 border-transparent hover:bg-black hover:text-[#2b2f62] hover:border-black'
            }`}
          >
            Login
          </button>


          {/* Sign Up Button */}
       <button
        className="ibm-font px-5 py-1.5 text-[16px] text-white bg-gradient-to-r from-[#9379f4] to-[#f472b6] rounded-3xl hover:scale-105 transition w-full h-full"
      >
        Sign Up
      </button>



        </div>
      </div>
    </header>
  );
}
