'use client';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

interface Package {
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
}

const Buy: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const packages: Package[] = [
    {
      name: 'Starter Kit',
      price: '$199',
      features: [
        'Raspberry Pi Module',
        'HD Camera',
        'Basic Software License',
        '1 Year Support',
        'Online Documentation'
      ],
    },
    {
      name: 'Professional Bundle',
      price: '$499',
      popular: true,
      features: [
        'Raspberry Pi 4',
        '4K Camera',
        'Advanced Software License',
        'Gesture Customization',
        '2 Years Priority Support',
        'Monthly Software Updates'
      ],
    },
    {
      name: 'Enterprise Suite',
      price: '$999',
      features: [
        'Raspberry Pi Cluster',
        '4K Camera with Night Vision',
        'Unlimited Devices License',
        'Custom Gesture Development',
        '3 Years 24/7 Support',
        'Dedicated Account Manager',
        'Cloud Integration'
      ],
    },
  ];

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 mt-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Header theme={theme as 'light' | 'dark'} setTheme={setTheme} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-16">
          <h1 className={`text-4xl sm:text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Smart Ward Packages
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Choose the perfect package to bring gesture-based control to your environment.
            All packages include free shipping and 30-day money back guarantee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <div 
              key={pkg.name}
              className={`relative rounded-xl p-6 transition-all duration-300 transform hover:scale-105 
                ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
                ${pkg.popular ? 'border-2 border-blue-500 shadow-xl' : 'border shadow-lg'}`}
              onClick={() => setSelectedPackage(pkg.name)}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 -mt-4 mr-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  POPULAR
                </div>
              )}
              
              <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {pkg.name}
              </h2>
              
              <div className="mb-6">
                <span className={`text-3xl font-extrabold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                  {pkg.price}
                </span>
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  /one-time
                </span>
              </div>
              
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <svg className={`h-5 w-5 mr-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-300
                  ${pkg.popular 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : theme === 'dark' 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}
                `}
              >
                {selectedPackage === pkg.name ? 'Selected!' : 'Get Started'}
              </button>
            </div>
          ))}
        </div>

        <div className={`mt-16 p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg max-w-4xl mx-auto`}>
          <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Frequently Asked Questions</h3>
          <div className="space-y-4">
            {[
              {
                question: "What's included in the Package?",
                answer: "All hardware components, power adapters, and setup guides."
              },
              {
                question: "Can I upgrade my package later?",
                answer: "Yes, you can upgrade anytime by paying the difference."
              },
              {
                question: "Do you offer volume discounts?",
                answer: "Contact our sales team for enterprise pricing."
              }
            ].map((faq, index) => (
              <div key={index}>
                <h4 className={`font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>{faq.question}</h4>
                <p className={`mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Buy;