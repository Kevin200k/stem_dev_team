import React from 'react'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'

import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import Dashboard from './pages/Dashboard'
import NotFoundPage from './pages/NotFoundPage'
import MainLayout from './layouts/MainLayout'
import Courses from './pages/Courses'
import MathematicsCourse from './pages/MathematicsCourse'
import SecondMathematicsCourses from './pages/SecondMathematicsCourse'
import SecondEnglishCourse from './pages/SecondEnglishCourse'
import EnglishCourse from './pages/EnglishCourse'
import BiologyCourse from './pages/BiologyCourse'
import PhysicsCourse from './pages/PhysicsCourse'
import History from './pages/History'
import TestMe from './pages/TestMe'
import Videos from './pages/Videos'
import Addfile from './pages/Addfile'
import Search from './pages/Search'
import Settings from './pages/Settings'
import CourseDetailPage from './pages/CourseDetail'
import LearningCharacters from './pages/LearningCharacters'
import { SearchProvider } from './context/SearchContext'

import RequireAuth from './components/RequireAuth'
import RequireNoAuth from './components/RequireNoAuth'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={
        <RequireNoAuth>
          <LoginPage />
        </RequireNoAuth>
      } />
      <Route index element={
        <RequireNoAuth>
          <SignupPage />
        </RequireNoAuth>
      } />
      <Route path="/learning-character" element={
        <RequireAuth>
          <LearningCharacters />
        </RequireAuth>} />

      <Route path="/" element={<MainLayout />}>
        <Route path="/dashboard" element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        } />
        <Route path="/courses" element={
          <RequireAuth>
            <Courses />
          </RequireAuth>
        } />
        <Route path="/courses/math-001" element={
          <RequireAuth>
            <MathematicsCourse />
          </RequireAuth>
        } />
        <Route path="/courses/math-002" element={
          <RequireAuth>
            <SecondMathematicsCourses />
          </RequireAuth>
        } />
        <Route path="/courses/eng-003" element={
          <RequireAuth>
            <SecondEnglishCourse />
          </RequireAuth>
        } />
        <Route path="/courses/eng-002" element={
          <RequireAuth>
            <EnglishCourse />
          </RequireAuth>
        } />
        <Route path="/courses/bio-001" element={
          <RequireAuth>
            <BiologyCourse />
          </RequireAuth>
        } />
        <Route path="/courses/sci-003" element={
          <RequireAuth>
            <PhysicsCourse />
          </RequireAuth>
        } />
        <Route path="/courses/hist-004" element={
          <RequireAuth>
            <History />
          </RequireAuth>
        } />
        <Route path="/test-me" element={
          <RequireAuth>
            <TestMe />
          </RequireAuth>
        } />
        <Route path="/videos" element={
          <RequireAuth>
            <Videos />
          </RequireAuth>
        } />
        <Route path="/courses/file-upload" element={
          <RequireAuth>
            <Addfile />
          </RequireAuth>
        } />
        <Route path="/search" element={
          <RequireAuth>
            <Search />
          </RequireAuth>
        } />
        <Route path="/courses/:courseId" element={
          <RequireAuth>
            <CourseDetailPage />
          </RequireAuth>
        } />
      </Route>

      <Route path="/settings" element={
        <RequireAuth>
          <Settings />
        </RequireAuth>
      } />

      <Route path="*" element={<NotFoundPage />} />
    </>
  )
)

const App = () => {
  return (
    <SearchProvider>
      <RouterProvider router={router} />
    </SearchProvider>
  )
}

export default App
