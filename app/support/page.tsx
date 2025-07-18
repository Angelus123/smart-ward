'use client';

import { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import Header from '../components/Header';
import { useTheme } from 'next-themes';
import { AuthProvider } from '../context/AuthContext';
import { FiPaperclip, FiCheckCircle, FiAlertCircle, FiClock, FiChevronRight, FiMessageSquare } from 'react-icons/fi';
import Footer from '../components/Footer';

type SupportTicket = {
  id: string;
  subject: string;
  message: string;
  status: 'open' | 'pending' | 'resolved';
  createdAt: Date;
  updatedAt: Date;
  responses: SupportResponse[];
  attachments: string[];
};

type SupportResponse = {
  id: string;
  message: string;
  isAdmin: boolean;
  createdAt: Date;
};

function Support() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'new' | 'tickets'>('new');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    setMounted(true);
    // Load sample tickets
    setTickets([
      {
        id: '1',
        subject: 'Installation Issue',
        message: 'Having trouble installing the software on Raspberry Pi. Getting error code 0x80070005 during setup.',
        status: 'open',
        createdAt: new Date(Date.now() - 86400000),
        updatedAt: new Date(Date.now() - 86300000),
        responses: [
          {
            id: '1-1',
            message: 'Thank you for reaching out. We have received your ticket and assigned it to our technical team. Please try running the installer as administrator.',
            isAdmin: true,
            createdAt: new Date(Date.now() - 86300000)
          }
        ],
        attachments: ['error_log.txt']
      },
      {
        id: '2',
        subject: 'Gesture Not Recognized',
        message: 'The system is not recognizing my custom gesture that I created last week. It was working fine before.',
        status: 'pending',
        createdAt: new Date(Date.now() - 3600000),
        updatedAt: new Date(Date.now() - 1800000),
        responses: [
          {
            id: '2-1',
            message: 'We need more information to diagnose this issue. Could you please send us a video of the gesture you\'re trying to use?',
            isAdmin: true,
            createdAt: new Date(Date.now() - 1800000)
          }
        ],
        attachments: ['gesture_settings.json']
      },
      {
        id: '3',
        subject: 'Performance Optimization',
        message: 'The system seems to be lagging when multiple gestures are registered quickly in succession.',
        status: 'resolved',
        createdAt: new Date(Date.now() - 259200000),
        updatedAt: new Date(Date.now() - 86400000),
        responses: [
          {
            id: '3-1',
            message: 'This was fixed in version 2.1.0. Please update your software to the latest version.',
            isAdmin: true,
            createdAt: new Date(Date.now() - 86400000)
          }
        ],
        attachments: []
      }
    ]);
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTicket: SupportTicket = {
      id: Math.random().toString(36).substring(2, 9),
      subject: formData.subject,
      message: formData.message,
      status: 'open',
      createdAt: new Date(),
      updatedAt: new Date(),
      responses: [],
      attachments: selectedFile ? [selectedFile.name] : []
    };
    setTickets([newTicket, ...tickets]);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setSelectedFile(null);
    setActiveTab('tickets');
    console.log('New ticket created:', newTicket);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <FiAlertCircle className="text-yellow-500" />;
      case 'pending':
        return <FiClock className="text-blue-500" />;
      case 'resolved':
        return <FiCheckCircle className="text-green-500" />;
      default:
        return <FiClock className="text-gray-500" />;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-pulse text-gray-500 dark:text-gray-400">Loading Support...</div>
      </div>
    );
  }

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen transition-colors duration-200 mt-14 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Header theme={theme as 'light' | 'dark'} setTheme={setTheme} />

      <main className="container mx-auto py-8 mt-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className={`w-full md:w-64 p-4 rounded-lg shadow-sm border transition-colors duration-200 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
            <h2 className="text-xl font-bold mb-4">Support Center</h2>
            <nav>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => {
                      setActiveTab('new');
                      setSelectedTicket(null);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${activeTab === 'new' && !selectedTicket
                        ? isDark ? 'bg-blue-900 text-white' : 'bg-blue-100 text-blue-800'
                        : isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                  >
                    New Ticket
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveTab('tickets');
                      setSelectedTicket(null);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${activeTab === 'tickets' && !selectedTicket
                        ? isDark ? 'bg-blue-900 text-white' : 'bg-blue-100 text-blue-800'
                        : isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                  >
                    My Tickets
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'new' && !selectedTicket ? (
              <div className={`p-6 rounded-lg shadow-sm border transition-colors duration-200 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                <h1 className="text-2xl sm:text-3xl font-bold mb-6">New Support Ticket</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                          }`}
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                          }`}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                        }`}
                      placeholder="Briefly describe your issue"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                        }`}
                      placeholder="Please describe your issue in detail..."
                    ></textarea>
                  </div>

                  <div>
                    <label
                      htmlFor="attachment"
                      className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      Attachments (Optional)
                    </label>
                    <div className="flex items-center">
                      <label
                        htmlFor="attachment"
                        className={`cursor-pointer px-4 py-2 rounded-lg border flex items-center ${isDark ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-white border-gray-300 hover:bg-gray-50'
                          }`}
                      >
                        <FiPaperclip className="mr-2" />
                        <span>{selectedFile ? selectedFile.name : 'Choose file'}</span>
                      </label>
                      {selectedFile && (
                        <button
                          type="button"
                          onClick={() => setSelectedFile(null)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      )}
                      <input
                        id="attachment"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                    <p className={`mt-1 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Maximum file size: 5MB. Supported formats: .pdf, .jpg, .png, .txt
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Submit Ticket
                    </button>
                  </div>
                </form>
              </div>
            ) : selectedTicket ? (
              <div className={`p-6 rounded-lg shadow-sm border transition-colors duration-200 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className={`flex items-center mb-4 text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'}`}
                >
                  <FiChevronRight className="transform rotate-180 mr-1" />
                  Back to tickets
                </button>

                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl sm:text-3xl font-bold">{selectedTicket.subject}</h1>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(selectedTicket.status)}
                    <span className="capitalize">{selectedTicket.status}</span>
                  </div>
                </div>

                <div className="flex justify-between text-sm mb-4">
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Created: {formatDate(selectedTicket.createdAt)}
                  </span>
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Last updated: {formatDate(selectedTicket.updatedAt)}
                  </span>
                </div>

                <div className={`p-4 rounded-lg mb-6 ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h3 className="font-medium mb-2">Initial Message</h3>
                  <p className="whitespace-pre-line">{selectedTicket.message}</p>
                </div>

                {selectedTicket.attachments.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Attachments</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTicket.attachments.map((file, index) => (
                        <a
                          key={index}
                          href="#"
                          className={`text-sm px-3 py-2 rounded-lg flex items-center ${isDark ? 'bg-gray-700 border border-gray-600 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                        >
                          <FiPaperclip className="mr-2" />
                          {file}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  <h3 className="text-xl font-bold flex items-center">
                    <FiMessageSquare className="mr-2" />
                    Conversation History
                  </h3>

                  {selectedTicket.responses.length > 0 ? (
                    selectedTicket.responses.map(response => (
                      <div
                        key={response.id}
                        className={`p-4 rounded-lg ${response.isAdmin
                            ? isDark ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-100'
                            : isDark ? 'bg-gray-700 border border-gray-600' : 'bg-gray-100 border border-gray-200'
                          }`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">
                            {response.isAdmin ? 'Support Agent' : 'You'}
                          </span>
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {formatDate(response.createdAt)}
                          </span>
                        </div>
                        <p className="whitespace-pre-line">{response.message}</p>
                      </div>
                    ))
                  ) : (
                    <p className={`text-center py-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      No responses yet
                    </p>
                  )}

                  <div className="mt-8">
                    <h4 className="font-medium mb-3">Add to this conversation</h4>
                    <textarea
                      className={`w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 ${isDark ? 'bg-gray-700 border-gray-600 focus:ring-blue-500' : 'bg-white border-gray-300 focus:ring-blue-500'
                        }`}
                      rows={4}
                      placeholder="Type your message here..."
                    ></textarea>
                    <div className="flex justify-between items-center">
                      <div>
                        <label htmlFor="reply-attachment" className="cursor-pointer">
                          <FiPaperclip className="inline mr-1" />
                          <span className="text-sm">Attach file</span>
                          <input
                            id="reply-attachment"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                      <button
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`p-6 rounded-lg shadow-sm border transition-colors duration-200 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                <h1 className="text-2xl sm:text-3xl font-bold mb-6">My Support Tickets</h1>

                {tickets.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">You don&apos;t have any support tickets yet.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                          <th className="text-left py-3 px-4">Ticket ID</th>
                          <th className="text-left py-3 px-4">Subject</th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-left py-3 px-4">Created</th>
                          <th className="text-left py-3 px-4">Last Updated</th>
                          <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tickets.map(ticket => (
                          <tr
                            key={ticket.id}
                            className={`border-b ${isDark ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}
                          >
                            <td className="py-3 px-4">#{ticket.id.substring(0, 6)}</td>
                            <td className="py-3 px-4 font-medium">{ticket.subject}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                {getStatusIcon(ticket.status)}
                                <span className="ml-2 capitalize">{ticket.status}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">{formatDate(ticket.createdAt)}</td>
                            <td className="py-3 px-4">{formatDate(ticket.updatedAt)}</td>
                            <td className="py-3 px-4">
                              <button
                                onClick={() => setSelectedTicket(ticket)}
                                className={`px-3 py-1 rounded-md text-sm ${isDark ? 'bg-blue-900 hover:bg-blue-800' : 'bg-blue-100 hover:bg-blue-200'
                                  }`}
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer theme={theme as 'light' | 'dark'} setTheme={setTheme} />
    </div>
  );
}

export default function SupportPage() {
  return (
    <AuthProvider>
        <Support />
    </AuthProvider>
  );
}