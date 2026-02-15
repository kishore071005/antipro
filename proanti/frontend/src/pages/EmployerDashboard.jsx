import { useState, useEffect } from 'react';
import api from '../services/api';
import { Briefcase, MapPin, Plus, Users, Search, Building, CheckCircle, XCircle, Clock } from 'lucide-react';

const EmployerDashboard = () => {
    const [profile, setProfile] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newJob, setNewJob] = useState({ title: '', description: '', location_city: '', location_pincode: '', wage_offer: '' });
    const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'post_job', 'my_jobs', 'applications'
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            // Fetch profile first to ensure user is valid
            const profileRes = await api.get('employers/me/');
            setProfile(profileRes.data);

            // Then fetch jobs and applications concurrently
            const [jobsRes, applicationsRes] = await Promise.all([
                api.get('jobs/listings/my_jobs/'),
                api.get('jobs/applications/')
            ]);
            setJobs(jobsRes.data);
            setApplications(applicationsRes.data);
        } catch (error) {
            console.error("Error fetching data", error);
            setError("Failed to load dashboard data. Please try refreshing.");
        } finally {
            setLoading(false);
        }
    };

    const handlePostJob = async (e) => {
        e.preventDefault();
        try {
            await api.post('jobs/listings/', newJob);
            setNewJob({ title: '', description: '', location_city: '', location_pincode: '', wage_offer: '' });
            alert("Job posted successfully!");
            setActiveTab('my_jobs');
            fetchData();
        } catch (error) {
            console.error("Post job failed", error);
            alert("Failed to post job. Please check your inputs.");
        }
    };

    const handleApplicationStatus = async (appId, status) => {
        try {
            await api.patch(`jobs/applications/${appId}/`, { status });
            // Optimistic update
            setApplications(apps => apps.map(app => app.id === appId ? { ...app, status } : app));
        } catch (error) {
            console.error("Update status failed", error);
            alert("Failed to update status.");
            fetchData(); // Revert on failure
        }
    };

    if (loading) return <div className="flex justify-center items-center h-64 text-gray-500">Loading Employer Dashboard...</div>;

    if (error) return (
        <div className="flex flex-col items-center justify-center h-64 text-red-500">
            <p className="text-xl font-semibold mb-4">{error}</p>
            <button onClick={fetchData} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Retry</button>
        </div>
    );

    if (!profile) return <div className="text-center p-10">Profile not found. Please contact support.</div>;

    const stats = [
        { label: 'Active Jobs', value: jobs.length, icon: <Briefcase size={20} className="text-blue-600" />, bg: 'bg-blue-100' },
        { label: 'Total Applications', value: applications.length, icon: <Users size={20} className="text-purple-600" />, bg: 'bg-purple-100' },
        { label: 'Pending Review', value: applications.filter(a => a.status === 'pending').length, icon: <Clock size={20} className="text-orange-600" />, bg: 'bg-orange-100' },
    ];

    return (
        <div className="container mx-auto max-w-6xl">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8 flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center mb-4 md:mb-0">
                    <div className="bg-blue-600 h-16 w-16 rounded-xl flex items-center justify-center text-white text-2xl font-bold mr-6 shadow-lg">
                        {profile.company_name.charAt(0)}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{profile.company_name}</h1>
                        <div className="flex items-center text-gray-500 mt-1">
                            <MapPin size={16} className="mr-1" />
                            <span>{profile.city}</span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => setActiveTab('post_job')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                    <Plus size={20} className="mr-2" /> Post New Job
                </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex space-x-1 mb-8 overflow-x-auto pb-2">
                {[
                    { id: 'overview', label: 'Overview', icon: <Building size={18} /> },
                    { id: 'my_jobs', label: 'My Jobs', icon: <Briefcase size={18} /> },
                    { id: 'applications', label: 'Applications', icon: <Users size={18} /> },
                    { id: 'post_job', label: 'Post a Job', icon: <Plus size={18} /> },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center px-6 py-3 rounded-lg font-medium transition whitespace-nowrap ${activeTab === tab.id
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <span className="mr-2">{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[400px] p-8">

                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center">
                                    <div className={`${stat.bg} p-4 rounded-full mr-4`}>
                                        {stat.icon}
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-4">Recent Applications</h3>
                            {applications.length === 0 ? (
                                <p className="text-gray-500 italic">No applications yet.</p>
                            ) : (
                                <div className="space-y-4">
                                    {applications.slice(0, 3).map(app => (
                                        <div key={app.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50">
                                            <div>
                                                <p className="font-bold text-gray-900">{app.worker_name || 'Worker'}</p>
                                                <p className="text-sm text-gray-600">Applied for: <span className="font-medium">{app.job_title}</span></p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${app.status === 'accepted' ? 'bg-green-100 text-green-700' :
                                                    app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                        'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {app.status}
                                            </span>
                                        </div>
                                    ))}
                                    {applications.length > 3 && (
                                        <button onClick={() => setActiveTab('applications')} className="text-blue-600 text-sm font-medium hover:underline">
                                            View all applications
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* POST JOB TAB */}
                {activeTab === 'post_job' && (
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6 text-center">Hire Local Talent</h2>
                        <form onSubmit={handlePostJob} className="space-y-6">
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Job Title</label>
                                <input
                                    placeholder="e.g. Electrician, Delivery Partner"
                                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    value={newJob.title}
                                    onChange={e => setNewJob({ ...newJob, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">City</label>
                                    <input
                                        placeholder="City"
                                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        value={newJob.location_city}
                                        onChange={e => setNewJob({ ...newJob, location_city: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Pincode</label>
                                    <input
                                        placeholder="123456"
                                        className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        value={newJob.location_pincode}
                                        onChange={e => setNewJob({ ...newJob, location_pincode: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Wage Offer (₹/hr)</label>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    value={newJob.wage_offer}
                                    onChange={e => setNewJob({ ...newJob, wage_offer: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-medium mb-2">Job Description</label>
                                <textarea
                                    placeholder="Describe the role and requirements..."
                                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none h-32"
                                    value={newJob.description}
                                    onChange={e => setNewJob({ ...newJob, description: e.target.value })}
                                    required
                                />
                            </div>

                            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-md">
                                Post Job Listing
                            </button>
                        </form>
                    </div>
                )}

                {/* MY JOBS TAB */}
                {activeTab === 'my_jobs' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Active Job Listings</h2>
                            <span className="text-gray-500 text-sm">{jobs.length} jobs found</span>
                        </div>

                        {jobs.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 rounded-xl">
                                <Briefcase size={48} className="mx-auto text-gray-300 mb-4" />
                                <p className="text-gray-500 mb-4">You haven't posted any jobs yet.</p>
                                <button onClick={() => setActiveTab('post_job')} className="text-blue-600 font-bold hover:underline">Post your first job</button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {jobs.map(job => (
                                    <div key={job.id} className="border border-gray-200 p-6 rounded-xl hover:shadow-md transition bg-white group">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">{job.title}</h3>
                                        <div className="flex items-center text-gray-600 text-sm mb-4 space-x-4">
                                            <span className="flex items-center"><MapPin size={14} className="mr-1" /> {job.location_city}</span>
                                            <span className="flex items-center">₹{job.wage_offer}/hr</span>
                                        </div>
                                        <p className="text-gray-500 text-sm line-clamp-2 mb-4">{job.description}</p>
                                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                            <span className="text-xs text-gray-400">Posted on {new Date(job.created_at).toLocaleDateString()}</span>
                                            <button className="text-blue-600 text-sm font-medium hover:underline">View Details</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* APPLICATIONS TAB */}
                {activeTab === 'applications' && (
                    <div>
                        <h2 className="text-xl font-bold mb-6">Candidate Applications</h2>
                        {applications.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 rounded-xl">
                                <Users size={48} className="mx-auto text-gray-300 mb-4" />
                                <p className="text-gray-500">No applications received yet.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {applications.map(app => (
                                    <div key={app.id} className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                            <div className="mb-4 md:mb-0">
                                                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                                                    {app.worker_name || 'Worker'}
                                                    <span className="mx-2 text-gray-300">|</span>
                                                    <span className="text-blue-600 text-base font-normal">{app.job_title}</span>
                                                </h3>
                                                <p className="text-gray-500 text-sm mt-1">Applied on {new Date().toLocaleDateString()}</p>
                                            </div>

                                            <div className="flex items-center space-x-3">
                                                {app.status === 'pending' ? (
                                                    <>
                                                        <button
                                                            onClick={() => handleApplicationStatus(app.id, 'accepted')}
                                                            className="flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium hover:bg-green-200 transition"
                                                        >
                                                            <CheckCircle size={16} className="mr-2" /> Accept
                                                        </button>
                                                        <button
                                                            onClick={() => handleApplicationStatus(app.id, 'rejected')}
                                                            className="flex items-center bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition"
                                                        >
                                                            <XCircle size={16} className="mr-2" /> Reject
                                                        </button>
                                                    </>
                                                ) : (
                                                    <span className={`px-4 py-2 rounded-lg font-bold uppercase text-sm ${app.status === 'accepted' ? 'bg-green-100 text-green-700' :
                                                            app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                                'bg-yellow-100 text-yellow-700'
                                                        }`}>
                                                        {app.status}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployerDashboard;
