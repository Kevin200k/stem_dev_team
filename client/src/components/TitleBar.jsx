import React from 'react';
import { Mic, Bell, User, Menu } from 'lucide-react';
import image2 from '../assets/icon/image2.png';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';

const TitleBar = ({ setShowSidebar }) => {
  const { query, setQuery } = useSearch();
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
    <div className="h-20 grid grid-cols-[1fr_1fr] md:grid-cols-[1fr_2fr_1fr] mx-4 shadow-md bg-white items-center px-4">
      <div className="flex items-center gap-3">
        <div className="block md:hidden cursor-pointer p-2 rounded-full hover:bg-gray-100" onClick={handleToggle}>
          <Menu size={24} color="gray" />
        </div>
        <img src={image2} alt="Logo" className="w-32" />
      </div>

      {/* Search bar */}
      <div className="hidden md:flex items-center p-2">
        <div className="flex-grow relative">
          <input
            type="text"
            placeholder="Search Courses"
            value={query}
            onClick={handleSearchFocus}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-[50px] pl-5 pr-5 text-lg text-gray-700 placeholder-gray-500 rounded-full bg-purple-50 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all duration-300"
          />
        </div>
        <div className="ml-3 w-[48px] h-[48px] bg-purple-100 rounded-full flex justify-center items-center cursor-pointer hover:bg-purple-200 transition-colors duration-200">
          <Mic size={24} className="text-purple-700" />
        </div>
      </div>

      {/* Right-side icons */}
      <div className="flex items-center justify-end gap-3">
        <div className="block md:hidden">
          <input
            onClick={handleSearchFocus}
            onChange={(e) => setQuery(e.target.value)}
            type='text'
            value={query}
            placeholder='Search'
            className="flex items-center bg-purple-50 rounded-full w-28 px-4 py-2 text-gray-500 text-sm border-gray-300"
          />
        </div>

        <div className="w-[48px] h-[48px] flex items-center justify-center rounded-full cursor-pointer bg-purple-100 hover:bg-purple-200 transition-colors duration-200">
          <Bell size={24} className="text-purple-700" />
        </div>

        <div className="w-[48px] h-[48px] flex items-center justify-center rounded-full cursor-pointer bg-purple-100 hover:bg-purple-200 transition-colors duration-200">
          <User size={24} className="text-purple-700" />
        </div>
      </div>
    </div>
  );
};

export default TitleBar;
