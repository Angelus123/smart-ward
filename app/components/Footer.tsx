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
      icon: <Linkedin className="w-4 h-4" />,
      url: '#'
    },
    {
      name: 'Twitter',
      icon: <Twitter className="w-4 h-4" />,
      url: '#'
    },
    {
      name: 'GitHub',
      icon: <Github className="w-4 h-4" />,
      url: '#'
    },
    {
      name: 'Facebook',
      icon: <Facebook className="w-4 h-4" />,
      url: '#'
    }
  ];

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Features', url: '#' },
        { name: 'Pricing', url: '#' },
        { name: 'Docs', url: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About', url: '#' },
        { name: 'Blog', url: '#' },
        { name: 'Careers', url: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy', url: '#' },
        { name: 'Terms', url: '#' },
        { name: 'Security', url: '#' }
      ]
    }
  ];

  const contactInfo = [
    {
      icon: <Mail className="w-4 h-4" />,
      text: 'smartward123@gmail.com'
    },
    {
      icon: <Phone className="w-4 h-4" />,
      text: '(+250)785182823'
    },
    {
      icon: <MapPin className="w-4 h-4" />,
      text: 'Kigali, Rwanda'
    }
  ];

  return (
    <footer className={`py-6 ${isDark ? 'bg-gray-900' : 'bg-white'} border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          {/* Brand and Social */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-blue-900' : 'bg-blue-100'} mr-3`}>
                <img src="/logo.png" alt="Logo" className="w-6 h-6" />
              </div>
              <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Smart Ward</span>
            </div>
            
            <div className="flex space-x-3">
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

          {/* Links */}
          <div className="flex flex-wrap gap-6">
            {footerLinks.map((column, index) => (
              <div key={index} className="min-w-[120px]">
                <h3 className={`text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{column.title}</h3>
                <ul className="space-y-1">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.url}
                        className={`text-xs ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors`}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="min-w-[180px]">
            <h3 className={`text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Contact</h3>
            <ul className="space-y-1">
              {contactInfo.map((info, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span className={`${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                    {info.icon}
                  </span>
                  <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{info.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`mt-6 pt-6 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              © {new Date().getFullYear()} Smart Ward. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className={`text-xs ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors`}
              >
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </button>
              <a href="#" className={`text-xs ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors`}>
                Privacy
              </a>
              <a href="#" className={`text-xs ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors`}>
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;