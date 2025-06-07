import React from 'react';

export default function Navbar() {
  return (
    <header className="bg-white w-full shadow-sm fixed top-0 z-50">
  <nav className="mx-0 flex justify-between items-center px-6 md:px-16 py-4">
    
    {/* Brand */}
    <div className="font-edu-sa-hand text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#E6E6FA] to-[#DA70D6]">
      Leanershub.ai
    </div>

    {/* Navigation Links */}
    <ul className="hidden md:flex gap-6 text-gray-700">
      <li className="hover:text-[#DA70D6] transition cursor-pointer">How It Works</li>
      <li className="hover:text-[#DA70D6] transition cursor-pointer">Features</li>
      <li className="hover:text-[#DA70D6] transition cursor-pointer">About</li>
      <li className="hover:text-[#DA70D6] transition cursor-pointer">Contact</li>
    </ul>

    {/* CTA Buttons */}
    <div className="flex gap-4">
      <button className="text-[#DA70D6] font-semibold hover:underline transition">Log In</button>
      <button className="bg-gradient-to-r from-[#DA70D6] to-[#C8A2C8] text-white px-5 py-2 rounded-xl shadow hover:scale-105 transition">
        Sign Up
      </button>
    </div>
  </nav>
</header>

  );
}
