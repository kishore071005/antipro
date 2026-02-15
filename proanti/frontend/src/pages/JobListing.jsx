import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const JobListing = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await api.get('jobs/listings/');
            setJobs(res.data);
        } catch (error) {
            console.error("Error fetching jobs", error);
        } finally {
            setLoading(false);
        }
    };

    const handleApply = async (jobId) => {
        if (!user) {
            alert("Please login to apply");
            return;
        }
        if (user.role !== 'worker') {
            alert("Only workers can apply for jobs");
            return;
        }
        try {
            await api.post('jobs/applications/', { job: jobId });
            alert("Applied successfully!");
        } catch (error) {
            alert("Application failed. You might have already applied.");
        }
    };

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location_city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.employer.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Available Jobs</h1>

            <div className="mb-8 max-w-xl mx-auto">
                <input
                    type="text"
                    placeholder="Search by title, city, or company..."
                    className="w-full border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map(job => (
                    <div key={job.id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
                        <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                        <p className="text-blue-600 font-medium mb-2">{job.employer.company_name}</p>
                        <p className="text-gray-500 text-sm mb-4">{job.location_city} • ${job.wage_offer}</p>
                        <p className="text-gray-700 mb-4 line-clamp-3">{job.description}</p>

                        <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">Posted {new Date(job.created_at).toLocaleDateString()}</span>
                            <button
                                onClick={() => handleApply(job.id)}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                                disabled={user?.role === 'employer'}
                            >
                                Apply Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredJobs.length === 0 && (
                <p className="text-center text-gray-500 mt-10">No jobs found matching your criteria.</p>
            )}
        </div>
    );
};

export default JobListing;
