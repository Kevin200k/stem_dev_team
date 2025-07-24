import React from 'react';
import doodle from '../assets/avatars/doodle.png';
import girlAvatar from '../assets/avatars/girlAvatar.png';
import guyAvatar from '../assets/avatars/guyAvatar.png';
import teacherAvatar from '../assets/avatars/teacherAvatar.png';
import womanAvatar from '../assets/avatars/womanAvatar.png';

// Array of avatar image imports
const profilePictures = [girlAvatar, doodle, guyAvatar, teacherAvatar, womanAvatar];

// Helper function to get a random picture
const getRandomPicture = () => {
  const randomIndex = Math.floor(Math.random() * profilePictures.length);
  return profilePictures[randomIndex];
};

// Classmates data
export const classMates = [
  { id: 1, profileImage: getRandomPicture(), name: 'Elliot Chidubem', status: 'active', points: 20, state: 'Abia' },
  { id: 2, profileImage: getRandomPicture(), name: 'Michael Amos', status: 'inactive', points: 30, state: 'Lagos' },
  { id: 3, profileImage: getRandomPicture(), name: 'Joshua Damilola', status: 'active', points: 10, state: 'Oyo' },
  { id: 4, profileImage: getRandomPicture(), name: 'Chidubemm Amos', status: 'inactive', points: 50, state: 'Anambra' },
  { id: 5, profileImage: getRandomPicture(), name: 'Sarah Johnson', status: 'active', points: 60, state: 'Kano' },
  { id: 6, profileImage: getRandomPicture(), name: 'Daniel Okafor', status: 'active', points: 40, state: 'Imo' },
  { id: 7, profileImage: getRandomPicture(), name: 'Chidi Nwosu', status: 'inactive', points: 10, state: 'Enugu' },
  { id: 8, profileImage: getRandomPicture(), name: 'Ifeoluwa Ojo', status: 'active', points: 80, state: 'Osun' },
  { id: 9, profileImage: getRandomPicture(), name: 'Deborah Nwachukwu', status: 'inactive', points: 70, state: 'Abuja' },
  { id: 10, profileImage: getRandomPicture(), name: 'Blessing Afolabo', status: 'active', points: 40, state: 'Ekiti' },
  { id: 11, profileImage: getRandomPicture(), name: 'Temitope Ayodele', status: 'active', points: 65, state: 'Ogun' },
  { id: 12, profileImage: getRandomPicture(), name: 'Usman Bello', status: 'inactive', points: 25, state: 'Kebbi' },
  { id: 13, profileImage: getRandomPicture(), name: 'Amaka Eze', status: 'active', points: 33, state: 'Ebonyi' },
  { id: 14, profileImage: getRandomPicture(), name: 'Chukwudi Okeke', status: 'inactive', points: 48, state: 'Delta' }
];

const ClassMates = () => {
  return (
    <div className='flex flex-col'>
      <h2 className='text-lg text-gray-400 mb-4 text-[14px]'>CLASSMATES</h2>
      <div className="flex flex-col gap-2">
        {classMates.slice(0, 3).map((classMate) => (
          <div
            key={classMate.id}
            className='flex items-center justify-between text-sm p-2 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer'
          >
            <img
              src={classMate.profileImage}
              alt={classMate.name}
              className='w-10 h-10 rounded-full object-cover'
            />

            <div className='flex-1 mx-2 truncate'>{classMate.name.length > 14 ? classMate.name.slice(0, 14) + '...' : classMate.name}</div>

            {/* Status dot */}
            <div className="flex items-center gap-1">
              <div
                className={`w-3 h-3 rounded-full ${
                  classMate.status.toLowerCase() === 'active' ? 'bg-green-500' : 'bg-gray-400'
                }`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassMates;
