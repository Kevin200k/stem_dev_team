import React from 'react';
import { classMates } from './ClassMates';
import { Link } from 'react-router-dom';

const medals = ['🥇', '🥈', '🥉'];
const barHeights = ['h-32', 'h-24', 'h-16'];
const podiumColors = ['bg-yellow-400', 'bg-gray-300', 'bg-amber-700']; // Gold, Silver, Bronze

const LeaderBoard = () => {
  const sortedClassMates = [...classMates].sort((a, b) => b.points - a.points);

  return (
    <div className="w-full max-w-4xl md:mx-auto mt-6 px-4">
      <Link to="/dashboard/leaderboard-view">
        <div className="bg-white w-full p-6 border border-gray-200 rounded-lg shadow-md">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center">
            Top 3 Leaderboard
          </h2>

          <div className="flex  sm:flex-row justify-center items-end gap-6 sm:gap-10 min-h-[16rem] sm:min-h-[20rem]">
            {sortedClassMates.slice(0, 3).map((classMate, index) => (
              <div
                key={classMate.id}
                className={`flex flex-col items-center justify-end transition-transform duration-700 ease-in-out`}
              >
                {/* Medal */}
                <div className="text-3xl mb-1 animate-bounce">
                  {medals[index]}
                </div>

                {/* Avatar */}
                <img
                  src={classMate.profileImage}
                  alt={classMate.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white shadow-lg mb-2 transform hover:scale-110 transition-transform duration-300"
                />

                {/* Name */}
                <div className="text-sm sm:text-base font-medium text-gray-700 text-center mb-3 w-24 truncate">
                  {classMate.name}
                </div>

                {/* Podium bar */}
                <div
                  className={`rounded-t-md ${podiumColors[index]} w-36 sm:w-48 ${barHeights[index]} 
                  flex items-center justify-center text-white font-semibold shadow-md text-sm sm:text-base`}
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
