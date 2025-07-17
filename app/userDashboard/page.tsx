'use client'
import { useState } from 'react';
import Head from 'next/head';
import { ThemeProvider, useTheme } from 'next-themes';
import { AuthProvider } from '../context/AuthContext';
import {
  FaHome,
  FaShieldAlt,
  FaChartLine,
  FaBell,
  FaCog,
  FaQuestionCircle,
  FaHeart,
  FaArrowUp,
  FaServer,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaUser,
  FaWrench,
  FaKey,
  FaMapMarkerAlt,
  FaHandPaper,
  FaHandPeace,
  FaHandPointUp
} from 'react-icons/fa';
import Header from '../components/dashboard/userHeader';
import ProtectedRoute from '../components/ProtectedRoute';

function DashboardContent() {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sample data - replace with real API calls
  const [systemStatus] = useState({
    status: 'online', // online, maintenance, offline
    lastChecked: new Date().toISOString()
  });

  const [gestureStats,] = useState({
    total: 1248,
    successful: 1120,
    failed: 128,
    lastHour: 42
  });

  const [installationLocations] = useState([
    { id: 1, name: 'Living Room', type: 'home', status: 'active' },
    { id: 2, name: 'Front Door', type: 'security', status: 'active' },
    { id: 3, name: 'Bedroom', type: 'home', status: 'inactive' }
  ]);

  const [alerts] = useState([
    { id: 1, type: 'warning', message: 'Unrecognized gesture detected', time: '10 mins ago' },
    { id: 2, type: 'success', message: 'System update completed', time: '2 hours ago' },
    { id: 3, type: 'info', message: 'New gesture pattern learned', time: '1 day ago' }
  ]);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} mt-10 transition-colors`}>
      <Head>
        <title>GestureSecure Dashboard</title>
        <meta name="description" content="Smart gesture recognition system dashboard" />
      </Head>

      {/* Header */}
      <Header theme={theme as 'light' | 'dark'} setTheme={setTheme} />

      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <aside className={`w-64 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-r ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} sticky top-20 h-[calc(100vh-80px)] overflow-y-auto`}>
          <nav className="py-6">
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`flex items-center gap-3 w-full px-6 py-3 ${activeTab === 'dashboard' ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'} transition-colors`}
                >
                  <FaHome /> Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('gestures')}
                  className={`flex items-center gap-3 w-full px-6 py-3 ${activeTab === 'gestures' ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'} transition-colors`}
                >
                  <FaHandPaper /> Gesture Analytics
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`flex items-center gap-3 w-full px-6 py-3 ${activeTab === 'security' ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'} transition-colors`}
                >
                  <FaShieldAlt /> Security Center
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('system')}
                  className={`flex items-center gap-3 w-full px-6 py-3 ${activeTab === 'system' ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'} transition-colors`}
                >
                  <FaServer /> System Health
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`flex items-center gap-3 w-full px-6 py-3 ${activeTab === 'users' ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'} transition-colors`}
                >
                  <FaUser /> Users
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex items-center gap-3 w-full px-6 py-3 ${activeTab === 'settings' ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'} transition-colors`}
                >
                  <FaCog /> Settings
                </button>
              </li>
            </ul>

            <div className="mt-8 px-6">
              <button className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <FaArrowUp /> Upgrade Plan
              </button>
              <button className="w-full mt-3 py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                <FaHeart /> Donate
              </button>
              <button className="w-full mt-3 py-3 px-4 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2">
                <FaQuestionCircle /> Support
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* System Status Banner */}
          {systemStatus.status === 'maintenance' && (
            <div className="bg-yellow-500 text-white p-4 rounded-lg mb-6 flex items-center gap-3">
              <FaWrench className="text-xl" />
              <div>
                <h3 className="font-bold">System Maintenance</h3>
                <p className="text-sm">Some features may be temporarily unavailable</p>
              </div>
            </div>
          )}
          {systemStatus.status === 'offline' && (
            <div className="bg-red-500 text-white p-4 rounded-lg mb-6 flex items-center gap-3">
              <FaTimesCircle className="text-xl" />
              <div>
                <h3 className="font-bold">System Offline</h3>
                <p className="text-sm">We&apos;re working to restore service as soon as possible</p>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Gestures</p>
                  <h3 className="text-3xl font-bold mt-1">{gestureStats.total}</h3>
                </div>
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <FaHandPaper className="text-blue-500 dark:text-blue-400 text-xl" />
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Successful</p>
                  <h3 className="text-3xl font-bold mt-1 text-green-500">{gestureStats.successful}</h3>
                </div>
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                  <FaHandPeace className="text-green-500 dark:text-green-400 text-xl" />
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Failed</p>
                  <h3 className="text-3xl font-bold mt-1 text-red-500">{gestureStats.failed}</h3>
                </div>
                <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30">
                  <FaHandPointUp className="text-red-500 dark:text-red-400 text-xl" />
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Hour</p>
                  <h3 className="text-3xl font-bold mt-1">{gestureStats.lastHour}</h3>
                </div>
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30">
                  <FaChartLine className="text-purple-500 dark:text-purple-400 text-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* System Overview */}
          <div className={`mb-8 p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <FaServer /> System Overview
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Installation Locations */}
              <div>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <FaMapMarkerAlt /> Installation Locations
                </h3>
                <div className="space-y-3">
                  {installationLocations.map(location => (
                    <div key={location.id} className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} flex items-center justify-between`}>
                      <div>
                        <h4 className="font-medium">{location.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{location.type} • {location.status}</p>
                      </div>
                      {location.status === 'active' ? (
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                      ) : (
                        <span className="w-3 h-3 rounded-full bg-gray-400"></span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* License Information */}
              <div>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <FaKey /> License Information
                </h3>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-gray-500 dark:text-gray-400">License Type:</span>
                    <span className="font-medium">Premium</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-gray-500 dark:text-gray-400">Expires:</span>
                    <span className="font-medium">2025-12-31</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-500 dark:text-gray-400">Devices:</span>
                    <span className="font-medium">3/5 active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className={`mb-8 p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <FaBell /> Recent Activity
            </h2>

            <div className="space-y-4">
              {alerts.map(alert => (
                <div key={alert.id} className={`p-4 rounded-lg flex items-start gap-4 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className={`p-2 rounded-full ${alert.type === 'warning' ? 'bg-yellow-100 text-yellow-600' : alert.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                    {alert.type === 'warning' ? <FaExclamationTriangle /> :
                      alert.type === 'success' ? <FaCheckCircle /> : <FaBell />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{alert.message}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Health */}
          <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <FaServer /> System Health
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3">System Requirements</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" /> Raspberry Pi 4 (4GB RAM recommended)
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" /> HD Camera (USB or Raspberry Pi Camera Module)
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" /> Server (local or cloud for processing)
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" /> Stable internet connection
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" /> Raspberry Pi OS (64-bit recommended)
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" /> Minimum 16GB SD card storage
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-3">Current Status</h3>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex justify-between items-center py-2">
                    <span>Camera Feed:</span>
                    <span className="flex items-center gap-1 text-green-500">
                      <FaCheckCircle /> Active
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Gesture Processing:</span>
                    <span className="flex items-center gap-1 text-green-500">
                      <FaCheckCircle /> Operational
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Security Alerts:</span>
                    <span className="flex items-center gap-1 text-green-500">
                      <FaCheckCircle /> Enabled
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>System Uptime:</span>
                    <span>14 days 6 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <ThemeProvider attribute="class" defaultTheme="light">
          <DashboardContent />
        </ThemeProvider>
      </ProtectedRoute>
    </AuthProvider>
  );
}