import React from 'react';
import { Search as SearchIcon, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {

  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <SearchIcon size={120} strokeWidth={1.5} className="text-purple-300 opacity-25 mb-6 mx-auto" />
        <h1 className="text-2xl font-semibold text-gray-700">Start Typing to Search</h1>
        <p className="text-gray-500 mt-2">Explore courses, lessons, or topics...</p>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="flex items-center px-4 py-2 mt-3  border border-gray-300 rounded-md text-purple-600 hover:border-purple-600 hover:text-purple-800 hover:underline transition duration-200"
      >
        <ArrowLeft size={18} className="mr-2" />
        Go Back
      </button>
    </div>
  );
};

export default SearchPage;
