import React, { useState } from 'react'; // Import useState
import {
  User, Sun, // General icons
  Calculator, BookOpen, FlaskConical, History, // Specific course icons
  PlayCircle, // New icon for 'Continue Watching' section
} from 'lucide-react'; // Ensure all used icons are imported

const MainBody = () => {
  const studentProgress = 70;

  // State to simulate if the user has watched videos or not
  const [hasWatchedVideos, setHasWatchedVideos] = useState(false); // Set to 'true' to see video cards, 'false' for the message

  const courses = [
    {
      id: 1,
      title: "Mathematics",
      progress: 85,
      icon: <Calculator size={40} className="text-purple-600"/>,
      bgColor: 'bg-purple-50'
    },
    {
      id: 2,
      title: "English Language",
      progress: 60,
      icon: <BookOpen size={40} className="text-indigo-600"/>,
      bgColor: 'bg-indigo-50'
    },
    {
      id: 3,
      title: "Sciences",
      progress: 30,
      icon: <FlaskConical size={40} className="text-violet-600"/>,
      bgColor: 'bg-violet-50'
    },
    {
      id: 4,
      title: "History",
      progress: 10,
      icon: <History size={40} className="text-fuchsia-600"/>,
      bgColor: 'bg-fuchsia-50'
    },
  ];

  // Placeholder for "Continue Watching" videos if hasWatchedVideos is true
  const continueWatchingVideos = [
    { id: 1, title: "Algebra Basics: Part 2", course: "Mathematics", thumbnail: 'https://via.placeholder.com/150/9370DB/FFFFFF?text=Math+Video', progress: 75 },
    { id: 2, title: "Poetry Analysis: Stanzas", course: "English Language", thumbnail: 'https://via.placeholder.com/150/8A2BE2/FFFFFF?text=English+Video', progress: 50 },
    { id: 3, title: "Newton's Laws Explained", course: "Physics", thumbnail: 'https://via.placeholder.com/150/4B0082/FFFFFF?text=Science+Video', progress: 90 },
  ];

  return (
    <section className='h-full flex flex-col'>

      {/* Top Grid Section (My Courses & Statistics) */}
      <div className='w-full grid grid-cols-[2fr_1fr] gap-6 flex-grow'>

        {/* Left Column (2fr): My Courses Section */}
        <div className='bg-white p-6 rounded-lg shadow-md flex flex-col'>
          <h1 className='text-3xl font-extrabold text-purple-800 mb-6'>My Courses</h1>

          {/* Nested Grid for Course Cards */}
          <div className='flex-grow overflow-y-auto grid grid-cols-[1fr_1fr] gap-6 pr-2'>
            {courses.map(course => (
              <div key={course.id} className={`${course.bgColor} rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col overflow-hidden`}>
                <div className='relative h-32 flex items-center justify-center p-4'>
                    {course.icon}
                </div>
                <div className='p-4 pt-0 flex-grow flex flex-col justify-between'>
                    <h2 className='text-lg font-semibold text-gray-800 mb-2'>{course.title}</h2>
                    <div className='w-full bg-gray-200 rounded-full h-2.5'>
                        <div
                            className='h-2.5 rounded-full bg-gradient-to-r from-orange-400 to-yellow-500 transition-all duration-500 ease-out'
                            style={{ width: `${course.progress}%` }}
                        ></div>
                    </div>
                    <p className='text-sm text-gray-600 mt-1'>{course.progress}% Completed</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (1fr): Statistics */}
        <div className='bg-white p-6 rounded-lg shadow-md flex flex-col items-stretch'>
          <h1 className='text-3xl font-extrabold text-purple-800 mb-6'>Statistics</h1>

          {/* Vibrant User Card - Strong Purple Gradient */}
          <div className='flex flex-col items-center mb-8 bg-gradient-to-r from-purple-700 to-indigo-900 text-white p-6 rounded-lg shadow-xl relative overflow-hidden transform transition-all duration-300 hover:scale-105'>
            <div className='absolute inset-0 opacity-10 pointer-events-none'></div>
            <div className='w-24 h-24 rounded-full flex justify-center items-center bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm mb-4 border-2 border-white'>
              <User size={60} className="text-white"/>
            </div>
            <span className='text-3xl font-bold mb-1'>Welcome, User!</span>
            <p className='text-md text-purple-100'>It's a great day to learn.</p>
          </div>

          {/* Revamped Fun Progress Bar Section - Purple Themed */}
          <div className='w-full p-4 bg-purple-50 rounded-lg shadow-inner flex flex-col items-center mb-8'>
            <h2 className='text-xl font-bold text-purple-800 mb-3'>Courses Completed!</h2>
            <div className='relative w-full h-8 bg-gray-200 rounded-full overflow-hidden shadow-md'>
              <div
                className='h-full bg-gradient-to-r from-purple-500 to-fuchsia-700 rounded-full transition-all duration-500 ease-out flex items-center justify-center'
                style={{ width: `${studentProgress}%` }}
              >
                <span className='text-sm font-bold text-white drop-shadow-md'>{studentProgress}%</span>
              </div>
            </div>
            <p className='text-sm text-gray-600 mt-3 text-center'>You're making amazing progress!</p>
          </div>

          {/* Placeholder for another stat card - Strategic Warm Accent */}
          <div className='bg-orange-50 p-4 rounded-lg shadow-sm text-center flex-grow flex items-center justify-center text-orange-800 font-semibold border border-orange-200'>
             <Sun size={24} className="mr-2 text-orange-500"/>
             Upcoming Events & Important Alerts
          </div>

        </div>
      </div>


      {/* New Section: Continue Watching */}
      <div className='mt-6 p-6 bg-white rounded-lg shadow-md'>
        <h2 className='text-xl font-bold text-purple-800 mb-4'>Continue Watching</h2>
        {hasWatchedVideos && continueWatchingVideos.length > 0 ? (
          // Content when there are videos to continue watching
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {continueWatchingVideos.map(video => (
              <div key={video.id} className='bg-purple-50 rounded-lg shadow-sm flex items-center p-3 hover:shadow-md transition-shadow cursor-pointer'>
                <img src={video.thumbnail} alt={video.title} className='w-16 h-16 rounded-md object-cover mr-4'/>
                <div className='flex-grow'>
                  <h3 className='text-md font-semibold text-gray-800'>{video.title}</h3>
                  <p className='text-sm text-gray-600'>{video.course}</p>
                  <div className='w-full bg-gray-200 rounded-full h-1.5 mt-1'>
                    <div
                      className='h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-fuchsia-600'
                      style={{ width: `${video.progress}%` }}
                    ></div>
                  </div>
                  <p className='text-xs text-gray-600 mt-0.5'>{video.progress}% watched</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Content when no videos have been watched
          <div className='flex flex-col items-center justify-center py-8 text-gray-600 bg-purple-50 rounded-lg p-6'>
            <PlayCircle size={60} className='text-purple-400 mb-4' />
            <p className='text-lg font-semibold text-center'>You haven't watched any video yet!</p>
            <p className='text-sm mt-2 text-center'>Start a course or explore our video library to see your progress here.</p>
            <button className='mt-5 bg-purple-600 text-white py-2.5 px-6 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors shadow-md'>
              Browse Videos
            </button>
          </div>
        )}
      </div>

      {/* Optional: Footer or another section at the bottom of MainBody */}
      <div className='mt-6 p-4 bg-white rounded-lg shadow-md flex-none'>
        <p className='text-center text-gray-600'>&copy; 2025 LearnHub.AI. All rights reserved.</p>
      </div>
    </section>
  );
};

export default MainBody;