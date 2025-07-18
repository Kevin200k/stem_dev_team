import React from 'react';
import image2 from '../assets/icon/image2.png'; 
import { X } from 'lucide-react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const VerifyEmailModal = ({ onClose }) => {

  const navigate = useNavigate()

  const handleRefresh = async () => {
    const user = auth.currentUser;
    if (user) {
      await user.reload();
      if (user.emailVerified) {
        alert('Email verified!');
        onClose();
        navigate('/dashboard');
      } else {
        alert('Email not verified yet.');
      }
    }
  };

  const handleResendEmail = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await user.sendEmailVerification();
        alert('Verification email resent.');
      } catch (error) {
        alert('Error sending verification email: ' + error.message);
      }
    }
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-xl max-w-md w-full'>
      <div className="flex items-center justify-between mb-4">
        <img src={image2} alt="Logo" className="w-28" />
        <button onClick={onClose} className="text-white hover:text-gray-300 transition-colors">
          <X size={24} color='black' />
        </button>
      </div>

      <p className="text-black text-center mb-4">
        A verification email has been sent to your address. Please verify your email to continue.
      </p>

      <button
        onClick={handleRefresh}
        className="mt-4 w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition mb-2"
      >
        I've Verified My Email
      </button>

      <button
        onClick={handleResendEmail}
        className="w-full text-sm text-purple-600 hover:underline mt-2"
      >
        Resend Verification Email
      </button>
    </div>
  );
};

export default VerifyEmailModal;
