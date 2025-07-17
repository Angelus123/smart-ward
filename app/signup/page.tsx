'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/navigation';
import { useAutoDismiss } from '../hook/useAutoDismiss';
import { useTheme } from 'next-themes';
import { AuthProvider } from '../context/AuthContext';

 function Signup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [errors, setErrors] = useState({ fullName: '', email: '', password: '' });
  const [error, setError] = useState<{
    message: string;
    code: number | null;
    visible: boolean;
  }>({
    message: '',
    code: null,
    visible: false
  });

  // Enhanced error handler
  const handleError = (errorCode: number, customMessage?: string) => {
    const messages = {
      409: 'This email is already registered',
      401: 'Invalid OTP code. Please try again.',
      500: 'Server error. Please try again later.',
      default: 'An unexpected error occurred'
    };

    setError({
      message: customMessage || messages[errorCode as keyof typeof messages] || messages.default,
      code: errorCode,
      visible: true
    });
  };

  useAutoDismiss(error.visible, (visible) =>
    setError(prev => ({ ...prev, visible }))
  );

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    if (id === 'password') {
      evaluatePasswordStrength(value);
    }
  };
  // Handle logo click to redirect otpverify
  const handleOtpVerifyClick = () => {
    router.push(`/otpverify?email=${encodeURIComponent(formData.email)}`);
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const evaluatePasswordStrength = (password: string) => {
    let strength = 'Weak';
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})");
    const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

    if (strongRegex.test(password)) {
      strength = 'Strong';
    } else if (mediumRegex.test(password)) {
      strength = 'Medium';
    }

    setPasswordStrength(strength);
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 'Strong':
        return theme === 'dark' ? 'bg-green-600 w-11/12' : 'bg-green-500 w-11/12';
      case 'Medium':
        return theme === 'dark' ? 'bg-yellow-500 w-2/3' : 'bg-yellow-400 w-2/3';
      default:
        return theme === 'dark' ? 'bg-red-600 w-1/3' : 'bg-red-500 w-1/3';
    }
  };

  // Theme-based styling
  const themeStyles = {
    bgColor: theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-[#f0f4f8] to-[#e2e8f0]',
    textColor: theme === 'dark' ? 'text-white' : 'text-gray-800',
    secondaryTextColor: theme === 'dark' ? 'text-gray-300' : 'text-gray-500',
    cardBg: theme === 'dark' ? 'bg-gray-800' : 'bg-white',
    welcomeBg: theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-[#005bbb] to-[#003366]',
    inputBg: theme === 'dark' ? 'bg-gray-700' : 'bg-white',
    inputBorder: theme === 'dark' ? 'border-gray-600' : 'border-gray-300',
    buttonBg: theme === 'dark' ? 'bg-gradient-to-r from-blue-700 to-blue-800' : 'bg-gradient-to-r from-[#005bbb] to-[#0066cc]',
    successBg: theme === 'dark' ? 'bg-green-900' : 'bg-green-50',
    successBorder: theme === 'dark' ? 'border-green-700' : 'border-green-200',
    successText: theme === 'dark' ? 'text-green-300' : 'text-green-700',
    errorBg: theme === 'dark' ? 'bg-red-400/20' : 'bg-red-50',
    errorBorder: theme === 'dark' ? 'border-red-700/20' : 'border-red-200',
    errorText: theme === 'dark' ? 'text-white' : 'text-red-700',
    infoBg: theme === 'dark' ? 'bg-blue-900' : 'bg-blue-50',
    infoBorder: theme === 'dark' ? 'border-blue-700' : 'border-blue-200',
    infoText: theme === 'dark' ? 'text-blue-300' : 'text-blue-700',
    welcomeText: theme === 'dark' ? 'text-blue-200' : 'text-blue-100',
    welcomeSecondaryText: theme === 'dark' ? 'text-blue-300' : 'text-blue-200',
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword } = formData;

    // Validation
    if (!fullName || !validateEmail(email) || password.length < 8 || password !== confirmPassword) {
      console.error('Validation failed:', { fullName, email, password, confirmPassword });
      setErrors({
        fullName: !fullName ? 'Full Name is required' : '',
        email: !validateEmail(email) ? 'Invalid email address' : '',
        password: password.length < 8 ? 'Password must be at least 8 characters' : (password !== confirmPassword ? 'Passwords do not match' : '')
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch( `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fullName,
          email,
          password
        }),
      });


      const data = await response.json();

      if (!response.ok) {
        handleError(response.status, data.error || 'An error occurred during signup');

        console.error('Signup error:', data.error);
        throw new Error(`Signup failed: ${response.statusText}`);
      }

      console.log('Signup successful:', data);
      // Redirect to OTP verification page
      handleOtpVerifyClick();

      setSuccess(true);
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(false), 3000);
    }
  };
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className={`animate-pulse ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen mt-12 flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-blue-50 via-gray-50 to-white text-gray-800'}`}>
      <Header theme={theme as 'light' | 'dark'} setTheme={setTheme} />

      <main className="flex-grow flex items-center justify-center p-4">


        <div className={`w-full max-w-6xl rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden min-h-[600px] ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Left Panel - Welcome Section */}
          <div className={`welcome-section bg-gradient-to-br from-blue-600 to-blue-800 text-white p-2 flex flex-col justify-center relative hidden md:block ${theme === 'dark' ? 'from-blue-800 to-blue-900' : ''}`}>
            <div className="mb-10">
              <div className="bg-white/10 p-4 rounded-xl w-fit mb-4 md:block">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path>
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">Hobpeg</h1>
                <p className="opacity-80">Revolutionizing human-computer interaction through intuitive gesture control powered by cutting-edge computer vision technology.</p>
              </div>
            </div>
            <ul className="space-y-4 text-sm opacity-90 features">
              <li className="flex items-start gap-3 feature">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mt-0.5 flex-shrink-0">
                  <path d="M9 12l2 2l4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
                <div>
                  <h3 className="font-bold">Natural Gesture Control</h3>
                  <p className="opacity-80 font-normal">Interact with technology as naturally as waving to a friend</p>
                </div>
              </li>
              <li className="flex items-start gap-3 feature">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mt-0.5 flex-shrink-0">
                  <path d="M9 12l2 2l4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
                <div>
                  <h3 className="font-bold">Computer Vision Powered</h3>
                  <p className="opacity-80 font-normal">Cutting-edge technology that understands your movements</p>
                </div>
              </li>
              <li className="flex items-start gap-3 feature">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mt-0.5 flex-shrink-0">
                  <path d="M9 12l2 2l4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
                <div>
                  <h3 className="font-bold">Accessible Interface</h3>
                  <p className="opacity-80 font-normal">Designed for everyone regardless of technical ability</p>
                </div>
              </li>
              <li className="flex items-start gap-3 feature">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mt-0.5 flex-shrink-0">
                  <path d="M9 12l2 2l4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
                <div>
                  <h3 className="font-bold">Seamless Integration</h3>
                  <p className="opacity-80 font-normal">Works with your existing devices and applications</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Right Panel - Registration Form */}
          <div className={`p-12 flex flex-col justify-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <form onSubmit={handleSubmit} className="text-center mb-10">
              <div className="text-center">
                <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-blue-800'}`}>Join Hobpeg</h2>
                <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Be part of the gesture control revolution</p>

              </div>

              <div className="text-left">
                <label className={`block text-sm font-medium mt-3 mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Full Name</label>
                <input
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 border-gray-200'} border-2 ${errors.fullName ? 'border-red-500' : ''} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter Your Full Name"
                />
              </div>

              <div className="text-left">
                <label className={`block text-sm font-medium mt-3 mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 border-gray-200'} border-2 ${errors.email ? 'border-red-500' : ''} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Enter Your Email"
                />
              </div>

              <div className="text-left">
                <label className={`block text-sm font-medium mt-3 mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 border-gray-200'} border-2 ${errors.password ? 'border-red-500' : ''} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`mt-2 text-xs ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}
                >
                  {showPassword ? 'Hide password' : 'Show password'}
                </button>

                {formData.password && (
                  <>
                    <div className={`h-2 w-full mt-2 rounded ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}>
                      <div className={`h-full rounded transition-all duration-300 ${getStrengthColor()}`}></div>
                    </div>
                    <p className={`mt-1 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {passwordStrength === 'Strong' ? 'Great password' : passwordStrength === 'Medium' ? 'Good password' : 'Weak password'}
                    </p>
                  </>
                )}
              </div>

              <div className="text-left">
                <label className={`block text-sm font-medium mt-3 mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Confirm Password</label>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 border-gray-200'} border-2 ${errors.password ? 'border-red-500' : ''} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`mt-2 text-xs ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}
                >
                  {showConfirmPassword ? 'Hide password' : 'Show password'}
                </button>
              </div>
              {error.visible && (
                <div className={`
                                ${themeStyles.errorBg} 
                                border-2 ${themeStyles.errorBorder} 
                                ${themeStyles.errorText} 
                                p-4 rounded-lg mb-5 text-center relative
                                animate-fade-in transition-all duration-300
                                ${error.visible ? 'opacity-100' : 'opacity-0'}
                              `}>
                  <button
                    onClick={() => setError(prev => ({ ...prev, visible: false }))}
                    className="absolute top-1 right-2 text-lg hover:opacity-70 cursor-pointer"
                    aria-label="Close notification"
                  >
                    &times;
                  </button>

                  <strong className="block mb-1">
                    {error.code === 409 ? 'Registration Issue' :
                      error.code === 401 ? 'Verification Failed' :
                        'Error'}
                  </strong>
                  <span>{error.message}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`bg-gradient-to-r from-blue-600 to-blue-700 cursor-pointer text-white py-3 rounded-lg font-semibold w-full shadow-lg mt-5 hover:opacity-90 transition-opacity ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Creating Account...' : 'Join Hobpeg'}
              </button>

              <div className={`mt-4 p-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} border-2`}>
                <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                  Already have an account? <Link href="/login" className={`${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'} font-medium hover:underline`}>Sign in here</Link>
                </p>
              </div>

              {success && (
                <div className={`mt-4 p-3 rounded-md text-sm text-center ${theme === 'dark' ? 'bg-green-900 text-green-200 border-green-700' : 'bg-green-100 text-green-700 border-green-300'} border`}>
                  ✅ Welcome to Hobpeg! Redirecting...
                </div>
              )}
            </form>
          </div>
        </div>
      </main>

      <Footer theme={theme as 'light' | 'dark'} setTheme={setTheme} />
    </div>
  );
}

export default function SignupPage() {
  return (
    <AuthProvider>
      {/* <ProtectedRoute> */}
        <Signup />
      {/* </ProtectedRoute> */}
    </AuthProvider>
  );
}