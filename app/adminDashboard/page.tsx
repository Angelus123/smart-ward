'use client';
import { useState, useEffect, useCallback } from 'react';
import { useTheme } from 'next-themes';
import Head from 'next/head';
import Image from 'next/image'; // Import Image component
import HeaderNav from '@/app/components/dashboard/AdminHeader';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { AuthProvider, useAuth } from '../context/AuthContext';

interface RecentItem {
    id: string;
    name: string;
    role: string;
    time: string;
    avatar?: string;
}

interface Role {
    id: string;
    name: string;
    count: number;
    color: string;
}

interface HealthItem {
    id: string;
    name: string;
    status: 'online' | 'connected' | 'warning' | 'offline';
    icon: string;
}

interface User {
    id: string | number;
    name: string;
    role: string;
    lastActive: string;
}

function AdminDashboardContent() {
    const { theme, setTheme } = useTheme();
    const { logout } = useAuth();
    const [mounted, setMounted] = useState(false);
    const API_BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

    // State for recent users
    const [recentUsers, setRecentUsers] = useState<RecentItem[]>([]);
    const [loadingRecentUsers, setLoadingRecentUsers] = useState(true);

    // Stats data
    const [stats, setStats] = useState({
        totalUsers: 0,
        filesUploaded: 0,
        otpsSent: 0,
        filesFlagged: 0,
        activeSessions: 0,
    });

    const [roles] = useState<Role[]>([
        { id: '1', name: 'Administrators', count: 3, color: 'bg-purple-500' },
        { id: '2', name: 'Managers', count: 8, color: 'bg-blue-500' },
        { id: '3', name: 'Auditors', count: 15, color: 'bg-green-500' },
        { id: '4', name: 'Staff', count: 229, color: 'bg-yellow-500' },
    ]);

    const [healthItems] = useState<HealthItem[]>([
        { id: '1', name: 'Database', status: 'online', icon: '💾' },
        { id: '2', name: 'API Server', status: 'online', icon: '🖥️' },
        { id: '3', name: 'AI Service', status: 'connected', icon: '🧠' },
        { id: '4', name: 'Email Service', status: 'warning', icon: '✉️' },
    ]);

    const handleAction = (action: string) => {
        switch (action) {
            case 'add-user':
                console.log('Add user clicked');
                break;
            case 'view-reports':
                console.log('View reports clicked');
                break;
            case 'settings':
                console.log('Settings clicked');
                break;
            case 'audit-logs':
                console.log('Audit logs clicked');
                break;
            default:
                break;
        }
    };

    // Fetch recent users from API
    const fetchRecentUsers = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/auth/users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) throw new Error('Failed to fetch users');

            const data = await response.json();
            setStats((prev) => ({ ...prev, totalUsers: data.users.length || 0 }));

            const transformedUsers = data.users.slice(0, 4).map((user: User) => ({
                id: user.id,
                name: user.name,
                role: user.role,
                time: formatTimeAgo(user.lastActive),
                avatar: user.name
                    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`
                    : undefined, // Fallback to undefined if name is missing
            }));

            setRecentUsers(transformedUsers);
        } catch (err) {
            console.error('Fetch recent users error:', err);
            setRecentUsers([
                {
                    id: '1',
                    name: 'Alex Johnson',
                    role: 'Administrator',
                    time: '2 min ago',
                    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
                },
                {
                    id: '2',
                    name: 'Sarah Williams',
                    role: 'Manager',
                    time: '15 min ago',
                    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
                },
                {
                    id: '3',
                    name: 'Michael Chen',
                    role: 'Auditor',
                    time: '1 hour ago',
                    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
                },
                {
                    id: '4',
                    name: 'Emily Davis',
                    role: 'Staff',
                    time: '3 hours ago',
                    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
                },
            ]);
        } finally {
            setLoadingRecentUsers(false);
        }
    }, [API_BASE_URL]);

    const formatTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) return `${diffInSeconds} sec ago`;
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        return `${Math.floor(diffInSeconds / 86400)} days ago`;
    };

    useEffect(() => {
        setMounted(true);
        fetchRecentUsers();

        // Initialize with sample stats
        setStats({
            totalUsers: 1248,
            filesUploaded: 342,
            otpsSent: 87,
            filesFlagged: 23,
            activeSessions: 56,
        });
    }, [fetchRecentUsers]);

    if (!mounted) {
        return (
            <div
                className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900"
            >
                Loading...
            </div>
        );
    }

    const statusColors = {
        online: 'bg-green-500',
        connected: 'bg-blue-500',
        warning: 'bg-yellow-500',
        offline: 'bg-red-500',
    };

    return (
        <div
            className={`min-h-screen ${theme === 'dark' ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'
                }`}
        >
            <Head>
                <title>Admin Console | Hobpeg</title>
                <meta name="description" content="Administration dashboard for ShieldSync" />
            </Head>

            <HeaderNav theme={theme as 'light' | 'dark'} setTheme={setTheme} logout={logout} />

            <main className="container mx-auto px-4 py-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Dashboard Overview</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                        Welcome back! Here&apos;s what&apos;s happening with your platform today.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Total Users */}
                    <div
                        className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                            } shadow-sm border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Total Users
                                </p>
                                <h3 className="text-3xl font-bold mt-1">{stats.totalUsers}</h3>
                                <p className="text-sm text-green-500 mt-1">↑ 12% from last week</p>
                            </div>
                            <div
                                className={`p-3 rounded-full ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'
                                    }`}
                            >
                                <span className="text-blue-500 dark:text-blue-400 text-2xl">👥</span>
                            </div>
                        </div>
                    </div>

                    {/* Files Uploaded */}
                    <div
                        className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                            } shadow-sm border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Files Uploaded
                                </p>
                                <h3 className="text-3xl font-bold mt-1">{stats.filesUploaded}</h3>
                                <p className="text-sm text-green-500 mt-1">↑ 8% from yesterday</p>
                            </div>
                            <div
                                className={`p-3 rounded-full ${theme === 'dark' ? 'bg-purple-900/20' : 'bg-purple-100'
                                    } `}
                            >
                                <span className="text-purple-500 dark:text-purple-400 text-2xl">📁</span>
                            </div>
                        </div>
                    </div>

                    {/* OTPs Sent */}
                    <div
                        className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                            } shadow-sm border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    OTPs Sent
                                </p>
                                <h3 className="text-3xl font-bold mt-1">{stats.otpsSent}</h3>
                                <p className="text-sm text-gray-500 mt-1">↔ Same as yesterday</p>
                            </div>
                            <div
                                className={`p-3 rounded-full ${theme === 'dark' ? 'bg-green-900/30' : 'bg-green-100'
                                    }`}
                            >
                                <span className="text-green-500 dark:text-green-400 text-2xl">🔐</span>
                            </div>
                        </div>
                    </div>

                    {/* Flagged Files */}
                    <div
                        className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                            } shadow-sm border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Flagged Files
                                </p>
                                <h3 className="text-3xl font-bold mt-1">{stats.filesFlagged}</h3>
                                <p className="text-sm text-red-500 mt-1">↑ 3% from yesterday</p>
                            </div>
                            <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30">
                                <span className="text-red-500 dark:text-red-400 text-2xl">⚠️</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Activity */}
                    <div
                        className={`lg:col-span-2 p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                            } shadow-sm border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold">Recent Activity</h2>
                            <button className="text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
                                View All
                            </button>
                        </div>

                        {loadingRecentUsers ? (
                            <div className="flex justify-center items-center h-40">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {recentUsers.map((user) => (
                                    <div
                                        key={user.id}
                                        className={`flex items-center p-3 ${theme === 'dark'
                                                ? 'bg-gray-700/30 text-gray-100 hover:bg-gray-700/50'
                                                : 'bg-gray-100/40 hover:bg-gray-100'
                                            } cursor-pointer rounded-lg transition-colors`}
                                    >
                                        {user.avatar ? (
                                            <Image
                                                src={user.avatar}
                                                alt={user.name}
                                                width={40}
                                                height={40}
                                                className="w-10 h-10 rounded-full object-cover mr-4"
                                                priority={false}
                                            />
                                        ) : (
                                            <span className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center mr-4 text-lg">
                                                👤
                                            </span>
                                        )}
                                        <div className="flex-1">
                                            <h4 className="font-medium">{user.name}</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{user.role}</p>
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">{user.time}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* System Health */}
                    <div
                        className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white'
                            } shadow-sm border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
                    >
                        <h2 className="text-xl font-semibold mb-6">System Health</h2>
                        <div className="space-y-4">
                            {healthItems.map((item) => (
                                <div
                                    key={item.id}
                                    className={`flex items-center justify-between p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-100'
                                        }`}
                                >
                                    <div className="flex items-center">
                                        <span className="text-xl mr-3">{item.icon}</span>
                                        <span>{item.name}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className={`w-2 h-2 rounded-full mr-2 ${statusColors[item.status]}`}></span>
                                        <span className="text-sm capitalize">{item.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8">
                            <h3 className="font-medium mb-4">User Roles Distribution</h3>
                            <div className="space-y-3">
                                {roles.map((role) => (
                                    <div key={role.id} className="flex items-center">
                                        <div className={`w-3 h-3 rounded-full ${role.color} mr-3`}></div>
                                        <span className="flex-1 text-sm">{role.name}</span>
                                        <span className="text-sm font-medium">{role.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div
                    className={`mt-6 p-6 rounded-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                        } shadow-sm border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
                >
                    <h2
                        className={`text-xl font-semibold mb-6 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
                            }`}
                    >
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <button
                            onClick={() => handleAction('add-user')}
                            className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${theme === 'dark'
                                    ? 'bg-blue-900/20 hover:bg-blue-900/30 text-blue-200 hover:text-blue-100 border border-blue-900/30'
                                    : 'bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-100'
                                }`}
                        >
                            <span className="text-2xl mb-2">👤</span>
                            <span>Add User</span>
                        </button>

                        <button
                            onClick={() => handleAction('view-reports')}
                            className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${theme === 'dark'
                                    ? 'bg-purple-900/20 hover:bg-purple-900/30 text-purple-200 hover:text-purple-100 border border-purple-900/30'
                                    : 'bg-purple-50 hover:bg-purple-100 text-purple-600 border border-purple-100'
                                }`}
                        >
                            <span className="text-2xl mb-2">📊</span>
                            <span>View Reports</span>
                        </button>

                        <button
                            onClick={() => handleAction('settings')}
                            className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${theme === 'dark'
                                    ? 'bg-emerald-900/20 hover:bg-emerald-900/30 text-emerald-200 hover:text-emerald-100 border border-emerald-900/30'
                                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-100'
                                }`}
                        >
                            <span className="text-2xl mb-2">⚙️</span>
                            <span>Settings</span>
                        </button>

                        <button
                            onClick={() => handleAction('audit-logs')}
                            className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${theme === 'dark'
                                    ? 'bg-amber-900/20 hover:bg-amber-900/30 text-amber-200 hover:text-amber-100 border border-amber-900/30'
                                    : 'bg-amber-50 hover:bg-amber-100 text-amber-600 border border-amber-100'
                                }`}
                        >
                            <span className="text-2xl mb-2">🔍</span>
                            <span>Audit Logs</span>
                        </button>
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
                <AdminDashboardContent />
            </ProtectedRoute>
        </AuthProvider>
    );
}