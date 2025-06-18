import React from 'react'
import { Route, Routes, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import Dashboard from './pages/Dashboard'
import NotFoundPage from './pages/NotFoundPage'
import MainLayout from './layouts/MainLayout'
import Courses from './pages/Courses'
import CourseViewer from './pages/Sample-course-viewer';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/' element={<MainLayout />}>
        <Route path='homepage' element={<HomePage />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='courses' element={<Courses />} />
      </Route>
      <Route path='*' element={<NotFoundPage />} />
    </>
  )
)

const App = () => {
  return <RouterProvider router={router} />
}

export default App
