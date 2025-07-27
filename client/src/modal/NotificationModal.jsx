import React, { useEffect, useRef } from 'react';

const NotificationModal = ({ onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={modalRef}
      className="absolute right-5 top-14 transform w-96 bg-white rounded-xl shadow-xl p-6 z-50 cursor-default animate-fade-in"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
          aria-label="Close"
        >
          &times;
        </button>
      </div>

      <div className="text-center text-gray-600 py-6">
        <p className="text-sm">You have no new notifications.</p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in { animation: fadeIn 0.2s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default NotificationModal;