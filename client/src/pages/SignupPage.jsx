import React, { useState, useEffect } from 'react';
import {
  ArrowLeft, User, Mail, Lock, Eye, EyeOff, Clock
} from 'lucide-react';
import { BsGoogle, BsFacebook } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider, facebookProvider } from '../firebase';
import SignupHalf from '../components/SignupHalf';
import Button from '../components/Button';
import VerifyEmailModal from '../components/VerifyEmailModal';
import AuthManager from '../utils/AuthManager'; // <-- import AuthManager


const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [timer, setTimer] = useState(60);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (sendingCode && timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    } else if (timer === 0) {
      setSendingCode(false);
      setTimer(60);
    }
    return () => clearInterval(interval);
  }, [sendingCode, timer]);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        username,
        email: user.email,
        createdAt: new Date(),
        provider: 'email',
      });

      // Save user info in localStorage
      AuthManager.login({
        userId: user.uid,
        email: user.email,
        username,
      });

      await sendEmailVerification(user);
      setSendingCode(true);
      setVerificationEmail(user.email);
      setShowVerificationModal(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        username: user.displayName,
        email: user.email,
        createdAt: new Date(),
        provider: 'google',
      }, { merge: true });

      AuthManager.login({
        userId: user.uid,
        email: user.email,
        username: user.displayName || '',
      });

      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFacebookSignup = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        username: user.displayName,
        email: user.email,
        createdAt: new Date(),
        provider: 'facebook',
      }, { merge: true });

      AuthManager.login({
        userId: user.uid,
        email: user.email,
        username: user.displayName || '',
      });

      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="h-screen grid grid-cols-1 md:grid-cols-2 relative">
      {/* Left Side */}
      <div className={`pt-10 px-6 md:px-16 lg:px-32 transition-all duration-300 ${showVerificationModal ? 'blur-sm pointer-events-none' : ''}`}>
        {/* Top Row */}
        <div className="flex justify-between p-2">
          <div className="bg-white rounded-full border-2 border-gray-300 w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-gray-100">
            <Button />
          </div>
          <div>
            Already a member?{' '}
            <span onClick={() => navigate('/login')} className="text-purple-600 cursor-pointer hover:underline">Sign in</span>
          </div>
        </div>

        {/* Heading */}
        <div className="mt-10">
          <h1 className="text-4xl font-bold">Sign Up</h1>
          {sendingCode && (
            <div className="flex items-center gap-2 text-purple-700 font-medium mt-2">
              <Clock size={18} /> Sending verification... {timer}s
            </div>
          )}
        </div>

        {/* Signup Form */}
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
          {/* Username */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Full Name"
              className="p-3 pl-10 w-full border-b border-gray-400 focus:outline-none focus:border-purple-500"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email"
              className="p-3 pl-10 w-full border-b border-gray-400 focus:outline-none focus:border-purple-500"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="p-3 pl-10 w-full border-b border-gray-400 focus:outline-none focus:border-purple-500"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            {showPassword ? (
              <EyeOff className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" size={20} onClick={togglePasswordVisibility} />
            ) : (
              <Eye className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" size={20} onClick={togglePasswordVisibility} />
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="px-3 py-2 rounded-md bg-red-200">
              <p className="text-red-600 text-sm font-semibold">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-purple-600 text-white p-3 w-full rounded-md disabled:opacity-50 cursor-pointer mt-2"
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-4 text-gray-500 font-medium">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Social Signups */}
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleGoogleSignup}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <BsGoogle size={20} className="mr-2" />
              Sign up with Google
            </button>
            <button
              type="button"
              onClick={handleFacebookSignup}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <BsFacebook size={20} className="mr-2" />
              Sign up with Facebook
            </button>
          </div>
        </form>
      </div>

      {/* Right Side Image */}
      <div className="hidden md:block">
        <SignupHalf />
      </div>

      {/* Modal */}
      {showVerificationModal && (
        <section className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50">
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <VerifyEmailModal onClose={() => setShowVerificationModal(false)} />
          </div>
        </section>
      )}
    </section>
  );
};

export default SignupPage;
