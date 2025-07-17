'use client'
import Link from 'next/link';
import React, { useState } from 'react';

interface HeaderProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  logout: () => Promise<void>;
}


export default function Header({ theme, setTheme }: HeaderProps) {
   const [activeTab, setActiveTab] = useState('dashboard');
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const themeStyles = {
    bgColor: theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50',
    textColor: theme === 'dark' ? 'text-white' : 'text-gray-800',
    secondaryBg: theme === 'dark' ? 'bg-gray-800' : 'bg-white',
    borderColor: theme === 'dark' ? 'border-gray-700' : 'border-gray-200',
    cardBg: theme === 'dark' ? 'bg-gray-800' : 'bg-white',
    inputBg: theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50',
    inputBorder: theme === 'dark' ? 'border-gray-600' : 'border-gray-200',
    navbarBg: theme === 'dark' ? 'bg-gray-800' : 'bg-[#003366]',
    buttonBg: theme === 'dark' ? 'bg-blue-700' : 'bg-[#003366]',
    linkColor: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
    mutedText: theme === 'dark' ? 'text-gray-400' : 'text-gray-500',
    tableHeaderBg: theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100',
    tableRowHover: theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50',
  };

  return (
    <header className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-[#003366]'} text-white shadow-md sticky top-0 z-50`}>
      {/* Top Navigation */}
          {/* Top Navigation */}
      <nav className={`${themeStyles.navbarBg} sticky top-0 z-50 shadow-md`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex-shrink-0 flex items-center">
              {/* Logo */}
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
              theme === 'dark' ? 'bg-blue-900/80' : 'bg-blue-100'
            }`}>
              <img src="/logo.png" alt="Logo" className="w-5 h-5" />
            </div>
            <span className={`hidden sm:block text-xl font-semibold ${
              theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
            }`}>
              Hobpeg
            </span>
          </div>
            </Link>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'dashboard' ? 'bg-black/10 text-white' : 'text-white/90 hover:text-white'}`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('cases')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'cases' ? 'bg-black/10 text-white' : 'text-white/90 hover:text-white'}`}
                >
                  My Cases
                </button>
                <button
                  onClick={() => setActiveTab('schedule')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'schedule' ? 'bg-black/10 text-white' : 'text-white/90 hover:text-white'}`}
                >
                  Schedule
                </button>
                <button
                  onClick={() => setActiveTab('devices')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${activeTab === 'devices' ? 'bg-black/10 text-white' : 'text-white/90 hover:text-white'}`}
                >
                  Device Orders
                </button>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  className="w-10 h-10 rounded-full cursor-pointer bg-gray-100/10 hover:bg-blue-400/5 flex items-center justify-center transition-all duration-300"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? '☀️' : '🌙'}
                </button>

                <div className="ml-3 relative">
                  <div>
                    <button
                      onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                      className="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none"
                    >
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white/20">
                        👤
                      </span>
                      <span className="ml-2">Support Agent</span>
                      <span className="ml-1">▼</span>
                    </button>
                  </div>

                  {profileMenuOpen && (
                    <div className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg ${themeStyles.cardBg} ring-1 ring-black ring-opacity-5 py-1`}>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveTab('profile');
                          setProfileMenuOpen(false);
                        }}
                      >
                        Profile Settings
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={(e) => {
                          e.preventDefault();
                          alert('Change password dialog would open here');
                          setProfileMenuOpen(false);
                        }}
                      >
                        Change Password
                      </a>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={(e) => {
                          e.preventDefault();
                          alert('Logging out...');
                          setProfileMenuOpen(false);
                        }}
                      >
                        Logout
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}