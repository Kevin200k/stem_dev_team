import React from 'react';

// const challenges = [];

const TestMe = () => {
  return (
    <div className='min-h-screen p-4 bg-gray-50'>
      {/* Header */}
      <div className='w-full h-40 rounded-lg p-5 text-white bg-gradient-to-r from-amber-800 to-stone-900'>
        <div className='flex items-center'>
          <span className='font-bold text-4xl md:text-5xl pr-4'>
            Today's Challenge
          </span>

        <span className='pr-4 text-2xl'>
          &#8226;
        </span>

        <span className='text-base font-light'>
          🚀New Quest Alert! Your Daily Challenge Awaits!
        </span>
        </div>
      </div>

      
    </div>
  );
};

export default TestMe;