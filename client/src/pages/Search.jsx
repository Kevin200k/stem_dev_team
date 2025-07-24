import React, { useEffect, useState } from 'react';
import { ArrowLeft, Search as SearchIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import AuthManager from '../utils/AuthManager';

const CustomLoader = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        zIndex: 9999,
      }}
    >
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="loader"
          style={{ animationDelay: `${0.15 * (i + 1)}s`, position: 'absolute' }}
        >
          <div className="dot" />
        </div>
      ))}

      <style>{`
        .loader {
          height: 5px;
          width: 1px;
          animation: rotate0234 3.5s linear infinite;
        }

        .loader .dot {
          top: 30px;
          height: 7px;
          width: 7px;
          background: #9333ea; /* Tailwind purple-600 */
          border-radius: 50%;
          position: relative;
        }

        @keyframes rotate0234 {
          30% {
            transform: rotate(220deg);
          }
          40% {
            transform: rotate(450deg);
            opacity: 1;
          }
          75% {
            transform: rotate(720deg);
            opacity: 1;
          }
          76% {
            opacity: 0;
          }
          100% {
            opacity: 0;
            transform: rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
};

const SearchPage = () => {
  const { query } = useSearch();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentUser = AuthManager.getCurrentUser();
  const userId = currentUser?.id;

  const handleBack = () => navigate(-1);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/search?query=${query}`);
        const data = await response.json();
        setResults(data || []);
      } catch (err) {
        console.error("Search failed:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  const handleCourseClick = async (courseId) => {
    try {
      const res = await fetch("http://localhost:5000/api/courses/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, courseId }),
      });

      if (!res.ok) throw new Error("Save failed");
      navigate(`/courses/${courseId}`);
    } catch (err) {
      console.error("Save failed:", err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-6">
      {query && (
        <div className="flex items-center mb-6">
          <button
            onClick={handleBack}
            className="flex items-center text-purple-600 font-semibold hover:text-purple-800 transition"
          >
            <ArrowLeft size={20} className="mr-2" /> Back
          </button>
        </div>
      )}

      {query ? (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Results for: <span className="text-purple-600">{query}</span>
          </h2>

          {loading ? (
            <CustomLoader />
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map(course => (
                <div
                  key={course.id}
                  onClick={() => handleCourseClick(course.id)}
                  className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition cursor-pointer hover:scale-[1.02]"
                >
                  <span className="inline-block bg-purple-100 text-purple-700 text-xs font-medium px-3 py-1 rounded-full mb-2">
                    {course.categoryName || 'Course'}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {course.description || 'No description available'}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-10 text-lg text-center">No courses found.</p>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center">
          <SearchIcon size={120} className="text-purple-300 opacity-25 mb-6" />
          <h1 className="text-3xl font-bold text-gray-800">Start Typing to Search</h1>
          <p className="text-gray-500 mt-3 text-lg">Explore courses, lessons, or topics…</p>
          <button
            onClick={handleBack}
            className="mt-6 px-6 py-3 border border-purple-300 rounded-lg text-purple-600 hover:bg-purple-50 hover:border-purple-500 transition font-semibold flex items-center"
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
