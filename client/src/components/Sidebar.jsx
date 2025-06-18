import React from 'react'
import { LayoutDashboard, GraduationCap, BookOpenCheck, Play, Settings, LogOut } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {

  const linkClass = ({ isActive }) => {

    const baseStyles = 'h-12 flex items-center p-4 rounded-md cursor-pointer text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200';

    const activeStyles = 'text-purple-700 font-semibold bg-purple-100 shadow-sm';


    return isActive ? `${baseStyles} ${activeStyles}` : baseStyles;
  }

  return (
    <div className='bg-white ml-4 w-56 h-full p-4 flex flex-col justify-between shadow-lg'>

      <div className='flex flex-col gap-2'>

        <NavLink to='/dashboard' className={linkClass}>
          <LayoutDashboard size={20}/>
          <span className='ml-3'>Dashboard</span>
        </NavLink>

        <NavLink to='/courses' className={linkClass}>
          <GraduationCap size={20}/>
          <span className='ml-3'>Courses</span>
        </NavLink>

        <NavLink to='/test-me' className={linkClass}>
          <BookOpenCheck size={20}/>
          <span className='ml-3'>Test Me</span>
        </NavLink>


        <NavLink to='/videos' className={linkClass}>
          <Play size={20}/>
          <span className='ml-3'>Videos</span>
        </NavLink>
      </div>


      <div className='flex flex-col gap-2'>

        <NavLink to='/settings' className={linkClass}> 
          <Settings size={20}/>
          <span className='ml-3'>Settings</span>
        </NavLink>

        <div className='h-12 flex items-center p-4 rounded-md cursor-pointer
                         text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors duration-200'>
          <LogOut size={20}/>
          <span className='ml-3'>Logout</span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar