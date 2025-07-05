'use client'; // This directive is crucial for client-side components in Next.js App Router

import Link from 'next/link';
import React,  { useState } from 'react';

import {
  Info,
  Settings,
  Mail,
  Handshake,
  Home as HomeIcon, 
} from 'lucide-react'; 

// Define the iconMap using Lucide React components
const iconMap: Record<string, React.ReactElement> = {
  home: React.createElement(HomeIcon, { className: "w-4 h-4" }),
  info: React.createElement(Info, { className: "w-4 h-4" }),
  settings: React.createElement(Settings, { className: "w-4 h-4" }),
  mail: React.createElement(Mail, { className: "w-4 h-4" }),
  handshake: React.createElement(Handshake, { className: "w-4 h-4" }),
};

// Define the types for the Header component's props
interface HeaderProps {
  theme: 'light' | 'dark'; // Theme can only be 'light' or 'dark'
  setTheme: (theme: 'light' | 'dark') => void; // Function to set the theme
}

export default function Header({ theme, setTheme }: HeaderProps) {
  // State to control the visibility of the mobile menu
  const [isMenuOpen, setMenuOpen] = useState(false);

  // Function to toggle the mobile menu's open/close state
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Header Section */}
      <header
        className={`fixed w-full top-0 z-50 shadow-md py-5 px-8 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900/95 text-white' : 'bg-white/95 text-gray-800'
          }`}
      >
        <div className="max-w-7xl mx-auto px-5 flex justify-between items-center">
          {/* Logo and Site Title */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-400 backdrop-blur border border-white/20 rounded-full flex items-center justify-center shadow">
              {/* ShieldSync Logo SVG */}
              <img src="/logo.png" alt="Logo" />
            </div>
            <div
              className={`
                          hidden sm:block
                          text-3xl font-bold
                          bg-gradient-to-r
                          ${theme === 'dark' ? 'from-[#93c5fd] to-[#3b82f6]' : 'from-[#0a1f44] to-[#2a5a9c]'}
                          bg-clip-text text-transparent
                        `}
            >
              SmartWard
            </div>
          </div>

          {/* Desktop Navigation - Hidden on small screens */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {[
                { href: '/', icon: 'home', text: 'Home' },
                { href: '/about', icon: 'info', text: 'About' },
                { href: '/documentation', icon: 'mail', text: 'Documentation' },
                { href: '/support', icon: 'settings', text: 'Support' },
                { href: '/buy', icon: 'handshake', text: 'buy' },
              ].map((item) => (
                <li key={item.href}>
                  {/* Corrected Link usage: className directly on Link */}
                  <Link
                    href={item.href}
                    className={`transition flex items-center gap-2 hover:${theme === 'dark' ? 'text-gray-300' : 'text-blue-400'
                      } ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
                  >
                    <span className="text-sm">{iconMap[item.icon]}</span>
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button (Hamburger) and Mobile Theme Toggle - Visible on small screens */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-400"
              aria-label="Toggle menu"
            >
              <svg
                className={`w-6 h-6 transition-all duration-300 ${theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Dynamically render hamburger lines or close icon */}
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12" // X icon
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16" // 3 lines
                  />
                )}
              </svg>
            </button>
            {/* Mobile Theme Toggle */}
            <button
              className="w-10 h-10 rounded-full cursor-pointer bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-blue-400 hover:text-white flex items-center justify-center transition-all duration-300 ml-2"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>

          {/* Desktop Login/Register/Theme Toggle - Hidden on small screens */}
          <div className="hidden md:flex items-center gap-4">
            {/* Corrected Link usage */}
            <Link
              href="/login"
              className="px-6 py-2 rounded-full font-semibold border-2 border-blue-400 text-blue-400 hover:border-transparent hover:bg-[linear-gradient(135deg,#4a9af9_0%,#3a7ad9_100%)] hover:text-white transition-all duration-300"
            >
              Login
            </Link>
            {/* Corrected Link usage */}
            <Link
              href="/signup"
              className="px-6 py-2 rounded-full font-semibold text-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              style={{
                background: 'linear-gradient(135deg, #4a9af9 0%, #3a7ad9 100%)',
              }}
            >
              Register
            </Link>
            <button
              className="w-10 h-10 rounded-full cursor-pointer bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-blue-400 hover:text-white flex items-center justify-center transition-all duration-300"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay/Drawer */}
      <nav
        className={`fixed top-0 left-0 w-full h-full z-40 p-8 pt-24 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } ${theme === 'dark' ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-sm md:hidden`}
      >
        <ul className="flex flex-col space-y-6 text-xl">
          {[
            { href: '/', icon: 'home', text: 'Home' },
            { href: '/about', icon: 'info', text: 'About' },
            { href: '/services', icon: 'settings', text: 'Services' },
            { href: '/contact', icon: 'mail', text: 'Contact' },
            { href: '/partners', icon: 'handshake', text: 'Partners' },
          ].map((item) => (
            <li key={item.href}>
              {/* Corrected Link usage: className directly on Link, close menu on click */}
              <Link
                href={item.href}
                onClick={toggleMenu}
                className={`transition flex items-center gap-3 ${theme === 'dark' ? 'text-gray-200 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'
                  }`}
              >
                <span className="text-2xl">{iconMap[item.icon]}</span>
                {item.text}
              </Link>
            </li>
          ))}
          {/* Login/Register for Mobile Menu */}
          <li className="pt-4 border-t border-gray-700 dark:border-gray-200">
            {/* Corrected Link usage, close menu on click */}
            <Link
              href="/login"
              onClick={toggleMenu}
              className="px-6 py-2 rounded-full font-semibold border-2 border-blue-400 text-blue-400 hover:border-transparent hover:bg-[linear-gradient(135deg,#4a9af9_0%,#3a7ad9_100%)] hover:text-white transition-all duration-300 w-full text-center inline-block"
            >
              Login
            </Link>
          </li>
          <li>
            {/* Corrected Link usage, close menu on click */}
            <Link
              href="/signup"
              onClick={toggleMenu}
              className="px-6 py-2 rounded-full font-semibold text-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 w-full text-center inline-block"
              style={{
                background: 'linear-gradient(135deg, #4a9af9 0%, #3a7ad9 100%)',
              }}
            >
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
