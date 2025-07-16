import React from 'react';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TitleBar from '../components/TitleBar';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <TitleBar />

      <section className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50 p-8 text-center space-y-6">
        <AlertTriangle size={96} className="text-orange-500 animate-pulse drop-shadow-md" />

        <h1 className="text-6xl font-extrabold text-purple-800">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700">
          Oops! The page you're looking for doesn't exist.
        </h2>

        <div className="flex gap-4 mt-4">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-purple-600 hover:border-purple-600 hover:text-purple-800 hover:underline transition duration-200"
          >
            <ArrowLeft size={18} className="mr-2" />
            Go Back
          </button>

          {/* Home Button */}
          <a
            href="/"
            className="flex items-center px-5 py-2.5 bg-purple-600 text-white font-medium rounded-md shadow-md hover:bg-purple-700 transition transform hover:scale-105"
          >
            <Home size={18} className="mr-2" />
            Homepage
          </a>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          If you believe this is an error, please contact support.
        </p>
      </section>
    </>
  );
};

export default NotFoundPage;
