'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useAuth, AuthProvider } from '../context/AuthContext'; 
import ProtectedRoute from '../components/ProtectedRoute';
import Head from 'next/head';
import Header from '../components/dashboard/supportHeader';
import { ThemeProvider } from 'next-themes';


interface SupportCase {
  id: string;
  title: string;
  customer: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdAt: string;
  lastUpdated: string;
  description: string;
  device?: string;
  scheduledCall?: string;
}

function SupportDashboard() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { logout } = useAuth(); 
  const [cases, setCases] = useState<SupportCase[]>([
    {
      id: '1',
      title: 'Device not recognizing gestures',
      customer: 'Sarah Wilson',
      priority: 'high',
      status: 'in-progress',
      createdAt: '2024-12-15 09:30',
      lastUpdated: '2024-12-15 14:45',
      description: 'Customer reports their device fails to recognize any gestures after latest firmware update. Tried resetting but issue persists.',
      device: 'GestureSecure Pro v2',
      scheduledCall: '2024-12-16 10:00'
    },
    {
      id: '2',
      title: 'False security alerts',
      customer: 'Mike Johnson',
      priority: 'medium',
      status: 'open',
      createdAt: '2024-12-14 11:20',
      lastUpdated: '2024-12-14 11:20',
      description: 'System keeps flagging valid gestures as security threats. Occurs about 3 times per day.',
      device: 'GestureSecure Home'
    },
    {
      id: '3',
      title: 'Request for additional devices',
      customer: 'Emma Davis',
      priority: 'low',
      status: 'open',
      createdAt: '2024-12-14 15:10',
      lastUpdated: '2024-12-14 15:10',
      description: 'Customer wants to order 2 more devices for their office expansion.'
    },
    {
      id: '4',
      title: 'Emergency - System down',
      customer: 'Bank of Kigali',
      priority: 'critical',
      status: 'in-progress',
      createdAt: '2024-12-15 08:05',
      lastUpdated: '2024-12-15 09:15',
      description: 'Entire gesture security system offline at main branch. Security team unable to authenticate.',
      device: 'GestureSecure Enterprise'
    },
    {
      id: '5',
      title: 'Training session request',
      customer: 'Lisa Brown',
      priority: 'low',
      status: 'open',
      createdAt: '2024-12-13 16:45',
      lastUpdated: '2024-12-13 16:45',
      description: 'New staff needs training on gesture authentication system. Requesting 1-hour session.'
    }
  ]);

  const [selectedCase, setSelectedCase] = useState<SupportCase | null>(null);
  const [isClosingCase, setIsClosingCase] = useState(false);
  const [newCallSchedule, setNewCallSchedule] = useState('');
  const [newDeviceOrder, setNewDeviceOrder] = useState({
    model: '',
    quantity: 1,
    customer: '',
    shippingAddress: ''
  });

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const priorityBadgeClasses = {
    low: theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600',
    medium: theme === 'dark' ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-800',
    high: theme === 'dark' ? 'bg-orange-900/30 text-orange-400' : 'bg-orange-100 text-orange-800',
    critical: theme === 'dark' ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800',
  };

  const statusBadgeClasses = {
    open: theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600',
    'in-progress': theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800',
    resolved: theme === 'dark' ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800',
    closed: theme === 'dark' ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-800',
  };

  const handleCaseClick = (caseItem: SupportCase) => {
    setSelectedCase(caseItem);
  };

  const closeCaseModal = () => {
    setSelectedCase(null);
  };

  const handleCloseCase = (caseId: string) => {
    setIsClosingCase(true);
    setTimeout(() => {
      setCases(prevCases =>
        prevCases.map(c =>
          c.id === caseId ? { ...c, status: 'closed', lastUpdated: new Date().toISOString() } : c
        )
      );
      setIsClosingCase(false);
      closeCaseModal();
      alert('Case marked as closed successfully!');
    }, 1500);
  };

  const handleScheduleCall = (caseId: string) => {
    if (!newCallSchedule) {
      alert('Please select a date and time for the call');
      return;
    }
    
    setCases(prevCases =>
      prevCases.map(c =>
        c.id === caseId ? { 
          ...c, 
          scheduledCall: newCallSchedule,
          lastUpdated: new Date().toISOString()
        } : c
      )
    );
    setNewCallSchedule('');
    alert(`Call scheduled for ${new Date(newCallSchedule).toLocaleString()}`);
  };

  const handleOrderDevice = () => {
    if (!newDeviceOrder.model || !newDeviceOrder.customer || !newDeviceOrder.shippingAddress) {
      alert('Please fill all required fields');
      return;
    }
    
    alert(`Order placed for ${newDeviceOrder.quantity} ${newDeviceOrder.model} device(s) for ${newDeviceOrder.customer}`);
    setNewDeviceOrder({
      model: '',
      quantity: 1,
      customer: '',
      shippingAddress: ''
    });
  };

  const handleStartCall = (caseItem: SupportCase) => {
    alert(`Initiating call with ${caseItem.customer} about case: ${caseItem.title}\n\nThis would launch your VoIP system in a real application.`);
  };

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`min-h-screen ${themeStyles.bgColor} ${themeStyles.textColor}`}>
      <Head>
        <title>Support Dashboard - Hobpeg</title>
        <meta name="description" content="Support Staff Dashboard for ShieldSync" />
      </Head>

      <Header theme= {theme as 'light' | 'dark'} setTheme={setTheme} logout ={logout} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Section */}
        <section className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Support Dashboard</h1>
            <p className={`mt-1 ${themeStyles.mutedText}`}>
              Welcome back! {cases.filter(c => c.status === 'open' || c.status === 'in-progress').length} active cases need your attention.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className={`p-6 rounded-lg shadow ${themeStyles.cardBg} border ${themeStyles.borderColor}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Open Cases</p>
                  <h3 className="text-3xl font-bold mt-1">
                    {cases.filter(c => c.status === 'open').length}
                  </h3>
                </div>
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <span className="text-blue-500 dark:text-blue-400">📋</span>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-lg shadow ${themeStyles.cardBg} border ${themeStyles.borderColor}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">In Progress</p>
                  <h3 className="text-3xl font-bold mt-1">
                    {cases.filter(c => c.status === 'in-progress').length}
                  </h3>
                </div>
                <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                  <span className="text-yellow-500 dark:text-yellow-400">🔄</span>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-lg shadow ${themeStyles.cardBg} border ${themeStyles.borderColor}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">High Priority</p>
                  <h3 className="text-3xl font-bold mt-1 text-orange-500">
                    {cases.filter(c => c.priority === 'high' || c.priority === 'critical').length}
                  </h3>
                </div>
                <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900/30">
                  <span className="text-orange-500 dark:text-orange-400">⚠️</span>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-lg shadow ${themeStyles.cardBg} border ${themeStyles.borderColor}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Scheduled Calls</p>
                  <h3 className="text-3xl font-bold mt-1">
                    {cases.filter(c => c.scheduledCall).length}
                  </h3>
                </div>
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                  <span className="text-green-500 dark:text-green-400">📅</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cases Table */}
          <div className={`rounded-lg shadow ${themeStyles.cardBg} border ${themeStyles.borderColor} p-6`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold flex items-center">
                <span className="mr-2">📋</span>
                Recent Support Cases
              </h3>
              <button
                onClick={() => alert('Creating new support case...')}
                className={`px-4 py-2 rounded-md text-white ${themeStyles.buttonBg} hover:opacity-90 flex items-center`}
              >
                ➕ New Case
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className={`${themeStyles.tableHeaderBg}`}>
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Case Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Priority
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {cases.map((caseItem) => (
                    <tr
                      key={caseItem.id}
                      className={`${themeStyles.tableRowHover}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium">{caseItem.title}</div>
                        <div className={`text-sm ${themeStyles.mutedText}`}>
                          {caseItem.createdAt}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {caseItem.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityBadgeClasses[caseItem.priority]}`}>
                          {caseItem.priority.charAt(0).toUpperCase() + caseItem.priority.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadgeClasses[caseItem.status]}`}>
                          {caseItem.status === 'in-progress' ? 'In Progress' :
                           caseItem.status.charAt(0).toUpperCase() + caseItem.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(caseItem.lastUpdated).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap space-x-2">
                        <button
                          onClick={() => handleCaseClick(caseItem)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                        >
                          View
                        </button>
                        {caseItem.status !== 'closed' && (
                          <button
                            onClick={() => handleStartCall(caseItem)}
                            className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300"
                          >
                            Call
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Case Details Modal */}
          {selectedCase && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
              onClick={closeCaseModal}
            >
              <div 
                className={`w-full max-w-4xl rounded-lg shadow-xl ${themeStyles.cardBg} border ${themeStyles.borderColor} max-h-[90vh] overflow-y-auto`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Case Details: {selectedCase.title}</h3>
                  <button
                    onClick={closeCaseModal}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    ✕
                  </button>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-medium mb-2">Customer Information</h4>
                      <div className={`p-4 rounded-lg ${themeStyles.inputBg} border ${themeStyles.inputBorder}`}>
                        <p className="font-medium">{selectedCase.customer}</p>
                        {selectedCase.device && (
                          <p className={`text-sm ${themeStyles.mutedText} mt-1`}>
                            Device: {selectedCase.device}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Case Status</h4>
                      <div className={`p-4 rounded-lg ${themeStyles.inputBg} border ${themeStyles.inputBorder}`}>
                        <div className="flex justify-between items-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityBadgeClasses[selectedCase.priority]}`}>
                            Priority: {selectedCase.priority}
                          </span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadgeClasses[selectedCase.status]}`}>
                            Status: {selectedCase.status === 'in-progress' ? 'In Progress' : selectedCase.status}
                          </span>
                        </div>
                        <p className={`text-sm ${themeStyles.mutedText} mt-2`}>
                          Created: {new Date(selectedCase.createdAt).toLocaleString()}
                        </p>
                        <p className={`text-sm ${themeStyles.mutedText}`}>
                          Last Updated: {new Date(selectedCase.lastUpdated).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Case Description</h4>
                    <div className={`p-4 rounded-lg ${themeStyles.inputBg} border ${themeStyles.inputBorder}`}>
                      <p>{selectedCase.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Schedule Support Call</h4>
                      <div className={`p-4 rounded-lg ${themeStyles.inputBg} border ${themeStyles.inputBorder}`}>
                        {selectedCase.scheduledCall ? (
                          <>
                            <p className="font-medium">
                              Scheduled for: {new Date(selectedCase.scheduledCall).toLocaleString()}
                            </p>
                            <button
                              onClick={() => handleStartCall(selectedCase)}
                              className="mt-3 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                            >
                              Start Call Now
                            </button>
                          </>
                        ) : (
                          <>
                            <input
                              type="datetime-local"
                              className={`w-full px-3 py-2 rounded-md ${themeStyles.inputBg} border ${themeStyles.inputBorder} mb-3`}
                              value={newCallSchedule}
                              onChange={(e) => setNewCallSchedule(e.target.value)}
                              min={new Date().toISOString().slice(0, 16)}
                            />
                            <button
                              onClick={() => handleScheduleCall(selectedCase.id)}
                              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                              Schedule Call
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Case Actions</h4>
                      <div className={`p-4 rounded-lg ${themeStyles.inputBg} border ${themeStyles.inputBorder} space-y-3`}>
                        {selectedCase.status !== 'closed' && (
                          <button
                            onClick={() => handleCloseCase(selectedCase.id)}
                            disabled={isClosingCase}
                            className={`w-full px-4 py-2 rounded-md ${isClosingCase ? 'bg-gray-500' : 'bg-purple-600 hover:bg-purple-700'} text-white`}
                          >
                            {isClosingCase ? 'Closing...' : 'Close Case'}
                          </button>
                        )}
                        <button
                          onClick={() => alert('Opening case notes editor...')}
                          className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                          Add Case Notes
                        </button>
                        <button
                          onClick={() => alert('Sending email to customer...')}
                          className="w-full px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-md hover:bg-blue-200 dark:hover:bg-blue-900/40"
                        >
                          Email Customer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Device Order Form */}
          <div className={`rounded-lg shadow ${themeStyles.cardBg} border ${themeStyles.borderColor} p-6`}>
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <span className="mr-2">📦</span>
              Order Device for Customer
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Device Model</label>
                <select
                  className={`w-full px-3 py-2 rounded-md ${themeStyles.inputBg} border ${themeStyles.inputBorder}`}
                  value={newDeviceOrder.model}
                  onChange={(e) => setNewDeviceOrder({...newDeviceOrder, model: e.target.value})}
                >
                  <option value="">Select a model</option>
                  <option value="GestureSecure Home">GestureSecure Home</option>
                  <option value="GestureSecure Pro">GestureSecure Pro</option>
                  <option value="GestureSecure Enterprise">GestureSecure Enterprise</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Quantity</label>
                <input
                  type="number"
                  min="1"
                  className={`w-full px-3 py-2 rounded-md ${themeStyles.inputBg} border ${themeStyles.inputBorder}`}
                  value={newDeviceOrder.quantity}
                  onChange={(e) => setNewDeviceOrder({...newDeviceOrder, quantity: parseInt(e.target.value) || 1})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Customer Name</label>
                <input
                  type="text"
                  className={`w-full px-3 py-2 rounded-md ${themeStyles.inputBg} border ${themeStyles.inputBorder}`}
                  value={newDeviceOrder.customer}
                  onChange={(e) => setNewDeviceOrder({...newDeviceOrder, customer: e.target.value})}
                  placeholder="Customer or organization name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Shipping Address</label>
                <input
                  type="text"
                  className={`w-full px-3 py-2 rounded-md ${themeStyles.inputBg} border ${themeStyles.inputBorder}`}
                  value={newDeviceOrder.shippingAddress}
                  onChange={(e) => setNewDeviceOrder({...newDeviceOrder, shippingAddress: e.target.value})}
                  placeholder="Full shipping address"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <button
                onClick={handleOrderDevice}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Place Order
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
export default function SupportDashboardPage() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <ThemeProvider attribute="class" defaultTheme="light">
          <SupportDashboard />
        </ThemeProvider>
      </ProtectedRoute>
    </AuthProvider>
  );
}