import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {

  const user = null

  const navigate = useNavigate()

  return user ? <Outlet /> : navigate('/login')
}

export default ProtectedRoutes