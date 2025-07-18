import React, { useState, useEffect } from 'react'
import { Outlet } from "react-router-dom";
import TitleBar from '../components/TitleBar';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {

  const [showSidebar, setShowSidebar] = useState(true)

  return (
    <div className='h-screen flex flex-col bg-gray-100'>

      <div className='flex-none'>
        <TitleBar setShowSidebar={ setShowSidebar } />
      </div>

      <section className='flex-grow flex w-full  overflow-hidden'>
        {showSidebar && (

          <Sidebar />
        )}
        <div className='flex-grow overflow-y-auto p-4'>
          <Outlet />
        </div>
      </section>
    </div>
  )
}

export default MainLayout