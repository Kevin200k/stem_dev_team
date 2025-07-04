import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff, Clock } from 'lucide-react';
import { BsGoogle, BsFacebook } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider, facebookProvider } from '../firebase';
import SignupHalf from '../components/SignupHalf';
import Button from '../components/Button';
import VerifyEmailModal from '../components/VerifyEmailModal';

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
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setSendingCode(false);
      setTimer(60);
    }
    return () => clearInterval(interval);
  }, [sendingCode, timer]);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       user.reload().then(() => {
  //         if (user.emailVerified) {
  //           console.log('Email verified!');
  //         } else {
  //           console.log('Email not yet verified');
  //         }
  //       });
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
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

      alert('Google signup successful!');
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

      alert('Facebook signup successful!');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="h-screen grid grid-cols-2 relative">
      <div className={`flex-1 pt-10 pl-48 pr-48 transition-all duration-300 ${showVerificationModal ? 'blur-sm pointer-events-none' : ''}`}>
        <div className='flex justify-between p-2'>
          <div className='bg-white rounded-full border-2 border-gray-300 w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-gray-100'>
            <Button />
          </div>
          <div>
            Already a member? <span onClick={() => navigate('/login')} className='text-purple-600 cursor-pointer hover:underline'>Sign in</span>
          </div>
        </div>

        <div className='mt-10'>
          <h1 className='text-4xl font-bold'>Sign Up</h1>
          {sendingCode && (
            <div className="flex items-center gap-2 text-purple-700 font-medium mt-2">
              <Clock size={18} /> Sending verification... {timer}s
            </div>
          )}
        </div>

        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type='text'
              placeholder='Full Name'
              className="p-3 pl-10 w-full border-b border-gray-400 focus:outline-none focus:border-purple-500"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
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
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
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

          {error && (
            <div className='px-3 py-2 rounded-md bg-red-200'>
              <p className="text-red-600 text-sm font-semibold">{error}</p>
            </div>
          )}

          <div className='flex justify-between items-center mt-4'>
            <button
              type="submit"
              className="bg-purple-500 text-white p-3 w-36 rounded-md disabled:opacity-50 cursor-pointer"
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
            <span className="text-gray-600 mx-2">or</span>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleGoogleSignup}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <BsGoogle size={24} className="mr-2" />
                Sign up with Google
              </button>
              <button
                type="button"
                onClick={handleFacebookSignup}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <BsFacebook size={24} className="mr-2" />
                Sign up with Facebook
              </button>
            </div>
          </div>
        </form>
      </div>

      <SignupHalf />

      {showVerificationModal && (
        <section className='fixed inset-0 bg-black/40 backdrop-blur-sm z-50'>
          <div className='fixed inset-0 z-50 flex items-center justify-center'>
            <VerifyEmailModal onClose={() => setShowVerificationModal(false)} />
          </div>
        </section>
      )}

    </section>
  );
};

export default SignupPage;
