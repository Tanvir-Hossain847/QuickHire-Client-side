"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  LayoutDashboard, 
  Briefcase, 
  LogOut, 
  Menu, 
  X,
  User
} from "lucide-react";
import { Toast } from "@/utils/sweetalert";

export default function AdminLayout({ children }) {
  const { user, userRole, logout, loading: authLoading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    console.log('Admin Layout - User:', user?.email);
    console.log('Admin Layout - User Role:', userRole);
    console.log('Admin Layout - Auth Loading:', authLoading);

    // Wait for auth to finish loading
    if (authLoading) {
      return;
    }

    // Check if user is logged in
    if (!user) {
      console.log('No user, redirecting to login');
      router.push('/login');
      return;
    }

    // Check if user is admin
    if (userRole !== 'admin') {
      console.log('User is not admin, redirecting to home');
      router.push('/');
      Toast.fire({
        icon: 'error',
        title: 'Access denied. Admin privileges required.'
      });
      return;
    }

    console.log('User is admin, allowing access');
    setChecking(false);
  }, [user, userRole, authLoading, router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (authLoading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5848DF] mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying access...</p>
          <p className="mt-2 text-xs text-gray-500">Role: {userRole}</p>
        </div>
      </div>
    );
  }

  // Don't render admin content if not admin
  if (!user || userRole !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-[#202941] text-white transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="https://i.ibb.co.com/1f3xPTdf/Frame-3.png" 
                alt="Logo" 
                width={32} 
                height={32} 
                className="object-contain"
              />
              <span className="text-xl font-bold">QuickHire Admin</span>
            </Link>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#5848DF] transition-colors"
            >
              <LayoutDashboard className="h-5 w-5" />
              <span className="font-medium">Dashboard</span>
            </Link>
            <Link
              href="/admin/jobs"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#5848DF] transition-colors"
            >
              <Briefcase className="h-5 w-5" />
              <span className="font-medium">Manage Jobs</span>
            </Link>
            <Link
              href="/admin/applications"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#5848DF] transition-colors"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="font-medium">Applications</span>
            </Link>
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center gap-3 mb-3 px-2">
              {user?.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#5848DF] flex items-center justify-center">
                  <User className="h-5 w-5" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.displayName || 'Admin'}</p>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    userRole === 'admin' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {userRole}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex-1 lg:hidden"></div>
            <div className="text-sm text-gray-600">
              Welcome back, {user?.displayName || 'Admin'}!
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
