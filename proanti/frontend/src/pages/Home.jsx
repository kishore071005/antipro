import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, MapPin, Users, Briefcase } from 'lucide-react';

const Home = () => {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-3xl overflow-hidden shadow-2xl mb-16 py-20 px-8 text-center md:text-left">
                <div className="md:flex items-center justify-between">
                    <div className="md:w-1/2 mb-10 md:mb-0">
                        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                            Hire Local Talent.<br />
                            <span className="text-blue-300">Build Your Business.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-lg">
                            The smartest way for MSMEs to connect with verified skilled workers in your neighborhood. Fast, reliable, and local.
                        </p>
                        <div className="flex flex-col md:flex-row gap-4">
                            <Link to="/register" className="bg-white text-blue-800 px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:bg-blue-50 transition transform hover:-translate-y-1 flex items-center justify-center">
                                Get Started <ArrowRight className="ml-2" size={20} />
                            </Link>
                            <Link to="/jobs" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white/10 transition flex items-center justify-center">
                                Browse Jobs
                            </Link>
                        </div>
                    </div>

                    {/* Hero Graphic / Stats */}
                    <div className="md:w-1/2 flex justify-center">
                        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-xl max-w-sm">
                            <div className="flex items-center mb-6">
                                <div className="bg-green-400 p-3 rounded-full mr-4">
                                    <Users size={24} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold">500+</h3>
                                    <p className="text-blue-200">Verified Workers</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="bg-yellow-400 p-3 rounded-full mr-4">
                                    <Briefcase size={24} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold">120+</h3>
                                    <p className="text-blue-200">Active Jobs</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="mb-20">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Local Skill Connect?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition">
                        <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center text-blue-600 mb-6">
                            <CheckCircle size={28} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900">Verified Profiles</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Every worker profile is verified for skills and certifications. Hire with confidence knowing you're getting quality talent.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition">
                        <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center text-purple-600 mb-6">
                            <MapPin size={28} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900">Hyper-Local Search</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Filter candidates by city and pincode. Find staff who live nearby, reducing commute times and improving retention.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition">
                        <div className="bg-indigo-100 w-14 h-14 rounded-full flex items-center justify-center text-indigo-600 mb-6">
                            <Briefcase size={28} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900">MSME Focused</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Designed specifically for small business needs. Simple job posting, easy application management, and direct contact.
                        </p>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-gray-900 text-white rounded-3xl p-12 text-center shadow-2xl">
                <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Hiring?</h2>
                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                    Join hundreds of local businesses and skilled workers today. It's free to get started.
                </p>
                <div className="flex justify-center space-x-4">
                    <Link to="/register" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
                        Register Now
                    </Link>
                    <Link to="/login" className="text-gray-300 px-8 py-3 rounded-lg font-bold hover:text-white transition">
                        Login
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
