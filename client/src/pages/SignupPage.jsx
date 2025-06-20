import React from 'react'
import { ArrowLeft, User, Mail, Lock} from 'lucide-react';
import { BsGoogle, BsFacebook } from 'react-icons/bs';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import SignupHalf from '../components/SignupHalf';
import Button from '../components/Button'



const SignupPage = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <section className="h-screen grid grid-cols-2">
      <div className="flex-1  pt-10 pl-48 pr-48 ">
        <div className='flex justify-between p-2'>
          <div className='bg-white rounded-full border-2 border-gray-300 w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-gray-100'>
            {/* <ArrowLeft size={20} className="text-gray-700" /> */}
            <Button />
          </div>
          <div>Already member? <NavLink to='/login'><span className='shadow-sm'>Sign in</span></NavLink></div>
        </div>

        <div className='mt-20'>
          <h1 className='text-4xl font-bold'>Sign Up</h1>
        </div>
        <form className="flex flex-col gap-4 mt-4">

          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type='text'
              placeholder='Full Name'
              className="p-3 pl-10 w-full border-b border-gray-400 focus:outline-none focus:border-purple-500"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type='email'
              placeholder='Email'
              className="p-3 pl-10 w-full border-b border-gray-400 focus:outline-none focus:border-purple-500"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type='password'
              placeholder='Password'
              className="p-3 pl-10 w-full border-b border-gray-400 focus:outline-none focus:border-purple-500"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className='flex justify-between items-center mt-4'>
            <button type="submit" className="bg-purple-500 text-white p-3 w-36 rounded-md">Sign Up</button>
            <span className="text-gray-600 mx-2">or</span>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <BsGoogle size={24} className="mr-2" />
                Sign up with Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <BsFacebook size={24} className="mr-2" />
                Sign up with Facebook
              </button>
            </div>
          </div>
        </form>
      </div>

      <SignupHalf />
      
    </section>
  )
}

export default SignupPage