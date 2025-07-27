import React, { useEffect, useRef, useState } from 'react';
import AuthManager from '../utils/AuthManager';
import { X } from 'lucide-react';

const Profile = ({ onClose }) => {
  const profileRef = useRef(null);
  const [user, setUser] = useState(AuthManager.getCurrentUser());
  const [preview, setPreview] = useState(user?.profilePicture || null);

  // Handle click outside to close the panel
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      const updatedUser = { ...user, profilePicture: reader.result };
      setUser(updatedUser);
      AuthManager.login(updatedUser); // Update in localStorage
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-start justify-end z-50"
    >
      <div
        ref={profileRef}
        className="bg-white w-full max-w-sm mt-20 mr-6 rounded-2xl shadow-2xl p-6 animate-fade-in-up relative"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X />
        </button>

        <div className="flex flex-col items-center gap-4 mt-4">
          <div className="relative group">
            <img
              src={
                preview ||
                'https://ui-avatars.com/api/?name=User&background=eee&color=777'
              }
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-purple-500"
            />
            <label className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer flex items-center justify-center text-white text-sm font-medium transition-opacity">
              Change
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <h2 className="text-xl font-semibold text-gray-800">
            {user?.name || 'Anonymous User'}
          </h2>
          <p className="text-sm text-gray-500">{user?.email || 'user@example.com'}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
