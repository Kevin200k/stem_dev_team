import React from 'react'
import Hero from '../components/Hero'
import Navbar from '../components/NavBar'
import SecondPage from './SecondPage'

const HomePage = () => {
  return (
    <>
        <Navbar />
        <Hero />
        <SecondPage />
    </>
  )
}

export default HomePage