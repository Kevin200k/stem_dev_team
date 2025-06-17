import React from 'react'
import TitleBar from '../components/TitleBar';
import Sidebar from '../components/Sidebar';

const Courses = () => {
  return (
    <div className='h-screen flex flex-col bg-gray-100'>

      <div className='flex-none'> 
        <TitleBar />
      </div>

      <section className='flex-grow flex w-full  overflow-hidden'> 
        <Sidebar />
        <div className='flex-grow overflow-y-auto p-4'>
          courses
        </div>
      </section>
    </div>
  );
};

export default Courses