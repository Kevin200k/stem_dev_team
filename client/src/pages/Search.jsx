import React from 'react';
import { ArrowLeft, Search as SearchIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import { allCourses } from './Courses';

const SearchPage = () => {
  const { query } = useSearch();
  const navigate = useNavigate();

  const filteredCourses = allCourses.filter(course =>
    course.title.toLowerCase().includes(query.toLowerCase()) || course.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleBack = () => navigate(-1);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-6">
      {/* Back Button */}
      {query && (
        <div className="flex items-center mb-6">
          <button
            onClick={handleBack}
            className="flex items-center text-purple-600 font-semibold hover:text-purple-800 transition duration-200"
          >
            <ArrowLeft size={20} className="mr-2" /> Back
          </button>
        </div>
      )}

      {/* Search Results */}
      {query ? (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Results for: <span className="text-purple-600">{query}</span>
          </h2>

          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <div
                  key={course.id}
                  onClick={() => navigate(`/courses/${course.id}`)}
                  className="bg-white rounded-xl shadow hover:shadow-lg p-5 cursor-pointer transition hover:scale-[1.02]"
                >
                  {/* Category */}
                  <span className="inline-block bg-purple-100 text-purple-700 text-xs font-medium px-3 py-1 rounded-full mb-2">
                    {course.category}
                  </span>

                  {/* Course Title */}
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {course.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-10 text-lg">No courses found.</p>
          )}
        </div>
      ) : (
        // Empty State
        <div className="flex flex-col items-center justify-center h-[70vh] text-center">
          <SearchIcon size={120} strokeWidth={1.5} className="text-purple-300 opacity-25 mb-6" />
          <h1 className="text-3xl font-bold text-gray-800">Start Typing to Search</h1>
          <p className="text-gray-500 mt-3 text-lg">Explore courses, lessons, or topics...</p>

          <button
            onClick={handleBack}
            className="flex items-center px-6 py-3 mt-6 border border-purple-300 rounded-lg text-purple-600 hover:bg-purple-50 hover:border-purple-500 transition duration-200 font-semibold"
          >
            <ArrowLeft size={20} className="mr-2" />
            Go Back
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
