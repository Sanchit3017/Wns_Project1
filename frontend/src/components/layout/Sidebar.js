import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Car, 
  Users, 
  Route,
  BarChart3,
  Building2,
  X,
  UserCheck,
  MapPin
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import clsx from 'clsx';

const Sidebar = ({ open, setOpen }) => {
  const { user, isAdmin, isDriver, isEmployee } = useAuth();
  const location = useLocation();

  const getNavigationItems = () => {
    const items = [];

    if (isAdmin()) {
      items.push(
        { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
        { name: 'Trips', icon: Route, href: '/trips' },
        { name: 'Drivers', icon: UserCheck, href: '/drivers' },
        { name: 'Employees', icon: Users, href: '/employees' },
        { name: 'Analytics', icon: BarChart3, href: '/analytics' }
      );
    } else if (isDriver()) {
      items.push(
        { name: 'Dashboard', icon: LayoutDashboard, href: '/driver-dashboard' },
        { name: 'My Trips', icon: Route, href: '/trips' },
        { name: 'Locations', icon: MapPin, href: '/locations' }
      );
    } else if (isEmployee()) {
      items.push(
        { name: 'Dashboard', icon: LayoutDashboard, href: '/employee-dashboard' },
        { name: 'My Trips', icon: Route, href: '/trips' },
        { name: 'Request Trip', icon: Car, href: '/trips/create' }
      );
    }

    return items;
  };

  const navigationItems = getNavigationItems();

  const isActive = (href) => {
    if (href === '/dashboard' || href === '/driver-dashboard' || href === '/employee-dashboard') {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={clsx(
        'fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0',
        open ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-secondary-200">
            <div className="flex items-center">
              <Building2 className="w-8 h-8 text-primary-600 mr-3" />
              <div>
                <h1 className="text-lg font-bold text-secondary-900">WNS Bangalore</h1>
                <p className="text-xs text-secondary-600">Travel Management</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="lg:hidden p-1 rounded-md text-secondary-400 hover:text-secondary-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-secondary-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-secondary-900">{user?.email}</p>
                <p className="text-xs text-secondary-600 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className={clsx(
                      'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                      isActive(item.href)
                        ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                        : 'text-secondary-700 hover:bg-secondary-100 hover:text-secondary-900'
                    )}
                  >
                    <item.icon className={clsx(
                      'w-5 h-5 mr-3',
                      isActive(item.href) ? 'text-primary-600' : 'text-secondary-400'
                    )} />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-secondary-200">
            <div className="text-xs text-secondary-500 text-center">
              <p>Version 1.0.0</p>
              <p>© 2024 WNS Bangalore</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;