import React from 'react'
import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <div className='bg-gray-100 min-h-screen pt-4'>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout