import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showOtp, setShowOtp] = useState(false); // State to control OTP visibility
  const [otp, setOtp] = useState(''); // Hidden OTP field
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showOtp) {
      try {
        const result = await axios.post('/api/user/signup', {
          name: name,
          email: email,
          pass: password,
        });
        if (result.data) setShowOtp(true); // Show OTP input after successful signup
      } catch (err) {
        console.log(err.response?.data.error);
      }
    } else {
      try {
        const result = await axios.post('/api/user/signup', {
          email: email,
          otp: otp,
        });
      } catch (err) {
        console.log(err.response?.data.error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            autoComplete="name"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>
        {showOtp && (
          <div className="mb-6 flex flex-col items-center">
            <label className="block mb-1 text-gray-700" htmlFor="otp">
              OTP
            </label>
            <div className="flex space-x-2 mt-1">
              {[...Array(6)].map((_, idx) => (
                <input
                  key={idx}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className="w-10 px-2 py-2 border rounded text-center focus:outline-none focus:ring focus:border-blue-400"
                  value={otp[idx] || ''}
                  onChange={e => {
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    const otpArr = otp.split('');
                    otpArr[idx] = val;
                    setOtp(otpArr.join('').slice(0, 6));
                    if (val) {
                      const next = document.getElementById(`otp-${idx + 1}`);
                      if (next) (next as HTMLInputElement).focus();
                    }
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Backspace') {
                      const otpArr = otp.split('');
                      if (otp[idx]) {
                        otpArr[idx] = '';
                        setOtp(otpArr.join('').slice(0, 6));
                      } else if (idx > 0) {
                        const prev = document.getElementById(`otp-${idx - 1}`);
                        if (prev) (prev as HTMLInputElement).focus();
                        // Also clear previous value
                        const prevOtpArr = otp.split('');
                        prevOtpArr[idx - 1] = '';
                        setOtp(prevOtpArr.join('').slice(0, 6));
                      }
                    }
                  }}
                  id={`otp-${idx}`}
                  autoComplete="one-time-code"
                />
              ))}
            </div>
            <button
              type="button"
              className="mt-3 text-blue-600 hover:underline text-sm"
              onClick={() => {
                // Add resend OTP logic here
                // For example, call an API to resend OTP
                alert('OTP resent!');
              }}
            >
              Resend OTP
            </button>
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
        <div className="mt-4 text-center">
          <span className="text-gray-600">Already have an account? </span>
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
