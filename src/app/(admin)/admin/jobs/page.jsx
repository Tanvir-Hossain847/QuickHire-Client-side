"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Search, 
  X,
  MapPin,
  Briefcase,
  DollarSign
} from 'lucide-react';
import { Toast, Swal } from '@/utils/sweetalert';

export default function ManageJobs() {
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    fetchJobs();
    // Check if we should open add modal from URL
    if (searchParams.get('action') === 'add') {
      setShowAddModal(true);
    }
  }, [searchParams]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:4000/jobs');
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/jobs/${jobId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setJobs(jobs.filter(job => (job.id || job._id) !== jobId));
        Toast.fire({
          icon: 'success',
          title: 'Job deleted successfully!'
        });
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Failed to delete job'
        });
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error deleting job'
      });
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#202941]">Manage Jobs</h1>
          <p className="text-gray-600 mt-1">Add, edit, or delete job postings</p>
        </div>
        <button
          onClick={() => {
            setEditingJob(null);
            setShowAddModal(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-[#5848DF] text-white font-semibold rounded-lg hover:bg-[#4a3bc6] transition-colors"
        >
          <Plus className="h-5 w-5" />
          Add New Job
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search jobs by title or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5848DF] focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Jobs Table */}
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
                    Salary
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <tr key={job.id || job._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{job.title}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">{job.company}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">{job.location}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 capitalize">
                          {job.jobType}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">{job.salary || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingJob(job);
                              setShowAddModal(true);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteJob(job.id || job._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      No jobs found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Job Modal */}
      {showAddModal && (
        <JobModal
          job={editingJob}
          onClose={() => {
            setShowAddModal(false);
            setEditingJob(null);
          }}
          onSuccess={() => {
            fetchJobs();
            setShowAddModal(false);
            setEditingJob(null);
          }}
        />
      )}
    </div>
  );
}

function JobModal({ job, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: job?.title || '',
    company: job?.company || '',
    location: job?.location || '',
    jobType: job?.jobType || 'full-time',
    salary: job?.salary || '',
    description: job?.description || '',
    requirements: job?.requirements?.join('\n') || '',
    responsibilities: job?.responsibilities?.join('\n') || '',
    tags: job?.tags?.join(', ') || '',
    companyLogo: job?.companyLogo || '',
    postedDate: job?.postedDate || new Date().toLocaleDateString()
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const jobData = {
        ...formData,
        requirements: formData.requirements.split('\n').filter(r => r.trim()),
        responsibilities: formData.responsibilities.split('\n').filter(r => r.trim()),
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
      };

      const url = job 
        ? `http://localhost:4000/jobs/${job.id || job._id}`
        : 'http://localhost:4000/jobs';
      
      const method = job ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        Toast.fire({
          icon: 'success',
          title: job ? 'Job updated successfully!' : 'Job added successfully!'
        });
        onSuccess();
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Failed to save job'
        });
      }
    } catch (error) {
      console.error('Error saving job:', error);
      Toast.fire({
        icon: 'error',
        title: 'Error saving job'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#202941]">
            {job ? 'Edit Job' : 'Add New Job'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#202941] mb-2">
                Job Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5848DF] focus:border-transparent outline-none"
                placeholder="e.g. Senior Software Engineer"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#202941] mb-2">
                Company *
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5848DF] focus:border-transparent outline-none"
                placeholder="e.g. Google"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#202941] mb-2">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5848DF] focus:border-transparent outline-none"
                placeholder="e.g. San Francisco, CA"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#202941] mb-2">
                Job Type *
              </label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5848DF] focus:border-transparent outline-none"
              >
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#202941] mb-2">
                Salary
              </label>
              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5848DF] focus:border-transparent outline-none"
                placeholder="e.g. $80k - $120k"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#202941] mb-2">
                Company Logo URL
              </label>
              <input
                type="url"
                name="companyLogo"
                value={formData.companyLogo}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5848DF] focus:border-transparent outline-none"
                placeholder="https://example.com/logo.png"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#202941] mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5848DF] focus:border-transparent outline-none resize-none"
              placeholder="Describe the job role..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#202941] mb-2">
              Requirements (one per line)
            </label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5848DF] focus:border-transparent outline-none resize-none"
              placeholder="5+ years of experience&#10;Bachelor's degree in CS&#10;Strong communication skills"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#202941] mb-2">
              Responsibilities (one per line)
            </label>
            <textarea
              name="responsibilities"
              value={formData.responsibilities}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5848DF] focus:border-transparent outline-none resize-none"
              placeholder="Design and develop features&#10;Collaborate with team&#10;Code reviews"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#202941] mb-2">
              Tags (comma separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5848DF] focus:border-transparent outline-none"
              placeholder="React, Node.js, TypeScript"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-3 bg-[#5848DF] text-white font-semibold rounded-lg hover:bg-[#4a3bc6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Saving...' : (job ? 'Update Job' : 'Add Job')}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
