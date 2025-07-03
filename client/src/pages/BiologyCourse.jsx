import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BiologyFirstCourse from '../components/BiologyCourse/BiologyFirstCourse'
import BiologySecondCourse from '../components/BiologyCourse/BiologySecondCourse'
import BiologyThirdCourse from '../components/BiologyCourse/BiologyThirdCourse'
import BiologyFourthCourse from '../components/BiologyCourse/BiologyFourthCourse'
import BiologyFifthCourse from '../components/BiologyCourse/BiologyFifthCourse'
// The JSON data for "The Scientific Method" lesson

const BiologyCourse = () => {
  return (
    <div>
      <BiologyFirstCourse />

      <BiologySecondCourse />

      <BiologyThirdCourse />

      <BiologyFourthCourse />

      <BiologyFifthCourse />
    </div>
  );
};

export default BiologyCourse;
