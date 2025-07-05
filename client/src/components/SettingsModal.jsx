import React from 'react';
import { ArrowRight, Moon, X } from 'lucide-react';
import ToggleButton from '../components/ToggleButton'

const SettingsModal = ({ onClose, modalRef }) => {
  return (
    <div
      ref={modalRef}
      className="w-80 absolute bottom-10 left-56 bg-white rounded-xl shadow-lg z-20 p-4 text-sm"
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-gray-100 rounded-md cursor-pointer transition-colors">
        <div className='flex flex-row items-center'>
          <Moon size={18} className="text-gray-500 mr-2" />
          <span className="text-gray-700">Turn On Dark Mode</span>
        </div>

        <div>
          <ToggleButton />
        </div>
      </div>

      <hr className="my-3 border-gray-200" />

      <div className="flex items-center justify-between hover:bg-gray-100 px-4 py-3 rounded-md cursor-pointer transition-colors">
        <span className="text-gray-700 font-medium">All Settings</span>
        <ArrowRight className="text-gray-500" size={18} />
      </div>

      <hr className="my-3 border-gray-200" />

      <div
        className="flex items-center justify-center hover:bg-red-100 px-4 py-3 rounded-md cursor-pointer transition-colors"
        onClick={onClose}
      >
        <X size={20} color="red" />
        <span className="text-red-500 ml-2">Close</span>
      </div>
    </div>
  );
};

export default SettingsModal;
