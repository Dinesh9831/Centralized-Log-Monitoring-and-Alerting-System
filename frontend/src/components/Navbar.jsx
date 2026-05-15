import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, List, AlertTriangle } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Dashboard', icon: Activity },
    { path: '/logs', label: 'Logs', icon: List },
    { path: '/alerts', label: 'Alerts', icon: AlertTriangle },
  ];

  return (
    <nav className="bg-darkCard border-b border-gray-800 sticky top-0 z-10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Title */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <Activity className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl text-white tracking-tight">LogMonitor Pro</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    location.pathname === path
                      ? 'bg-primary text-white shadow-md shadow-primary/20'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Mobile menu button (Simplified for demo) */}
          <div className="md:hidden flex items-center">
             <div className="flex space-x-2">
               {navLinks.map(({ path, icon: Icon }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`p-2 rounded-md ${
                      location.pathname === path ? 'text-primary bg-gray-800' : 'text-gray-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
               ))}
             </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
