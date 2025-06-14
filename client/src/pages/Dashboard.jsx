import React from 'react';
import Sidebar from '../components/Sidebar';
import MainBody from '../components/MainBody';
import TitleBar from '../components/TitleBar';

const Dashboard = () => {
  return (
    <div className='h-screen flex flex-col bg-gray-100'>

      <div className='flex-none'> 
        <TitleBar />
      </div>

      <section className='flex-grow flex w-full  overflow-hidden'> 
        <Sidebar />
        <div className='flex-grow overflow-y-auto p-4'>
          <MainBody />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;