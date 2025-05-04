// app/components/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
// Import icons (example using react-icons, ensure it's installed: npm install react-icons)
import { LuLayoutDashboard, LuRoute, LuTriangleAlert, LuCircle } from "react-icons/lu";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Dashboard', icon: LuLayoutDashboard },
    { href: '/routes', label: 'Routes', icon: LuRoute },
    { href: '/alerts', label: 'Alerts', icon: LuTriangleAlert },
    { href: '/profile', label: 'Profile', icon: LuCircle },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col h-screen sticky top-0 shadow-lg"> {/* Sidebar styling */}
      {/* Logo/Brand */}
      <div className="p-5 border-b border-gray-700">
        <Link href="/" className="text-2xl font-bold hover:text-gray-300 text-center block">
          UTeM Bus Tracker
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow mt-5 px-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon; // Get the icon component
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)); // Basic active check
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-3 py-3 rounded-md text-base font-medium transition-colors duration-150 ease-in-out group ${
                isActive
                  ? 'bg-gray-800 text-white shadow-inner' // Active link style
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white' // Inactive link style
              }`}
            >
              <Icon className={`mr-3 flex-shrink-0 h-6 w-6 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`} aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Optional Footer/User Info */}
      <div className="p-4 border-t border-gray-700 mt-auto">
         {/* Placeholder for user info or logout */}
         <span className="text-gray-500 text-sm block text-center"> {new Date().getFullYear()}</span>
      </div>
    </aside>
  );
}
