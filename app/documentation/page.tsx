'use client';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { AuthProvider } from '../context/AuthContext';
import {
  FiDownload,
  FiSettings,
  FiWifi,
  FiServer,
  FiCamera,
  FiRss,
  FiCheckCircle,
  FiAlertTriangle,
  FiFileText,
  FiShield,
  FiLock,
  FiHelpCircle,
  FiCode,
  FiTerminal,
  FiAward,
} from 'react-icons/fi';

type Tab = 'installation' | 'usage' | 'troubleshooting' | 'license' | 'certification' | 'api';

const Documentation: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<Tab>('installation');

  const isDark = theme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`flex items-center justify-center min-h-screen mt-20 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        <div className={`animate-pulse ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Loading Documentation...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 mt-20 ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      <Header theme={theme as 'light' | 'dark'} setTheme={setTheme} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className={`text-4xl sm:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Hobpeg Documentation
          </h1>
          <p className={`text-lg max-w-3xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Complete technical documentation, guides, and reference materials for your Hobpeg system
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className={`w-full lg:w-72 flex-shrink-0 p-4 rounded-lg shadow-sm border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} h-fit sticky top-4`}>
            <nav className="space-y-1">
              <h3 className={`text-sm font-semibold uppercase tracking-wider mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Getting Started</h3>
              {[
                { id: 'installation', icon: <FiSettings />, label: 'Installation' },
                { id: 'usage', icon: <FiRss />, label: 'Usage Guide' },
                { id: 'troubleshooting', icon: <FiAlertTriangle />, label: 'Troubleshooting' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as Tab)}
                  className={`w-full text-left px-4 py-3 rounded-md transition-colors ${
                    activeTab === item.id
                      ? isDark
                        ? 'bg-blue-900 text-white'
                        : 'bg-blue-100 text-blue-800'
                      : isDark
                      ? 'hover:bg-gray-700'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    {item.label}
                  </div>
                </button>
              ))}

              <h3 className={`text-sm font-semibold uppercase tracking-wider mt-6 mb-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Technical Reference</h3>
              {[
                { id: 'api', icon: <FiCode />, label: 'API Documentation' },
                { id: 'certification', icon: <FiAward />, label: 'Certifications' },
                { id: 'license', icon: <FiFileText />, label: 'License Information' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as Tab)}
                  className={`w-full text-left px-4 py-3 rounded-md transition-colors ${
                    activeTab === item.id
                      ? isDark
                        ? 'bg-blue-900 text-white'
                        : 'bg-blue-100 text-blue-800'
                      : isDark
                      ? 'hover:bg-gray-700'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    {item.label}
                  </div>
                </button>
              ))}

              <div className={`mt-6 p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-blue-50'}`}>
                <h4 className={`flex items-center gap-2 font-medium mb-2 ${isDark ? 'text-white' : 'text-blue-800'}`}>
                  <FiHelpCircle />
                  Need Help?
                </h4>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-blue-700'}`}>
                  Contact our support team at support@Hobpeg.com
                </p>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Installation Section */}
            {activeTab === 'installation' && (
              <div className={`p-8 rounded-lg shadow-sm border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  <FiSettings />
                  Installation Guide
                </h2>

                <div className="mb-8">
                  <h3 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                    <FiCheckCircle className="text-green-500" />
                    System Requirements
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {[
                      { icon: <FiServer className="text-blue-500" />, text: 'Raspberry Pi 4 (4GB RAM recommended)' },
                      { icon: <FiCamera className="text-blue-500" />, text: 'HD Camera (USB or Raspberry Pi Camera Module)' },
                      { icon: <FiServer className="text-blue-500" />, text: 'Server (local or cloud for processing)' },
                      { icon: <FiWifi className="text-blue-500" />, text: 'Stable internet connection' },
                      { icon: <FiTerminal className="text-blue-500" />, text: 'Raspberry Pi OS (64-bit recommended)' },
                      { icon: <FiDownload className="text-blue-500" />, text: 'Minimum 16GB SD card storage' },
                    ].map((item, index) => (
                      <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <div className={`p-2 rounded-full ${isDark ? 'bg-gray-600' : 'bg-blue-100'}`}>
                          {item.icon}
                        </div>
                        <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                    <FiDownload className="text-blue-500" />
                    Step-by-Step Installation
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        step: 'Connect the camera to your Raspberry Pi',
                        details: 'Use the CSI port for Raspberry Pi Camera Module or USB port for webcams',
                      },
                      {
                        step: 'Install Raspberry Pi OS and update it: sudo apt update && sudo apt upgrade',
                        details: 'We recommend using the 64-bit Lite version for best performance',
                      },
                      {
                        step: 'Download the Hobpeg software package: wget https://install.Hobpeg.com/latest.zip',
                        details: 'Verify the checksum before installation',
                      },
                      {
                        step: 'Install dependencies: sudo apt install python3-pip libopencv-dev',
                        details: 'This may take several minutes to complete',
                      },
                      {
                        step: 'Run the installation script: sudo ./install.sh',
                        details: 'Follow the on-screen prompts during installation',
                      },
                      {
                        step: 'Configure the server IP in the Hobpeg dashboard',
                        details: 'Access the dashboard at http://localhost:8080 after installation',
                      },
                      {
                        step: 'Calibrate the camera for gesture detection',
                        details: 'Perform calibration in your intended usage environment',
                      },
                    ].map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isDark ? 'bg-blue-900 text-white' : 'bg-blue-100 text-blue-800'}`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className={`font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {item.step.startsWith('sudo') || item.step.startsWith('wget') ? (
                              <code className={`px-2 py-1 rounded ${isDark ? 'bg-gray-700 text-green-400' : 'bg-gray-100 text-green-800'}`}>
                                {item.step}
                              </code>
                            ) : (
                              item.step
                            )}
                          </p>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-700'}`}>Post-Installation Checklist</h3>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-blue-50'} mb-6`}>
                    <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-blue-800'}`}>
                      <li className="flex items-start gap-2">
                        <FiCheckCircle className={`flex-shrink-0 mt-1 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                        <span>Verify camera is properly detected in the dashboard</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FiCheckCircle className={`flex-shrink-0 mt-1 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                        <span>Test basic gesture recognition</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FiCheckCircle className={`flex-shrink-0 mt-1 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                        <span>Configure automatic startup: sudo systemctl enable Hobpeg</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Usage Section */}
            {activeTab === 'usage' && (
              <div className={`p-8 rounded-lg shadow-sm border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  <FiRss />
                  Usage Guide
                </h2>

                <div className="mb-8">
                  <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-700'}`}>Getting Started</h3>
                  <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    After successful installation, launch the Hobpeg application from your Raspberry Pi&apos;s application menu or by running:
                  </p>
                  <div className={`p-4 rounded-lg mb-6 ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <code className={`block ${isDark ? 'text-green-400' : 'text-green-800'}`}>Hobpeg start</code>
                  </div>
                  <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    The system will automatically detect your camera and available devices. Access the web interface at:
                  </p>
                  <div className={`p-4 rounded-lg mb-6 ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <code className={`block ${isDark ? 'text-blue-400' : 'text-blue-800'}`}>http://localhost:8080</code>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-700'}`}>Gesture Reference</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { gesture: '👋 Wave', action: 'Toggle lights on/off', tip: 'Perform a horizontal wave at chest height' },
                      { gesture: '✊ Fist', action: 'Mute/unmute audio', tip: 'Hold for 1 second to activate' },
                      { gesture: '👉 Point', action: 'Select/activate item', tip: 'Point directly at the target' },
                      { gesture: '🖐️ Open hand', action: 'Show menu options', tip: 'Palm facing camera' },
                      { gesture: '🤙 Hang loose', action: 'Emergency stop', tip: 'All devices will pause' },
                      { gesture: '👌 OK sign', action: 'Confirm selection', tip: 'Hold for visual confirmation' },
                      { gesture: '👍 Thumbs up', action: 'Volume up', tip: 'Repeat gesture to increase' },
                      { gesture: '👎 Thumbs down', action: 'Volume down', tip: 'Repeat gesture to decrease' },
                      { gesture: '✌️ Victory', action: 'Switch input source', tip: 'Works in media mode' },
                    ].map((item, index) => (
                      <div key={index} className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-white'}`}>
                        <div className="flex items-center gap-4 mb-3">
                          <span className="text-4xl">{item.gesture.split(' ')[0]}</span>
                          <div>
                            <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>{item.gesture}</h4>
                            <p className={`font-semibold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{item.action}</p>
                          </div>
                        </div>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.tip}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-700'}`}>Advanced Features</h3>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-blue-50'} mb-6`}>
                    <h4 className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-blue-800'}`}>Custom Gestures</h4>
                    <p className={`mb-3 ${isDark ? 'text-gray-300' : 'text-blue-700'}`}>
                      Create your own gestures by accessing the Training section in the web interface.
                    </p>
                    <code className={`block p-2 rounded mb-2 ${isDark ? 'bg-gray-800 text-green-400' : 'bg-white text-green-800'}`}>
                      Hobpeg train --name=&quot;MyGesture&quot; --duration=5
                    </code>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-blue-600'}`}>
                      This will start a 5-second training session for your new gesture.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Troubleshooting Section */}
            {activeTab === 'troubleshooting' && (
              <div className={`p-8 rounded-lg shadow-sm border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  <FiAlertTriangle className="text-yellow-500" />
                  Troubleshooting Guide
                </h2>

                <div className="mb-8">
                  <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-700'}`}>Common Issues</h3>
                  <div className="space-y-6">
                    {[
                      {
                        problem: 'Camera not detected',
                        solution: 'Check physical connections and run ls /dev/video* to verify detection',
                        fix: 'sudo apt install v4l-utils && sudo modprobe bcm2835-v4l2',
                      },
                      {
                        problem: 'Gesture recognition inaccurate',
                        solution: 'Ensure proper lighting and recalibrate using Hobpeg-calibrate',
                        fix: 'Improve environment lighting or adjust camera position',
                      },
                      {
                        problem: 'High CPU usage',
                        solution: 'Optimize by reducing camera resolution or frame rate',
                        fix: 'Edit /etc/Hobpeg/config.yaml and set resolution: 640x480',
                      },
                      {
                        problem: 'Web interface not loading',
                        solution: 'Check if service is running: systemctl status Hobpeg',
                        fix: 'Restart service: sudo systemctl restart Hobpeg',
                      },
                      {
                        problem: 'Lag in response',
                        solution: 'Reduce processing load by disabling unused features',
                        fix: 'Disable advanced analytics in settings if not needed',
                      },
                    ].map((item, index) => (
                      <div key={index} className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <h4 className={`font-bold mb-2 ${isDark ? 'text-red-400' : 'text-red-600'}`}>{item.problem}</h4>
                        <p className={`mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.solution}</p>
                        {item.fix.startsWith('sudo') || item.fix.startsWith('Edit') ? (
                          <code className={`block p-2 rounded ${isDark ? 'bg-gray-800 text-green-400' : 'bg-gray-100 text-green-800'}`}>
                            {item.fix}
                          </code>
                        ) : (
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.fix}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-700'}`}>Diagnostic Tools</h3>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-blue-50'} mb-6`}>
                    <h4 className={`font-bold mb-2 ${isDark ? 'text-white' : 'text-blue-800'}`}>System Health Check</h4>
                    <p className={`mb-3 ${isDark ? 'text-gray-300' : 'text-blue-700'}`}>
                      Run comprehensive diagnostics with:
                    </p>
                    <code className={`block p-2 rounded mb-2 ${isDark ? 'bg-gray-800 text-green-400' : 'bg-white text-green-800'}`}>
                      Hobpeg diagnose --full
                    </code>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-blue-600'}`}>
                      This will check all system components and generate a report.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-700'}`}>Log Files</h3>
                  <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Access logs for detailed error information:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { command: 'View service logs', code: 'journalctl -u Hobpeg -n 50' },
                      { command: 'View installation logs', code: 'cat /var/log/Hobpeg-install.log' },
                      { command: 'View camera diagnostics', code: 'v4l2-ctl --all' },
                      { command: 'View system resource usage', code: 'top -b -n 1 | grep Hobpeg' },
                    ].map((item, index) => (
                      <div key={index} className={`p-3 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.command}</p>
                        <code className={`block p-2 rounded ${isDark ? 'bg-gray-800 text-green-400' : 'bg-gray-100 text-green-800'}`}>
                          {item.code}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* License Section */}
            {activeTab === 'license' && (
              <div className={`p-8 rounded-lg shadow-sm border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  <FiFileText />
                  License Information
                </h2>

                <div className="mb-8">
                  <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-700'}`}>Hobpeg License Agreement</h3>
                  <div className={`p-4 rounded-lg mb-6 ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Hobpeg is licensed under the GNU General Public License v3.0. This license allows you to:
                    </p>
                    <ul className={`space-y-2 mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      <li className="flex items-start gap-2">
                        <FiCheckCircle className={`flex-shrink-0 mt-1 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                        <span>Use the software for any purpose</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FiCheckCircle className={`flex-shrink-0 mt-1 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                        <span>Modify and adapt the source code</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FiCheckCircle className={`flex-shrink-0 mt-1 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                        <span>Distribute original or modified versions</span>
                      </li>
                    </ul>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Full license text is available in the LICENSE file included with your installation or at:
                    </p>
                    <code className={`block p-2 rounded mt-2 ${isDark ? 'bg-gray-800 text-blue-400' : 'bg-gray-100 text-blue-800'}`}>
                      /usr/share/Hobpeg/LICENSE
                    </code>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-700'}`}>Third-Party Licenses</h3>
                  <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Hobpeg incorporates several open-source components:
                  </p>
                  <div className={`overflow-x-auto ${isDark ? 'bg-gray-700' : 'bg-white'} rounded-lg border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                      <thead>
                        <tr>
                          <th className={`px-6 py-3 text-left text-xs font-medium uppercase ${isDark ? 'text-gray-300' : 'text-gray-500'} tracking-wider`}>Component</th>
                          <th className={`px-6 py-3 text-left text-xs font-medium uppercase ${isDark ? 'text-gray-300' : 'text-gray-500'} tracking-wider`}>License</th>
                          <th className={`px-6 py-3 text-left text-xs font-medium uppercase ${isDark ? 'text-gray-300' : 'text-gray-500'} tracking-wider`}>Version</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y divide-gray-200 dark:divide-gray-600 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                        {[
                          { component: 'OpenCV', license: 'Apache 2.0', version: '4.5.5' },
                          { component: 'NumPy', license: 'BSD-3', version: '1.21.0' },
                          { component: 'TensorFlow Lite', license: 'Apache 2.0', version: '2.7.0' },
                          { component: 'Flask', license: 'BSD-3', version: '2.0.2' },
                          { component: 'React', license: 'MIT', version: '18.2.0' },
                        ].map((item, index) => (
                          <tr key={index}>
                            <td className={`px-6 py-4 whitespace-nowrap ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.component}</td>
                            <td className={`px-6 py-4 whitespace-nowrap ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.license}</td>
                            <td className={`px-6 py-4 whitespace-nowrap ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.version}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Certification Section */}
            {activeTab === 'certification' && (
              <div className={`p-8 rounded-lg shadow-sm border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  <FiAward />
                  Certifications & Compliance
                </h2>

                <div className="mb-8">
                  <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-700'}`}>Security Certifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {[
                      {
                        title: 'ISO 27001 Certified',
                        description: 'Information security management system certified',
                        icon: <FiShield className="text-blue-500" />,
                      },
                      {
                        title: 'GDPR Compliant',
                        description: 'Fully compliant with EU data protection regulations',
                        icon: <FiLock className="text-green-500" />,
                      },
                      {
                        title: 'FCC Part 15',
                        description: 'Meets electromagnetic interference standards',
                        icon: <FiWifi className="text-purple-500" />,
                      },
                      {
                        title: 'CE Marked',
                        description: 'Complies with EU health, safety, and environmental standards',
                        icon: <FiCheckCircle className="text-yellow-500" />,
                      },
                    ].map((item, index) => (
                      <div key={index} className={`p-6 rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                        <div className="flex items-center gap-4 mb-3">
                          <div className={`p-3 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            {item.icon}
                          </div>
                          <h4 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>{item.title}</h4>
                        </div>
                        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-700'}`}>Compliance Documentation</h3>
                  <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Download our full compliance reports and certification documents:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: 'Security Whitepaper', type: 'PDF', size: '2.4 MB' },
                      { name: 'Privacy Impact Assessment', type: 'PDF', size: '1.8 MB' },
                      { name: 'Penetration Test Results', type: 'ZIP', size: '5.2 MB' },
                      { name: 'Certificate of Conformity', type: 'PDF', size: '1.2 MB' },
                    ].map((item, index) => (
                      <div key={index} className={`p-4 rounded-lg border ${isDark ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-white'} flex justify-between items-center`}>
                        <div>
                          <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>{item.name}</h4>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.type} • {item.size}</p>
                        </div>
                        <button className={`px-4 py-2 rounded-lg ${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors`}>
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* API Documentation Section */}
            {activeTab === 'api' && (
              <div className={`p-8 rounded-lg shadow-sm border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  <FiCode />
                  API Documentation
                </h2>

                <div className="mb-8">
                  <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-700'}`}>REST API Endpoints</h3>
                  <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Hobpeg provides a comprehensive REST API for integration with other systems. Base URL:
                  </p>
                  <div className={`p-4 rounded-lg mb-6 ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <code className={`block ${isDark ? 'text-blue-400' : 'text-blue-800'}`}>http://[your-ip]:8080/api/v1</code>
                  </div>

                  <div className={`overflow-x-auto ${isDark ? 'bg-gray-700' : 'bg-white'} rounded-lg border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                      <thead>
                        <tr>
                          <th className={`px-6 py-3 text-left text-xs font-medium uppercase ${isDark ? 'text-gray-300' : 'text-gray-500'} tracking-wider`}>Endpoint</th>
                          <th className={`px-6 py-3 text-left text-xs font-medium uppercase ${isDark ? 'text-gray-300' : 'text-gray-500'} tracking-wider`}>Method</th>
                          <th className={`px-6 py-3 text-left text-xs font-medium uppercase ${isDark ? 'text-gray-300' : 'text-gray-500'} tracking-wider`}>Description</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y divide-gray-200 dark:divide-gray-600 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                        {[
                          { endpoint: '/gestures', method: 'GET', description: 'List all available gestures' },
                          { endpoint: '/gestures/{id}', method: 'GET', description: 'Get details for specific gesture' },
                          { endpoint: '/devices', method: 'GET', description: 'List connected devices' },
                          { endpoint: '/devices/{id}/control', method: 'POST', description: 'Send control command to device' },
                          { endpoint: '/system/status', method: 'GET', description: 'Get system status information' },
                          { endpoint: '/config', method: 'PUT', description: 'Update system configuration' },
                          { endpoint: '/gestures/train', method: 'POST', description: 'Train a new custom gesture' },
                          { endpoint: '/logs', method: 'GET', description: 'Retrieve system logs' },
                        ].map((item, index) => (
                          <tr key={index}>
                            <td className={`px-6 py-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                              <code>{item.endpoint}</code>
                            </td>
                            <td className={`px-6 py-4`}>
                              <span
                                className={`px-2 py-1 rounded text-xs font-medium ${
                                  item.method === 'GET'
                                    ? isDark
                                      ? 'bg-green-900 text-green-200'
                                      : 'bg-green-100 text-green-800'
                                    : item.method === 'POST'
                                    ? isDark
                                      ? 'bg-blue-900 text-blue-200'
                                      : 'bg-blue-100 text-blue-800'
                                    : isDark
                                    ? 'bg-yellow-900 text-yellow-200'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                {item.method}
                              </span>
                            </td>
                            <td className={`px-6 py-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-700'}`}>Example API Usage</h3>
                  <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Below is an example of how to interact with the Hobpeg API using cURL to list all gestures:
                  </p>
                  <div className={`p-4 rounded-lg mb-6 ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <code className={`block ${isDark ? 'text-green-400' : 'text-green-800'}`}>
                      curl -X GET http://[your-ip]:8080/api/v1/gestures \
                      <br />
                      -H &quot;Authorization: Bearer your-api-key&quot;
                    </code>
                  </div>
                  <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Example response:
                  </p>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <code className={`block ${isDark ? 'text-yellow-400' : 'text-yellow-800'}`}>
                      {`{
  "gestures": [
    {
      "id": "wave",
      "name": "Wave",
      "action": "Toggle lights on/off",
      "created_at": "2025-07-05T10:00:00Z"
    },
    {
      "id": "point",
      "name": "Point",
      "action": "Select/activate item",
      "created_at": "2025-07-05T10:00:00Z"
    }
  ]
}`}
                    </code>
                  </div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Replace `your-api-key` with your actual API key, available in the Hobpeg dashboard under API Settings.
                  </p>
                </div>

                <div>
                  <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-700'}`}>Authentication</h3>
                  <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-blue-50'} mb-6`}>
                    <p className={`mb-3 ${isDark ? 'text-gray-300' : 'text-blue-700'}`}>
                      All API requests require a Bearer token. Generate your token in the Hobpeg dashboard and include it in the
                      Authorization header:
                    </p>
                    <code className={`block p-2 rounded ${isDark ? 'bg-gray-800 text-green-400' : 'bg-white text-green-800'}`}>
                      Authorization: Bearer your-api-key
                    </code>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default function DocumentationPage() {
  return (
    <AuthProvider>
        < Documentation />
    </AuthProvider>
  );
}