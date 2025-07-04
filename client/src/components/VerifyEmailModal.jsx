// Import required dependencies
import React, { useState, useRef } from 'react';
import image2 from '../assets/icon/image2.png'; 
import { X } from 'lucide-react'; 

const VerifyEmailModal = ({ onClose }) => {
  const [otp, setOtp] = useState(['', '', '', '']);

  const inputsRef = useRef([]);

  // When a user types into an input
  const handleChange = (e, index) => {
    const value = e.target.value;

    // Only allow digits (0-9) or empty
    if (!/^[0-9]?$/.test(value)) return;

    // Update the corresponding digit in OTP state
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically focus the next input if not the last and a digit is entered
    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  // When user presses a key (like Backspace)
  const handleKeyDown = (e, index) => {
    // If Backspace is pressed on an empty field, go back to the previous field
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputsRef.current[index - 1].focus(); // Move cursor back
    }
  };


  return (
    <div className='bg-white p-6 rounded-lg shadow-xl max-w-md w-full'>
      <div className="flex items-center justify-between mb-4">
        <img src={image2} alt="Logo" className="w-28" />
        {/* Close button */}
        <button onClick={onClose} className="text-white hover:text-gray-300 transition-colors">
          <X size={24} color='black' />
        </button>
      </div>

      <p className="text-black text-center mb-4">
        Please check your email and enter the 4-digit code to verify your account.
      </p>

      <div className="flex gap-4 justify-center mt-4 mb-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength="1"
            value={digit}
            ref={(el) => (inputsRef.current[index] = el)} 
            onChange={(e) => handleChange(e, index)} 
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-12 h-12 text-center border border-gray-300 rounded-md text-xl focus:outline-none focus:border-purple-500"
          />
        ))}
      </div>

      {/* Submit/Verify button */}
      <button
        className="mt-4 w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition mb-5"
        onClick={() => alert(`Entered OTP: ${otp.join('')}`)} // You can replace alert with real verification logic
      >
        Verify
      </button>

      <div className='flex flex-col justify-center align-items'>
        <p className='text-[13px] '>Are you facing any problems receiving the code?</p>
        <span className='font-bold text-[13px] cursor-pointer'>Resend Code</span>
      </div>
    </div>
  );
};

export default VerifyEmailModal;
