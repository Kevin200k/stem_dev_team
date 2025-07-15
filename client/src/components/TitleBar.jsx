import React from 'react';
import { Mic, Bell, User, Menu } from 'lucide-react';
import image2 from '../assets/icon/image2.png';
import { useNavigate } from 'react-router-dom';

const TitleBar = () => {
  const navigate = useNavigate();

  const handleSearchFocus = () => {
    navigate('/search');
  };

  return (
    <>
      {/* Top Bar */}
      <div className="h-20 grid grid-cols-[1fr_1fr] md:grid-cols-[1fr_2fr_1fr] mx-4 shadow-md bg-white items-center px-4 rounded-lg">
        
        {/* Logo and Menu */}
        <div className="flex items-center gap-3">
          {/* Menu Icon (Mobile only) */}
          <div className="block md:hidden cursor-pointer p-2 rounded-full hover:bg-gray-100">
            <Menu size={24} color="gray" />
          </div>

          {/* Logo */}
          <img src={image2} alt="Logo" className="w-32" />
        </div>

        {/* Search Bar (Visible on md and above) */}
        <div className="hidden md:flex items-center p-2">
          <div className="flex-grow relative">
            <input
              type="text"
              placeholder="Search Courses"
              onClick={handleSearchFocus}
              className="w-full h-[50px] pl-5 pr-5 text-lg text-gray-700 placeholder-gray-500 rounded-full bg-purple-50 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all duration-300"
            />
          </div>
          <div className="ml-3 w-[48px] h-[48px] bg-purple-100 rounded-full flex justify-center items-center cursor-pointer hover:bg-purple-200 transition-colors duration-200">
            <Mic size={24} className="text-purple-700" />
          </div>
        </div>

        {/* Right-side Icons */}
        <div className="flex items-center justify-end gap-3">
          {/* Mobile Search Trigger */}
          <div className="block md:hidden">
            <div
              onClick={handleSearchFocus}
              className="flex items-center bg-purple-50 rounded-full px-4 py-2 text-gray-500 text-sm cursor-pointer border border-gray-300"
            >
              Search...
            </div>
          </div>

          {/* Notification Icon */}
          <div className="w-[48px] h-[48px] flex items-center justify-center rounded-full cursor-pointer bg-purple-100 hover:bg-purple-200 transition-colors duration-200">
            <Bell size={24} className="text-purple-700" />
          </div>

          {/* Profile Icon */}
          <div className="w-[48px] h-[48px] flex items-center justify-center rounded-full cursor-pointer bg-purple-100 hover:bg-purple-200 transition-colors duration-200">
            <User size={24} className="text-purple-700" />
          </div>
        </div>
      </div>

      {/* Mobile Search Modal - currently disabled */}
      {/*
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-6">
        <div className="relative w-full max-w-md bg-white rounded-lg p-4 shadow-lg">
          <button
            onClick={() => setIsMobileSearchOpen(false)}
            className="absolute right-5 top-5 text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
          <input
            type="text"
            placeholder="Search Courses"
            className="w-full h-12 px-4 text-lg text-gray-700 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
            autoFocus
          />
        </div>
      </div>
      */}
    </>
  );
};

export default TitleBar;
