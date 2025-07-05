import React from 'react';
import Link from 'next/link';

interface NavItem {
  icon: string;
  label: string;
  active?: boolean;
}

const Sidebar: React.FC = () => {
  const navItems: NavItem[] = [
    { icon: 'fa-tachometer-alt', label: 'Dashboard', active: true },
    { icon: 'fa-folder-open', label: 'All Files' },
    { icon: 'fa-flag', label: 'Flagged Files' },
    { icon: 'fa-users', label: 'User Activity' },
    { icon: 'fa-clipboard-list', label: 'Access Logs' },
    { icon: 'fa-bell', label: 'Alerts & Notifications' },
    { icon: 'fa-chart-bar', label: 'Reports' },
    { icon: 'fa-cog', label: 'Settings' },
  ];

  return (
    <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-6 md:sticky md:top-20 md:h-[calc(100vh-5rem)] overflow-y-auto">
      <nav>
        <ul>
          {navItems.map((item, index) => (
            <li key={index} className="mb-2">
              <Link href="/login"  >
                <div
                  className={`flex items-center gap-3 p-3 text-gray-500 hover:bg-gray-100 hover:text-blue-900 transition duration-300 ease-in-out ${
                    item.active ? 'bg-gray-100 text-blue-900' : ''
                  }`}
                >
                  <i className={`fas ${item.icon}`}></i>
                  {item.label}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;