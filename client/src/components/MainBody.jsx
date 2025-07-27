import React, { useState, useEffect } from 'react';
import {
  User, Sun,
  Calculator, BookOpen, FlaskConical, History,
  PlayCircle,
} from 'lucide-react';
import LeaderBoard from './LeaderBoard';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const MainBody = () => {
  const [user, setUser] = useState(null);
  const [hasWatchedVideos, setHasWatchedVideos] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const studentProgress = 70;

  const courses = [
    {
      id: 1,
      title: "Mathematics",
      progress: 85,
      icon: <Calculator size={40} className="text-purple-600" />,
      bgColor: 'bg-purple-50'
    },
    {
      id: 2,
      title: "English Language",
      progress: 60,
      icon: <BookOpen size={40} className="text-indigo-600" />,
      bgColor: 'bg-indigo-50'
    },
    {
      id: 3,
      title: "Sciences",
      progress: 30,
      icon: <FlaskConical size={40} className="text-violet-600" />,
      bgColor: 'bg-violet-50'
    },
    {
      id: 4,
      title: "History",
      progress: 10,
      icon: <History size={40} className="text-fuchsia-600" />,
      bgColor: 'bg-fuchsia-50'
    },
  ];

  const continueWatchingVideos = [
    { id: 1, title: "Algebra Basics: Part 2", course: "Mathematics", thumbnail: 'https://via.placeholder.com/150/9370DB/FFFFFF?text=Math+Video', progress: 75 },
    { id: 2, title: "Poetry Analysis: Stanzas", course: "English Language", thumbnail: 'https://via.placeholder.com/150/8A2BE2/FFFFFF?text=English+Video', progress: 50 },
    { id: 3, title: "Newton's Laws Explained", course: "Physics", thumbnail: 'https://via.placeholder.com/150/4B0082/FFFFFF?text=Science+Video', progress: 90 },
  ];

  return (
    <section className=" h-full flex flex-col px-4 sm:px-6 md:px-8 lg:px-10 py-6">

      {/* Mobile View Greeting */}
      <div className="md:hidden flex flex-col items-center mb-8 bg-gradient-to-r from-purple-700 to-indigo-900 text-white p-6 rounded-lg shadow-xl">
        <div className="w-24 h-24 rounded-full flex justify-center items-center bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm mb-4 border-2 border-white">
          <User size={60} className="text-white" />
        </div>
        <span className="text-3xl font-bold mb-1">
          Welcome, {user?.displayName || "User"}!
        </span>
        <p className="text-md text-purple-100">It's a great day to learn.</p>
      </div>
      {/* Main Grid: Courses + Stats */}
      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">

        {/* Courses Section */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
          {/* Courses section */}
          <h1 className="text-2xl font-normal text-purple-500 mb-6">Continue Quests</h1>

          <div className="grid sm:grid-cols-2 gap-4 overflow-y-auto pr-1">
            {courses.map(course => (
              <div key={course.id} className={`${course.bgColor} rounded-lg shadow-sm hover:shadow-md transition duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col`}>
                <div className="h-28 flex items-center justify-center p-4">
                  {course.icon}
                </div>
                <div className="p-4 pt-0 flex flex-col justify-between flex-grow">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">{course.title}</h2>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="h-2.5 rounded-full bg-gradient-to-r from-orange-400 to-yellow-500" style={{ width: `${course.progress}%` }}></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{course.progress}% Completed</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section (hidden on small screens) */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <div className="hidden md:flex flex-col items-center mb-8 bg-gradient-to-r from-purple-700 to-indigo-900 text-white p-6 rounded-lg shadow-xl w-full">
            <div className="w-24 h-24 rounded-full flex justify-center items-center bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm mb-4 border-2 border-white">
              <User size={60} className="text-white" />
            </div>
            <span className="text-3xl font-bold mb-1">
              Welcome, {user?.displayName || "User"}!
            </span>
            <p className="text-md text-purple-100">It's a great day to learn.</p>
          </div>

          <h1 className="text-2xl font-bold text-purple-800 mb-4">Stats</h1>

          <div className="w-full p-4 bg-purple-50 rounded-lg shadow-inner text-center mb-6">
            <h2 className="text-lg font-semibold text-purple-800 mb-2">Courses Completed!</h2>
            <div className="relative w-full h-8 bg-gray-200 rounded-full overflow-hidden shadow-md">
              <div className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-700 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ width: `${studentProgress}%` }}>
                {studentProgress}%
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-3">You're making amazing progress!</p>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg text-orange-800 font-semibold w-full text-center border border-orange-200 flex items-center justify-center">
            <Sun size={20} className="mr-2 text-orange-500" />
            Upcoming Events & Important Alerts
          </div>
        </div>
      </div>

      {/* Continue Watching */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-purple-800 mb-4">Continue Watching</h2>

        {hasWatchedVideos && continueWatchingVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {continueWatchingVideos.map(video => (
              <div key={video.id} className="bg-purple-50 rounded-lg shadow-sm flex items-center p-3 hover:shadow-md cursor-pointer">
                <img src={video.thumbnail} alt={video.title} className="w-16 h-16 rounded-md object-cover mr-4" />
                <div className="flex-grow">
                  <h3 className="text-md font-semibold text-gray-800">{video.title}</h3>
                  <p className="text-sm text-gray-600">{video.course}</p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                    <div className="h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-fuchsia-600" style={{ width: `${video.progress}%` }}></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{video.progress}% watched</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-gray-600 bg-purple-50 rounded-lg">
            <PlayCircle size={60} className="text-purple-400 mb-4" />
            <p className="text-lg font-semibold text-center">You haven't watched any video yet!</p>
            <p className="text-sm mt-2 text-center">Start a course or explore our video library to see your progress here.</p>
            <button className="mt-5 bg-purple-600 text-white py-2.5 px-6 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors shadow-md">
              Browse Videos
            </button>
          </div>
        )}
      </div>

      {/* Leaderboard */}
      <LeaderBoard />

      {/* Footer */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow-md text-center">
        <p className="text-gray-600 text-sm">&copy; 2025 Levelup.ai. All rights reserved.</p>
      </div>
    </section>
  );
};

export default MainBody;
