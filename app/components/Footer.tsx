'use client';
import React from 'react';
import { Linkedin, Twitter, Github, Facebook, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const Footer = ({ theme, setTheme }: FooterProps) => {
  const isDark = theme === 'dark';
  
  const socialIcons = [
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      url: '#'
    },
    {
      name: 'Twitter',
      icon: <Twitter className="w-5 h-5" />,
      url: '#'
    },
    {
      name: 'GitHub',
      icon: <Github className="w-5 h-5" />,
      url: '#'
    },
    {
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5" />,
      url: '#'
    }
  ];

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Features', url: '#' },
        { name: 'Pricing', url: '#' },
        { name: 'Documentation', url: '#' },
        { name: 'Releases', url: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About', url: '#' },
        { name: 'Blog', url: '#' },
        { name: 'Careers', url: '#' },
        { name: 'Contact', url: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy', url: '#' },
        { name: 'Terms', url: '#' },
        { name: 'Security', url: '#' },
        { name: 'Cookies', url: '#' }
      ]
    }
  ];

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      text: 'support@smartward.com'
    },
    {
      icon: <Phone className="w-5 h-5" />,
      text: '+1 (555) 123-4567'
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      text: '123 Tech Street, San Francisco, CA'
    }
  ];

  return (
    <footer className={`pt-16 pb-8 ${isDark ? 'bg-gray-900' : 'bg-white'} border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDark ? 'bg-blue-900' : 'bg-blue-100'} mr-3`}>
               <img src="/logo.png" alt="Logo" />
              </div>
              <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Smart Ward</span>
            </div>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Transform your environment with intuitive gesture control powered by advanced computer vision technology.
            </p>
            <div className="flex space-x-4">
              {socialIcons.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className={`p-2 rounded-full ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'} transition-colors`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column, index) => (
            <div key={index} className="space-y-4">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.url}
                      className={`flex items-center space-x-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors`}
                    >
                      <span className="text-xs">→</span>
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Contact Us</h3>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className={`mt-0.5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                    {info.icon}
                  </span>
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{info.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              © {new Date().getFullYear()} Smart Ward. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className={`text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors`}
              >
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </button>
              <a href="#" className={`text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors`}>
                Privacy Policy
              </a>
              <a href="#" className={`text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors`}>
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;