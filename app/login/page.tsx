'use client';

import { useState } from 'react';
import Link from "next/link";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAutoDismiss } from '../hook/useAutoDismiss';
import { useTheme } from 'next-themes';
import { AuthProvider } from '../context/AuthContext';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [showPassword] = useState(false);
  const { theme, setTheme } = useTheme();
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

  const themeStyles = {
    bgColor: theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-[#e6f0fa] via-[#f8fbff] to-white',
    textColor: theme === 'dark' ? 'text-white' : 'text-gray-800',
    secondaryBg: theme === 'dark' ? 'bg-gray-800' : 'bg-white',
    borderColor: theme === 'dark' ? 'border-gray-700' : 'border-gray-200',
    cardBg: theme === 'dark' ? 'bg-gray-800' : 'bg-white',
    inputBg: theme === 'dark' ? 'bg-gray-700' : 'bg-[#fafbff]',
    errorBg: theme === 'dark' ? 'bg-red-400/20' : 'bg-red-50',
    errorBorder: theme === 'dark' ? 'border-red-700/20' : 'border-red-200',
    errorText: theme === 'dark' ? 'text-white' : 'text-red-700',
    inputBorder: theme === 'dark' ? 'border-gray-600' : 'border-[#e5f0ff]',
    welcomeBg: theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-[#005bbb] to-[#003366]',
    buttonBg: theme === 'dark' ? 'bg-gradient-to-r from-blue-700 to-blue-800' : 'bg-gradient-to-r from-[#005bbb] to-[#0066cc]',
    linkColor: theme === 'dark' ? 'text-blue-400' : 'text-[#005bbb]',
    mutedText: theme === 'dark' ? 'text-gray-400' : 'text-gray-500',
  };

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;
    const newErrors = { email: '', password: '' };

    if (!email || !validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
      hasError = true;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (!response.ok) {
          handleError(response.status, data.error || 'An error occurred during login');
          console.error('Login error:', data.error);
          throw new Error(`Login failed: ${response.statusText}`);
        }

        if (response.ok) {
          await Promise.all([
            localStorage.setItem("user", JSON.stringify(data.user)),
            localStorage.setItem("token", data.token)
          ]);

          // Verify storage
          const storedUser = localStorage.getItem("user");
          const storedToken = localStorage.getItem("token");

          if (!storedToken || !storedUser) {
            throw new Error('Failed to persist authentication data');
          }
          window.location.href = data.dashboard || '/dashboard';
        }

        if (!response.ok) {
          const data = await response.json();
          setErrors({
            ...newErrors,
            email: data?.error?.includes('email') ? data.error : '',
            password: data?.error?.includes('password') ? data.error : '',
          });
        }
      } catch (error) {
        console.error('Error during login:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={`min-h-screen ${themeStyles.bgColor} items-center justify-center p-4`}>
      <Header theme={theme as 'light' | 'dark'} setTheme={setTheme} />

      <main className="flex-grow flex items-center justify-center p-4 mt-12">
        <div className={`w-full max-w-6xl rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden min-h-[600px] ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Left Panel - Welcome Section */}
          <div className={`welcome-section hidden md:flex bg-gradient-to-br from-blue-600 to-blue-800 text-white p-12 flex flex-col justify-center relative ${theme === 'dark' ? 'from-blue-800 to-blue-900' : ''}`}>
            <div className="z-10">
              <div className="w-20 h-20 bg-white/10 backdrop-blur border border-white/20 rounded-xl flex items-center justify-center shadow mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path>
                </svg>
              </div>
              <h1 className="text-3xl font-bold mb-2">Hobpeg</h1>
              <p className="text-lg font-medium mb-4">Welcome back to Hobpeg</p>
              <p className="opacity-90 mb-6">
                Sign in to experience the future of intuitive gesture control powered by cutting-edge computer vision technology.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mt-0.5 flex-shrink-0">
                    <path d="M9 12l2 2l4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <div>
                    <h3 className="font-medium">Natural Interaction</h3>
                    <p className="opacity-80 text-sm">Control your devices with simple gestures</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mt-0.5 flex-shrink-0">
                    <path d="M9 12l2 2l4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <div>
                    <h3 className="font-medium">Computer Vision</h3>
                    <p className="opacity-80 text-sm">Advanced technology that understands your movements</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mt-0.5 flex-shrink-0">
                    <path d="M9 12l2 2l4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <div>
                    <h3 className="font-medium">Seamless Integration</h3>
                    <p className="opacity-80 text-sm">Works with your existing devices and applications</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Login Form */}
          <div className={`p-12 flex flex-col justify-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="text-center mb-10">
              <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-blue-800'}`}>Sign In</h2>
              <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Enter your credentials to access your account
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email Address
                </label>
                <input
                  type="email"
                  className={`mt-2 w-full px-4 py-3 rounded-xl ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 border-gray-200'} border-2 ${errors.email ? 'border-red-500' : ''} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Password
                </label>
                <div className="relative mt-2">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={`w-full px-4 py-3 rounded-xl ${themeStyles.inputBg} border-2 ${errors.password ? 'border-red-500' : themeStyles.inputBorder} focus:outline-none focus:ring-2 focus:ring-[#005bbb]`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
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
                    {
                      error.code === 409 ? 'Registration Issue' :
                        error.code === 401 ? 'Verification Failed' :
                          error.code === 400 ? 'Invalid OTP' :
                            error.code === 429 ? 'Too Many Attempts' :
                              error.code === 404 ? 'No user exists' :
                                'Something went wrong'}
                  </strong>
                  <span>{error.message}</span>
                </div>
              )}


              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Signing in...' : 'Sign In to Hobpeg'}
              </button>

              <Link
                href="/forgotPassword"
                className={`block text-center text-sm ${theme === 'dark' ? 'text-blue-300 hover:text-blue-200' : 'text-blue-600 hover:text-blue-800'}`}
              >
                Forgot your password?
              </Link>

              <div className={`text-sm text-center p-4 rounded-xl mt-6 ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} border-2`}>
                Don&apos;t have an account?{' '}
                <Link
                  href="/signup"
                  className={`font-medium ${theme === 'dark' ? 'text-blue-300 hover:underline' : 'text-blue-600 hover:underline'}`}
                >
                  Create your account
                </Link>
              </div>
            </form>
          </div>
        </div>

      </main>

      <Footer theme={theme as 'light' | 'dark'} setTheme={setTheme} />
    </div>
  );
}

export default function LoginPage() {
  return (
    <AuthProvider>
        <Login />
    </AuthProvider>
  );
}