import React from 'react'; 
import { Mic, Bell, User, Menu, Search } from 'lucide-react'; // ✅ Added Search here
import { useNavigate } from 'react-router-dom';
import tanjiro from '../assets/avatars/tanjiro.jpg';


const TitleBar = ({ setShowSidebar }) => {
  const navigate = useNavigate();

  const handleSearchFocus = () => {
    navigate('/search');
  };

  const handleToggle = () => {
    if (window.innerWidth < 768) {
      setShowSidebar(prev => !prev);
    }
  };

  return (
    <div className="h-20 px-4 flex items-center shadow-sm">

      {/* Center: Search bar (desktop only) */}
      <div className="hidden md:flex items-center justify-center flex-1">
        <div className="flex items-center w-full max-w-xl">
          {/* ✅ Search Icon added here */}
          <div className="absolute ml-4 text-gray-500">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search Courses"
            onClick={handleSearchFocus}
            className="w-full h-[40px] pl-10 pr-5 text-sm text-gray-700 border-2 border-gray-200 placeholder-gray-500 rounded-full bg-gray-50 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all duration-300"
          />
          {/* <div className="ml-3 w-[48px] h-[48px] rounded-full flex justify-center items-center cursor-pointer hover:bg-purple-200 transition-colors duration-200">
            <Mic size={24} className="text-purple-500" />
          </div> */}
        </div>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center justify-end gap-2 flex-1">

        {/* Mobile search trigger */}
        <div className="block md:hidden">
          <div
            onClick={handleSearchFocus}
            className="flex items-center bg-purple-50 rounded-full px-4 py-2 text-gray-500 text-sm cursor-pointer border border-gray-300"
          >
            Search...
          </div>
        </div>

        <div className="w-[48px] h-[48px] flex items-center justify-center rounded-full cursor-pointer bg-transparent bg-purple-100 hover:bg-gray-200 transition-colors duration-200">
          <Bell size={20} className="text-gray-500" />
        </div>

        {/* <div className='flex items-center justify-center relative gap-2'> */}
          <div className="w-[48px] h-[48px] flex items-center justify-center rounded-full cursor-pointer hover:bg-purple-200 transition-colors duration-200">
            {/* <User size={24} className="text-purple-700" /> */}
            <img
              src={tanjiro}
              alt="User Avatar"
              className="h-full rounded-full object-cover" />
          </div>
          {/* <p className='text-gray-700 mr-3'>Michael</p> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default TitleBar;
