'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import {
  Home,
  Info,
  BookOpen,
  Headphones,
  ShoppingCart,
  LogIn,
  UserPlus,
  Sun,
  Moon
} from 'lucide-react';

const iconMap = {
  home: <Home className="w-4 h-4" />,
  info: <Info className="w-4 h-4" />,
  documentation: <BookOpen className="w-4 h-4" />,
  support: <Headphones className="w-4 h-4" />,
  buy: <ShoppingCart className="w-4 h-4" />,
  login: <LogIn className="w-4 h-4" />,
  signup: <UserPlus className="w-4 h-4" />
};

interface HeaderProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export default function Header({ theme, setTheme }: HeaderProps) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: 'home', text: 'Home' },
    { href: '/about', icon: 'info', text: 'About' },
    { href: '/documentation', icon: 'documentation', text: 'Docs' },
    { href: '/support', icon: 'support', text: 'Support' },
    { href: '/buy', icon: 'buy', text: 'Purchase' }
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header className={`fixed w-full top-0 z-50 py-3 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
      } shadow-sm`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
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
              SmartWard
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                      isActive(item.href)
                        ? theme === 'dark'
                          ? 'text-blue-300 font-medium'
                          : 'text-blue-600 font-medium'
                        : theme === 'dark'
                          ? 'text-gray-300 hover:text-blue-300'
                          : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    {iconMap[item.icon as keyof typeof iconMap]}
                    <span>{item.text}</span>
                    {isActive(item.href) && (
                      <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-4/5 h-0.5 rounded-full ${
                        theme === 'dark' ? 'bg-blue-400' : 'bg-blue-500'
                      }`}></span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/login"
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm ${
                theme === 'dark'
                  ? 'text-gray-300 hover:bg-gray-800'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {iconMap.login}
              <span>Login</span>
            </Link>
            <Link
              href="/signup"
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm ${
                theme === 'dark'
                  ? 'bg-blue-700 hover:bg-blue-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
            >
              {iconMap.signup}
              <span>Sign Up</span>
            </Link>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Toggle menu"
            >
              <div className="space-y-1.5">
                <span className={`block w-6 h-0.5 rounded-full transition-all ${
                  theme === 'dark' ? 'bg-white' : 'bg-gray-800'
                } ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block w-6 h-0.5 rounded-full ${
                  theme === 'dark' ? 'bg-white' : 'bg-gray-800'
                } ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block w-6 h-0.5 rounded-full transition-all ${
                  theme === 'dark' ? 'bg-white' : 'bg-gray-800'
                } ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
        isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } md:hidden`} onClick={() => setMenuOpen(false)}></div>
      
      <nav className={`fixed top-0 left-0 w-64 h-full z-50 bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                theme === 'dark' ? 'bg-blue-900/80' : 'bg-blue-100'
              }`}>
                <img src="/logo.png" alt="Logo" className="w-5 h-5" />
              </div>
              <span className={`text-lg font-semibold ${
                theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
              }`}>
                SmartWard
              </span>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                      isActive(item.href)
                        ? theme === 'dark'
                          ? 'bg-blue-900/30 text-blue-300'
                          : 'bg-blue-100 text-blue-600'
                        : theme === 'dark'
                          ? 'text-gray-300 hover:bg-gray-800'
                          : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="w-5 h-5 flex items-center justify-center">
                      {iconMap[item.icon as keyof typeof iconMap]}
                    </span>
                    <span>{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className={`flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg ${
                theme === 'dark'
                  ? 'text-gray-300 hover:bg-gray-800'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {iconMap.login}
              <span>Login</span>
            </Link>
            <Link
              href="/signup"
              onClick={() => setMenuOpen(false)}
              className={`flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg ${
                theme === 'dark'
                  ? 'bg-blue-700 hover:bg-blue-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
            >
              {iconMap.signup}
              <span>Sign Up</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}