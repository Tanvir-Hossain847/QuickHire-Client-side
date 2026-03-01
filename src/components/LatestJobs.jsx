"use client";
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function LatestJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('/pic.json')
      .then(res => res.json())
      .then(data => {
        // Take 8 jobs starting from index 4 for variety
        setJobs(data.slice(4, 12));
      })
      .catch(err => console.error("Error fetching jobs:", err));
  }, []);

  return (
    <section className="relative w-full pt-20 pb-24 bg-[#f8f9fc] overflow-hidden">
      {/* Background shape */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://i.ibb.co.com/nNqQT90Y/Rectangle-2734.png"
          alt="Background shapes"
          fill
          className="object-cover opacity-80"
          priority
        />
      </div>

      <div className="relative z-10 max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <h2 className="text-4xl md:text-5xl font-semibold text-[#202941] tracking-tight">
            Latest <span className="text-[#3393FF]">jobs open</span>
          </h2>
          <a href="#" className="flex items-center text-[#5848DF] font-semibold hover:underline mt-4 md:mt-0">
            Show all jobs <ArrowRight className="ml-2 w-5 h-5 font-bold" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {jobs.map((job, index) => (
            <div key={index} className="bg-white p-6 md:p-8 flex flex-col sm:flex-row gap-6 items-start hover:shadow-xl transition-shadow duration-300 border border-transparent hover:border-[#e2e4ec] transition-all">
              
              {/* Logo space */}
              <div className="w-16 h-16 shrink-0 bg-gray-50 flex items-center justify-center relative shadow-sm border border-gray-100 p-2 overflow-hidden">
                {job.company_logo ? (
                  <Image 
                    src={job.company_logo} 
                    alt={job.company} 
                    fill 
                    className="object-contain p-2" 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <span className="text-gray-400 font-bold text-xl">{job.company?.charAt(0)}</span>
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <h3 className="text-[#202941] font-bold text-xl mb-1">{job.title}</h3>
                <p className="text-[#8e95ac] text-[15px] mb-4">
                  {job.company} <span className="mx-1.5">•</span> {job.location}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2.5">
                  <span className="text-[13px] font-semibold px-4 py-1.5 rounded-full border text-emerald-500 bg-emerald-50 border-emerald-100">
                    Full-Time
                  </span>
                  <span className="text-[13px] font-semibold px-4 py-1.5 rounded-full border text-orange-500 border-orange-500/50">
                    {job.category}
                  </span>
                  <span className="text-[13px] font-semibold px-4 py-1.5 rounded-full border text-indigo-600 border-indigo-600/50">
                    Design
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
