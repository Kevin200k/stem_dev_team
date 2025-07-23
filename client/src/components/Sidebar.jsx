import React, { useState, useRef, useEffect } from 'react';
import {
  LayoutDashboard,
  GraduationCap,
  BookOpenCheck,
  Play,
  Settings,
  LogOut
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import ClassMates from './ClassMates';
import SettingsModal from './SettingsModal';
import image2 from '../assets/icon/image2.png';
import AuthManager from '../utils/AuthManager'; // 🔥 added line

const Sidebar = () => {
  const [showSettings, setShowSettings] = useState(false);
  const modalRef = useRef(null);
  const settingsBtnRef = useRef(null);
  const navigate = useNavigate();

  const linkClass = (isActive) => {
    const base = 'h-12 flex items-center px-4 rounded-md cursor-pointer text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200';
    const active = 'text-purple-700 font-semibold bg-purple-100 shadow';
    return isActive ? `${base} ${active}` : base;
  };

  const handleSignout = async () => {
    try {
      await signOut(auth);
      AuthManager.logout(); // 🔥 clear localStorage
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        settingsBtnRef.current &&
        !settingsBtnRef.current.contains(e.target)
      ) {
        setShowSettings(false);
      }
    };

    if (showSettings) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSettings]);

  return (
    <aside className='absolute md:relative bg-white w-96 md:w-56 h-full p-4 flex flex-col shadow-lg z-50'>

      {/* Logo */}
      <div className="flex items-center justify-start mb-6 pl-2">
        <img src={image2} alt="Logo" className="h-5.5 mt-2.5 mb-1" />
      </div>

      {/* Navigation Links */}
      <section className='text-[14.5px] flex flex-col gap-2 mb-4'>
        <NavLink to='/dashboard' className={({ isActive }) => linkClass(isActive)}>
          <LayoutDashboard size={20} />
          <span className='ml-3'>Dashboard</span>
        </NavLink>
        <NavLink to='/courses' className={({ isActive }) => linkClass(isActive)}>
          <GraduationCap size={20} />
          <span className='ml-3'>Quests</span>
        </NavLink>
        <NavLink to='/test-me' className={({ isActive }) => linkClass(isActive)}>
          <BookOpenCheck size={20} />
          <span className='ml-3'>Test Me</span>
        </NavLink>
        <NavLink to='/videos' className={({ isActive }) => linkClass(isActive)}>
          <Play size={20} />
          <span className='ml-3'>Videos</span>
        </NavLink>
      </section>

      {/* Classmates */}
      <section className="flex-grow overflow-y-auto pt-2 mb-4">
        <ClassMates />
      </section>

      {/* Settings & Logout */}
      <section className='flex flex-col gap-2 mt-auto'>
        <div
          ref={settingsBtnRef}
          className={linkClass(showSettings)}
          onClick={() => setShowSettings(prev => !prev)}
        >
          <Settings size={20} />
          <span className='ml-3'>Settings</span>
        </div>

        <div
          className='h-12 flex items-center px-4 rounded-md cursor-pointer text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors duration-200'
          onClick={handleSignout}
        >
          <LogOut size={20} />
          <span className='ml-3'>Logout</span>
        </div>
      </section>

      {/* Settings Modal */}
      {showSettings && (
        <div ref={modalRef}>
          <SettingsModal onClose={() => setShowSettings(false)} />
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
