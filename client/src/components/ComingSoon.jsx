import React from 'react';
import { Clock } from 'lucide-react';
import BackButton from './BackButton';

const ComingSoon = () => {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="flex items-center gap-4 mb-4">
        <Clock size={48} className="text-purple-600 animate-pulse" strokeWidth={2.5} />
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800">Coming Soon</h1>
      </div>

      <p className="text-gray-600 text-center max-w-md text-sm md:text-base">
        We’re working hard to bring something amazing to you. Stay tuned for updates.
      </p>

      <BackButton />
    </div>
  );
};

export default ComingSoon;
