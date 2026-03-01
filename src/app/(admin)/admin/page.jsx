"use client";
import { useState, useEffect } from 'react';
import { Briefcase, TrendingUp, Users, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    pendingApplications: 0,
    recentJobs: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch jobs
      const jobsResponse = await fetch('http://localhost:4000/jobs');
      let jobsData = [];
      if (jobsResponse.ok) {
        jobsData = await jobsResponse.json();
      }

      // Fetch applications
      const appsResponse = await fetch('http://localhost:4000/applications');
      let appsData = [];
      if (appsResponse.ok) {
        appsData = await appsResponse.json();
      }

      setStats({
        totalJobs: jobsData.length,
        activeJobs: jobsData.length,
        totalApplications: appsData.length,
        pendingApplications: appsData.filter(app => app.status === 'pending').length,
        recentJobs: jobsData.slice(0, 5)
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5848DF]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#202941]">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Jobs"
          value={stats.totalJobs}
          icon={<Briefcase className="h-8 w-8" />}
          color="bg-blue-500"
          trend="+12%"
        />
        <StatCard
          title="Active Jobs"
          value={stats.activeJobs}
          icon={<TrendingUp className="h-8 w-8" />}
          color="bg-green-500"
          trend="+8%"
        />
        <StatCard
          title="Total Applications"
          value={stats.totalApplications}
          icon={<Users className="h-8 w-8" />}
          color="bg-purple-500"
          trend="+23%"
        />
        <StatCard
          title="Pending Reviews"
          value={stats.pendingApplications}
          icon={<DollarSign className="h-8 w-8" />}
          color="bg-orange-500"
          trend={stats.pendingApplications > 0 ? `${stats.pendingApplications} new` : 'None'}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/jobs?action=add"
          className="bg-gradient-to-r from-[#5848DF] to-[#7c6ef5] text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Add New Job</h3>
              <p className="text-white/80 text-sm">Post a new job opening</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/jobs"
          className="bg-gradient-to-r from-[#202941] to-[#3a4560] text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Manage Jobs</h3>
              <p className="text-white/80 text-sm">View and edit existing jobs</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/applications"
          className="bg-gradient-to-r from-[#10b981] to-[#059669] text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">View Applications</h3>
              <p className="text-white/80 text-sm">Review job applications</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Jobs Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-[#202941]">Recent Jobs</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Posted
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.recentJobs.length > 0 ? (
                stats.recentJobs.map((job) => (
                  <tr key={job.id || job._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{job.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{job.company}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{job.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 capitalize">
                        {job.jobType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {job.postedDate || 'N/A'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No jobs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color, trend }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`${color} text-white p-3 rounded-lg`}>
          {icon}
        </div>
        <span className="text-green-600 text-sm font-semibold">{trend}</span>
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-[#202941]">{value}</p>
    </div>
  );
}
