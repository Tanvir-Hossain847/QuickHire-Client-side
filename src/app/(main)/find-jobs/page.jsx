"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Briefcase, DollarSign, Clock, Building2 } from 'lucide-react';
import Image from 'next/image';

export default function FindJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://quick-hire-server-side-jmmo.vercel.app/jobs');
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const data = await response.json();
      setJobs(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || job.location?.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesJobType = !jobTypeFilter || job.jobType?.toLowerCase() === jobTypeFilter.toLowerCase();
    
    return matchesSearch && matchesLocation && matchesJobType;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5848DF] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button 
            onClick={fetchJobs}
            className="px-6 py-2 bg-[#5848DF] text-white rounded-md hover:bg-[#4a3bc6] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-30">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-[#202941] mb-2">Find Your Dream Job</h1>
          <p className="text-gray-600">Discover {jobs.length} opportunities waiting for you</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search by job title or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5848DF] focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Location"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5848DF] focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Job Type Filter */}
            <div>
              <select
                value={jobTypeFilter}
                onChange={(e) => setJobTypeFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5848DF] focus:border-transparent outline-none"
              >
                <option value="">All Job Types</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-600">
            Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}
          </p>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No jobs found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={job.id || job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function JobCard({ job }) {
  const router = useRouter();
  
  const handleApplyClick = () => {
    router.push(`/jobs/${job.id || job._id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200">
      {/* Company Logo and Name */}
      <div className="flex items-start gap-4 mb-4">
        {job.companyLogo ? (
          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
            <Image
              src={job.companyLogo}
              alt={job.company || 'Company'}
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-lg bg-[#5848DF]/10 flex items-center justify-center flex-shrink-0">
            <Building2 className="h-6 w-6 text-[#5848DF]" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[#202941] text-lg mb-1 truncate">
            {job.title || 'Untitled Position'}
          </h3>
          <p className="text-gray-600 text-sm truncate">{job.company || 'Company Name'}</p>
        </div>
      </div>

      {/* Job Details */}
      <div className="space-y-2 mb-4">
        {job.location && (
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{job.location}</span>
          </div>
        )}
        
        {job.jobType && (
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Briefcase className="h-4 w-4 flex-shrink-0" />
            <span className="capitalize">{job.jobType}</span>
          </div>
        )}
        
        {job.salary && (
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <DollarSign className="h-4 w-4 flex-shrink-0" />
            <span>{job.salary}</span>
          </div>
        )}
        
        {job.postedDate && (
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Clock className="h-4 w-4 flex-shrink-0" />
            <span>{job.postedDate}</span>
          </div>
        )}
      </div>

      {/* Description */}
      {job.description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {job.description}
        </p>
      )}

      {/* Tags */}
      {job.tags && job.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {job.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
          {job.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
              +{job.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Apply Button */}
      <button 
        onClick={handleApplyClick}
        className="w-full py-2.5 bg-[#5848DF] text-white font-semibold rounded-lg hover:bg-[#4a3bc6] transition-colors"
      >
        Apply Now
      </button>
    </div>
  );
}
