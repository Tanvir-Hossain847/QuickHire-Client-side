"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Clock, 
  Building2, 
  ArrowLeft,
  CheckCircle2,
  Upload
} from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { Toast } from '@/utils/sweetalert';

export default function JobDetail() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applying, setApplying] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  
  // Application form state
  const [formData, setFormData] = useState({
    fullName: user?.displayName || '',
    email: user?.email || '',
    phone: '',
    coverLetter: '',
    resume: null
  });

  useEffect(() => {
    if (params.id) {
      fetchJobDetail();
    }
  }, [params.id]);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.displayName || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const fetchJobDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://quick-hire-server-side-jmmo.vercel.app/jobs/${params.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch job details');
      }
      const data = await response.json();
      setJob(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching job details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      resume: file
    }));
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    
    if (!user) {
      router.push('/login');
      return;
    }

    setApplying(true);

    try {
      const applicationData = {
        jobId: params.id,
        userId: user.uid,
        userEmail: user.email,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        coverLetter: formData.coverLetter,
        resumeFileName: formData.resume?.name || null,
        appliedAt: new Date().toISOString(),
        status: 'pending'
      };

      // Send application to backend
      const response = await fetch('https://quick-hire-server-side-jmmo.vercel.app/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      // If you need to upload the resume file separately:
      // if (formData.resume) {
      //   const formDataToSend = new FormData();
      //   formDataToSend.append('resume', formData.resume);
      //   formDataToSend.append('applicationId', applicationId);
      //   
      //   await fetch('https://quick-hire-server-side-jmmo.vercel.app/applications/upload-resume', {
      //     method: 'POST',
      //     body: formDataToSend
      //   });
      // }

      setApplicationSubmitted(true);
      Toast.fire({
        icon: 'success',
        title: 'Application submitted successfully!'
      });
    } catch (err) {
      console.error('Error submitting application:', err);
      Toast.fire({
        icon: 'error',
        title: 'Failed to submit application. Please try again.'
      });
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5848DF] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-24">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error || 'Job not found'}</p>
          <button 
            onClick={() => router.push('/find-jobs')}
            className="px-6 py-2 bg-[#5848DF] text-white rounded-md hover:bg-[#4a3bc6] transition-colors"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  if (applicationSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-24">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#202941] mb-2">Application Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Your application for {job.title} at {job.company} has been successfully submitted.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => router.push('/find-jobs')}
              className="w-full py-3 bg-[#5848DF] text-white font-semibold rounded-lg hover:bg-[#4a3bc6] transition-colors"
            >
              Browse More Jobs
            </button>
            <button
              onClick={() => router.push('/')}
              className="w-full py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-[#5848DF] mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Jobs
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-start gap-4 mb-4">
                {job.companyLogo ? (
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                    <Image
                      src={job.companyLogo}
                      alt={job.company || 'Company'}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-[#5848DF]/10 flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-8 w-8 text-[#5848DF]" />
                  </div>
                )}
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-[#202941] mb-2">
                    {job.title}
                  </h1>
                  <p className="text-xl text-gray-600">{job.company}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {job.location && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-5 w-5 text-[#5848DF]" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                )}
                
                {job.jobType && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Briefcase className="h-5 w-5 text-[#5848DF]" />
                    <span className="text-sm capitalize">{job.jobType}</span>
                  </div>
                )}
                
                {job.salary && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="h-5 w-5 text-[#5848DF]" />
                    <span className="text-sm">{job.salary}</span>
                  </div>
                )}
                
                {job.postedDate && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-5 w-5 text-[#5848DF]" />
                    <span className="text-sm">{job.postedDate}</span>
                  </div>
                )}
              </div>

              {job.tags && job.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {job.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#5848DF]/10 text-[#5848DF] text-sm font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-[#202941] mb-4">Job Description</h2>
              <div className="prose prose-sm max-w-none text-gray-600">
                <p className="whitespace-pre-line">{job.description || 'No description available.'}</p>
              </div>
            </div>

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-[#202941] mb-4">Requirements</h2>
                <ul className="space-y-2">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-[#202941] mb-4">Responsibilities</h2>
                <ul className="space-y-2">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <CheckCircle2 className="h-5 w-5 text-[#5848DF] flex-shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Application Form Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 sticky top-24">
              <h2 className="text-xl font-bold text-[#202941] mb-4">Apply for this job</h2>
              
              {!user && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-sm text-yellow-800">
                    Please <a href="/login" className="font-semibold underline">login</a> to apply for this job.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmitApplication} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#202941] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5848DF] focus:border-transparent outline-none"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#202941] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5848DF] focus:border-transparent outline-none"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#202941] mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5848DF] focus:border-transparent outline-none"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#202941] mb-2">
                    Cover Letter *
                  </label>
                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5848DF] focus:border-transparent outline-none resize-none"
                    placeholder="Tell us why you're a great fit for this role..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#202941] mb-2">
                    Resume/CV *
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      required
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      id="resume-upload"
                    />
                    <label
                      htmlFor="resume-upload"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#5848DF] transition-colors"
                    >
                      <Upload className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {formData.resume ? formData.resume.name : 'Upload Resume (PDF, DOC)'}
                      </span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={applying || !user}
                  className="w-full py-3 bg-[#5848DF] text-white font-bold rounded-lg hover:bg-[#4a3bc6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {applying ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
