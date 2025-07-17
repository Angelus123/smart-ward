'use client';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTheme } from 'next-themes';
import { AuthProvider } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AudioPlayer from '../components/AudioPlayer';

function About() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center space-y-4"
                >
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-500 dark:text-gray-400">Loading Hobpeg...</span>
                </motion.div>
            </div>
        );
    }

    const features = [
        {
            title: "Real-time Detection",
            description: "Instant recognition of hand gestures with low latency response",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            title: "Privacy Focused",
            description: "On-device processing ensures your data never leaves your premises",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            )
        },
        {
            title: "Customizable Gestures",
            description: "Tailor the system to recognize your unique hand movements",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a1.5 1.5 0 003 0m0-6V7m0 4.5a1.5 1.5 0 003 0v-6a1.5 1.5 0 10-3 0m6 0a1.5 1.5 0 013 0v6a1.5 1.5 0 01-3 0" />
                </svg>
            )
        },
        {
            title: "Multi-Device Control",
            description: "Simultaneously manage multiple smart devices with simple gestures",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
            )
        }
    ];

    return (
        <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <Header theme={theme as 'light' | 'dark'} setTheme={setTheme} />

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
                {/* Hero Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text ${theme === 'dark' ? 'text-transparent bg-gradient-to-r from-blue-400 to-cyan-300' : 'text-transparent bg-gradient-to-r from-blue-600 to-cyan-500'}`}>
                        ABOUT HOBPEG
                    </h1>
                    <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 mb-8"></div>
                    <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        Revolutionizing human-computer interaction through intuitive gesture control powered by cutting-edge computer vision technology.
                    </p>
                </motion.section>
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto mb-2"
                >
                    <AudioPlayer
                        audioSrc="hobpeg.mp3" // Update with your actual MP3 path
                        title="Listen to Hobpeg Overview"
                    />
                </motion.section>


                {/* Mission Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-4xl mx-auto mb-20"
                >
                    <div className={`p-8 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                        <h2 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                            Our Mission
                        </h2>
                        <p className={`text-lg leading-relaxed mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                            WIth Hobpeg, we&apos; re committed to making technology more intuitive and accessible. We believe the future of human-computer interaction should be as natural as waving to a friend.
                        </p>
                        <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                            Our system transforms how you interact with your environment, replacing complex interfaces with simple, natural gestures that anyone can use.
                        </p>
                    </div>
                </motion.section>

                {/* Features Section */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mb-20"
                >
                    <h2 className={`text-3xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                        Key Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                className={`p-6 rounded-xl transition-all duration-300 ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} shadow-md border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
                            >
                                <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-4 ${theme === 'dark' ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                                    {feature.icon}
                                </div>
                                <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                                    {feature.title}
                                </h3>
                                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Technology Stack */}
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className={`p-8 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg max-w-4xl mx-auto`}
                >
                    <h2 className={`text-3xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                        Technology Stack
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                            { name: "Raspberry Pi", logo: "🍓" },
                            { name: "TensorFlow", logo: "🤖" },
                            { name: "OpenCV", logo: "👁️" },
                            { name: "Python", logo: "🐍" },
                            { name: "React", logo: "⚛️" },
                            { name: "Next.js", logo: "🚀" }
                        ].map((tech, index) => (
                            <div key={index} className={`p-4 rounded-lg flex items-center space-x-3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                                <span className="text-2xl">{tech.logo}</span>
                                <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </motion.section>
            </main>
            <Footer theme={theme as 'light' | 'dark'} setTheme={setTheme} />
        </div>
    );
}

export default function AboutPage() {
    return (
        <AuthProvider>
            <About />
        </AuthProvider>
    );
}