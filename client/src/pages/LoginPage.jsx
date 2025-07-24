import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
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
import AuthManager from '../utils/AuthManager'; // <-- import AuthManager

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in:', userCredential.user);

      // Store user in localStorage via AuthManager
      AuthManager.login({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
      });

      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google login success:', result.user);

      // Store user in localStorage via AuthManager
      AuthManager.login({
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
      });

      navigate('/dashboard');
    } catch (err) {
      console.error('Google login error:', err);
      setError('Google login failed. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-24 xl:px-36 py-10">
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-8">
          <div className="bg-white rounded-full border-2 border-gray-300 w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-gray-100">
            <Button />
          </div>
          <div className="text-sm">
            Don&apos;t have an account?{' '}
            <NavLink to="/" className="font-bold text-purple-600 hover:underline">
              Sign Up
            </NavLink>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">Log In</h1>

        {/* Login Form */}
        <form className="flex flex-col gap-6" onSubmit={handleEmailLogin}>
          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email"
              className="p-3 pl-10 w-full border-b border-gray-400 focus:outline-none focus:border-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="p-3 pl-10 w-full border-b border-gray-400 focus:outline-none focus:border-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {showPassword ? (
              <EyeOff
                className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                size={20}
                onClick={togglePasswordVisibility}
              />
            ) : (
              <Eye
                className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                size={20}
                onClick={togglePasswordVisibility}
              />
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="px-3 py-2 rounded-md bg-red-100 text-red-700 font-medium text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 text-white p-3 w-full rounded-md flex items-center justify-center disabled:opacity-50"
          >
            {loading ? 'Logging in...' : (
              <>
                Log In <ArrowRight size={20} className="ml-2" />
              </>
            )}
          </button>

          {/* Forgot Password */}
          <a href="#" className="text-sm text-purple-500 hover:underline">
            Forgot Password?
          </a>

          {/* OR Divider */}
          <div className="flex items-center my-3">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-4 text-gray-500 font-medium">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Social Login Buttons */}
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <BsGoogle size={20} className="mr-2" />
              Sign in with Google
            </button>

            <button
              type="button"
              disabled
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-400 bg-gray-100 cursor-not-allowed"
            >
              <BsFacebook size={20} className="mr-2" />
              Sign in with Facebook (coming soon)
            </button>
          </div>
        </form>
      </div>

      {/* Right Side - Design */}
      <div className="hidden md:block">
        <LoginHalf />
      </div>
    </section>
  );
};

export default LoginPage;
