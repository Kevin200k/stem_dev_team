import React from 'react'
import { Route, Routes, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import ProtectedRoutes from './utils/ProtectedRoutes'
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <React.Fragment>
      <Route path='/login' element = { <LoginPage /> } />
      <Route path='/signup' element = { <SignupPage /> } />
      <Route index element = { <HomePage /> } />

      <Route path='/' element={ <MainLayout /> }>
        <Route path='/dashboard' element = { <Dashboard /> } />
        <Route path='/courses' element = { <Courses /> } />
        <Route path='/courses/math-001' element={ <MathematicsCourse /> } />
        <Route path='/courses/math-001' element={ <MathematicsCourse /> } />
        <Route path='/courses/math-002' element={ <SecondMathematicsCourses /> } />
        <Route path='/courses/eng-003' element={ <SecondEnglishCourse /> } />
        <Route path='/courses/eng-002' element={ <EnglishCourse /> } />
        <Route path='/courses/bio-001' element={ <BiologyCourse /> } />
        <Route path='/courses/sci-003' element={ <PhysicsCourse /> } />
        <Route path='/courses/hist-004' element={ <History /> } />
        <Route path='/test-me' element={ <TestMe /> } />
        <Route path='/videos' element={ <Videos /> } />
        <Route path='/courses/file-upload' element={ <Addfile /> } />
      </Route>
      <Route path='*' element={<NotFoundPage />} />
    </React.Fragment>
  )
)

const App = () => {
  return <RouterProvider router={router} />
}

export default App
