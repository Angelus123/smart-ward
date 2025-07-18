// components/HeroWithVideo.tsx
'use client';

import { useRef } from 'react';
// import AudioPlayer from './AudioPlayer';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export default function HeroWithVideo() {
    const { theme } = useTheme();
    const videoRef = useRef<HTMLVideoElement>(null);
    const isDark = theme === 'dark';
    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Muted video background */}
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full h-full object-cover"
            >
                <source src="hobpeg.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Dark overlay for better text contrast */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Content */}
            <div className="relative z-10 h-[85%] flex flex-col justify-center items-center text-center px-4">

                {/* Audio player positioned at the bottom */}

                <div className="flex flex-col w-full lg:flex-row items-center justify-between">
                    <div className={`max-w-full text-center lg:text-left mb-12 lg:mb-0  p-6 rounded-lg shadow-lg backdrop-blur-md`}>
                        <h1 className={`text-4xl font-bold mb-4 bg-gradient-to-r ${isDark ? 'from-[#93c5fd] to-[#3b82f6]' : 'from-[#93c5fd] to-[#3b82f6]'} bg-clip-text text-transparent`}>
                            Control With A Wave
                        </h1>
                        <p className={`text-lg mb-8 max-w-lg mx-auto lg:mx-0 ${isDark ? 'text-gray-300' : 'text-gray-300'}`}>
                            Hobpeg transforms your environment with intuitive gesture control powered by advanced computer vision technology.
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
                                <div className={`px-6 py-2 sm:px-8 sm:py-3 rounded-full font-semibold border-2 ${isDark ? 'border-blue-400 hover:bg-blue-400' : 'border-blue-400 hover:bg-[linear-gradient(135deg,#4a9af9_0%,#3a7ad9_100%)]'} hover:text-white transition-all duration-300 text-sm sm:text-base text-white`}>
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
                        {/* <div className="hidden lg:block hero-image w-1/2 max-w-md xl:max-w-lg">
                            <AudioPlayer
                                audioSrc="hobpeg.mp3"
                                title="HOBPEG OVERVIEW"
                            />
                        </div> */}

                    </div>
                </div>
            </div>
        </section>
    );
}