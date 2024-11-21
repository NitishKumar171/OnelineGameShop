import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Settings,
  Bell,
  CreditCard
} from 'lucide-react';
import clsx from 'clsx';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: ShoppingBag, label: 'Products', path: '/admin/products' },
  { icon: Users, label: 'Users', path: '/admin/users' },
  { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
  { icon: CreditCard, label: 'Payments', path: '/admin/payments' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useStore();
  const location = useLocation();

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700">
        <div className="p-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-white">Admin</span>
          </Link>
        </div>
        <nav className="mt-8">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                'flex items-center space-x-2 px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors',
                location.pathname === item.path && 'bg-gray-700 text-white'
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-white">
              {menuItems.find(item => item.path === location.pathname)?.label || 'Admin'}
            </h1>
            <div className="flex items-center space-x-4">
              <button className="relative text-gray-300 hover:text-white">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="flex items-center space-x-2">
                <img
                  src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-white">{user.name}</span>
              </div>
            </div>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}