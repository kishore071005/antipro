import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import ConnectionStatus from './ConnectionStatus';

const Layout = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8 relative">
                <Outlet />
            </main>
            <footer className="bg-gray-800 text-white py-6 text-center mt-auto">
                <div className="container mx-auto">
                    <p>&copy; {new Date().getFullYear()} Local Skill Connect. All rights reserved.</p>
                    <p className="text-gray-400 text-sm mt-1">Connecting MSMEs with Local Talent</p>
                </div>
            </footer>
            <ConnectionStatus />
        </div>
    );
};

export default Layout;
