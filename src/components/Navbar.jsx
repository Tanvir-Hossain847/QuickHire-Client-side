"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { LogOut, User, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { user, userRole, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div>
      <header className="absolute top-0 left-0 w-full z-[100] bg-white md:bg-transparent border-t-[5px] border-[#5645ee] shadow-sm md:shadow-none">
        <div className="max-w-7xl mx-auto px-4 md:px-12 flex items-center justify-between h-20 md:h-24">
          <div className="flex items-center gap-12 lg:gap-16">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                <Image
                  src="https://i.ibb.co.com/5x92SDk4/Logo-1.png"
                  alt="QuickHire Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/find-jobs"
                className="text-[#7a8290] hover:text-[#1e2532] font-semibold text-[15px] transition-colors"
              >
                Find Jobs
              </Link>
              <Link
                href="/browse"
                className="text-[#7a8290] hover:text-[#1e2532] font-semibold text-[15px] transition-colors"
              >
                Browse Companies
              </Link>
              {user && userRole === 'admin' && (
                <Link
                  href="/admin"
                  className="text-[#7a8290] hover:text-[#1e2532] font-semibold text-[15px] transition-colors"
                >
                  Admin
                </Link>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-4 md:gap-6 lg:gap-10">
            <div className="hidden md:flex items-center gap-6 lg:gap-10">
              {user ? (
                <>
                  <div className="flex items-center gap-3">
                    {user.photoURL ? (
                      <Image
                        src={user.photoURL}
                        alt={user.displayName || 'User'}
                        width={36}
                        height={36}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-[#5645ee] flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                    )}
                    <span className="text-[#1e2532] font-semibold hidden lg:block">
                      {user.displayName || user.email}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-[#5645ee] font-bold font-secondary text-md hover:opacity-80 transition-opacity"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-[#5645ee] font-bold font-secondary text-md hover:opacity-80 transition-opacity"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="bg-[#5645ee] text-white px-8 py-3 rounded-md font-bold font-secondary text-md hover:bg-[#4535c8] transition-all shadow-sm active:scale-95"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-[#1e2532]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-6 space-y-6 shadow-xl animate-in slide-in-from-top duration-300">
            <nav className="flex flex-col gap-4">
              <Link
                href="/find-jobs"
                className="text-[#7a8290] hover:text-[#1e2532] font-semibold text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Find Jobs
              </Link>
              <Link
                href="/browse"
                className="text-[#7a8290] hover:text-[#1e2532] font-semibold text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Companies
              </Link>
              {user && userRole === 'admin' && (
                <Link
                  href="/admin"
                  className="text-[#7a8290] hover:text-[#1e2532] font-semibold text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
            </nav>

            <div className="pt-6 border-t border-gray-100 flex flex-col gap-4">
              {user ? (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    {user.photoURL ? (
                      <Image
                        src={user.photoURL}
                        alt={user.displayName || 'User'}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#5645ee] flex items-center justify-center">
                        <User className="h-6 w-6 text-white" />
                      </div>
                    )}
                    <span className="text-[#1e2532] font-semibold text-lg">
                      {user.displayName || user.email}
                    </span>
                  </div>
                  <button
                    onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                    className="flex items-center justify-center gap-2 bg-gray-50 text-[#5645ee] py-3 rounded-md font-bold text-lg"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex items-center justify-center text-[#5645ee] font-bold text-lg py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="flex items-center justify-center bg-[#5645ee] text-white py-4 rounded-md font-bold text-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
