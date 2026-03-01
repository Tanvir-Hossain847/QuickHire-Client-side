"use client";
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function FeaturedJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('/pic.json')
      .then(res => res.json())
      .then(data => {
        // Take the first 8 for featured section
        setJobs(data.slice(0, 8));
      })
      .catch(err => console.error("Error fetching jobs:", err));
  }, []);

  return (
    <section className="w-full pt-16 pb-25 bg-white">
      <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h2 className="text-3xl md:text-5xl font-semibold text-[#202941] tracking-tight">
            Featured <span className="text-[#3393FF]">jobs</span>
          </h2>
          <a href="#" className="flex items-center text-[#5848DF] font-semibold hover:underline mt-4 md:mt-0">
            Show all jobs <ArrowRight className="ml-2 w-5 h-5 font-bold" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {jobs.map((job, index) => (
            <div key={index} className="bg-white border border-[#e2e4ec] p-6 hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div className="relative w-12 h-12 rounded-full flex shrink-0 items-center justify-center bg-transparent border border-gray-100 overflow-hidden">
                  <Image 
                    src={job.company_logo} 
                    alt={job.company} 
                    fill 
                    className="object-contain p-1.5" 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <span className="text-[#5848DF] border border-[#5848DF] font-medium text-[13px] px-3 py-1 bg-white">
                  Full Time
                </span>
              </div>
              
              <h3 className="text-[#202941] font-bold text-lg mb-1">{job.title}</h3>
              <p className="text-[#8e95ac] text-[15px] mb-4">
                {job.company} <span className="mx-1">•</span> {job.location}
              </p>
              
              <p className="text-[#8e95ac] text-[15px] mb-6 leading-relaxed line-clamp-2">
                {job.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className="text-[13px] font-bold px-3 py-1.5 rounded-full text-orange-500 bg-orange-50">
                  {job.category}
                </span>
                <span className="text-[13px] font-bold px-3 py-1.5 rounded-full text-emerald-500 bg-emerald-50">
                  Design
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
