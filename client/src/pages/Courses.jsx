// Refined Courses Page Component
import React, { useState } from 'react';
import {
  BookOpen,
  FlaskConical,
  Calculator,
  Landmark,
  ChevronRight,
  Dna
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const allCourses = [
  {
    id: 'math-001',
    title: 'Fundamentals of Algebra',
    description: 'Master the basic principles of algebra, including linear equations and inequalities.',
    progress: 75,
    icon: <Calculator size={24} className="text-purple-600" />,
    category: 'Mathematics',
    level: 'Beginner',
    modules: 12,
    rating: 4.8,
    imageUrl: 'https://via.placeholder.com/200x120/8a2be2/FFFFFF?text=Algebra',
    topics: [
      { id: 'm001t01', title: 'Introduction to Variables', status: 'completed' },
      { id: 'm001t02', title: 'Linear Equations in One Variable', status: 'in-progress' },
      { id: 'm001t03', title: 'Solving Inequalities', status: 'not-started' },
      { id: 'm001t04', title: 'Graphing Linear Equations', status: 'not-started' },
    ]
  },
  {
    id: 'eng-002',
    title: 'Creative Writing Workshop',
    description: 'Unleash your inner storyteller with techniques for fiction and poetry.',
    progress: 0,
    icon: <BookOpen size={24} className="text-pink-500" />,
    category: 'English',
    level: 'Intermediate',
    modules: 10,
    rating: 4.5,
    imageUrl: 'https://via.placeholder.com/200x120/d70081/FFFFFF?text=Writing',
    topics: [
      { id: 'e002t01', title: 'The Elements of Story', status: 'not-started' },
      { id: 'e002t02', title: 'Developing Characters', status: 'not-started' },
      { id: 'e002t03', title: 'Plotting Your Narrative', status: 'not-started' },
    ]
  },
  {
    id: 'sci-003',
    title: 'Introduction to Physics',
    description: 'Explore the fundamental laws governing the universe, from motion to energy.',
    progress: 30,
    icon: <FlaskConical size={24} className="text-green-500" />,
    category: 'Sciences',
    level: 'Beginner',
    modules: 15,
    rating: 4.7,
    imageUrl: 'https://via.placeholder.com/200x120/3cb371/FFFFFF?text=Physics',
    topics: [
      { id: 's003t01', title: 'Kinematics: Describing Motion', status: 'completed' },
      { id: 's003t02', title: 'Newton\'s Laws of Motion', status: 'in-progress' },
      { id: 's003t03', title: 'Work, Energy, and Power', status: 'not-started' },
    ]
  },
  {
    id: 'hist-004',
    title: 'World War II: A Global Perspective',
    description: 'Dive deep into the causes, events, and consequences of WWII.',
    progress: 90,
    icon: <Landmark size={24} className="text-blue-500" />,
    category: 'History',
    level: 'Advanced',
    modules: 8,
    rating: 4.9,
    imageUrl: 'https://via.placeholder.com/200x120/1e90ff/FFFFFF?text=WWII',
    topics: [
      { id: 'h004t01', title: 'Causes of the War', status: 'completed' },
      { id: 'h004t02', title: 'Major Campaigns (European Theater)', status: 'completed' },
      { id: 'h004t03', title: 'The Pacific Theater', status: 'completed' },
      { id: 'h004t04', title: 'Consequences and Aftermath', status: 'in-progress' },
    ]
  },
  {
    id: 'math-002',
    title: 'Calculus I: Limits & Derivatives',
    description: 'An essential course for advanced mathematical understanding.',
    progress: 0,
    icon: <Calculator size={24} className="text-purple-600" />,
    category: 'Mathematics',
    level: 'Advanced',
    modules: 18,
    rating: 4.6,
    imageUrl: 'https://via.placeholder.com/200x120/8a2be2/FFFFFF?text=Calculus+I',
    topics: [
      { id: 'm002t01', title: 'Understanding Limits', status: 'not-started' },
      { id: 'm002t02', title: 'Introduction to Derivatives', status: 'not-started' },
    ]
  },
  {
    id: 'eng-003',
    title: 'Literary Analysis: Modern Novels',
    description: 'Develop critical thinking skills through the study of contemporary literature.',
    progress: 0,
    icon: <BookOpen size={24} className="text-pink-500" />,
    category: 'English',
    level: 'Intermediate',
    modules: 10,
    rating: 4.7,
    imageUrl: 'https://via.placeholder.com/200x120/d70081/FFFFFF?text=Literary+Analysis',
    topics: [
      { id: 'e003t01', title: 'Analyzing Themes', status: 'not-started' },
      { id: 'e003t02', title: 'Character Deconstruction', status: 'not-started' },
    ]
  },
  {
    id: 'bio-001',
    title: 'Introduction to Biology',
    description: 'Explore the fundamental principles of life, from cells to ecosystems.',
    progress: 0,
    icon: <Dna size={24} className="text-orange-500" />,
    category: 'Sciences',
    level: 'Beginner',
    modules: 10,
    rating: 4.6,
    imageUrl: 'https://via.placeholder.com/200x120/FFA500/FFFFFF?text=Biology',
    topics: [
      { id: 'b001t01', title: 'The Scientific Method', status: 'not-started' },
      { id: 'b001t02', title: 'Cells: The Basic Unit of Life', status: 'not-started' },
      { id: 'b001t03', title: 'Photosynthesis: Capturing Light Energy', status: 'not-started' },
      { id: 'b001t04', title: 'Genetics and Heredity', status: 'not-started' },
      { id: 'b001t05', title: 'Ecosystems and Biodiversity', status: 'not-started' },
    ]
  }
];

const TopicItem = ({ topic }) => {
  const statusColor = {
    'completed': 'text-green-600',
    'in-progress': 'text-orange-500',
    'not-started': 'text-gray-500',
  };
  const statusSymbol = {
    'completed': '✅',
    'in-progress': '⏳',
    'not-started': '⚪',
  };

  return (
    <li className="flex items-center justify-between py-2">
      <span className={`flex items-center text-base ${statusColor[topic.status]}`}>
        <span className="mr-2">{statusSymbol[topic.status]}</span> {topic.title}
      </span>
      <button className="text-purple-600 hover:underline text-sm">
        {topic.status === 'completed' ? 'Review' : 'Go to Lesson'}
      </button>
    </li>
  );
};

const CourseCard = ({ course, onCourseClick }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer group
                 flex flex-col md:flex-row items-center p-4 gap-4"
      onClick={() => onCourseClick(course)}
    >
      <div className="relative flex-shrink-0 w-24 h-24 md:w-20 md:h-20 rounded-lg overflow-hidden border border-gray-100
                      flex items-center justify-center bg-gray-50">
        {course.imageUrl ? (
          <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
        ) : (
          <img src="https://via.placeholder.com/200x120/CCCCCC/FFFFFF?text=No+Image" alt="No image available" className="w-full h-full object-cover" />
        )}
      </div>

      <div className="flex-grow text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start text-xs font-semibold text-gray-500 mb-1">
          {course.icon}
          <span className="ml-1">{course.category}</span>
          <span className="mx-1">•</span>
          <span>{course.level}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-1 leading-tight line-clamp-1">
          {course.title}
        </h3>
        {course.progress > 0 && course.progress < 100 && (
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-purple-500 h-full rounded-full"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        )}
        {course.progress === 100 && (
          <div className="w-full bg-green-500 rounded-full h-2 mt-2 flex items-center justify-center text-white text-xs font-semibold">
            COMPLETED
          </div>
        )}
        {course.progress === 0 && (
          <p className="text-xs text-gray-400 mt-2">Not Started</p>
        )}
      </div>

      <div className="flex-shrink-0 ml-auto p-2">
        <ChevronRight size={24} className="text-gray-400 group-hover:text-purple-500 transition-colors" />
      </div>
    </div>
  );
};

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const coursesByCategory = allCourses.reduce((acc, course) => {
    (acc[course.category] = acc[course.category] || []).push(course);
    return acc;
  }, {});

  return (
    <section className="bg-gray-50 min-h-full p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 px-4">Explore Courses</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          {Object.entries(coursesByCategory).map(([category, courses]) => (
            <div key={category} className="mb-8">
              <h2 className="text-2xl font-bold text-purple-700 mb-4 px-4">{category}</h2>
              <div className="grid grid-cols-1 gap-4 px-4">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} onCourseClick={handleCourseClick} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="lg:w-1/3 bg-white rounded-xl shadow-lg p-6 sticky top-4 h-fit">
          {selectedCourse ? (
            <>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedCourse.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{selectedCourse.description}</p>
              <ul className="divide-y divide-gray-200">
                {selectedCourse.topics?.map((topic) => (
                  <TopicItem key={topic.id} topic={topic} />
                ))}
              </ul>
              <NavLink to={`/courses/${selectedCourse.id}`}>
                <button
                className="mt-6 w-full bg-gradient-to-tr from-[#9d5aff] to-[#d48cfa] text-white py-2 rounded-lg font-semibold hover:from-[#8a4be0] hover:to-[#c378ea] transition-all duration-300 shadow-md hover:shadow-lg"
                // onClick={() => alert(`Starting/Continuing ${selectedCourse.title}`)}
              >
                {selectedCourse.progress > 0 && selectedCourse.progress < 100 ? 'Continue Overall Course' : 'Start Overall Course'}
              </button>
              </NavLink>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-4">
              <BookOpen size={48} className="mb-4 text-purple-300" />
              <p className="text-lg font-semibold">Select a course to view its topics!</p>
              <p className="text-sm">Click on any course card on the left to see its detailed curriculum.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Courses;
