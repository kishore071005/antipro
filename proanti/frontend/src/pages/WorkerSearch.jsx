import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const WorkerSearch = () => {
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchWorkers();
    }, []);

    const fetchWorkers = async () => {
        try {
            const res = await api.get('workers/');
            setWorkers(res.data);
        } catch (error) {
            console.error("Error fetching workers", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredWorkers = workers.filter(worker =>
        worker.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Find Skilled Workers</h1>

            <div className="mb-8 max-w-xl mx-auto">
                <input
                    type="text"
                    placeholder="Search by city or skill..."
                    className="w-full border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWorkers.map(worker => (
                    <div key={worker.id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
                        <h3 className="text-xl font-bold mb-2">{worker.username}</h3>
                        <p className="text-gray-500 text-sm mb-2">{worker.city} • {worker.experience_years} years exp</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {worker.skills.map(skill => (
                                <span key={skill} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                    {skill}
                                </span>
                            ))}
                        </div>

                        <p className="text-gray-600 text-sm mb-4">Expected Wage: ${worker.expected_wage}</p>

                        <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Contact Worker
                        </button>
                    </div>
                ))}
            </div>

            {filteredWorkers.length === 0 && (
                <p className="text-center text-gray-500 mt-10">No workers found matching your criteria.</p>
            )}
        </div>
    );
};

export default WorkerSearch;
