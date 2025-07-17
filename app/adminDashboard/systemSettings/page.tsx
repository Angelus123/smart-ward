'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Head from 'next/head';
import Header from '../../components/dashboard/AdminHeader';
import { useAuth } from '../../context/AuthContext';
import { AuthProvider } from '../../context/AuthContext';
import ProtectedRoute from '@/app/components/ProtectedRoute';

interface SystemSettings {
  systemStatus: 'online' | 'maintenance' | 'offline';
  paymentSettings: {
    currency: string;
    paymentMethods: string[];
    invoicePrefix: string;
    taxRate: number;
  };
  appearance: {
    primaryColor: string;
    secondaryColor: string;
    darkMode: boolean;
  };
  workingDays: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  businessHours: {
    start: string;
    end: string;
  };
  security: {
    loginAttempts: number;
    passwordExpiry: number;
    twoFactorAuth: boolean;
  };
}

function SystemSettings() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [settings, setSettings] = useState<SystemSettings>({
    systemStatus: 'online',
    paymentSettings: {
      currency: 'USD',
      paymentMethods: ['credit_card', 'paypal', 'bank_transfer'],
      invoicePrefix: 'INV',
      taxRate: 0.1,
    },
    appearance: {
      primaryColor: '#3b82f6',
      secondaryColor: '#10b981',
      darkMode: theme === 'dark',
    },
    workingDays: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false,
    },
    businessHours: {
      start: '09:00',
      end: '17:00',
    },
    security: {
      loginAttempts: 5,
      passwordExpiry: 90,
      twoFactorAuth: true,
    },
  });
  const [isEditing, setIsEditing] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { logout } = useAuth();

  const colorOptions = [
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Green', value: '#10b981' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Pink', value: '#ec4899' },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (saveSuccess) {
      const timer = setTimeout(() => setSaveSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [saveSuccess]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value, type } = e.target;
  const path = name.split('.');

  setSettings((prev) => {
    const newSettings = { ...prev };
    let current: Record<string, unknown> = newSettings; // Use Record<string, unknown> instead of any

    try {
      for (let i = 0; i < path.length - 1; i++) {
        if (!(path[i] in current)) {
          throw new Error(`Invalid path: ${path.slice(0, i + 1).join('.')}`);
        }
        current = current[path[i]] as Record<string, unknown>;
      }

      const lastKey = path[path.length - 1];

      if (type === 'checkbox') {
        current[lastKey] = (e.target as HTMLInputElement).checked;
      } else if (type === 'number') {
        current[lastKey] = Number(value);
      } else {
        current[lastKey] = value;
      }

      return newSettings;
    } catch (err) {
      console.error(err);
      return prev;
    }
  });
};

  const handleWorkingDayChange = (day: keyof typeof settings.workingDays) => {
    setSettings(prev => ({
      ...prev,
      workingDays: {
        ...prev.workingDays,
        [day]: !prev.workingDays[day]
      }
    }));
  };

  const handleColorChange = (field: 'primaryColor' | 'secondaryColor', value: string) => {
    setSettings(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [field]: value
      }
    }));
  };

  const handleSaveSettings = async () => {
    try {
      setSaveLoading(true);
      setError(null);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (settings.appearance.darkMode !== (theme === 'dark')) {
        setTheme(settings.appearance.darkMode ? 'dark' : 'light');
      }
      
      setSaveSuccess(true);
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save settings');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleSystemShutdown = (action: 'restart' | 'shutdown' | 'maintenance') => {
    if (confirm(`Are you sure you want to ${action} the system?`)) {
      alert(`System will ${action}... (simulated)`);
    }
  };

  if (!mounted) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <Head>
        <title>System Settings</title>
        <meta name="description" content="Manage System Settings" />
      </Head>

      <Header theme={theme as 'light' | 'dark'} setTheme={setTheme} logout={logout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">System Settings</h1>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Configure and manage all system-wide settings
          </p>
        </div>

        {saveSuccess && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg dark:bg-green-900/30 dark:text-green-400">
            Settings saved successfully!
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg dark:bg-red-900/30 dark:text-red-400">
            {error}
            <button 
              onClick={() => setError(null)} 
              className="float-right font-bold"
            >
              ×
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className={`rounded-xl shadow-md p-6 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">System Status</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  settings.systemStatus === 'online' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                    : settings.systemStatus === 'maintenance' 
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {settings.systemStatus.charAt(0).toUpperCase() + settings.systemStatus.slice(1)}
                </span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    System Mode
                  </label>
                  <select
                    name="systemStatus"
                    value={settings.systemStatus}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-lg ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                    disabled={!isEditing}
                  >
                    <option value="online">Online</option>
                    <option value="maintenance">Maintenance Mode</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <button
                    onClick={() => handleSystemShutdown('restart')}
                    className={`py-2 px-4 rounded-lg font-medium ${
                      theme === 'dark' 
                        ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                        : 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800'
                    }`}
                  >
                    Restart System
                  </button>
                  <button
                    onClick={() => handleSystemShutdown('shutdown')}
                    className={`py-2 px-4 rounded-lg font-medium ${
                      theme === 'dark' 
                        ? 'bg-red-600 hover:bg-red-700 text-white' 
                        : 'bg-red-100 hover:bg-red-200 text-red-800'
                    }`}
                  >
                    Shutdown System
                  </button>
                  <button
                    onClick={() => handleSystemShutdown('maintenance')}
                    className={`py-2 px-4 rounded-lg font-medium ${
                      theme === 'dark' 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
                    }`}
                  >
                    Maintenance Mode
                  </button>
                </div>
              </div>
            </div>

            <div className={`rounded-xl shadow-md p-6 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
              <h2 className="text-xl font-semibold mb-4">Payment Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Currency
                  </label>
                  <select
                    name="paymentSettings.currency"
                    value={settings.paymentSettings.currency}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-lg ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                    disabled={!isEditing}
                  >
                    <option value="USD">US Dollar (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                    <option value="GBP">British Pound (GBP)</option>
                    <option value="JPY">Japanese Yen (JPY)</option>
                  </select>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Tax Rate (%)
                  </label>
                  <input
                    type="number"
                    name="paymentSettings.taxRate"
                    value={settings.paymentSettings.taxRate}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    step="0.01"
                    className={`w-full p-2 border rounded-lg ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Invoice Prefix
                  </label>
                  <input
                    type="text"
                    name="paymentSettings.invoicePrefix"
                    value={settings.paymentSettings.invoicePrefix}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-lg ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Enabled Payment Methods
                  </label>
                  <div className="space-y-2">
                    {['credit_card', 'paypal', 'bank_transfer', 'crypto'].map(method => (
                      <label key={method} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.paymentSettings.paymentMethods.includes(method)}
                          onChange={(e) => {
                            const newMethods = e.target.checked
                              ? [...settings.paymentSettings.paymentMethods, method]
                              : settings.paymentSettings.paymentMethods.filter(m => m !== method);
                            setSettings(prev => ({
                              ...prev,
                              paymentSettings: {
                                ...prev.paymentSettings,
                                paymentMethods: newMethods
                              }
                            }));
                          }}
                          className="mr-2"
                          disabled={!isEditing}
                        />
                        <span className="capitalize">{method.replace('_', ' ')}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className={`rounded-xl shadow-md p-6 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
              <h2 className="text-xl font-semibold mb-4">Business Hours</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Opening Time
                  </label>
                  <input
                    type="time"
                    name="businessHours.start"
                    value={settings.businessHours.start}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-lg ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Closing Time
                  </label>
                  <input
                    type="time"
                    name="businessHours.end"
                    value={settings.businessHours.end}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-lg ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Working Days
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2">
                    {Object.keys(settings.workingDays).map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => isEditing && handleWorkingDayChange(day as keyof typeof settings.workingDays)}
                        className={`py-2 px-1 rounded-lg text-center ${settings.workingDays[day as keyof typeof settings.workingDays] 
                          ? theme === 'dark' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-blue-100 text-blue-800'
                          : theme === 'dark' 
                            ? 'bg-gray-700 text-gray-300' 
                            : 'bg-gray-100 text-gray-800'
                        } ${isEditing ? 'cursor-pointer' : 'cursor-default'}`}
                      >
                        {day.charAt(0).toUpperCase() + day.slice(1, 3)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className={`rounded-xl shadow-md p-6 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
              <h2 className="text-xl font-semibold mb-4">Appearance</h2>
              
              <div className="space-y-4">
                <div>
                  <label className={`flex items-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <input
                      type="checkbox"
                      name="appearance.darkMode"
                      checked={settings.appearance.darkMode}
                      onChange={handleInputChange}
                      className="mr-2"
                      disabled={!isEditing}
                    />
                    Dark Mode
                  </label>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Primary Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {colorOptions.map(color => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => isEditing && handleColorChange('primaryColor', color.value)}
                        className={`w-8 h-8 rounded-full ${isEditing ? 'cursor-pointer' : 'cursor-default'}`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      >
                        {settings.appearance.primaryColor === color.value && (
                          <span className="block text-white text-center">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Secondary Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {colorOptions.map(color => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => isEditing && handleColorChange('secondaryColor', color.value)}
                        className={`w-8 h-8 rounded-full ${isEditing ? 'cursor-pointer' : 'cursor-default'}`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      >
                        {settings.appearance.secondaryColor === color.value && (
                          <span className="block text-white text-center">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className={`rounded-xl shadow-md p-6 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
              <h2 className="text-xl font-semibold mb-4">Security</h2>
              
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Max Login Attempts
                  </label>
                  <input
                    type="number"
                    name="security.loginAttempts"
                    value={settings.security.loginAttempts}
                    onChange={handleInputChange}
                    min="1"
                    max="10"
                    className={`w-full p-2 border rounded-lg ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Password Expiry (days)
                  </label>
                  <input
                    type="number"
                    name="security.passwordExpiry"
                    value={settings.security.passwordExpiry}
                    onChange={handleInputChange}
                    min="1"
                    max="365"
                    className={`w-full p-2 border rounded-lg ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'}`}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <label className={`flex items-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <input
                      type="checkbox"
                      name="security.twoFactorAuth"
                      checked={settings.security.twoFactorAuth}
                      onChange={handleInputChange}
                      className="mr-2"
                      disabled={!isEditing}
                    />
                    Require Two-Factor Authentication
                  </label>
                </div>
              </div>
            </div>

            <div className={`rounded-xl shadow-md p-6 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
              {isEditing ? (
                <div className="flex space-x-3">
                  <button
                    onClick={() => setIsEditing(false)}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium ${
                      theme === 'dark' 
                        ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveSettings}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center`}
                    disabled={saveLoading}
                  >
                    {saveLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : 'Save Changes'}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className={`w-full py-2 px-4 rounded-lg font-medium ${
                    theme === 'dark' 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
                  }`}
                >
                  Edit Settings
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <SystemSettings />
      </ProtectedRoute>
    </AuthProvider>
  );
}