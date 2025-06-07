import { ArrowLeft, Mail, Lock, ArrowRight} from 'lucide-react';
import { BsGoogle, BsFacebook } from 'react-icons/bs';



const LoginPage = () => {
  return (
    <section className="h-screen grid grid-cols-2">
      <div className="pt-10 pl-48 pr-48">
        <div className='flex justify-between p-2'>
          <div className='bg-white rounded-full border-2 border-gray-300 w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-gray-100'>
            <ArrowLeft size={20} className="text-gray-700" />
          </div>
          <div>Don't have an account? <span className='font-bold text-purple-500 cursor-pointer hover:underline'>Sign Up</span></div>
        </div>
        <div className='mt-20'>
          <h1 className='text-4xl font-bold'>Log In</h1>
        </div>
        <form className="flex flex-col gap-6 mt-8">

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type='email'
              placeholder='Email'
              className="p-3 pl-10 w-full border-b border-gray-400 focus:outline-none focus:border-purple-500"
            />
          </div>


          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type='password'
              placeholder='Password'
              className="p-3 pl-10 w-full border-b border-gray-400 focus:outline-none focus:border-purple-500"
            />
            <a href="#" className="absolute right-0 top-1/2 -translate-y-1/2 text-purple-500 text-sm hover:underline">Forgot?</a>
          </div>

          <div className="flex flex-col items-center gap-4 mt-8"> 

            <button
              type="submit"
              className="bg-purple-500 text-white p-3 w-full max-w-xs rounded-md flex items-center justify-center" 
            >
              Log In <ArrowRight size={20} className="ml-2" />
            </button>

            <div className="text-gray-600">or</div>

            <div className="flex flex-col gap-3 w-full max-w-xs"> 
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <BsGoogle size={24} className="mr-2" />
                Sign in with Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <BsFacebook size={24} className="mr-2" />
                Sign in with Facebook
              </button>
            </div>
          </div>
          
        </form>
      </div>

      <div>

      </div>
    </section>
  );
};

export default LoginPage;