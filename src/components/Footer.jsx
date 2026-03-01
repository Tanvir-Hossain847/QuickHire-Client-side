"use client";
import React from 'react';
import { Facebook, Instagram, Globe, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';


export default function Footer() {
  return (
    <footer className="w-full bg-[#202430] py-16 px-4 md:px-8">
      <div className="max-w-11/12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16">
          
          {/* Column 1: Brand and Bio */}
          <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-10">
            <div className="flex items-center gap-2 mb-6">
              <Image
                src="https://i.ibb.co.com/1f3xPTdf/Frame-3.png"
                alt="QuickHire Logo"
                width={40}
                height={10}
                className="object-contain"
                priority
              />
              <span className="text-white text-xl font-bold tracking-tight">QuickHire</span>
            </div>
            <p className="text-[#a0a4b1] text-[15px] leading-relaxed">
              Great platform for the job seeker that passionate about startups. Find your dream job easier.
            </p>
          </div>

          {/* Column 2: About */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold text-lg mb-6">About</h3>
            <ul className="space-y-4">
              {['Companies', 'Pricing', 'Terms', 'Advice', 'Privacy Policy'].map(item => (
                <li key={item}>
                  <a href="#" className="text-[#a0a4b1] text-[15px] hover:text-white transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold text-lg mb-6">Resources</h3>
            <ul className="space-y-4">
               {['Help Docs', 'Guide', 'Updates', 'Contact Us'].map(item => (
                <li key={item}>
                  <a href="#" className="text-[#a0a4b1] text-[15px] hover:text-white transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-4">
            <h3 className="text-white font-semibold text-lg mb-6">Get job notifications</h3>
            <p className="text-[#a0a4b1] text-[15px] mb-6 leading-relaxed">
              The latest job news, articles, sent to your inbox weekly.
            </p>
            <div className="flex flex-col sm:flex-row gap-0">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="flex-1 bg-white text-gray-900 px-4 py-3 sm:py-0 text-[15px] border-none outline-none min-w-0" 
              />
              <button 
                type="button" 
                className="bg-[#5848DF] text-white font-semibold px-6 py-3 text-[15px] hover:bg-[#4a3bc6] transition-colors duration-200"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-700/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#a0a4b1] text-sm text-center md:text-left">
            2021 @ QuickHire. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {[Facebook, Instagram, Globe, Linkedin, Twitter].map((Icon, index) => (
              <a 
                key={index} 
                href="#" 
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 hover:text-white transition-all duration-200"
              >
                <Icon className="w-4 h-4" strokeWidth={2} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
