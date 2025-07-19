'use client'
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { ThemeProvider, useTheme } from 'next-themes';
import { AuthProvider } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
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
  FaHandPointUp,
  FaExclamationCircle
} from 'react-icons/fa';
import Header from '../components/dashboard/userHeader';
import ProtectedRoute from '../components/ProtectedRoute';

function DashboardContent() {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [hasAPIInstalled, setHasAPIInstalled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check API installation status on component mount
  useEffect(() => {
    const checkInstallation = async () => {
      try {
        // Simulate API check - replace with actual API call
        setTimeout(() => {
          const isInstalled = false; // Default to not installed
          setHasAPIInstalled(isInstalled);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error checking installation:', error);
        setHasAPIInstalled(false);
        setIsLoading(false);
      }
    };

    checkInstallation();
  }, [router]);

  const showDemo = () => {
    setHasAPIInstalled(true);
    setIsLoading(false);
  }

  // System status based on installation
  const [systemStatus] = useState({
    status: hasAPIInstalled ? 'online' : 'offline',
    lastChecked: new Date().toISOString(),
    health: hasAPIInstalled ? 'healthy' : 'unhealthy'
  });

  const [gestureStats] = useState({
    total: hasAPIInstalled ? 1248 : 0,
    successful: hasAPIInstalled ? 1120 : 0,
    failed: hasAPIInstalled ? 128 : 0,
    lastHour: hasAPIInstalled ? 42 : 0
  });

  const [installationLocations] = useState(
    hasAPIInstalled ? [
      { id: 1, name: 'Living Room', type: 'home', status: 'active' },
      { id: 2, name: 'Front Door', type: 'security', status: 'active' },
      { id: 3, name: 'Bedroom', type: 'home', status: 'inactive' }
    ] : []
  );

  const [alerts] = useState(
    hasAPIInstalled ? [
      { id: 1, type: 'warning', message: 'Unrecognized gesture detected', time: '10 mins ago' },
      { id: 2, type: 'success', message: 'System update completed', time: '2 hours ago' },
      { id: 3, type: 'info', message: 'New gesture pattern learned', time: '1 day ago' }
    ] : [
      { id: 1, type: 'warning', message: 'No API installation detected', time: 'Just now' },
      { id: 2, type: 'error', message: 'System is unhealthy - installation required', time: 'Just now' }
    ]
  );

  if (isLoading) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4">Checking system status...</p>
        </div>
      </div>
    );
  }

  if (!hasAPIInstalled) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} mt-10 transition-colors`}>
        <Head>
          <title>GestureSecure - Setup Required</title>
        </Head>
        
        <Header theme={theme as 'light' | 'dark'} setTheme={setTheme} />
        
        <div className="flex min-h-[calc(100vh-80px)]">
          <aside className={`w-64 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-r ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} sticky top-20 h-[calc(100vh-80px)] overflow-y-auto`}>
            <nav className="py-6">
              <ul className="space-y-1">
                <li>
                  <button className="flex items-center gap-3 w-full px-6 py-3 text-gray-600 dark:text-gray-400">
                    <FaHome /> Dashboard
                  </button>
                </li>
              </ul>
            </nav>
          </aside>
          
          <main className="flex-1 p-8 overflow-y-auto">
            <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg border ${theme === 'dark' ? 'border-red-700' : 'border-red-200'}`}>
              {/* System Health Warning */}
              {/* <div className="bg-red-500 text-white p-4 rounded-lg mb-6 flex items-center gap-3">
                <FaTimesCircle className="text-xl" />
                <div>
                  <h3 className="font-bold">System Unhealthy</h3>
                  <p className="text-sm">Critical: Hobpeg software not installed</p>
                </div>
              </div> */}
              
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
                <FaExclamationCircle className="text-red-500 dark:text-red-400 text-2xl" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Setup Required</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                You haven&apos;t installed the Hobpeg software yet. The system is currently unhealthy and non-functional.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-auto mx-auto">
                <button 
                  onClick={() => router.push('/documentation')}
                  className="px-2 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Installation Guide
                </button>
                <button 
                  onClick={() => router.push('/pricing')}
                  className="px-2 py-2 cursor-pointer bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Purchase Your Plan
                </button>
                <button 
                  onClick={() => showDemo()}
                  className="px-2 py-2 cursor-pointer bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  View Dashboard Demo
                </button>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-medium mb-3">Quick Start</h3>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} text-left max-w-2xl mx-auto`}>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Purchase a plan that fits your needs</li>
                    <li>Download the Hobpeg software package</li>
                    <li>Follow the installation guide for your platform</li>
                    <li>Connect your devices to the API</li>
                    <li>Configure your gesture recognition settings</li>
                    <li>Start using GestureSecure to recognize and analyze gestures</li>
                    <li>Monitor your system health and analytics from the dashboard</li>
                    <li>Contact support <button 
                      onClick={() => router.push('/support')}
                      className="py-1 text-blue-400 cursor-pointer underline rounded-lg hover:text-blue-700 transition-colors"
                    >here</button> if you encounter any issues</li>
                  </ol>
                </div>
              </div>
              
              {/* System Health Status */}
              <div className="mt-8">
                <h3 className="font-medium mb-3">Current System Status</h3>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                    <span>System Health:</span>
                    <span className="flex items-center gap-1 text-red-500">
                      <FaTimesCircle /> Unhealthy
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                    <span>API Status:</span>
                    <span className="flex items-center gap-1 text-red-500">
                      <FaTimesCircle /> Not Installed
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                    <span>Camera Feed:</span>
                    <span className="flex items-center gap-1 text-red-500">
                      <FaTimesCircle /> Disconnected
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Gesture Processing:</span>
                    <span className="flex items-center gap-1 text-red-500">
                      <FaTimesCircle /> Offline
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

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
                <p className="text-sm">You haven&apos;t installed the Hobpeg software yet. The system is currently unhealthy and non-functional.</p>
              </div>
            </div>
          )}

          {/* System Health Status */}
          {/* {systemStatus.health === 'unhealthy' && (
            <div className="bg-red-500 text-white p-4 rounded-lg mb-6 flex items-center gap-3">
              <FaTimesCircle className="text-xl" />
              <div>
                <h3 className="font-bold">System Unhealthy</h3>
                <p className="text-sm">Critical issues detected that require attention</p>
              </div>
            </div>
          )} */}

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
                {installationLocations.length > 0 ? (
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
                ) : (
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'} text-center`}>
                    <p className="text-gray-500 dark:text-gray-400">No devices found</p>
                    <button 
                      onClick={() => router.push('/devices/add')}
                      className="mt-2 text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"
                    >
                      Add your first device
                    </button>
                  </div>
                )}
              </div>

              {/* License Information */}
              <div>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <FaKey /> License Information
                </h3>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-gray-500 dark:text-gray-400">License Type:</span>
                    <span className="font-medium">No Licence</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-gray-500 dark:text-gray-400">Expires:</span>
                    <span className="font-medium">No Expilation Date</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-500 dark:text-gray-400">Devices:</span>
                    <span className="font-medium">{installationLocations.length}/0 active</span>
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
                  <div className={`p-2 rounded-full ${alert.type === 'warning' ? 'bg-yellow-100 text-yellow-600' : alert.type === 'success' ? 'bg-green-100 text-green-600' : alert.type === 'error' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                    {alert.type === 'warning' ? <FaExclamationTriangle /> :
                     alert.type === 'success' ? <FaCheckCircle /> :
                     alert.type === 'error' ? <FaTimesCircle /> : <FaBell />}
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
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                    <span>System Health:</span>
                    {!hasAPIInstalled ? (
                      <span className="flex items-center gap-1 text-green-500">
                        <FaCheckCircle /> Healthy
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-500">
                        <FaTimesCircle /> Unhealthy
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                    <span>API Status:</span>
                    {!hasAPIInstalled ? (
                      <span className="flex items-center gap-1 text-green-500">
                        <FaCheckCircle /> Installed
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-500">
                        <FaTimesCircle /> Not Installed
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                    <span>Camera Feed:</span>
                    {!hasAPIInstalled ? (
                      <span className="flex items-center gap-1 text-green-500">
                        <FaCheckCircle /> Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-500">
                        <FaTimesCircle /> Disconnected
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Gesture Processing:</span>
                    {!hasAPIInstalled ? (
                      <span className="flex items-center gap-1 text-green-500">
                        <FaCheckCircle /> Operational
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-500">
                        <FaTimesCircle /> Offline
                      </span>
                    )}
                  </div>
                </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3">System Requirements</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    {hasAPIInstalled ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaTimesCircle className="text-red-500" />
                    )}
                    Raspberry Pi 4 (4GB RAM recommended)
                  </li>
                  <li className="flex items-center gap-2">
                    {hasAPIInstalled ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaTimesCircle className="text-red-500" />
                    )}
                    HD Camera (USB or Raspberry Pi Camera Module)
                  </li>
                  <li className="flex items-center gap-2">
                    {hasAPIInstalled ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaTimesCircle className="text-red-500" />
                    )}
                    Server (local or cloud for processing)
                  </li>
                  <li className="flex items-center gap-2">
                    {hasAPIInstalled ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaTimesCircle className="text-red-500" />
                    )}
                    Stable internet connection
                  </li>
                  <li className="flex items-center gap-2">
                    {hasAPIInstalled ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaTimesCircle className="text-red-500" />
                    )}
                    Raspberry Pi OS (64-bit recommended)
                  </li>
                  <li className="flex items-center gap-2">
                    {hasAPIInstalled ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaTimesCircle className="text-red-500" />
                    )}
                    Minimum 16GB SD card storage
                  </li>
                </ul>
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