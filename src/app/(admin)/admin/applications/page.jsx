"use client";
import { useState, useEffect } from 'react';
import { 
  Search, 
  Eye, 
  Download,
  Filter,
  Calendar,
  User,
  Mail,
  Phone,
  FileText,
  Briefcase,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { Toast } from '@/utils/sweetalert';

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    fetchApplications();
    fetchJobs();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://quick-hire-server-side-jmmo.vercel.app/applications');
      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      Toast.fire({
        icon: 'error',
        title: 'Failed to load applications'
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await fetch('https://quick-hire-server-side-jmmo.vercel.app/jobs');
      if (response.ok) {
        const data = await response.json();
        const jobsMap = {};
        data.forEach(job => {
          jobsMap[job.id || job._id] = job;
        });
        setJobs(jobsMap);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const updateApplicationStatus = async (applicationId, newStatus) => {
    try {
      const response = await fetch(`https://quick-hire-server-side-jmmo.vercel.app/applications/${applicationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setApplications(applications.map(app => 
          (app.id || app._id) === applicationId 
            ? { ...app, status: newStatus }
            : app
        ));
        Toast.fire({
          icon: 'success',
          title: 'Status updated successfully!'
        });
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Failed to update status'
        });
      }
    } catch (error) {
      console.error('Error updating status:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error updating status'
      });
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      jobs[app.jobId]?.title?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      reviewing: 'bg-blue-100 text-blue-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status] || colors.pending;
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <Clock className="h-4 w-4" />,
      reviewing: <Eye className="h-4 w-4" />,
      accepted: <CheckCircle className="h-4 w-4" />,
      rejected: <XCircle className="h-4 w-4" />
    };
    return icons[status] || icons.pending;
  };

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    reviewing: applications.filter(a => a.status === 'reviewing').length,
    accepted: applications.filter(a => a.status === 'accepted').length,
    rejected: applications.filter(a => a.status === 'rejected').length
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#202941]">Job Applications</h1>
        <p className="text-gray-600 mt-1">Manage and review all job applications</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <StatCard title="Total" value={stats.total} color="bg-gray-500" />
        <StatCard title="Pending" value={stats.pending} color="bg-yellow-500" />
        <StatCard title="Reviewing" value={stats.reviewing} color="bg-blue-500" />
        <StatCard title="Accepted" value={stats.accepted} color="bg-green-500" />
        <StatCard title="Rejected" value={stats.rejected} color="bg-red-500" />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by name, email, or job title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5848DF] focus:border-transparent outline-none"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5848DF] focus:border-transparent outline-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewing">Reviewing</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5848DF]"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((application) => (
                    <tr key={application.id || application._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-[#5848DF] rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {application.fullName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {application.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {jobs[application.jobId]?.title || 'Unknown Job'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {jobs[application.jobId]?.company || ''}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(application.appliedAt).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(application.appliedAt).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                          {getStatusIcon(application.status)}
                          {application.status || 'pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => setSelectedApplication(application)}
                          className="text-[#5848DF] hover:text-[#4a3bc6] mr-3"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      No applications found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Application Detail Modal */}
      {selectedApplication && (
        <ApplicationDetailModal
          application={selectedApplication}
          job={jobs[selectedApplication.jobId]}
          onClose={() => setSelectedApplication(null)}
          onUpdateStatus={updateApplicationStatus}
        />
      )}
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-[#202941] mt-1">{value}</p>
        </div>
        <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center`}>
          <FileText className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
}

function ApplicationDetailModal({ application, job, onClose, onUpdateStatus }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#202941]">Application Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XCircle className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Job Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="h-5 w-5 text-[#5848DF]" />
              <h3 className="font-semibold text-lg">Job Information</h3>
            </div>
            <p className="text-xl font-bold text-[#202941]">{job?.title || 'Unknown Job'}</p>
            <p className="text-gray-600">{job?.company || ''}</p>
            <p className="text-sm text-gray-500 mt-1">{job?.location || ''}</p>
          </div>

          {/* Applicant Info */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <User className="h-5 w-5 text-[#5848DF]" />
              Applicant Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Full Name</label>
                <p className="font-medium">{application.fullName}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  Email
                </label>
                <p className="font-medium">{application.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  Phone
                </label>
                <p className="font-medium">{application.phone}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Applied Date
                </label>
                <p className="font-medium">
                  {new Date(application.appliedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Cover Letter */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#5848DF]" />
              Cover Letter
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 whitespace-pre-line">{application.coverLetter}</p>
            </div>
          </div>

          {/* Resume */}
          {application.resumeFileName && (
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Download className="h-5 w-5 text-[#5848DF]" />
                Resume
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                <span className="text-gray-700">{application.resumeFileName}</span>
                <button className="text-[#5848DF] hover:text-[#4a3bc6] font-medium">
                  Download
                </button>
              </div>
            </div>
          )}

          {/* Status Update */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Update Status</h3>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onUpdateStatus(application.id || application._id, 'pending');
                  onClose();
                }}
                className="flex-1 py-2 px-4 border border-yellow-500 text-yellow-700 rounded-lg hover:bg-yellow-50 transition-colors"
              >
                Pending
              </button>
              <button
                onClick={() => {
                  onUpdateStatus(application.id || application._id, 'reviewing');
                  onClose();
                }}
                className="flex-1 py-2 px-4 border border-blue-500 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Reviewing
              </button>
              <button
                onClick={() => {
                  onUpdateStatus(application.id || application._id, 'accepted');
                  onClose();
                }}
                className="flex-1 py-2 px-4 border border-green-500 text-green-700 rounded-lg hover:bg-green-50 transition-colors"
              >
                Accept
              </button>
              <button
                onClick={() => {
                  onUpdateStatus(application.id || application._id, 'rejected');
                  onClose();
                }}
                className="flex-1 py-2 px-4 border border-red-500 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
