import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Package, Settings, LogOut, Camera } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const { user, logout, updateUser } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(true);
    
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchProfile = async () => {
            try {
                const { data } = await axios.get('/api/users/profile');
                setProfile({
                    name: data.name || '',
                    email: data.email || '',
                    phone: data.phone || '',
                    address: data.address || ''
                });
                setLoading(false);
            } catch (error) {
                toast.error('Failed to load profile');
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user, navigate]);

    const handleInputChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put('/api/users/profile', profile);
            
            // Update local storage user info and AuthContext (keep the token)
            const updatedUser = { ...user, name: data.name, email: data.email };
            updateUser(updatedUser);
            
            toast.success('Profile updated successfully');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update profile');
        }
    };

    const passwordSubmitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        
        try {
            await axios.put('/api/users/profile', { password });
            toast.success('Password updated successfully');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update password');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-28">
                            <div className="p-6 text-center border-b border-gray-100 bg-gradient-to-b from-blue-50 to-white">
                                <div className="relative inline-block mb-4">
                                    <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-bold mx-auto border-4 border-white shadow-md">
                                        {profile.name ? profile.name.substring(0, 2).toUpperCase() : 'U'}
                                    </div>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
                                <p className="text-gray-500 text-sm mt-1">{profile.email}</p>
                            </div>

                            <nav className="p-4 space-y-1">
                                <button
                                    onClick={() => setActiveTab('profile')}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'profile' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <User className="w-5 h-5" />
                                    <span>Personal Info</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('orders')}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'orders' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <Package className="w-5 h-5" />
                                    <span>Orders</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('settings')}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'settings' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <Settings className="w-5 h-5" />
                                    <span>Settings</span>
                                </button>
                                <div className="border-t border-gray-100 my-2 pt-2">
                                    <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors">
                                        <LogOut className="w-5 h-5" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-3">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8"
                        >
                            {activeTab === 'profile' && (
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Personal Information</h2>
                                    <form onSubmit={submitHandler} className="space-y-6 max-w-2xl">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={profile.name}
                                                        onChange={handleInputChange}
                                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-colors"
                                                    />
                                                    <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        name="phone"
                                                        value={profile.phone}
                                                        onChange={handleInputChange}
                                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-colors"
                                                        placeholder="+1 (555) 000-0000"
                                                    />
                                                    <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={profile.email}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-colors"
                                                />
                                                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Address</label>
                                            <div className="relative">
                                                <textarea
                                                    name="address"
                                                    value={profile.address}
                                                    onChange={handleInputChange}
                                                    rows="3"
                                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-colors"
                                                    placeholder="Your complete address..."
                                                ></textarea>
                                                <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                            </div>
                                        </div>
                                        <div className="pt-4 flex justify-end">
                                            <button
                                                type="submit"
                                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-xl transition-colors shadow-md shadow-blue-600/20"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {activeTab === 'orders' && (
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Order History</h2>
                                    <div className="text-center py-12">
                                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
                                        <p className="text-gray-500 mt-2">When you place your first order, it will appear here.</p>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'settings' && (
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Account Settings</h2>
                                    <div className="space-y-6 max-w-2xl">
                                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">Change Password</h3>
                                            <p className="text-sm text-gray-500 mb-4">Update your password to keep your account secure.</p>
                                            <form onSubmit={passwordSubmitHandler} className="space-y-4">
                                                <input 
                                                    type="password" 
                                                    placeholder="New Password" 
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                                    required
                                                />
                                                <input 
                                                    type="password" 
                                                    placeholder="Confirm New Password" 
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                                    required
                                                />
                                                <button type="submit" className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors">Update Password</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
