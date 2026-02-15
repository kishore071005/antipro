import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Briefcase, Search } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="text-xl font-bold text-blue-600">LocalSkillConnect</Link>

                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                {user.role === 'worker' && (
                                    <Link to="/worker/dashboard" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                                        <User size={18} />
                                        <span>Dashboard</span>
                                    </Link>
                                )}
                                {user.role === 'employer' && (
                                    <>
                                        <Link to="/employer/dashboard" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                                            <Briefcase size={18} />
                                            <span>Dashboard</span>
                                        </Link>
                                        <Link to="/workers" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                                            <Search size={18} />
                                            <span>Find Workers</span>
                                        </Link>
                                    </>
                                )}
                                <button onClick={handleLogout} className="flex items-center space-x-1 text-red-600 hover:text-red-800">
                                    <LogOut size={18} />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
                                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
