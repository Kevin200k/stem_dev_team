import React from 'react'
import { Route, Routes, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <React.Fragment>
      <Route path = '/' element = { <HomePage/> } />
      {/* <Route path='/' element={<Navigate to='/signup' />} /> */}
      <Route path='/login' element = { <LoginPage /> } />
      <Route path='/signup' element = { <SignupPage /> } />
    </React.Fragment>
  )
)

const App = () => {
  return (
    <RouterProvider router={ router }/>
  )
}

export default App