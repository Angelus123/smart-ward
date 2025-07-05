'use client'
import Head from 'next/head';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useTheme } from 'next-themes';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import Footer from './components/Footer';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function Home() {
  const { register: registerContact, handleSubmit: handleContactSubmit, formState: { errors: contactErrors } } = useForm<FormData>();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onContactSubmit = (data: FormData) => {
    console.log('Contact Form:', data);
  };

  if (!mounted) {
    return <div className={`flex items-center justify-center min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>Loading...</div>;
  }

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}>
      <Head>
        <title>Smart Ward - Gesture Control Revolution</title>
        <meta name="description" content="Transform your environment with intuitive gesture control powered by computer vision." />
        <meta name="keywords" content="gesture control, computer vision, smart home, automation, Raspberry Pi" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Header theme={theme as 'light' | 'dark'} setTheme={setTheme} />

      {/* Hero Section */}
      <section
        className="pt-24 pb-24 relative overflow-hidden"
        style={{
          backgroundColor: isDark ? '#0a1f44' : '#f8fafd',
          backgroundImage: isDark
            ? 'radial-gradient(circle at 20% 30%, rgba(42, 90, 156, 0.3) 0%, transparent 20%), radial-gradient(circle at 80% 70%, rgba(74, 154, 249, 0.4) 0%, transparent 20%)'
            : 'radial-gradient(circle at 20% 30%, rgba(74, 154, 249, 0.05) 0%, transparent 20%), radial-gradient(circle at 80% 70%, rgba(42, 90, 156, 0.07) 0%, transparent 20%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-10 sm:px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="max-w-2xl text-center lg:text-left mb-12 lg:mb-0">
              <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-5 bg-gradient-to-r ${isDark ? 'from-[#93c5fd] to-[#3b82f6]' : 'from-[#0a1f44] to-[#2a5a9c]'} bg-clip-text text-transparent`}>
                Control With A Wave
              </h1>
              <p className={`text-lg mb-8 max-w-lg mx-auto lg:mx-0 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Smart Ward transforms your environment with intuitive gesture control powered by advanced computer vision technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center lg:justify-start">
                <Link href="/buy">
                  <div className="px-6 py-2 sm:px-8 sm:py-3 rounded-full font-semibold text-white hover:shadow-lg transition transform hover:-translate-y-1 text-center text-sm sm:text-base" style={{
                    background: 'linear-gradient(135deg, #4a9af9 0%, #3a7ad9 100%)',
                  }}>
                    Order Now
                  </div>
                </Link>
                <Link href="#features">
                  <div className={`px-6 py-2 sm:px-8 sm:py-3 rounded-full font-semibold border-2 ${isDark ? 'border-blue-400 hover:bg-blue-400' : 'border-blue-400 hover:bg-[linear-gradient(135deg,#4a9af9_0%,#3a7ad9_100%)]'} hover:text-white transition-all duration-300 text-sm sm:text-base`}>
                    See How It Works
                  </div>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block hero-image w-full max-w-md xl:max-w-lg">
              <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
                <path fill={isDark ? 'rgba(74, 154, 249, 0.1)' : 'rgba(74, 154, 249, 0.05)'} d="M50,150 Q150,50 250,150 T450,150 L450,350 L50,350 Z"></path>
                <circle cx="250" cy="150" r="40" fill="#3a7ad9"></circle>
                <path d="M200,200 Q250,150 300,200" stroke="#4a9af9" strokeWidth="8" fill="none" strokeLinecap="round"></path>
                <path d="M200,220 Q250,170 300,220" stroke="#4a9af9" strokeWidth="8" fill="none" strokeLinecap="round"></path>
                <path d="M200,240 Q250,190 300,240" stroke="#4a9af9" strokeWidth="8" fill="none" strokeLinecap="round"></path>
                <rect x="150" y="270" width="200" height="30" rx="5" fill="#3a7ad9"></rect>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`py-16 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className={`text-4xl font-bold mb-4 bg-gradient-to-r ${isDark ? 'from-[#93c5fd] to-[#3b82f6]' : 'from-[#0a1f44] to-[#2a5a9c]'} bg-clip-text text-transparent`}>
              Revolutionary Gesture Technology
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Experience seamless control with our advanced gesture recognition system
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '👋',
                title: 'Intuitive Gestures',
                description: 'Control devices with natural hand movements anyone can learn in seconds',
              },
              {
                icon: '⚡',
                title: 'Lightning Fast',
                description: 'Near-instant response with our optimized computer vision algorithms',
              },
              {
                icon: '🤖',
                title: 'AI-Powered',
                description: 'Adaptive learning improves recognition accuracy over time',
              },
              {
                icon: '🔌',
                title: 'Plug-and-Play',
                description: 'Easy setup with Raspberry Pi and standard cameras',
              },
              {
                icon: '🏠',
                title: 'Smart Home Ready',
                description: 'Integrates with popular smart home platforms',
              },
              {
                icon: '🔒',
                title: 'Privacy Focused',
                description: 'All processing happens locally - no cloud dependency',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`p-8 rounded-xl border ${isDark ? 'border-gray-700 hover:border-blue-400 bg-gray-700' : 'border-gray-200 hover:border-blue-400 bg-white'} shadow-sm hover:-translate-y-2 transition`}
              >
                <div className="text-4xl mb-6">{feature.icon}</div>
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>{feature.title}</h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={`py-16 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className={`text-4xl font-bold mb-4 bg-gradient-to-r ${isDark ? 'from-[#93c5fd] to-[#3b82f6]' : 'from-[#0a1f44] to-[#2a5a9c]'} bg-clip-text text-transparent`}>
              Simple Setup, Powerful Results
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Get started with Smart Ward in just three easy steps
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            {[
              {
                number: '1',
                title: 'Install Hardware',
                description: 'Connect our camera module to your Raspberry Pi',
                icon: '📷',
              },
              {
                number: '2',
                title: 'Calibrate Space',
                description: 'Teach the system your control area in minutes',
                icon: '🎯',
              },
              {
                number: '3',
                title: 'Start Gesturing',
                description: 'Control your devices with natural hand movements',
                icon: '👐',
              },
            ].map((step, index) => (
              <div key={index} className="flex-1 text-center">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl ${isDark ? 'bg-blue-900 text-white' : 'bg-blue-100 text-blue-600'}`}>
                  {step.icon}
                </div>
                <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>{step.title}</h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Video */}
      <section className={`py-16 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className={`text-4xl font-bold mb-8 bg-gradient-to-r ${isDark ? 'from-[#93c5fd] to-[#3b82f6]' : 'from-[#0a1f44] to-[#2a5a9c]'} bg-clip-text text-transparent`}>
            See It In Action
          </h2>
          <div className={`aspect-w-16 aspect-h-9 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-xl overflow-hidden shadow-lg`}>
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-5xl mb-4">▶️</div>
                <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Smart Ward Gesture Control Demo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`py-16 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className={`text-4xl font-bold mb-4 bg-gradient-to-r ${isDark ? 'from-[#93c5fd] to-[#3b82f6]' : 'from-[#0a1f44] to-[#2a5a9c]'} bg-clip-text text-transparent`}>
              What Our Users Say
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Don&apos;t just take our word for it
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Smart Ward has completely transformed how I interact with my smart home. No more fumbling for phones or remotes!",
                name: 'Sarah K.',
                role: 'Smart Home Enthusiast'
              },
              {
                quote: "As a developer, I appreciate how easy it was to integrate Smart Ward with my existing IoT setup. The API is well-documented and powerful.",
                name: 'David M.',
                role: 'IoT Developer'
              },
              {
                quote: "The gesture recognition is so accurate and responsive. It feels like magic controlling my lights and music with just a wave.",
                name: 'James L.',
                role: 'Tech Reviewer'
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className={`p-8 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
              >
                <blockquote className={`italic mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  &quot;{testimonial.quote}&quot;
                </blockquote>
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${isDark ? 'bg-blue-900 text-white' : 'bg-blue-100 text-blue-600'}`}>
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{testimonial.name}</h4>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16"
        style={{
          background: 'linear-gradient(135deg, #4a9af9 0%, #3a7ad9 100%)',
        }}
      >
        <div className="max-w-4xl mx-auto px-5 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Space?</h2>
          <p className="text-white/80 mb-8 text-lg">
            Order your Smart Ward kit today and experience the future of gesture control
          </p>
          <Link href="/buy">
            <div className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition shadow-lg">
              Get Started
            </div>
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section className={`py-16 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className={`text-4xl font-bold mb-4 bg-gradient-to-r ${isDark ? 'from-[#93c5fd] to-[#3b82f6]' : 'from-[#0a1f44] to-[#2a5a9c]'} bg-clip-text text-transparent`}>
              Have Questions?
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Our team is ready to help you with any inquiries
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              {[
                {
                  icon: '📞',
                  title: 'Phone',
                  content: <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>+1 (555) 123-4567</p>,
                },
                {
                  icon: '✉️',
                  title: 'Email',
                  content: <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>support@smartward.com</p>,
                },
                {
                  icon: '📍',
                  title: 'Office',
                  content: (
                    <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                      123 Tech Street<br />
                      San Francisco, CA 94107
                    </p>
                  ),
                },
                {
                  icon: '🕒',
                  title: 'Working Hours',
                  content: (
                    <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                      Monday - Friday: 9AM - 6PM<br />
                      Saturday: 10AM - 2PM
                    </p>
                  ),
                },
              ].map((info, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center text-xl ${isDark ? 'bg-blue-900 text-white' : 'bg-blue-100 text-blue-600'}`}>
                    {info.icon}
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>{info.title}</h3>
                    {info.content}
                  </div>
                </div>
              ))}
            </div>
            <div>
              <form onSubmit={handleContactSubmit(onContactSubmit)} className="space-y-5">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-800'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    {...registerContact('name', { required: 'Name is required' })}
                  />
                  {contactErrors.name && <span className="text-red-500 text-sm">{contactErrors.name.message}</span>}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-800'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    {...registerContact('email', {
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
                    })}
                  />
                  {contactErrors.email && <span className="text-red-500 text-sm">{contactErrors.email.message}</span>}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Subject"
                    className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-800'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    {...registerContact('subject')}
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-800'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    {...registerContact('message', { required: 'Message is required' })}
                  ></textarea>
                  {contactErrors.message && <span className="text-red-500 text-sm">{contactErrors.message.message}</span>}
                </div>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-full font-semibold text-white hover:shadow-lg transition"
                  style={{
                    background: 'linear-gradient(135deg, #4a9af9 0%, #3a7ad9 100%)',
                  }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer theme={theme as 'light' | 'dark'} setTheme={setTheme} />
    </div>
  );
}