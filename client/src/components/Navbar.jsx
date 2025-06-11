import React from 'react';
import { useState } from 'react';
import { Mic } from 'lucide-react';
import { Bell } from 'lucide-react';
import { User } from 'lucide-react';

const Navbar = () => {

  return (
    <div className='h-20 grid grid-cols-[1fr_2fr_1fr] max-w-full mx-4 rounded-md bg-white'>


      <div className='flex items-center ml-4'>
        <h1 className='text-3xl text-black font-bold'>LearnHub.Ai</h1>
      </div>


      <div className='flex items-center p-2'>
        <input
          type='text'
          placeholder='Search Courses'
          className='flex-grow p-2 h-[50px] pl-4 bg-gray-100 rounded-md focus:outline-none text-xl'
        />

        <div className="ml-2 w-[50px] h-[50px] bg-gray-100 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-200">
          <Mic color='black'/>
        </div>
      </div>

      <div className='flex items-center justify-end mr-4'>

        <div className='w-[50px] h-[50px] flex items-center justify-center rounded-full cursor-pointer bg-gray-100 hover:bg-gray-200'>
          <Bell color='black'/>
        </div>

        <div className='w-[50px] h-[50px] flex items-center justify-center rounded-full cursor-pointer ml-4 mr-4 bg-gray-100 hover:bg-gray-200'>
          <User color='black'/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;