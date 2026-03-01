"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, MapPin, Briefcase, Users, Star, ArrowRight } from 'lucide-react';

export default function BrowseCompanies() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/pic.json')
      .then(res => res.json())
      .then(data => {
        // Group by company to get unique companies and their job counts
        const companyMap = data.reduce((acc, job) => {
          if (!acc[job.company]) {
            acc[job.company] = {
              name: job.company,
              logo: job.company_logo,
              location: job.location,
              category: job.category,
              description: job.description,
              openJobs: 0
            };
          }
          acc[job.company].openJobs += 1;
          return acc;
        }, {});
        
        setCompanies(Object.values(companyMap));
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching companies:", err);
        setLoading(false);
      });
  }, []);

  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#F8F9FC] min-h-screen pt-24">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100 py-16 md:py-24">
        <div className="max-w-11/12 mx-auto px-6 md:px-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-[#1e2532] mb-6 tracking-tight">
            Find your <span className="text-[#5645ee]">dream company</span>
          </h1>
          <p className="text-[#7a8290] text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Find the dream companies you’re looking for and stay updated on their latest job openings.
          </p>
          
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 p-2 bg-white rounded-xl shadow-xl border border-gray-100">
              <div className="flex-1 flex items-center px-4 gap-3 border-b md:border-b-0 md:border-r border-gray-100 py-2">
                <Search className="text-[#5645ee] w-5 h-5 flex-shrink-0" />
                <input 
                  type="text" 
                  placeholder="Company name or keyword" 
                  className="w-full text-[#1e2532] outline-none font-medium placeholder:text-gray-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center px-4 gap-3 py-2">
                <MapPin className="text-[#5645ee] w-5 h-5 flex-shrink-0" />
                <span className="text-gray-400 font-medium">Florence, Italy</span>
              </div>
              <button className="bg-[#5645ee] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#4535c8] transition-all whitespace-nowrap">
                Search
              </button>
            </div>
            <p className="mt-4 text-left text-sm text-gray-400">
              Popular : Design, Development, Amazon, Apple
            </p>
          </div>
        </div>
      </section>

      {/* Companies Grid */}
      <section className="py-20">
        <div className="max-w-11/12 mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-bold text-[#1e2532] mb-2">Recommended Companies</h2>
              <p className="text-[#7a8290]">Based on your search and profile preferences</p>
            </div>
            <div className="text-right">
              <span className="text-[#1e2532] font-bold text-lg">{filteredCompanies.length} result found</span>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5645ee]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCompanies.map((company, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 group flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center relative p-3 border border-gray-50 overflow-hidden shadow-sm">
                      <Image 
                        src={company.logo} 
                        alt={company.name} 
                        fill 
                        className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                        sizes="64px"
                      />
                    </div>
                    <span className="bg-[#f2f1ff] text-[#5645ee] px-4 py-1.5 rounded-lg text-sm font-bold">
                      {company.openJobs} Jobs
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#1e2532] mb-2 group-hover:text-[#5645ee] transition-colors">
                    {company.name}
                  </h3>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="inline-flex items-center gap-1.5 text-sm text-gray-500 font-medium">
                      <Star className="w-4 h-4 text-orange-400 fill-orange-400" /> 4.8
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-sm text-gray-500 font-medium">{company.category}</span>
                  </div>

                  <p className="text-[#7a8290] text-sm leading-relaxed mb-8 line-clamp-3">
                    {company.description}
                  </p>

                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[12px] font-bold rounded-full border border-emerald-100">
                        Top Rated
                      </span>
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[12px] font-bold rounded-full border border-blue-100">
                        Hiring
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredCompanies.length === 0 && (
            <div className="text-center py-20">
              <div className="bg-white rounded-2xl p-12 max-w-md mx-auto shadow-sm border border-gray-100">
                <Search className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#1e2532] mb-2">No companies found</h3>
                <p className="text-[#7a8290]">Try adjusting your search terms or filters to find what you're looking for.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Premium CTA */}
      <section className="pb-24">
        <div className="max-w-11/12 mx-auto px-6 md:px-12">
          <div className="bg-[#5645ee] rounded-3xl p-12 md:p-20 relative overflow-hidden flex flex-col items-center text-center">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10 max-w-2xl">
              Get notified about new companies every week
            </h2>
            <p className="text-white/80 text-lg mb-10 relative z-10 max-w-xl">
              Join 50,000+ others and never miss out on new opportunities from top-tier companies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg relative z-10">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-6 py-4 rounded-xl outline-none text-[#1e2532] font-medium"
              />
              <button className="bg-white text-[#5645ee] px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all active:scale-95">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
