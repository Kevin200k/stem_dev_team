import React from 'react'
import { LayoutDashboard, GraduationCap, BookOpenCheck, Play, Settings, LogOut } from 'lucide-react'

const Navbar = () => {
  return (
    // Navbar Container:
    // - bg-white: Keeps the clean, professional white background.
    // - ml-4: Maintains the margin from the left edge (or Dashboard side if it's the parent).
    // - w-56: Sets a fixed width.
    // - h-full: Ensures it takes 100% of the height from its parent (the flex container in Dashboard.jsx).
    // - p-4: Adds internal padding.
    // - flex flex-col justify-between: Stacks items vertically and pushes groups to top/bottom.
    // - rounded-lg shadow-lg: Adds consistent rounded corners and a prominent shadow for depth.
    <div className='bg-white ml-4 w-56 h-full p-4 flex flex-col justify-between shadow-lg'>

      {/* Top Navigation Items */}
      <div className='flex flex-col gap-2'> {/* Added gap for spacing between items */}

        {/* Dashboard Link */}
        <div className='h-12 flex items-center p-4 rounded-md cursor-pointer
                        text-purple-700 font-semibold
                        bg-purple-100 shadow-sm'> {/* Active state styling: purple background, bold text, shadow */}
          <LayoutDashboard size={20}/> {/* Smaller icon for refinement */}
          <span className='ml-3'>Dashboard</span>
        </div>

        {/* Courses Link */}
        <div className='h-12 flex items-center p-4 rounded-md cursor-pointer
                        text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200'> {/* Hover state */}
          <GraduationCap size={20}/>
          <span className='ml-3'>Courses</span>
        </div>

        {/* Test Me Link */}
        <div className='h-12 flex items-center p-4 rounded-md cursor-pointer
                        text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200'>
          <BookOpenCheck size={20}/>
          <span className='ml-3'>Test Me</span>
        </div>

        {/* Videos Link */}
        <div className='h-12 flex items-center p-4 rounded-md cursor-pointer
                        text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200'>
          <Play size={20}/>
          <span className='ml-3'>Videos</span>
        </div>
      </div>

      {/* Bottom Navigation Items (Settings, Logout) */}
      <div className='flex flex-col gap-2'> {/* Added gap for spacing */}
        {/* Settings Link */}
        <div className='h-12 flex items-center p-4 rounded-md cursor-pointer
                        text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200'>
          <Settings size={20}/>
          <span className='ml-3'>Settings</span>
        </div>
        {/* Logout Link */}
        <div className='h-12 flex items-center p-4 rounded-md cursor-pointer
                        text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors duration-200'> {/* Red for logout */}
          <LogOut size={20}/>
          <span className='ml-3'>Logout</span>
        </div>
      </div>
    </div>
  )
}

export default Navbar