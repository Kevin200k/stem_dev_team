import React from 'react';
import { classMates } from './ClassMates';
import { Link } from 'react-router-dom'

const medals = ['🥇', '🥈', '🥉'];
const barHeights = ['h-32', 'h-24', 'h-16'];
const podiumColors = ['bg-yellow-400', 'bg-gray-300', 'bg-amber-700']; // Gold, Silver, Bronze

const LeaderBoard = () => {
  const sortedClassMates = [...classMates].sort((a, b) => b.points - a.points);

  return (
    <div className='m-auto'>
      <Link to='/dashboard/leaderboard-view'>
        <div className='w-full my-4 p-6 border border-gray-200 rounded-lg shadow-md animate-fade-in'>
          <h2 className='text-lg font-semibold text-gray-800 mb-6 text-center animate-fade-in'>
            Top 3 Leaderboard
          </h2>

          <div className='flex justify-center items-end gap-8 h-64'>
            {sortedClassMates.slice(0, 3).map((classMate, index) => (
              <div
                key={classMate.id}
                className={`flex flex-col items-center justify-end 
                  transition-all duration-700 ease-in-out transform 
                  animate-fade-up delay-${index * 200}`}
              >
                {/* Medal */}
                <div className='text-3xl mb-1 animate-bounce'>{medals[index]}</div>

                {/* Avatar */}
                <img
                  src={classMate.profileImage}
                  className='w-20 h-20 rounded-full border-4 border-white shadow-lg mb-2 transform hover:scale-110 transition-transform duration-300'
                  alt={classMate.name}
                />

                {/* Name */}
                <div className='text-sm font-medium text-gray-700 text-center mb-4 w-24 truncate'>
                  {classMate.name}
                </div>

                {/* Podium bar */}
                <div
                  className={`rounded-t-md ${podiumColors[index]} w-48 ${barHeights[index]} 
                    flex items-center justify-center text-white font-semibold shadow-md`}
                >
                  {classMate.points} pts
                </div>
              </div>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default LeaderBoard;
