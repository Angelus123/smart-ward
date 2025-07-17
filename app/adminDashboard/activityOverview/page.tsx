'use client';
import { useState, useEffect, useCallback } from 'react';
import { useTheme } from 'next-themes';
import Head from 'next/head';
import Image from 'next/image'; // Import Image component
import Header from '../../components/dashboard/AdminHeader';
import { useAuth } from '../../context/AuthContext';
import { AuthProvider } from '../../context/AuthContext';
import ProtectedRoute from '@/app/components/ProtectedRoute';

interface Activity {
  id: string;
  activityType: 'login' | 'logout' | 'data_access' | 'settings_change' | 'file_upload';
  user: {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'auditor' | 'staff';
    avatar?: string;
  };
  timestamp: string;
  ipAddress: string;
  device: string;
  status: 'success' | 'failed' | 'warning';
  details: string;
}

function ManageActivities() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalActivities, setTotalActivities] = useState(0);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const { logout } = useAuth();
  const API_BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

  // Fetch activities from backend
  const fetchActivities = useCallback(
    async (page = 1) => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/activities?page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch activities');
        }

        const data = await response.json();
        setActivities(data.activities);
        setFilteredActivities(data.activities);
        setTotalPages(data.totalPages);
        setTotalActivities(data.totalCount);
        setCurrentPage(page);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Fetch activities error:', err);
      } finally {
        setLoading(false);
      }
    },
    [API_BASE_URL]
  );

  // Initial data fetch
  useEffect(() => {
    setMounted(true);
    fetchActivities();
  }, [fetchActivities]);

  // Filter activities
  useEffect(() => {
    let result = activities;

    if (searchTerm) {
      result = result.filter(
        (activity) =>
          activity.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.details.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter !== 'all') {
      result = result.filter((activity) => activity.activityType === typeFilter);
    }

    if (statusFilter !== 'all') {
      result = result.filter((activity) => activity.status === statusFilter);
    }

    if (roleFilter !== 'all') {
      result = result.filter((activity) => activity.user.role === roleFilter);
    }

    setFilteredActivities(result);
  }, [searchTerm, typeFilter, statusFilter, roleFilter, activities]);

  const statusClasses = {
    success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    failed: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  };

  const typeClasses = {
    login: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    logout: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    data_access: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
    settings_change: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    file_upload: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleViewDetails = (activity: Activity) => {
    setSelectedActivity(activity);
    setShowDetailsModal(true);
  };

  if (!mounted) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <Head>
        <title>Activity Log</title>
        <meta name="description" content="View system activity logs" />
      </Head>

      <Header theme={theme as 'light' | 'dark'} setTheme={setTheme} logout={logout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Activity Log</h1>
          <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Monitor and track all system activities ({totalActivities} total entries)
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg dark:bg-red-900/30 dark:text-red-400">
            {error}
            <button onClick={() => setError(null)} className="float-right font-bold">
              ×
            </button>
          </div>
        )}

        {/* Filters and Search */}
        <div
          className={`rounded-xl shadow-md p-6 mb-8 ${
            theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border`}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label
                className={`block text-sm font-medium mb-1 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Search Activities
              </label>
              <input
                type="text"
                placeholder="Search by user, email, or details..."
                className={`w-full p-2 border rounded-lg ${
                  theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                }`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={loading}
              />
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Activity Type
              </label>
              <select
                className={`w-full p-2 border rounded-lg ${
                  theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                }`}
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                disabled={loading}
              >
                <option value="all">All Types</option>
                <option value="login">Login</option>
                <option value="logout">Logout</option>
                <option value="data_access">Data Access</option>
                <option value="settings_change">Settings Change</option>
                <option value="file_upload">File Upload</option>
              </select>
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Status
              </label>
              <select
                className={`w-full p-2 border rounded-lg ${
                  theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                }`}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                disabled={loading}
              >
                <option value="all">All Statuses</option>
                <option value="success">Success</option>
                <option value="failed">Failed</option>
                <option value="warning">Warning</option>
              </select>
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                User Role
              </label>
              <select
                className={`w-full p-2 border rounded-lg ${
                  theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-800'
                }`}
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                disabled={loading}
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="auditor">Auditor</option>
                <option value="staff">Staff</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Activities Table */}
        {!loading && (
          <>
            <div
              className={`rounded-xl shadow-md overflow-hidden ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } border`}
            >
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        User
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Activity
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Timestamp
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className={`divide-y divide-gray-200 dark:divide-gray-700 ${
                      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                    }`}
                  >
                    {filteredActivities.length > 0 ? (
                      filteredActivities.map((activity) => (
                        <tr key={activity.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                                {activity.user.avatar ? (
                                  <Image
                                    className="h-10 w-10 rounded-full"
                                    src={activity.user.avatar}
                                    alt={activity.user.name}
                                    width={40}
                                    height={40}
                                    priority={false}
                                  />
                                ) : (
                                  <span className="text-lg">👤</span>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium">{activity.user.name}</div>
                                <div
                                  className={`text-sm ${
                                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                  }`}
                                >
                                  {activity.user.role}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  typeClasses[activity.activityType]
                                }`}
                              >
                                {activity.activityType.replace('_', ' ')}
                              </span>
                            </div>
                            <div
                              className={`text-sm mt-1 ${
                                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                              }`}
                            >
                              {activity.details.substring(0, 50)}
                              {activity.details.length > 50 ? '...' : ''}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {formatDate(activity.timestamp)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                statusClasses[activity.status]
                              }`}
                            >
                              {activity.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleViewDetails(activity)}
                              className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center">
                          No activities found matching your criteria
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Activity Details Modal */}
            {showDetailsModal && selectedActivity && (
              <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
                <div
                  className={`p-6 rounded-lg shadow-xl w-full max-w-2xl ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">Activity Details</h3>
                    <button
                      onClick={() => setShowDetailsModal(false)}
                      className={`p-1 rounded-full ${
                        theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">User Information</h4>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center mr-3">
                            {selectedActivity.user.avatar ? (
                              <Image
                                className="h-12 w-12 rounded-full"
                                src={selectedActivity.user.avatar}
                                alt={selectedActivity.user.name}
                                width={48}
                                height={48}
                                priority={false}
                              />
                            ) : (
                              <span className="text-xl">👤</span>
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{selectedActivity.user.name}</div>
                            <div
                              className={`text-sm ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                              }`}
                            >
                              {selectedActivity.user.email}
                            </div>
                            <div
                              className={`text-xs mt-1 px-2 inline-flex rounded-full ${
                                selectedActivity.user.role === 'admin'
                                  ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                                  : selectedActivity.user.role === 'auditor'
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                              }`}
                            >
                              {selectedActivity.user.role}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Activity Information</h4>
                      <div className="space-y-2">
                        <div>
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded-full ${
                              typeClasses[selectedActivity.activityType]
                            }`}
                          >
                            {selectedActivity.activityType.replace('_', ' ')}
                          </span>
                          <span
                            className={`ml-2 text-xs font-medium px-2 py-1 rounded-full ${
                              statusClasses[selectedActivity.status]
                            }`}
                          >
                            {selectedActivity.status}
                          </span>
                        </div>
                        <div
                          className={`text-sm ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                          }`}
                        >
                          <div>Time: {formatDate(selectedActivity.timestamp)}</div>
                          <div>IP: {selectedActivity.ipAddress}</div>
                          <div>Device: {selectedActivity.device}</div>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <h4 className="font-medium mb-2">Details</h4>
                      <div
                        className={`p-3 rounded-lg ${
                          theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                        }`}
                      >
                        <pre
                          className={`text-sm whitespace-pre-wrap ${
                            theme === 'dark' ? 'text-gray-300' : 'text-gray-800'
                          }`}
                        >
                          {selectedActivity.details}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div
                className={`mt-4 flex items-center justify-between ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                <div className="text-sm">
                  Showing page <span className="font-medium">{currentPage}</span> of{' '}
                  <span className="font-medium">{totalPages}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    className={`px-3 py-1 rounded-md ${
                      currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                    } ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                    onClick={() => fetchActivities(currentPage - 1)}
                    disabled={currentPage === 1 || loading}
                  >
                    Previous
                  </button>
                  <button
                    className={`px-3 py-1 rounded-md ${
                      currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                    } ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                    onClick={() => fetchActivities(currentPage + 1)}
                    disabled={currentPage === totalPages || loading}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <ManageActivities />
      </ProtectedRoute>
    </AuthProvider>
  );
}