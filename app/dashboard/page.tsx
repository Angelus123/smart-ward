'use client'
import { useState } from 'react';
import Head from 'next/head';
import { 
  FaShieldAlt, 
  FaTachometerAlt, 
  FaFolderOpen, 
  FaFlag, 
  FaUsers, 
  FaClipboardList, 
  FaBell, 
  FaChartBar, 
  FaCog, 
  FaChartPie, 
  FaChartLine, 
  FaSearch, 
  FaDownload, 
  FaSyncAlt,
  FaEye, 
  FaCheck, 
  FaExclamationTriangle, 
  FaBan, 
  FaTimes, 
  FaCheckDouble, 
  FaFileAlt, 
  FaLock, 
  FaBrain,
  FaFilter,
  FaHistory
} from 'react-icons/fa';
import { Header } from '../components/dashboard/Header';
import { MetricsCard } from '../components/dashboard/MetricsCard';

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 font-sans">
      <Head>
        <title>ShieldSync Secure Audit Panel</title>
      </Head>

      {/* Header */}
      <Header />

      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto">
          <nav className="py-6">
            <ul className="space-y-1">
              <li>
                <a href="#" className="flex items-center gap-3 px-6 py-3 text-blue-900 bg-blue-50 font-medium">
                  <FaTachometerAlt /> Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 px-6 py-3 text-gray-600 hover:text-blue-900 hover:bg-gray-50 transition-colors">
                  <FaFolderOpen /> All Files
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 px-6 py-3 text-gray-600 hover:text-blue-900 hover:bg-gray-50 transition-colors">
                  <FaFlag /> Flagged Files
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 px-6 py-3 text-gray-600 hover:text-blue-900 hover:bg-gray-50 transition-colors">
                  <FaUsers /> User Activity
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 px-6 py-3 text-gray-600 hover:text-blue-900 hover:bg-gray-50 transition-colors">
                  <FaClipboardList /> Access Logs
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 px-6 py-3 text-gray-600 hover:text-blue-900 hover:bg-gray-50 transition-colors">
                  <FaBell /> Alerts & Notifications
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 px-6 py-3 text-gray-600 hover:text-blue-900 hover:bg-gray-50 transition-colors">
                  <FaChartBar /> Reports
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 px-6 py-3 text-gray-600 hover:text-blue-900 hover:bg-gray-50 transition-colors">
                  <FaCog /> Settings
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Quick Metrics Cards */}
          <MetricsCard />

          {/* File Integrity Summary */}
          <div className="bg-white border border-gray-200 rounded-xl mb-8 overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-blue-900 flex items-center gap-2">
                <FaChartPie /> File Integrity Summary
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              <div className="h-48 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 italic">
                <div className="text-center">
                  <FaChartPie className="text-3xl mb-2 mx-auto" />
                  File Status Distribution<br />
                  <small className="text-xs">(Verified, Tampered, Pending)</small>
                </div>
              </div>
              <div className="h-48 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 italic">
                <div className="text-center">
                  <FaChartBar className="text-3xl mb-2 mx-auto" />
                  File Types Breakdown<br />
                  <small className="text-xs">(PDF, DOCX, XLSX, ZIP)</small>
                </div>
              </div>
              <div className="h-48 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 italic">
                <div className="text-center">
                  <FaChartLine className="text-3xl mb-2 mx-auto" />
                  File Volume Trends<br />
                  <small className="text-xs">(Last 7 days)</small>
                </div>
              </div>
            </div>
          </div>

          {/* Suspicious Files Filter */}
          <div className="bg-white border border-gray-200 rounded-xl mb-8 p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
              <FaFilter /> Suspicious Files Filter
            </h3>
            <div className="flex gap-2 mb-4">
              <input 
                type="text" 
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                placeholder="Search files, keywords, emails..." 
              />
              <button className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors flex items-center gap-2">
                <FaSearch /> Search
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-2">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Sender Email</label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  placeholder="sender@bk.rw" 
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Recipient</label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  placeholder="recipient@bk.rw" 
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Date Range</label>
                <input 
                  type="date" 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">File Type</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>All Types</option>
                  <option>PDF</option>
                  <option>XLSX</option>
                  <option>DOCX</option>
                  <option>ZIP</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Integrity Status</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>All Status</option>
                  <option>Verified</option>
                  <option>Tampered</option>
                  <option>Unverified</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Keywords</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  placeholder="password, account no." 
                />
              </div>
            </div>
          </div>

          {/* Recent File Activity */}
          <div className="bg-white border border-gray-200 rounded-xl mb-8 overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-blue-900 flex items-center gap-2">
                <FaHistory /> Recent File Activity
              </h2>
              <div className="flex gap-2">
                <button className="bg-white border border-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <FaDownload /> Download Metadata
                </button>
                <button className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors flex items-center gap-2">
                  <FaSyncAlt /> Refresh
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">Timestamp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">Sender Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">Recipient(s)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">File Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">Integrity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">2025-06-28 14:22</td>
                    <td className="px-6 py-4 whitespace-nowrap">jane@bk.rw</td>
                    <td className="px-6 py-4 whitespace-nowrap">john@bk.rw</td>
                    <td className="px-6 py-4 whitespace-nowrap">loan_data.xlsx</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <FaCheck /> Sent
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-600 flex items-center gap-1">
                      <FaShieldAlt /> Verified
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={openModal}
                        className="bg-white border border-gray-200 text-gray-800 px-3 py-1 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                      >
                        <FaEye /> View
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">2025-06-28 14:03</td>
                    <td className="px-6 py-4 whitespace-nowrap">mark@bk.rw</td>
                    <td className="px-6 py-4 whitespace-nowrap">finance@bk.rw</td>
                    <td className="px-6 py-4 whitespace-nowrap">Q2_report.pdf</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <FaFlag /> Flagged
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-red-600 flex items-center gap-1">
                      <FaExclamationTriangle /> Tampered
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2">
                        <FaSearch /> Investigate
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">2025-06-28 13:50</td>
                    <td className="px-6 py-4 whitespace-nowrap">eva@bk.rw</td>
                    <td className="px-6 py-4 whitespace-nowrap">security@bk.rw</td>
                    <td className="px-6 py-4 whitespace-nowrap">passwords.txt</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <FaBan /> Blocked
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-red-600 flex items-center gap-1">
                      <FaTimes /> Failed Hash
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2">
                        <FaBell /> Alert Sent
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Alerts & Notifications */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-blue-900 flex items-center gap-2">
                <FaBell /> Alerts & Notifications
              </h2>
              <button className="bg-white border border-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                <FaCheckDouble /> Mark All Read
              </button>
            </div>
            <div>
              <div className="flex items-center gap-4 p-4 border-b border-gray-200">
                <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
                  <FaExclamationTriangle />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">File hash mismatch detected</div>
                  <div className="text-gray-500 text-sm">
                    File: sales.xls | Time: 2025-06-27 13:00 | Status: Unresolved
                  </div>
                </div>
                <button className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                  Investigate
                </button>
              </div>
              <div className="flex items-center gap-4 p-4 border-b border-gray-200">
                <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                  <FaLock />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">Unauthorized user tried to download</div>
                  <div className="text-gray-500 text-sm">
                    File: payroll.pdf | Time: 2025-06-27 12:30 | Status: Blocked
                  </div>
                </div>
                <button className="bg-white border border-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  Review
                </button>
              </div>
              <div className="flex items-center gap-4 p-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <FaBrain />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">Sensitive keyword detected: &quot;account no.&quot;</div>
                  <div className="text-gray-500 text-sm">
                    File: bank.txt | Time: 2025-06-26 18:12 | Status: Investigating
                  </div>
                </div>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
                  Review AI Flag
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* File Details Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FaFileAlt /> File Details
              </h3>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-500 text-2xl"
              >
                <FaTimes />
              </button>
            </div>
            <div className="p-6">
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="font-semibold text-gray-500">Sender:</span>
                <span className="font-mono text-sm">mark@bk.rw</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="font-semibold text-gray-500">Recipient(s):</span>
                <span className="font-mono text-sm">finance@bk.rw</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="font-semibold text-gray-500">Date Sent:</span>
                <span className="font-mono text-sm">2025-06-28</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="font-semibold text-gray-500">Time:</span>
                <span className="font-mono text-sm">14:03</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="font-semibold text-gray-500">File Name:</span>
                <span className="font-mono text-sm">Q2_report.pdf</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="font-semibold text-gray-500">File Type:</span>
                <span className="font-mono text-sm">PDF</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="font-semibold text-gray-500">Size:</span>
                <span className="font-mono text-sm">2.4 MB</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="font-semibold text-gray-500">SHA-256 Hash (Original):</span>
                <span className="font-mono text-sm">ae5ff19acbd8f4c2e73d...</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="font-semibold text-gray-500">Current Hash:</span>
                <span className="font-mono text-sm text-red-500">mismatch detected</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span className="font-semibold text-gray-500">Flag Status:</span>
                <span className="font-mono text-sm">Flagged by AI (keyword: &quot;Account PIN&quot;)</span>
              </div>
              <div className="mt-6 flex gap-3">
                <button className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors flex items-center gap-2">
                  <FaDownload /> Download File
                </button>
                <button className="bg-white border border-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <FaEye /> View File
                </button>
                <button className="bg-white border border-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <FaHistory /> Audit Trail
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}