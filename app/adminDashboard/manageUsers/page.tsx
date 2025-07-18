'use client';
import { useState, useEffect, useCallback } from 'react';
import { useTheme } from 'next-themes';
import Head from 'next/head';
import Image from 'next/image'; // Import Image component
import Header from '../../components/dashboard/AdminHeader';
import { useAuth } from '../../context/AuthContext';
import { AuthProvider } from '../../context/AuthContext';
import ProtectedRoute from '@/app/components/ProtectedRoute';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'auditor' | 'staff';
  status: 'active' | 'suspended' | 'pending';
  lastActive: string;
  avatar?: string;
}

function ManageUsers() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<User>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
  });
  const [addUserLoading, setAddUserLoading] = useState(false);
  const [addUserError, setAddUserError] = useState('');

  const { logout } = useAuth();
  const API_BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;
  console.log('API_BASE_URL:', API_BASE_URL);

  // Fetch users from backend
  const fetchUsers = useCallback(
    async (page = 1) => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/auth/users?page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        // Check response content type
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid response format');
        }

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data.users);
        setFilteredUsers(data.users);
        setTotalPages(data.totalPages);
        setTotalUsers(data.totalCount);
        setCurrentPage(page);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Fetch users error:', err);
      } finally {
        setLoading(false);
      }
    },
    [API_BASE_URL]
  );

  // Add new user
  const handleAddUser = async () => {
    try {
      setAddUserLoading(true);
      setAddUserError('');
      const token = localStorage.getItem('token');

      const response = await fetch(`${API_BASE_URL}/auth/admin/create-user`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newUser.name,
          email: newUser.email,
          password: 'TempPassword123!',
          role: 'staff',
        }),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response format');
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add user');
      }

      const createdUser = await response.json();
      setUsers([...users, createdUser]);
      setTotalUsers(totalUsers + 1);
      setNewUser({ name: '', email: '' });
      setShowAddUserModal(false);
    } catch (err) {
      setAddUserError(err instanceof Error ? err.message : 'Failed to add user');
      console.error('Add user error:', err);
    } finally {
      setAddUserLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    setMounted(true);
    fetchUsers();
  }, [fetchUsers, saveSuccess]);

  // Filter users
  useEffect(() => {
    let result = users;

    if (searchTerm) {
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter !== 'all') {
      result = result.filter((user) => user.role === roleFilter);
    }

    if (statusFilter !== 'all') {
      result = result.filter((user) => user.status === statusFilter);
    }

    setFilteredUsers(result);
  }, [searchTerm, roleFilter, statusFilter, users]);

  const handleEdit = (user: User) => {
    setEditingUserId(user.id);
    setEditForm({
      role: user.role,
      status: user.status,
    });
  };

  const handleSave = async (userId: string) => {
    try {
      setLoading(true);
      console.log('Saving user:', userId, editForm);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/auth/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response format');
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update user');
      }

      const updatedUser = await response.json();
      setUsers(users.map((user) => (user.id === userId ? updatedUser : user)));
      setEditingUserId(null);
      setSaveSuccess(!saveSuccess);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user');
      console.error('Save user error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingUserId(null);
  };

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/auth/users/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete user');
      }

      setUsers(users.filter((user) => user.id !== userId));
      setTotalUsers(totalUsers - 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user');
      console.error('Delete user error:', err);
    } finally {
      setLoading(false);
    }
  };

  const statusClasses = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    suspended: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  };

  const roleClasses = {
    admin: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    auditor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    staff: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  };

  if (!mounted) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <Head>
        <title>Manage Users - ShieldSync</title>
        <meta name="description" content="Manage Users for ShieldSync" />
      </Head>

      <Header theme={theme as 'light' | 'dark'} setTheme={setTheme} logout={logout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Manage Users</h1>
            <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              View, edit, and manage all user accounts ({totalUsers} total users)
            </p>
          </div>
          <button
            onClick={() => setShowAddUserModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
            disabled={loading}
          >
            <span className="mr-2">➕</span> Add New User
          </button>
        </div>

        {/* Add User Modal */}
        {showAddUserModal && (
          <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
            <div
              className={`p-6 rounded-lg shadow-xl w-full max-w-md ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <h3 className="text-xl font-bold mb-4">Add New User</h3>

              {addUserError && (
                <div className="mb-4 p-2 bg-red-100 text-red-700 rounded dark:bg-red-900/30 dark:text-red-400">
                  {addUserError}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label
                    className={`block mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    className={`w-full p-2 border rounded-lg ${
                      theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    }`}
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  />
                </div>

                <div>
                  <label
                    className={`block mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className={`w-full p-2 border rounded-lg ${
                      theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    }`}
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddUserModal(false)}
                  className={`px-4 py-2 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                  disabled={addUserLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddUser}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center"
                  disabled={addUserLoading || !newUser.name || !newUser.email}
                >
                  {addUserLoading ? 'Adding...' : 'Add User'}
                </button>
              </div>
            </div>
          </div>
        )}

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Search Users
              </label>
              <input
                type="text"
                placeholder="Search by name or email..."
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
                Filter by Role
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

            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Filter by Status
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
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="pending">Pending</option>
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

        {/* Users Table */}
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
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      >
                        Last Active
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
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                                {user.avatar ? (
                                  <Image
                                    className="h-10 w-10 rounded-full"
                                    src={user.avatar}
                                    alt={user.name}
                                    width={40}
                                    height={40}
                                    priority={false}
                                  />
                                ) : (
                                  <span className="text-lg">👤</span>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium">{user.name}</div>
                                <div
                                  className={`text-sm ${
                                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                  }`}
                                >
                                  ID: {user.id}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm">{user.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {editingUserId === user.id ? (
                              <select
                                className={`p-1 border rounded ${
                                  theme === 'dark'
                                    ? 'bg-gray-700 border-gray-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-800'
                                }`}
                                value={editForm.role || user.role}
                                onChange={(e) =>
                                  setEditForm({ ...editForm, role: e.target.value as User['role'] })
                                }
                                disabled={loading}
                              >
                                <option value="admin">Admin</option>
                                <option value="auditor">Auditor</option>
                                <option value="staff">Staff</option>
                              </select>
                            ) : (
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  roleClasses[user.role]
                                }`}
                              >
                                {user.role}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {editingUserId === user.id ? (
                              <select
                                className={`p-1 border rounded ${
                                  theme === 'dark'
                                    ? 'bg-gray-700 border-gray-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-800'
                                }`}
                                value={editForm.status || user.status}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    status: e.target.value as User['status'],
                                  })
                                }
                                disabled={loading}
                              >
                                <option value="active">Active</option>
                                <option value="suspended">Suspended</option>
                                <option value="pending">Pending</option>
                              </select>
                            ) : (
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  statusClasses[user.status]
                                }`}
                              >
                                {user.status}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{user.lastActive}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {editingUserId === user.id ? (
                              <div className="flex space-x-2 justify-end">
                                <button
                                  onClick={() => handleSave(user.id)}
                                  className="text-green-600 hover:text-green-900 dark:hover:text-green-400"
                                  disabled={loading}
                                >
                                  Save
                                </button>
                                <button
                                  onClick={handleCancel}
                                  className="text-gray-600 hover:text-gray-900 dark:hover:text-gray-400"
                                  disabled={loading}
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <div className="flex space-x-2 justify-end">
                                <button
                                  onClick={() => handleEdit(user)}
                                  className="text-blue-600 hover:text-blue-900 dark:hover:text-blue-400"
                                  disabled={loading}
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(user.id)}
                                  className="text-red-600 hover:text-red-900 dark:hover:text-red-400"
                                  disabled={loading}
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center">
                          No users found matching your criteria
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

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
                    onClick={() => fetchUsers(currentPage - 1)}
                    disabled={currentPage === 1 || loading}
                  >
                    Previous
                  </button>
                  <button
                    className={`px-3 py-1 rounded-md ${
                      currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                    } ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                    onClick={() => fetchUsers(currentPage + 1)}
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
        <ManageUsers />
      </ProtectedRoute>
    </AuthProvider>
  );
}