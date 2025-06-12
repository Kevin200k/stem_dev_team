import React from 'react'
import { Outlet } from "react-router-dom";
import TitleBar from '../components/TitleBar';

const MainLayout = () => {
  return (
    <div className='bg-gray-100 h-screen pt-4 flex flex-col'>
      <TitleBar />
      <Outlet />
    </div>
  )
}

export default MainLayout