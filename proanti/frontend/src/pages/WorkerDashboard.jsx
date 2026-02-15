import { useState, useEffect } from 'react';
import api from '../services/api';
import { User, Briefcase, MapPin, DollarSign, Award, Clock, Edit2, Save, X } from 'lucide-react';

const WorkerDashboard = () => {
    const [profile, setProfile] = useState(null);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const [activeTab, setActiveTab] = useState('overview'); // 'overview' or 'applications'

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [profileRes, applicationsRes] = await Promise.all([
                api.get('workers/me/'),
                api.get('jobs/applications/')
            ]);
            setProfile(profileRes.data);
            setEditData(profileRes.data);
            setApplications(applicationsRes.data);
        } catch (error) {
            console.error("Error fetching data", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await api.patch('workers/me/', editData);
            setProfile(res.data);
            setIsEditing(false);
        } catch (error) {
            console.error("Update failed", error);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;

    if (!profile) return <div className="text-center p-10 text-red-500">Failed to load profile. Please try refreshing.</div>;

    const stats = [
        { label: 'Applications', value: applications.length, icon: <Briefcase size={20} className="text-blue-600" />, bg: 'bg-blue-100' },
        { label: 'Interviews', value: applications.filter(a => a.status === 'accepted').length, icon: <User size={20} className="text-green-600" />, bg: 'bg-green-100' },
        { label: 'Profile Views', value: '24', icon: <User size={20} className="text-purple-600" />, bg: 'bg-purple-100' },
    ];

    return (
        <div className="container mx-auto max-w-6xl">
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-2xl text-white shadow-lg">
                <div>
                    <h1 className="text-3xl font-bold">Welcome back, {profile.username}!</h1>
                    <p className="text-blue-100 mt-2">Here's what's happening with your job search today.</p>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-3">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === 'overview' ? 'bg-white text-blue-700' : 'bg-white/20 hover:bg-white/30'}`}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('applications')}
                        className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === 'applications' ? 'bg-white text-blue-700' : 'bg-white/20 hover:bg-white/30'}`}
                    >
                        Applications
                    </button>
                </div>
            </div>

            {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Stats & Profile */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-4">
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                                    <div className={`${stat.bg} p-3 rounded-full mb-3`}>
                                        {stat.icon}
                                    </div>
                                    <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
                                    <span className="text-sm text-gray-500">{stat.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Profile Details */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <h2 className="text-xl font-bold flex items-center">
                                    <User size={20} className="mr-2 text-gray-500" /> My Profile
                                </h2>
                                {!isEditing && (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
                                    >
                                        <Edit2 size={16} className="mr-1" /> Edit Profile
                                    </button>
                                )}
                            </div>

                            <div className="p-6">
                                {isEditing ? (
                                    <form onSubmit={handleUpdate} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-gray-700 text-sm font-medium mb-1">City</label>
                                                <input
                                                    type="text"
                                                    className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={editData.city}
                                                    onChange={(e) => setEditData({ ...editData, city: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-700 text-sm font-medium mb-1">Experience (Years)</label>
                                                <input
                                                    type="number"
                                                    className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={editData.experience_years}
                                                    onChange={(e) => setEditData({ ...editData, experience_years: e.target.value })}
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-gray-700 text-sm font-medium mb-1">Expected Wage ($/hr)</label>
                                                <input
                                                    type="number"
                                                    className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    value={editData.expected_wage}
                                                    onChange={(e) => setEditData({ ...editData, expected_wage: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-end space-x-3 mt-4">
                                            <button
                                                type="button"
                                                onClick={() => setIsEditing(false)}
                                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                                            >
                                                <Save size={16} className="mr-2" /> Save Changes
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6">
                                        <div className="flex items-start">
                                            <MapPin className="text-gray-400 mt-1 mr-3" size={20} />
                                            <div>
                                                <p className="text-gray-500 text-xs uppercase tracking-wide font-semibold">Location</p>
                                                <p className="text-gray-800 font-medium">{profile.city || 'Not set'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <Clock className="text-gray-400 mt-1 mr-3" size={20} />
                                            <div>
                                                <p className="text-gray-500 text-xs uppercase tracking-wide font-semibold">Experience</p>
                                                <p className="text-gray-800 font-medium">{profile.experience_years} Years</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <DollarSign className="text-gray-400 mt-1 mr-3" size={20} />
                                            <div>
                                                <p className="text-gray-500 text-xs uppercase tracking-wide font-semibold">Expected Wage</p>
                                                <p className="text-gray-800 font-medium">${profile.expected_wage}/hr</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <Award className="text-gray-400 mt-1 mr-3" size={20} />
                                            <div>
                                                <p className="text-gray-500 text-xs uppercase tracking-wide font-semibold">Skills</p>
                                                <div className="flex flex-wrap gap-2 mt-1">
                                                    {profile.skills && profile.skills.length > 0 ? profile.skills.map(skill => (
                                                        <span key={skill} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-sm font-medium">
                                                            {skill}
                                                        </span>
                                                    )) : <span className="text-gray-400 italic">No skills added</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Recent Activity / Upsell */}
                    <div className="space-y-8">
                        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-6 text-white shadow-lg">
                            <h3 className="text-lg font-bold mb-2">Get Verified</h3>
                            <p className="text-blue-100 text-sm mb-4">Verified profiles get 3x more interview calls. Upload your certifications today.</p>
                            <button className="w-full bg-white text-indigo-600 font-bold py-2 rounded-lg hover:bg-blue-50 transition">
                                Upload Certificate
                            </button>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold mb-4 text-gray-800">Job Recommendations</h3>
                            <p className="text-gray-500 text-center py-8">Complete your profile to get personalized job matches.</p>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'applications' && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold">My Applications</h2>
                    </div>
                    {applications.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">
                            <Briefcase size={48} className="mx-auto text-gray-300 mb-4" />
                            <p className="text-lg">You haven't applied to any jobs yet.</p>
                            <button className="mt-4 text-blue-600 font-medium hover:underline">Browse Jobs</button>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {applications.map(app => (
                                <div key={app.id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-gray-50 transition">
                                    <div className="mb-4 md:mb-0">
                                        <h3 className="text-lg font-bold text-gray-900">{app.job_title}</h3>
                                        <p className="text-gray-600">{app.employer_company}</p>
                                        <p className="text-xs text-gray-400 mt-1">Applied on {new Date().toLocaleDateString()}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${app.status === 'accepted' ? 'bg-green-100 text-green-700' :
                                        app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                            'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {app.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default WorkerDashboard;
