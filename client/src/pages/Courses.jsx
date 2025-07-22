// Refined Courses Page Component
import React, { useState, useEffect } from 'react'; // Import useState
import {
  BookOpen,
  FlaskConical,
  Calculator,
  Landmark,
  ChevronRight,
  Dna,
  Plus
} from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import Math from '../assets/courses-icon/Math.jpeg'
import Math1 from '../assets/courses-icon/Math1.png'
import English from '../assets/courses-icon/English.jpeg'
import English2 from '../assets/courses-icon/English2.jpeg'
import Biology from '../assets/courses-icon/Biology.jpeg'
import Physics from '../assets/courses-icon/Physics.jpeg'
import History from '../assets/courses-icon/History.jpeg'
import { useSearch } from '../context/SearchContext';


export const allCourses = [
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
    imageUrl: Math,
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
    imageUrl: English,
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
    imageUrl: Physics,
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
    imageUrl: History,
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
    imageUrl: Math1,
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
    imageUrl: English2,
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
    imageUrl: Biology,
    topics: [
      { id: 'b001t01', title: 'The Scientific Method', status: 'not-started' },
      { id: 'b001t02', title: 'Cells: The Basic Unit of Life', status: 'not-started' },
      { id: 'b001t03', title: 'Photosynthesis: Capturing Light Energy', status: 'not-started' },
      { id: 'b001t04', title: 'Genetics and Heredity', status: 'not-started' },
      { id: 'b001t05', title: 'Ecosystems and Biodiversity', status: 'not-started' },
    ]
  },{
    id: 'math-003',
    title: 'Geometry Essentials',
    description: 'Learn the basics of geometry, including angles, shapes, and theorems.',
    progress: 40,
    icon: <Calculator size={24} className="text-purple-600" />,
    category: 'Mathematics',
    level: 'Beginner',
    modules: 10,
    rating: 4.7,
    imageUrl: Math,
    topics: [
      { id: 'm003t01', title: 'Lines and Angles', status: 'completed' },
      { id: 'm003t02', title: 'Triangles and Circles', status: 'in-progress' },
    ]
  },
  {
    id: 'math-004',
    title: 'Probability and Statistics',
    description: 'Understand basic probability concepts and statistical methods.',
    progress: 10,
    icon: <Calculator size={24} className="text-purple-600" />,
    category: 'Mathematics',
    level: 'Intermediate',
    modules: 14,
    rating: 4.5,
    imageUrl: Math1,
    topics: [
      { id: 'm004t01', title: 'Introduction to Probability', status: 'not-started' },
      { id: 'm004t02', title: 'Data Representation', status: 'not-started' },
    ]
  },{
    id: 'math-005',
    title: 'Trigonometry Basics',
    description: 'Explore the relationships between angles and sides in triangles.',
    progress: 50,
    icon: <Calculator size={24} className="text-purple-600" />,
    category: 'Mathematics',
    level: 'Intermediate',
    modules: 8,
    rating: 4.6,
    imageUrl: Math,
    topics: [
      { id: 'm005t01', title: 'Trigonometric Ratios', status: 'completed' },
      { id: 'm005t02', title: 'Unit Circle', status: 'in-progress' },
      { id: 'm005t03', title: 'Trigonometric Identities', status: 'not-started' },
    ]
  },
  {
    id: 'math-006',
    title: 'Linear Algebra Foundations',
    description: 'Matrices, vectors, and systems of equations explained.',
    progress: 0,
    icon: <Calculator size={24} className="text-purple-600" />,
    category: 'Mathematics',
    level: 'Advanced',
    modules: 16,
    rating: 4.9,
    imageUrl: Math1,
    topics: [
      { id: 'm006t01', title: 'Matrix Operations', status: 'not-started' },
      { id: 'm006t02', title: 'Vector Spaces', status: 'not-started' },
      { id: 'm006t03', title: 'Eigenvalues & Eigenvectors', status: 'not-started' },
    ]
  },{
    id: 'math-007',
    title: 'Algebra II: Quadratics & Polynomials',
    description: 'Quadratic equations, factoring, functions, and graphs.',
    progress: 20,
    icon: <Calculator size={24} className="text-purple-600" />,
    category: 'Mathematics',
    level: 'Intermediate',
    modules: 12,
    rating: 4.4,
    imageUrl: Math,
    topics: [
      { id: 'm007t01', title: 'Factoring Polynomials', status: 'in-progress' },
      { id: 'm007t02', title: 'Quadratic Formula', status: 'not-started' },
      { id: 'm007t03', title: 'Function Graphs', status: 'not-started' },
    ],
  },
  {
    id: 'math-008',
    title: 'Precalculus Readiness',
    description: 'Bridge algebra and calculus with functions and transformations.',
    progress: 5,
    icon: <Calculator size={24} className="text-purple-600" />,
    category: 'Mathematics',
    level: 'Intermediate',
    modules: 9,
    rating: 4.3,
    imageUrl: Math1,
    topics: [
      { id: 'm008t01', title: 'Function Families', status: 'not-started' },
      { id: 'm008t02', title: 'Exponential Functions', status: 'not-started' },
      { id: 'm008t03', title: 'Logarithms', status: 'not-started' },
    ],
  },
  {
    id: 'math-009',
    title: 'Financial Math',
    description: 'Interest, loans, savings growth, and budgeting with numbers.',
    progress: 0,
    icon: <Calculator size={24} className="text-purple-600" />,
    category: 'Mathematics',
    level: 'Beginner',
    modules: 7,
    rating: 4.2,
    imageUrl: Math,
    topics: [
      { id: 'm009t01', title: 'Simple vs Compound Interest', status: 'not-started' },
      { id: 'm009t02', title: 'Percent Growth', status: 'not-started' },
      { id: 'm009t03', title: 'Loan Payments', status: 'not-started' },
    ],
  },
  {
    id: 'math-010',
    title: 'Math for Data Science',
    description: 'Functions, vectors, probability & stats used in ML basics.',
    progress: 0,
    icon: <Calculator size={24} className="text-purple-600" />,
    category: 'Mathematics',
    level: 'Advanced',
    modules: 20,
    rating: 4.8,
    imageUrl: Math1,
    topics: [
      { id: 'm010t01', title: 'Linear Algebra Review', status: 'not-started' },
      { id: 'm010t02', title: 'Probability Refresher', status: 'not-started' },
      { id: 'm010t03', title: 'Optimization Basics', status: 'not-started' },
    ],
  },
  {
    id: 'math-011',
    title: 'Number Theory Basics',
    description: 'Prime numbers, divisibility, modular arithmetic.',
    progress: 15,
    icon: <Calculator size={24} className="text-purple-600" />,
    category: 'Mathematics',
    level: 'Intermediate',
    modules: 11,
    rating: 4.4,
    imageUrl: Math,
    topics: [
      { id: 'm011t01', title: 'Prime Factorization', status: 'in-progress' },
      { id: 'm011t02', title: 'Modular Arithmetic', status: 'not-started' },
      { id: 'm011t03', title: 'Cryptography Intro', status: 'not-started' },
    ],
  },
  {
    id: 'math-012',
    title: 'Discrete Mathematics Intro',
    description: 'Logic, sets, combinatorics, and graphs for CS foundations.',
    progress: 0,
    icon: <Calculator size={24} className="text-purple-600" />,
    category: 'Mathematics',
    level: 'Advanced',
    modules: 13,
    rating: 4.6,
    imageUrl: Math1,
    topics: [
      { id: 'm012t01', title: 'Logic & Proofs', status: 'not-started' },
      { id: 'm012t02', title: 'Counting Principles', status: 'not-started' },
      { id: 'm012t03', title: 'Graph Theory Basics', status: 'not-started' },
    ],
  },
  {
    id: 'math-013',
    title: 'Math Puzzles & Problem Solving',
    description: 'Fun logic and number puzzles to sharpen reasoning skills.',
    progress: 60,
    icon: <Calculator size={24} className="text-purple-600" />,
    category: 'Mathematics',
    level: 'Beginner',
    modules: 6,
    rating: 4.9,
    imageUrl: Math,
    topics: [
      { id: 'm013t01', title: 'Logic Grids', status: 'completed' },
      { id: 'm013t02', title: 'Number Riddles', status: 'in-progress' },
      { id: 'm013t03', title: 'Pattern Hunts', status: 'not-started' },
    ],
  },
  {
    id: 'math-014',
    title: 'SAT / ACT Math Prep',
    description: 'Targeted review for standardized test success in math.',
    progress: 25,
    icon: <Calculator size={24} className="text-purple-600" />,
    category: 'Mathematics',
    level: 'Intermediate',
    modules: 9,
    rating: 4.3,
    imageUrl: Math1,
    topics: [
      { id: 'm014t01', title: 'Algebra Review', status: 'in-progress' },
      { id: 'm014t02', title: 'Data Analysis', status: 'not-started' },
      { id: 'm014t03', title: 'Word Problems', status: 'not-started' },
    ],
  },
  {
    id: 'math-015',
    title: 'Calculus II: Integrals & Series',
    description: 'Integration rules, applications, sequences, and series.',
    progress: 0,
    icon: <Calculator size={24} className="text-purple-600" />,
    category: 'Mathematics',
    level: 'Advanced',
    modules: 17,
    rating: 4.7,
    imageUrl: Math,
    topics: [
      { id: 'm015t01', title: 'Definite Integrals', status: 'not-started' },
      { id: 'm015t02', title: 'Integration Techniques', status: 'not-started' },
      { id: 'm015t03', title: 'Series & Convergence', status: 'not-started' },
    ],
  }, {
    id: 'eng-003',
    title: 'Literary Analysis: Modern Novels',
    description: 'Develop critical thinking skills through the study of contemporary literature.',
    progress: 0,
    icon: <BookOpen size={24} className="text-pink-500" />,
    category: 'English',
    level: 'Intermediate',
    modules: 10,
    rating: 4.7,
    imageUrl: English2,
    topics: [
      { id: 'e003t01', title: 'Analyzing Themes', status: 'not-started' },
      { id: 'e003t02', title: 'Character Deconstruction', status: 'not-started' },
    ],
  },
  {
    id: 'eng-004',
    title: 'Business English',
    description: 'Learn formal communication and writing for professional settings.',
    progress: 10,
    icon: <BookOpen size={24} className="text-pink-500" />,
    category: 'English',
    level: 'Intermediate',
    modules: 12,
    rating: 4.6,
    imageUrl: English,
    topics: [
      { id: 'e004t01', title: 'Email Etiquette', status: 'not-started' },
      { id: 'e004t02', title: 'Professional Vocabulary', status: 'not-started' },
      { id: 'e004t03', title: 'Reports & Memos', status: 'not-started' },
    ],
  },
  {
    id: 'eng-005',
    title: 'Advanced Vocabulary Building',
    description: 'Expand your English vocabulary for essays, exams, and presentations.',
    progress: 25,
    icon: <BookOpen size={24} className="text-pink-500" />,
    category: 'English',
    level: 'Advanced',
    modules: 15,
    rating: 4.8,
    imageUrl: English2,
    topics: [
      { id: 'e005t01', title: 'Synonyms & Antonyms', status: 'in-progress' },
      { id: 'e005t02', title: 'Idioms & Phrases', status: 'not-started' },
      { id: 'e005t03', title: 'Contextual Usage', status: 'not-started' },
    ],
  },
  {
    id: 'eng-006',
    title: 'Essay Writing Techniques',
    description: 'Write structured, compelling essays for academic and creative purposes.',
    progress: 40,
    icon: <BookOpen size={24} className="text-pink-500" />,
    category: 'English',
    level: 'Intermediate',
    modules: 8,
    rating: 4.5,
    imageUrl: English,
    topics: [
      { id: 'e006t01', title: 'Thesis Statements', status: 'completed' },
      { id: 'e006t02', title: 'Supporting Arguments', status: 'in-progress' },
      { id: 'e006t03', title: 'Editing & Proofreading', status: 'not-started' },
    ],
  },
  {
    id: 'eng-007',
    title: 'English Literature Classics',
    description: 'Study Shakespeare, Dickens, and other influential authors.',
    progress: 0,
    icon: <BookOpen size={24} className="text-pink-500" />,
    category: 'English',
    level: 'Advanced',
    modules: 14,
    rating: 4.9,
    imageUrl: English2,
    topics: [
      { id: 'e007t01', title: 'Shakespearean Plays', status: 'not-started' },
      { id: 'e007t02', title: 'Victorian Literature', status: 'not-started' },
      { id: 'e007t03', title: 'Modernism & Beyond', status: 'not-started' },
    ],
  },
  {
    id: 'eng-008',
    title: 'Public Speaking Skills',
    description: 'Improve confidence and clarity when presenting to an audience.',
    progress: 70,
    icon: <BookOpen size={24} className="text-pink-500" />,
    category: 'English',
    level: 'Beginner',
    modules: 6,
    rating: 4.7,
    imageUrl: English,
    topics: [
      { id: 'e008t01', title: 'Voice & Tone', status: 'completed' },
      { id: 'e008t02', title: 'Body Language', status: 'in-progress' },
      { id: 'e008t03', title: 'Engaging the Audience', status: 'not-started' },
    ],
  },
  {
    id: 'eng-009',
    title: 'English for Academic Purposes',
    description: 'Learn the formal writing style required for research and university projects.',
    progress: 5,
    icon: <BookOpen size={24} className="text-pink-500" />,
    category: 'English',
    level: 'Advanced',
    modules: 10,
    rating: 4.4,
    imageUrl: English2,
    topics: [
      { id: 'e009t01', title: 'Academic Vocabulary', status: 'not-started' },
      { id: 'e009t02', title: 'Citations & References', status: 'not-started' },
      { id: 'e009t03', title: 'Research Papers', status: 'not-started' },
    ],
  },
  {
    id: 'eng-010',
    title: 'Listening & Comprehension Skills',
    description: 'Boost your ability to understand spoken English in various contexts.',
    progress: 15,
    icon: <BookOpen size={24} className="text-pink-500" />,
    category: 'English',
    level: 'Beginner',
    modules: 7,
    rating: 4.3,
    imageUrl: English,
    topics: [
      { id: 'e010t01', title: 'Active Listening', status: 'in-progress' },
      { id: 'e010t02', title: 'Context Clues', status: 'not-started' },
      { id: 'e010t03', title: 'Note-Taking Skills', status: 'not-started' },
    ],
  },
  {
    id: 'eng-011',
    title: 'English Idioms & Expressions',
    description: 'Learn common English idioms for conversational fluency.',
    progress: 50,
    icon: <BookOpen size={24} className="text-pink-500" />,
    category: 'English',
    level: 'Intermediate',
    modules: 5,
    rating: 4.6,
    imageUrl: English2,
    topics: [
      { id: 'e011t01', title: 'Everyday Idioms', status: 'completed' },
      { id: 'e011t02', title: 'Business Idioms', status: 'in-progress' },
      { id: 'e011t03', title: 'Cultural Expressions', status: 'not-started' },
    ],
  },
  {
    id: 'eng-012',
    title: 'Reading Comprehension Strategies',
    description: 'Techniques for understanding and analyzing written texts.',
    progress: 30,
    icon: <BookOpen size={24} className="text-pink-500" />,
    category: 'English',
    level: 'Beginner',
    modules: 8,
    rating: 4.4,
    imageUrl: English,
    topics: [
      { id: 'e012t01', title: 'Skimming & Scanning', status: 'in-progress' },
      { id: 'e012t02', title: 'Inference & Prediction', status: 'not-started' },
      { id: 'e012t03', title: 'Main Idea Identification', status: 'not-started' },
    ],
  },
  {
    id: 'eng-013',
    title: 'Pronunciation & Accent Training',
    description: 'Practice speaking clearly and reduce accent barriers.',
    progress: 10,
    icon: <BookOpen size={24} className="text-pink-500" />,
    category: 'English',
    level: 'Beginner',
    modules: 6,
    rating: 4.5,
    imageUrl: English2,
    topics: [
      { id: 'e013t01', title: 'Word Stress', status: 'not-started' },
      { id: 'e013t02', title: 'Intonation Patterns', status: 'not-started' },
      { id: 'e013t03', title: 'Common Mispronunciations', status: 'not-started' },
    ],
  },
  {
    id: 'eng-014',
    title: 'English for Interviews',
    description: 'Prepare for job interviews with fluent, confident English.',
    progress: 5,
    icon: <BookOpen size={24} className="text-pink-500" />,
    category: 'English',
    level: 'Intermediate',
    modules: 5,
    rating: 4.6,
    imageUrl: English,
    topics: [
      { id: 'e014t01', title: 'Common Interview Questions', status: 'not-started' },
      { id: 'e014t02', title: 'Answer Structure', status: 'not-started' },
      { id: 'e014t03', title: 'Mock Interviews', status: 'not-started' },
    ],
  },
  {
    id: 'eng-015',
    title: 'English for Everyday Conversations',
    description: 'Practical English for daily life interactions.',
    progress: 0,
    icon: <BookOpen size={24} className="text-pink-500" />,
    category: 'English',
    level: 'Beginner',
    modules: 6,
    rating: 4.7,
    imageUrl: English2,
    topics: [
      { id: 'e015t01', title: 'Greetings & Introductions', status: 'not-started' },
      { id: 'e015t02', title: 'Small Talk Basics', status: 'not-started' },
      { id: 'e015t03', title: 'Asking for Help', status: 'not-started' },
    ],
  }, {
    id: 'sci-001',
    title: 'Intro to Physics: Motion & Forces',
    description: 'Discover how objects move and interact using Newton’s laws.',
    progress: 45,
    icon: <FlaskConical size={24} className="text-green-500" />,
    category: 'Sciences',
    level: 'Beginner',
    modules: 10,
    rating: 4.7,
    imageUrl: Physics,
    topics: [
      { id: 's001t01', title: 'Speed vs. Velocity', status: 'completed' },
      { id: 's001t02', title: 'Forces & Free-Body Diagrams', status: 'in-progress' },
      { id: 's001t03', title: 'Newton’s 3 Laws', status: 'not-started' },
    ],
  },
  {
    id: 'sci-002',
    title: 'Chemistry Foundations',
    description: 'Atoms, molecules, bonding, and the periodic table made simple.',
    progress: 10,
    icon: <FlaskConical size={24} className="text-lime-500" />,
    category: 'Sciences',
    level: 'Beginner',
    modules: 12,
    rating: 4.6,
    imageUrl: null, // TODO: add Chemistry image
    topics: [
      { id: 's002t01', title: 'Atomic Structure', status: 'not-started' },
      { id: 's002t02', title: 'Periodic Trends', status: 'not-started' },
      { id: 's002t03', title: 'Chemical Bonds', status: 'not-started' },
    ],
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
    imageUrl: Physics,
    topics: [
      { id: 's003t01', title: 'Kinematics: Describing Motion', status: 'completed' },
      { id: 's003t02', title: "Newton's Laws of Motion", status: 'in-progress' },
      { id: 's003t03', title: 'Work, Energy, and Power', status: 'not-started' },
    ],
  },
  {
    id: 'sci-004',
    title: 'Biology: Cells & Systems',
    description: 'Learn how cells function and form the basis of all living things.',
    progress: 0,
    icon: <Dna size={24} className="text-emerald-600" />,
    category: 'Sciences',
    level: 'Beginner',
    modules: 11,
    rating: 4.5,
    imageUrl: Biology,
    topics: [
      { id: 's004t01', title: 'Cell Structure', status: 'not-started' },
      { id: 's004t02', title: 'Organelles & Functions', status: 'not-started' },
      { id: 's004t03', title: 'Cell Transport', status: 'not-started' },
    ],
  },
  {
    id: 'sci-005',
    title: 'Human Anatomy Basics',
    description: 'An overview of the major systems in the human body.',
    progress: 20,
    icon: <Dna size={24} className="text-red-500" />,
    category: 'Sciences',
    level: 'Beginner',
    modules: 9,
    rating: 4.4,
    imageUrl: Biology,
    topics: [
      { id: 's005t01', title: 'Skeletal System', status: 'in-progress' },
      { id: 's005t02', title: 'Muscular System', status: 'not-started' },
      { id: 's005t03', title: 'Circulatory System', status: 'not-started' },
    ],
  },
  {
    id: 'sci-006',
    title: 'Genetics & Heredity',
    description: 'DNA, genes, traits, and how they’re passed through generations.',
    progress: 0,
    icon: <Dna size={24} className="text-purple-500" />,
    category: 'Sciences',
    level: 'Intermediate',
    modules: 8,
    rating: 4.8,
    imageUrl: Biology,
    topics: [
      { id: 's006t01', title: 'DNA & Chromosomes', status: 'not-started' },
      { id: 's006t02', title: 'Punnett Squares', status: 'not-started' },
      { id: 's006t03', title: 'Genetic Disorders', status: 'not-started' },
    ],
  },
  {
    id: 'sci-007',
    title: 'Earth Science: Our Planet',
    description: 'Rocks, plate tectonics, and Earth’s changing surface.',
    progress: 5,
    icon: <FlaskConical size={24} className="text-teal-500" />,
    category: 'Sciences',
    level: 'Beginner',
    modules: 10,
    rating: 4.3,
    imageUrl: null, // TODO: Earth image
    topics: [
      { id: 's007t01', title: 'Layers of the Earth', status: 'not-started' },
      { id: 's007t02', title: 'Plate Tectonics', status: 'not-started' },
      { id: 's007t03', title: 'Volcanoes & Quakes', status: 'not-started' },
    ],
  },
  {
    id: 'sci-008',
    title: 'Astronomy: The Solar System',
    description: 'Planets, moons, comets, and how the solar system formed.',
    progress: 0,
    icon: <FlaskConical size={24} className="text-indigo-500" />,
    category: 'Sciences',
    level: 'Beginner',
    modules: 7,
    rating: 4.6,
    imageUrl: null, // TODO: Astronomy image
    topics: [
      { id: 's008t01', title: 'The Sun & Planets', status: 'not-started' },
      { id: 's008t02', title: 'Moons & Rings', status: 'not-started' },
      { id: 's008t03', title: 'Dwarf Planets', status: 'not-started' },
    ],
  },
  {
    id: 'sci-009',
    title: 'Environmental Science & Ecology',
    description: 'Ecosystems, food webs, and human environmental impact.',
    progress: 65,
    icon: <FlaskConical size={24} className="text-green-700" />,
    category: 'Sciences',
    level: 'Intermediate',
    modules: 12,
    rating: 4.9,
    imageUrl: Biology,
    topics: [
      { id: 's009t01', title: 'Ecosystems & Biomes', status: 'completed' },
      { id: 's009t02', title: 'Food Chains', status: 'in-progress' },
      { id: 's009t03', title: 'Climate Change Basics', status: 'not-started' },
    ],
  },
  {
    id: 'sci-010',
    title: 'Introduction to Lab Skills',
    description: 'Safety, tools, measuring, and recording data in science labs.',
    progress: 0,
    icon: <FlaskConical size={24} className="text-cyan-500" />,
    category: 'Sciences',
    level: 'Beginner',
    modules: 6,
    rating: 4.2,
    imageUrl: null, // TODO: Lab image
    topics: [
      { id: 's010t01', title: 'Lab Safety Rules', status: 'not-started' },
      { id: 's010t02', title: 'Using Equipment', status: 'not-started' },
      { id: 's010t03', title: 'Recording Observations', status: 'not-started' },
    ],
  },
  {
    id: 'sci-011',
    title: 'Energy & Waves',
    description: 'Sound, light, and energy transfer across different media.',
    progress: 35,
    icon: <FlaskConical size={24} className="text-yellow-500" />,
    category: 'Sciences',
    level: 'Intermediate',
    modules: 9,
    rating: 4.5,
    imageUrl: Physics,
    topics: [
      { id: 's011t01', title: 'Types of Energy', status: 'in-progress' },
      { id: 's011t02', title: 'Wave Properties', status: 'not-started' },
      { id: 's011t03', title: 'Light vs. Sound', status: 'not-started' },
    ],
  },
  {
    id: 'sci-012',
    title: 'Intro to Electricity & Magnetism',
    description: 'Circuits, charge, and the relationship between electricity and magnets.',
    progress: 0,
    icon: <FlaskConical size={24} className="text-amber-600" />,
    category: 'Sciences',
    level: 'Intermediate',
    modules: 8,
    rating: 4.4,
    imageUrl: Physics,
    topics: [
      { id: 's012t01', title: 'Electric Charge', status: 'not-started' },
      { id: 's012t02', title: 'Simple Circuits', status: 'not-started' },
      { id: 's012t03', title: 'Magnets & Fields', status: 'not-started' },
    ],
  },
  {
    id: 'sci-013',
    title: 'Microbiology Basics',
    description: 'Bacteria, viruses, and microscopic life.',
    progress: 0,
    icon: <Dna size={24} className="text-pink-500" />,
    category: 'Sciences',
    level: 'Advanced',
    modules: 10,
    rating: 4.8,
    imageUrl: Biology,
    topics: [
      { id: 's013t01', title: 'Microbes & You', status: 'not-started' },
      { id: 's013t02', title: 'Bacteria vs. Viruses', status: 'not-started' },
      { id: 's013t03', title: 'Good & Bad Microbes', status: 'not-started' },
    ],
  },
  {
    id: 'sci-014',
    title: 'Marine Biology',
    description: 'Life in the oceans: habitats, food webs, and conservation.',
    progress: 0,
    icon: <Dna size={24} className="text-blue-500" />,
    category: 'Sciences',
    level: 'Intermediate',
    modules: 9,
    rating: 4.6,
    imageUrl: Biology,
    topics: [
      { id: 's014t01', title: 'Ocean Zones', status: 'not-started' },
      { id: 's014t02', title: 'Coral Reefs', status: 'not-started' },
      { id: 's014t03', title: 'Marine Food Chains', status: 'not-started' },
    ],
  },
  {
    id: 'sci-015',
    title: 'STEM Lab Challenges',
    description: 'Hands-on mini projects combining science, tech, and measurement.',
    progress: 0,
    icon: <FlaskConical size={24} className="text-purple-600" />,
    category: 'Sciences',
    level: 'Beginner',
    modules: 5,
    rating: 4.3,
    imageUrl: null, // TODO: STEM image
    topics: [
      { id: 's015t01', title: 'Build a Bridge Challenge', status: 'not-started' },
      { id: 's015t02', title: 'Paper Rocket Physics', status: 'not-started' },
      { id: 's015t03', title: 'Simple Circuits Build', status: 'not-started' },
    ],
  }, {
    id: 'hist-002',
    title: 'The Middle Ages',
    description: 'Knights, castles, feudalism, and life during medieval times.',
    progress: 15,
    icon: <Landmark size={24} className="text-indigo-500" />,
    category: 'History',
    level: 'Intermediate',
    modules: 10,
    rating: 4.5,
    imageUrl: History,
    topics: [
      { id: 'h002t01', title: 'Feudal System', status: 'not-started' },
      { id: 'h002t02', title: 'The Black Death', status: 'not-started' },
      { id: 'h002t03', title: 'Crusades Overview', status: 'not-started' },
    ],
  },
  {
    id: 'hist-003',
    title: 'Renaissance & Humanism',
    description: 'The rebirth of art, culture, and science in Europe.',
    progress: 0,
    icon: <Landmark size={24} className="text-purple-500" />,
    category: 'History',
    level: 'Intermediate',
    modules: 9,
    rating: 4.8,
    imageUrl: History,
    topics: [
      { id: 'h003t01', title: 'Art & Architecture', status: 'not-started' },
      { id: 'h003t02', title: 'Humanist Philosophy', status: 'not-started' },
      { id: 'h003t03', title: 'Printing Press Revolution', status: 'not-started' },
    ],
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
    imageUrl: History,
    topics: [
      { id: 'h004t01', title: 'Causes of the War', status: 'completed' },
      { id: 'h004t02', title: 'Major Campaigns', status: 'completed' },
      { id: 'h004t03', title: 'Pacific Theater', status: 'completed' },
    ],
  },
  {
    id: 'hist-005',
    title: 'World War I: The Great War',
    description: 'Understand the global conflict that reshaped the modern world.',
    progress: 10,
    icon: <Landmark size={24} className="text-blue-700" />,
    category: 'History',
    level: 'Intermediate',
    modules: 11,
    rating: 4.7,
    imageUrl: History,
    topics: [
      { id: 'h005t01', title: 'Alliance System', status: 'not-started' },
      { id: 'h005t02', title: 'Trench Warfare', status: 'not-started' },
      { id: 'h005t03', title: 'Treaty of Versailles', status: 'not-started' },
    ],
  },
  {
    id: 'hist-006',
    title: 'American Revolution',
    description: 'From colonies to independence: how America was born.',
    progress: 50,
    icon: <Landmark size={24} className="text-red-500" />,
    category: 'History',
    level: 'Intermediate',
    modules: 7,
    rating: 4.6,
    imageUrl: History,
    topics: [
      { id: 'h006t01', title: '13 Colonies & British Rule', status: 'completed' },
      { id: 'h006t02', title: 'Declaration of Independence', status: 'in-progress' },
      { id: 'h006t03', title: 'End of War', status: 'not-started' },
    ],
  },
  {
    id: 'hist-007',
    title: 'Industrial Revolution',
    description: 'The transformation that changed societies and economies forever.',
    progress: 0,
    icon: <Landmark size={24} className="text-orange-500" />,
    category: 'History',
    level: 'Beginner',
    modules: 8,
    rating: 4.4,
    imageUrl: History,
    topics: [
      { id: 'h007t01', title: 'Steam Power & Factories', status: 'not-started' },
      { id: 'h007t02', title: 'Urbanization', status: 'not-started' },
      { id: 'h007t03', title: 'Social Changes', status: 'not-started' },
    ],
  },
  {
    id: 'hist-008',
    title: 'Cold War Era',
    description: 'Nuclear tensions, proxy wars, and the division of the world.',
    progress: 35,
    icon: <Landmark size={24} className="text-cyan-500" />,
    category: 'History',
    level: 'Advanced',
    modules: 12,
    rating: 4.8,
    imageUrl: History,
    topics: [
      { id: 'h008t01', title: 'Iron Curtain', status: 'completed' },
      { id: 'h008t02', title: 'Cuban Missile Crisis', status: 'in-progress' },
      { id: 'h008t03', title: 'Fall of the Berlin Wall', status: 'not-started' },
    ],
  },
  {
    id: 'hist-009',
    title: 'Civil Rights Movement',
    description: 'How a movement reshaped laws and societies for equality.',
    progress: 0,
    icon: <Landmark size={24} className="text-green-500" />,
    category: 'History',
    level: 'Intermediate',
    modules: 10,
    rating: 4.6,
    imageUrl: History,
    topics: [
      { id: 'h009t01', title: 'Jim Crow Laws', status: 'not-started' },
      { id: 'h009t02', title: 'MLK & Peaceful Protests', status: 'not-started' },
      { id: 'h009t03', title: 'Civil Rights Act', status: 'not-started' },
    ],
  },
  {
    id: 'hist-010',
    title: 'French Revolution',
    description: 'Liberty, equality, and the overthrow of the monarchy.',
    progress: 0,
    icon: <Landmark size={24} className="text-purple-600" />,
    category: 'History',
    level: 'Advanced',
    modules: 9,
    rating: 4.7,
    imageUrl: History,
    topics: [
      { id: 'h010t01', title: 'Causes of the Revolution', status: 'not-started' },
      { id: 'h010t02', title: 'Reign of Terror', status: 'not-started' },
      { id: 'h010t03', title: 'Rise of Napoleon', status: 'not-started' },
    ],
  },
  {
    id: 'hist-011',
    title: 'African Kingdoms & Empires',
    description: 'Learn about Mali, Ghana, Songhai, and their legacies.',
    progress: 5,
    icon: <Landmark size={24} className="text-yellow-500" />,
    category: 'History',
    level: 'Beginner',
    modules: 8,
    rating: 4.5,
    imageUrl: History,
    topics: [
      { id: 'h011t01', title: 'Ghana Empire', status: 'not-started' },
      { id: 'h011t02', title: 'Mansa Musa & Mali', status: 'not-started' },
      { id: 'h011t03', title: 'Songhai Leadership', status: 'not-started' },
    ],
  },
  {
    id: 'hist-012',
    title: 'History of Slavery & Abolition',
    description: 'A study of transatlantic slavery and the abolition movements.',
    progress: 0,
    icon: <Landmark size={24} className="text-red-700" />,
    category: 'History',
    level: 'Intermediate',
    modules: 10,
    rating: 4.8,
    imageUrl: History,
    topics: [
      { id: 'h012t01', title: 'Slave Trade Routes', status: 'not-started' },
      { id: 'h012t02', title: 'Abolitionists', status: 'not-started' },
      { id: 'h012t03', title: 'Emancipation', status: 'not-started' },
    ],
  },
  {
    id: 'hist-013',
    title: 'Colonialism & Independence',
    description: 'The scramble for Africa and Asia, and the road to independence.',
    progress: 0,
    icon: <Landmark size={24} className="text-teal-500" />,
    category: 'History',
    level: 'Advanced',
    modules: 11,
    rating: 4.7,
    imageUrl: History,
    topics: [
      { id: 'h013t01', title: 'Colonial Empires', status: 'not-started' },
      { id: 'h013t02', title: 'Independence Leaders', status: 'not-started' },
      { id: 'h013t03', title: 'Post-Colonial States', status: 'not-started' },
    ],
  },
  {
    id: 'hist-014',
    title: 'History of Technology',
    description: 'From stone tools to AI: the tech that shaped humanity.',
    progress: 0,
    icon: <Landmark size={24} className="text-gray-600" />,
    category: 'History',
    level: 'Beginner',
    modules: 8,
    rating: 4.4,
    imageUrl: History,
    topics: [
      { id: 'h014t01', title: 'Invention of the Wheel', status: 'not-started' },
      { id: 'h014t02', title: 'Industrial Revolution Machines', status: 'not-started' },
      { id: 'h014t03', title: 'Modern Computing', status: 'not-started' },
    ],
  },
  {
    id: 'hist-015',
    title: 'History of Medicine',
    description: 'How medicine evolved from ancient remedies to modern healthcare.',
    progress: 0,
    icon: <Landmark size={24} className="text-green-600" />,
    category: 'History',
    level: 'Intermediate',
    modules: 9,
    rating: 4.5,
    imageUrl: History,
    topics: [
      { id: 'h015t01', title: 'Ancient Medical Practices', status: 'not-started' },
      { id: 'h015t02', title: 'Germ Theory', status: 'not-started' },
      { id: 'h015t03', title: 'Modern Vaccines', status: 'not-started' },
    ],
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

const Courses = (searchCourses) => {

  const { query } = useSearch()

  useEffect(() => {
    console.log('Query:', query)
  }, [])

  const searchQuery = allCourses.filter((course) => {
    return course.title.toLowerCase().includes(query.toLowerCase())
  })


  const [selectedCourse, setSelectedCourse] = useState(null);
  // State to manage the visibility of the "Upload File" tooltip
  const [showUploadTooltip, setShowUploadTooltip] = useState(false);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const coursesByCategory = allCourses.reduce((acc, course) => {
    (acc[course.category] = acc[course.category] || []).push(course);
    return acc;
  }, {});

  return (
    <section className="bg-gray-50 min-h-full p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 px-4">Explore</h1>

      <div className="flex flex-col lg:flex-row gap-8 relative">
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

      <Link to='/courses/file-upload'>
        {/* Add event handlers to the FAB container */}
        <div
          className='h-14 w-14 rounded-full bg-purple-400 absolute right-20 bottom-20 flex justify-center items-center cursor-pointer group'
          onMouseEnter={() => setShowUploadTooltip(true)}
          onMouseLeave={() => setShowUploadTooltip(false)}
        >
          <div>
            <Plus color='white' strokeWidth={2} size={30} />
          </div>

          {/* Conditionally render the tooltip based on showUploadTooltip state */}
          {showUploadTooltip && (
            <div className='absolute bottom-full mb-2 p-2 px-3 bg-gray-700 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
              Upload File
            </div>
          )}
        </div>
      </Link>

    </section>
  );
};

export default Courses;