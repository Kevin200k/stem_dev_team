import React from 'react';
import { Mic, Bell, User } from 'lucide-react';
import image2 from '../assets/icon/image2.png';
import { useNavigate } from 'react-router-dom';

const TitleBar = () => {
  const navigate = useNavigate();

  const handleSearchFocus = () => {
    navigate('/search');
  };

  return (
    <div className='h-20 grid grid-cols-[1fr_2fr_1fr] mx-4 rounded-lg shadow-md bg-white'>

      {/* Logo/Name */}
      <div className='flex items-center ml-6'>
        <img src={image2} alt="Logo" className='w-44' />
      </div>

      {/* Search Bar Section */}
      <div className='flex items-center p-2'>
        <div className="flex-grow relative">
          <input
            type="text"
            placeholder="Search Courses"
            onFocus={handleSearchFocus} // 🔍 Redirect on click/focus
            className="w-full h-[50px] pl-5 pr-5 text-lg text-gray-700 placeholder-gray-500 rounded-full bg-purple-50 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all duration-300"
          />
        </div>

        {/* Mic Icon Button */}
        <div className="ml-3 w-[48px] h-[48px] bg-purple-100 rounded-full flex justify-center items-center cursor-pointer hover:bg-purple-200 transition-colors duration-200">
          <Mic size={24} className='text-purple-700' />
        </div>
      </div>

      {/* Right-side Icons */}
      <div className='flex items-center justify-end mr-6'>

        <div className='w-[48px] h-[48px] flex items-center justify-center rounded-full cursor-pointer bg-purple-100 hover:bg-purple-200 transition-colors duration-200'>
          <Bell size={24} className='text-purple-700' />
        </div>

        <div className='w-[48px] h-[48px] flex items-center justify-center rounded-full cursor-pointer ml-3 bg-purple-100 hover:bg-purple-200 transition-colors duration-200'>
          <User size={24} className='text-purple-700' />
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
