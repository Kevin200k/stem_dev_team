import React, { useState, useEffect } from 'react';
// Assuming allCourses is exported from Courses.jsx as a named export
import { allCourses } from '../pages/Courses'; // Adjust path if necessary

const Points = () => {
  // State to store the total points. Initialized to 0.
  const [totalPoints, setTotalPoints] = useState(0);

  // useEffect to calculate points when the component mounts or allCourses changes.
  // The empty dependency array '[]' means it runs only once after the initial render.
  useEffect(() => {
    let calculatedPoints = 0;

    // Loop through each course in the allCourses array
    allCourses.forEach(course => {
      // If a course's progress is 100 (completed), add 5 points.
      // You can adjust the points awarded per course or based on other criteria.
      if (course.progress === 100) {
        calculatedPoints += 5; // Add 5 points for a completed course
      }
      // You could also add points for in-progress courses, e.g.,
      // if (course.progress > 0 && course.progress < 100) {
      //   calculatedPoints += 1; // Or some fraction of points
      // }
    });

    // Update the 'totalPoints' state with the calculated value.
    setTotalPoints(calculatedPoints);

    // Optional: Log the courses for debugging, as you had before
    // console.log("All Courses:", allCourses);
  }, []); // Empty dependency array means this effect runs once on mount.

  return (
    // Display the calculated total points.
    // This div uses Tailwind CSS for styling:
    // bg-orange-50: light orange background
    // p-4: padding all around
    // rounded-lg: rounded corners
    // shadow-sm: subtle shadow
    // text-center: centers text
    // flex, items-center, justify-center: uses flexbox to center content horizontally and vertically
    // text-orange-800: dark orange text color
    // font-semibold: semi-bold font weight
    // border border-orange-200: a light orange border
    <div className='p-4 mx-0 rounded-lg text-center flex items-center justify-center text-orange-800 font-semibold '>
      <span className="text-xl font-bold mr-2">⭐</span> {/* Star emoji for points */}
      <span>Total Points: {totalPoints}</span> {/* Displays the totalPoints value */}
    </div>
  );
};

export default Points;