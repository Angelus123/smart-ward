'use client';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { AuthProvider } from '../context/AuthContext';
import { useTheme } from 'next-themes';
import Footer from '../components/Footer';

interface Package {
  name: string;
  price: string;
  monthlyFee: string;
  features: string[];
  cameras: number;
  popular?: boolean;
  cta: string;
  additionalCameraPrice?: string;
}

const Purchase: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const packages: Package[] = [
    {
      name: 'Starter Kit',
      price: '$210',
      monthlyFee: '$25/month',
      features: [
        'Raspberry Pi Module',
        '1 HD Camera included',
        'Basic Software License',
        '2 Months Free License Included',
        'Online Documentation',
        'Email support',
        'Monthly software updates',
        'Basic gesture recognition'
      ],
      cameras: 1,
      additionalCameraPrice: '$30 each',
      cta: 'Get Started Now'
    },
    {
      name: 'Premium Bundle',
      price: '$505',
      monthlyFee: '$40/month',
      popular: true,
      features: [
        'Raspberry Pi 4',
        '3 HD Cameras included',
        'Advanced Software License',
        '2 Months Free License Included',
        'Gesture Customization',
        'Security Footage Storage (7 days)',
        'Motion Detection Alerts',
        '2 Years Priority Support',
        'Phone & Email Support',
        'Weekly Software Updates',
        'API Access',
        'Advanced Analytics'
      ],
      cameras: 3,
      additionalCameraPrice: '$25 each',
      cta: 'Get Started Now'
    },
    {
      name: 'Enterprise Suite',
      price: 'Custom',
      monthlyFee: 'Contact for pricing',
      features: [
        'Raspberry Pi Cluster',
        '5+ Cameras (customizable)',
        'Unlimited Devices License',
        '2 Months Free License Included',
        'Custom Gesture Development',
        'Advanced Security Monitoring',
        'Real-time Alert System',
        'Extended Footage Storage (30+ days)',
        '3 Years 24/7 Support',
        'Dedicated Account Manager',
        'Cloud Integration',
        'Advanced Analytics',
        'SSO & Identity Management',
        'Custom Integrations',
        'SLA-backed Support'
      ],
      cameras: 5,
      cta: 'Contact Sales'
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

  const renderMonthlyFee = (pkg: Package) => {
    if (pkg.name === 'Enterprise Suite') {
      return (
        <span className={`text-xl font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          Volume Pricing Available
        </span>
      );
    }

    const monthlyPrice = parseInt(pkg.monthlyFee.replace('$', ''));
    const yearlyPrice = monthlyPrice * 12 * 0.8; // 20% discount

    return (
      <>
        <span className={`text-xl font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          {billingCycle === 'yearly' ? `$${yearlyPrice}/year` : pkg.monthlyFee}
        </span>
        <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          {billingCycle === 'yearly' ? '(20% savings)' : '/software license'}
        </span>
      </>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 mt-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Header theme={theme as 'light' | 'dark'} setTheme={setTheme} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-16">
          <h1 className={`text-4xl sm:text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Hobpeg Gesture Control Solutions
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Transparent & Scalable Pricing - Choose the plan that grows with your business
          </p>
          <div className="mt-6">
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              First license comes with 2 months free | No credit card required
            </span>
          </div>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className={`inline-flex rounded-md shadow-sm ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-1`}>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                billingCycle === 'monthly'
                  ? `${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'}`
                  : `${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                billingCycle === 'yearly'
                  ? `${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'}`
                  : `${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
              }`}
            >
              Yearly (Save 20%)
            </button>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <div 
              key={pkg.name}
              className={`relative rounded-xl p-6 transition-all duration-300 transform hover:scale-[1.02] 
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
              
              <div className="mb-4">
                {pkg.price !== 'Custom' ? (
                  <>
                    <span className={`text-3xl font-extrabold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                      {pkg.price}
                    </span>
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      /one-time hardware
                    </span>
                  </>
                ) : (
                  <span className={`text-3xl font-extrabold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                    Custom Pricing
                  </span>
                )}
              </div>
              
              <div className="mb-6">
                {renderMonthlyFee(pkg)}
              </div>
              
              <div className={`mb-4 p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  <strong>{pkg.cameras} camera{pkg.cameras !== 1 ? 's' : ''}</strong> included
                  {pkg.additionalCameraPrice && (
                    <span className="block mt-1">Add more for {pkg.additionalCameraPrice}</span>
                  )}
                  {pkg.name === 'Enterprise Suite' && ' (expandable)'}
                </p>
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
                    : pkg.name === 'Enterprise Suite' 
                      ? `${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'} border border-blue-500`
                      : theme === 'dark' 
                        ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}
                `}
              >
                {selectedPackage === pkg.name ? 'Selected!' : pkg.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className={`mt-16 rounded-xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg max-w-6xl mx-auto`}>
          <h3 className={`text-2xl font-bold p-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Compare Plans</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Key Features</span>
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Starter Kit</span>
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                    <span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>Premium Bundle</span>
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Enterprise Suite</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {[
                  { feature: 'Included Cameras', starter: '1', premium: '3', enterprise: '5+' },
                  { feature: 'Additional Camera Cost', starter: '$49 each', premium: '$39 each', enterprise: 'Volume discount' },
                  { feature: 'Monthly License Fee', starter: '$25', premium: '$40', enterprise: 'Custom' },
                  { feature: 'Free License Period', starter: '2 months', premium: '2 months', enterprise: '2 months' },
                  { feature: 'Security Features', starter: '-', premium: 'Motion Alerts + 7-day storage', enterprise: 'Advanced monitoring + 30-day storage' },
                  { feature: 'Software License', starter: 'Basic', premium: 'Advanced', enterprise: 'Unlimited' },
                  { feature: 'Support', starter: 'Email', premium: 'Phone & Email', enterprise: '24/7 Dedicated' },
                  { feature: 'Updates', starter: 'Monthly', premium: 'Weekly', enterprise: 'Continuous' },
                  { feature: 'API Access', starter: '-', premium: '✓', enterprise: '✓' },
                  { feature: 'Analytics', starter: 'Basic', premium: 'Advanced', enterprise: 'Advanced' },
                  { feature: 'Custom Gestures', starter: '-', premium: '✓', enterprise: 'Custom Development' },
                  { feature: 'Cloud Integration', starter: '-', premium: '-', enterprise: '✓' },
                  { feature: 'SSO & Identity Management', starter: '-', premium: '-', enterprise: '✓' },
                ].map((row, index) => (
                  <tr key={index} className={theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {row.feature}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{row.starter}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>{row.premium}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{row.enterprise}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className={`mt-16 p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg max-w-4xl mx-auto`}>
          <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Frequently Asked Questions</h3>
          <div className="space-y-4">
            {[
              {
                question: "What's included in the hardware package?",
                answer: "Each package includes Raspberry Pi devices, cameras, power adapters, mounting hardware, and detailed setup guides."
              },
              {
                question: "How does the 2-month free license work?",
                answer: "Your first payment will be charged after 2 months of free usage. No credit card is required to start your free trial."
              },
              {
                question: "Can I add more cameras later?",
                answer: "Yes, you can add cameras to any plan. Starter and Premium plans have fixed pricing per additional camera, while Enterprise offers volume discounts."
              },
              {
                question: "What security features are included?",
                answer: "Premium includes 7-day footage storage and motion alerts. Enterprise offers advanced monitoring with 30+ day storage and real-time alerts."
              },
              {
                question: "Do you offer enterprise discounts?",
                answer: "Yes, for organizations needing 10+ devices or custom solutions, we offer significant volume discounts. Contact our sales team for details."
              }
            ].map((faq, index) => (
              <div key={index}>
                <h4 className={`font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>{faq.question}</h4>
                <p className={`mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className={`mt-16 p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg max-w-4xl mx-auto`}>
          <h3 className={`text-2xl font-bold mb-6 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Trusted by Businesses Across Industries</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                quote: "The Premium bundle's security features gave us both gesture control and basic surveillance in one package - incredible value!",
                author: "— Retail Store Owner"
              },
              {
                quote: "Switching to Hobpeg's Enterprise solution reduced our equipment costs by 40% while improving functionality.",
                author: "— Manufacturing Facility Manager"
              },
              {
                quote: "The 2-month free trial let us fully test the system before committing. We're now upgrading to Premium!",
                author: "— School Technology Director"
              },
              {
                quote: "As a smart home installer, the API access in Premium lets us integrate Hobpeg seamlessly with other systems.",
                author: "— Smart Home Integrator"
              }
            ].map((testimonial, index) => (
              <div key={index} className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <p className={`italic mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>&quot;{testimonial.quote}&quot;</p>
                <p className={`font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>{testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer theme={theme as 'light' | 'dark'} setTheme={setTheme} />
    </div>
  );
};

export default function PurchasePage() {
  return (
    <AuthProvider>
      <Purchase />
    </AuthProvider>
  );
}