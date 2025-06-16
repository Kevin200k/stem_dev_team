import React from 'react';
import { AlertTriangle, Home } from 'lucide-react'; // Import Home icon for navigation
import TitleBar from '../components/TitleBar';

const NotFoundPage = () => {
  return (
    <>
      <TitleBar />
      <section className='flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50 p-8'>

        <AlertTriangle size={100} strokeWidth={1.5} className='text-orange-500 mb-6 drop-shadow-md' />

        <h1 className='text-7xl font-extrabold text-purple-800 mb-4'>
          404
        </h1>

        <h2 className='text-2xl font-semibold text-gray-700 mb-6 text-center'>
          Oops! The page you're looking for doesn't exist.
        </h2>

        <a
          href="/"
          className='flex items-center px-8 py-3 bg-purple-600 text-white font-semibold text-lg rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300'
        >
          <Home size={20} className='mr-2' />
          Go to Homepage
        </a>


        <p className='text-sm text-gray-500 mt-8'>
          If you believe this is an error, please contact support.
        </p>
      </section>
    </>
  );
};

export default NotFoundPage;