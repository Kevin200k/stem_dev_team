import React from 'react'

const LoginHalf = () => {
  return (
    <div className="flex-1">
        <div className='relative min-h-screen overflow-hidden'>
          {/* Your existing shapes */}
          <div className='absolute h-[96rem] left-0 w-full bg-purple-500 rotate-4 transform
          translate-x-[5rem] translate-y-[-5rem] border-2 border-black'>

          </div>
          <div className='absolute top-0 h-24 w-2xl bg-purple-700 rounded-2xl rotate-[-9deg] transform
          translate-y-[-5rem] '>
          </div>
          <div className='w-96 h-56 bg-purple-400 absolute right-2 top-16 rounded-2xl rotate-12 transform translate-y-[-9rem] translate-x-14'>
          </div>
          <div className='absolute h-[49rem] w-xl bg-purple-500 rounded-b-4xl bottom-0 rounded-4xl rotate-60 transform translate-y-[20rem] translate-x-[12rem]'>

          </div>

          <div className='absolute h-[20rem] w-[20rem] bg-purple-400 bottom-4 transform translate-x-[30rem]
          translate-y-[12rem] rotate-45 rounded-4xl border-2 border-black'>

          </div>

          {/* Inspirational Write-up for Login Page */}
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50
                      bg-white/10 backdrop-blur-sm rounded-lg shadow-xl
                      text-white text-center p-8 w-3/4 max-w-md'>
            <h2 className='text-4xl font-extrabold mb-4 drop-shadow-lg'>Welcome Back, Trailblazer!</h2>
            <p className='text-xl leading-relaxed drop-shadow-md'>
              Dive back into your world and pick up where you left off. Great things are just a login away.
            </p>
          </div>

        </div>
      </div>
  )
}

export default LoginHalf