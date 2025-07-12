import { ArrowLeft, Mail, Lock, ArrowRight } from 'lucide-react';
import { BsGoogle, BsFacebook } from 'react-icons/bs';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import LoginHalf from '../components/LoginHalf';
import Button from '../components/Button';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Email/password login handler
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in:', userCredential.user);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Google login handler
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('Google login success:', user);
      navigate('/dashboard');
    } catch (err) {
      console.error('Google login error:', err);
      setError('Google login failed. Please try again.');
    }
  };

  return (
    <section className="h-screen grid grid-cols-2">
      <div className="pt-10 pl-48 pr-48">
        <div className='flex justify-between p-2'>
          <div className='bg-white rounded-full border-2 border-gray-300 w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-gray-100'>
            <Button />
          </div>
          <div>
            Don't have an account?{' '}
            <NavLink to='/signup'>
              <span className='font-bold text-purple-500 cursor-pointer hover:underline'>Sign Up</span>
            </NavLink>
          </div>
        </div>

        <div className='mt-20'>
          <h1 className='text-4xl font-bold'>Log In</h1>
        </div>

        <form className="flex flex-col gap-6 mt-8" onSubmit={handleEmailLogin}>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type='email'
              placeholder='Email'
              className="p-3 pl-10 w-full border-b border-gray-400 focus:outline-none focus:border-purple-500"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
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
              required
            />
            <a href="#" className="absolute right-0 top-1/2 -translate-y-1/2 text-purple-500 text-sm hover:underline">Forgot?</a>
          </div>

          {error && (
            <div className="px-3 py-2 rounded-md bg-red-100 text-red-700 font-medium text-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col items-center gap-4 mt-8">
            <button
              type="submit"
              disabled={loading}
              className="bg-purple-500 text-white p-3 w-full max-w-xs rounded-md flex items-center justify-center disabled:opacity-50"
            >
              {loading ? 'Logging in...' : (
                <>
                  Log In <ArrowRight size={20} className="ml-2" />
                </>
              )}
            </button>

            <div className="text-gray-600">or</div>

            <div className="flex flex-col gap-3 w-full max-w-xs">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                <BsGoogle size={24} className="mr-2" />
                Sign in with Google
              </button>

              <button
                type="button"
                disabled
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-400 bg-gray-100 cursor-not-allowed"
              >
                <BsFacebook size={24} className="mr-2" />
                Sign in with Facebook (coming soon)
              </button>
            </div>
          </div>
        </form>
      </div>

      <LoginHalf />
    </section>
  );
};

export default LoginPage;
