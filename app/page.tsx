'use client'
import Head from 'next/head';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import Footer from './components/Footer';
import { useTheme } from 'next-themes';
import { AuthProvider } from './context/AuthContext';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiSend
} from 'react-icons/fi';
import HeroWithVideo from './components/HeroWithVideo';

function Home() {
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
        <title>Hobpeg - Gesture Control Revolution</title>
        <meta name="description" content="Transform your environment with intuitive gesture control powered by computer vision." />
        <meta name="keywords" content="gesture control, computer vision, smart home, automation, Raspberry Pi" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Header theme={theme as 'light' | 'dark'} setTheme={setTheme} />

      {/* Hero Section */}
      <section
        className="pt-15 relative overflow-hidden"
        style={{
          backgroundColor: isDark ? '#0a1f44' : '#f8fafd',
          backgroundImage: isDark
            ? 'radial-gradient(circle at 20% 30%, rgba(42, 90, 156, 0.3) 0%, transparent 20%), radial-gradient(circle at 80% 70%, rgba(74, 154, 249, 0.4) 0%, transparent 20%)'
            : 'radial-gradient(circle at 20% 30%, rgba(74, 154, 249, 0.05) 0%, transparent 20%), radial-gradient(circle at 80% 70%, rgba(42, 90, 156, 0.07) 0%, transparent 20%)',
        }}
      >
        <HeroWithVideo />
        <div className="max-w-7xl mx-auto px-10 sm:px-6 lg:px-12 relative z-10">

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
              Get started with Hobpeg in just three easy steps
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
                <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Hobpeg Gesture Control Demo</p>
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
                quote: "Hobpeg has completely transformed how I interact with my smart home. No more fumbling for phones or remotes!",
                name: 'Sarah K.',
                role: 'Smart Home Enthusiast'
              },
              {
                quote: "As a developer, I appreciate how easy it was to integrate Hobpeg with my existing IoT setup. The API is well-documented and powerful.",
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
            Order your Hobpeg kit today and experience the future of gesture control
          </p>
          <Link href="/buy">
            <div className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition shadow-lg">
              Get Started
            </div>
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r ${isDark ? 'from-blue-300 to-blue-500' : 'from-blue-600 to-blue-800'} bg-clip-text text-transparent`}>
              Get in Touch
            </h2>
            <p className={`text-lg md:text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              Whether you have questions or just want to say hello, our team is ready to assist you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              {[
                {
                  icon: <FiPhone className="text-xl" />,
                  title: 'Phone Support',
                  content: '(+250) 785182823',
                  subtitle: 'Available 24/7 for urgent matters'
                },
                {
                  icon: <FiMail className="text-xl" />,
                  title: 'Email Us',
                  content: 'smartward123@gmail.com',
                  subtitle: 'Typically respond within 24 hours'
                },
                {
                  icon: <FiMapPin className="text-xl" />,
                  title: 'Visit Us',
                  content: 'KN 123 St, Remera, Kigali, Rwanda',
                  subtitle: 'KG 12345 | Schedule an appointment first'
                },
                {
                  icon: <FiClock className="text-xl" />,
                  title: 'Working Hours',
                  content: 'Monday-Friday: 9AM-6PM',
                  subtitle: 'Saturday: 10AM-2PM'
                },
              ].map((info, index) => (
                <div key={index} className="flex gap-5 items-start">
                  <div className={`w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center text-2xl ${isDark ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-600'}`}>
                    {info.icon}
                  </div>
                  <div>
                    <h3 className={`text-xl font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>{info.title}</h3>
                    <p className={`font-medium ${isDark ? 'text-blue-300' : 'text-blue-600'} mb-1`}>{info.content}</p>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{info.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className={`p-8 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white shadow-lg'}`}>
              <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>Send us a message</h3>
              <form onSubmit={handleContactSubmit(onContactSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-700 text-white focus:border-blue-500' : 'border-gray-300 bg-white text-gray-800 focus:border-blue-500'} focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition`}
                      {...registerContact('name', { required: 'Name is required' })}
                    />
                    {contactErrors.name && <p className="mt-1 text-sm text-red-500">{contactErrors.name.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-700 text-white focus:border-blue-500' : 'border-gray-300 bg-white text-gray-800 focus:border-blue-500'} focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition`}
                      {...registerContact('email', {
                        required: 'Email is required',
                        pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
                      })}
                    />
                    {contactErrors.email && <p className="mt-1 text-sm text-red-500">{contactErrors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="How can we help?"
                    className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-700 text-white focus:border-blue-500' : 'border-gray-300 bg-white text-gray-800 focus:border-blue-500'} focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition`}
                    {...registerContact('subject')}
                  />
                </div>

                <div>
                  <label htmlFor="message" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us more about your inquiry..."
                    className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-700 text-white focus:border-blue-500' : 'border-gray-300 bg-white text-gray-800 focus:border-blue-500'} focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition`}
                    {...registerContact('message', { required: 'Message is required' })}
                  ></textarea>
                  {contactErrors.message && <p className="mt-1 text-sm text-red-500">{contactErrors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg ${isDark ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'}`}
                >
                  Send Message
                  <FiSend className="inline ml-2" />
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


export default function HomePage() {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  );
}