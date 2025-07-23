import React, { useState } from 'react';
import { Bell, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import AuthManager from '../utils/AuthManager';
import Profile from './Profile';

const TitleBar = ({ setShowSidebar }) => {
  const { query, setQuery } = useSearch();
  const navigate = useNavigate();
  const user = AuthManager.getCurrentUser();
  const [showProfile, setShowProfile] = useState(false);

  const handleSearchFocus = () => {
    navigate('/search');
  };

  const handleToggle = () => {
    if (window.innerWidth < 768) {
      setShowSidebar(prev => !prev);
    }
  };

  const handleAvatarClick = () => {
    setShowProfile(true);
  };

  return (
    <>
      <div className="h-20 px-4 flex items-center shadow-sm relative z-10 bg-white">

        {/* Center: Search bar (desktop only) */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <div className="flex items-center w-full max-w-xl">
            <div className="absolute ml-4 text-gray-500">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search Courses"
              value={query}
              onClick={handleSearchFocus}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-[40px] pl-10 pr-5 text-sm text-gray-700 border-2 border-gray-200 placeholder-gray-500 rounded-full bg-gray-50 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all duration-300"
            />
          </div>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center justify-end gap-2 flex-1">
          {/* Mobile search input */}
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

          <div className="w-[48px] h-[48px] flex items-center justify-center rounded-full cursor-pointer bg-transparent bg-purple-100 hover:bg-gray-200 transition-colors duration-200">
            <Bell size={20} className="text-gray-500" />
          </div>

          {/* Avatar + Profile Panel */}
          <div
            className="w-[48px] h-[48px] flex items-center justify-center rounded-full cursor-pointer hover:bg-purple-200 transition-colors duration-200"
            onClick={handleAvatarClick}
          >
            <img
              src={user?.profilePicture || 'https://ui-avatars.com/api/?name=User&background=eee&color=777'}
              alt="User Avatar"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
        </div>
      </div>

      {showProfile && <Profile onClose={() => setShowProfile(false)} />}
    </>
  );
};

export default TitleBar;
