"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <div>
      <header className="absolute top-0 left-0 w-full z-50 bg-transparent border-t-[5px] border-[#5645ee]">
        <div className="max-w-11/12 mx-auto px-6 md:px-12 flex items-center justify-between h-24">
          <div className="flex items-center gap-12 lg:gap-16">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-40 h-40">
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
            </nav>
          </div>

          <div className="flex items-center gap-6 lg:gap-10">
            <Link
              href="/login"
              className="text-[#5645ee] font-bold font-secondary text-md hover:opacity-80 transition-opacity"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="bg-[#5645ee] text-white px-8 py-3 rounded-md font-bold font-secondary text-md hover:bg-[#4535c8] transition-all shadow-sm active:scale-95"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
