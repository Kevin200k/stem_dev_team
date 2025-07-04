import React from 'react';
import { useState } from 'react'; 
import { Mic, Bell, User } from 'lucide-react';
import image2 from '../assets/icon/image2.png'

const TitleBar = () => {
  return (
    <div className='h-20 grid grid-cols-[1fr_2fr_1fr] mx-4 rounded-lg shadow-md bg-white'>

      {/* Logo/Name */}
      <div className='flex items-center ml-6'>
        <img src={ image2 } className='w-44'/>
      </div>

      {/* Search Bar Section */}
      <div className='flex items-center p-2'>
        <input
          type='text'
          placeholder='Search Courses'
          className='flex-grow p-2 h-[50px] pl-4 bg-purple-50 rounded-full focus:ring-2 focus:ring-purple-400 focus:outline-none text-lg text-gray-700 placeholder-gray-500'
        />

        {/* Mic Icon Button (Search Voice) */}
        <div className="ml-3 w-[48px] h-[48px] bg-purple-100 rounded-full flex justify-center items-center cursor-pointer
                        hover:bg-purple-200 transition-colors duration-200">
          <Mic size={24} className='text-purple-700'/> 
        </div>
      </div>

      {/* Right-side Icons (Notifications, User Profile) */}
      <div className='flex items-center justify-end mr-6'>

        {/* Bell Icon (Notifications) */}
        <div className='w-[48px] h-[48px] flex items-center justify-center rounded-full cursor-pointer
                        bg-purple-100 hover:bg-purple-200 transition-colors duration-200'>
          <Bell size={24} className='text-purple-700'/>
        </div>

        {/* User Icon (Profile) */}
        <div className='w-[48px] h-[48px] flex items-center justify-center rounded-full cursor-pointer ml-3
                        bg-purple-100 hover:bg-purple-200 transition-colors duration-200'>
          <User size={24} className='text-purple-700'/>
        </div>
      </div>
    </div>
  );
};

export default TitleBar;