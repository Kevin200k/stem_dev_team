import React from 'react'
import { Route, Routes, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import Dashboard from './pages/Dashboard'
import MainLayout from './layouts/MainLayout'



const router = createBrowserRouter(
  createRoutesFromElements(
    <React.Fragment>
      <Route path='/login' element = { <LoginPage /> } />
      <Route path='/signup' element = { <SignupPage /> } />
      <Route path = 'homepage' element = { <HomePage/> } />
      <Route path='/' element={ <HomePage /> } />
      <Route path='/dashboard' element = { <Dashboard /> } />
    </React.Fragment>
  )
)

const App = () => {
  return (
    <RouterProvider router={ router }/>
  )
}

export default App