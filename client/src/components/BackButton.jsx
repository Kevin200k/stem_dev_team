import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <section className="p-4 relative group inline-block">
      <button
        onClick={goBack}
        aria-label="Go back"
        className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shadow-md border border-gray-300"
      >
        <ChevronLeft className="text-gray-700" size={24} />
      </button>

      {/* Tooltip */}
      <span className="absolute left-full top-1/2 -translate-y-1/2 ml-3 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        Go Back
      </span>
    </section>
  );
};

export default BackButton;
