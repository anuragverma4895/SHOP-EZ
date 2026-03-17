import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, Edit, Trash2, Plus, Image as ImageIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

const Sidebar = ({ currentPath }) => {
    const links = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { name: 'Banners', path: '/admin/banners', icon: ImageIcon },
        { name: 'Products', path: '/admin/products', icon: Package },
        { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
        { name: 'Users', path: '/admin/users', icon: Users },
    ];

    return (
        <div className="w-64 bg-slate-950 min-h-[calc(100vh-80px)] text-white p-6 shrink-0 hidden lg:block sticky top-20 border-r border-slate-800">
            <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-1">Admin Panel</h2>
                <p className="text-gray-400 text-sm">ShopEZ Control Center</p>
            </div>
            <nav className="space-y-2">
                {links.map(link => {
                    const isActive = currentPath === link.path;
                    const Icon = link.icon;
                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{link.name}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
};

const AdminBanners = () => {
    const location = useLocation();
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBanner, setEditingBanner] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        isActive: true
    });

    const fetchBanners = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`
                }
            };
            setLoading(true);
            const { data } = await axios.get('/api/banners', config);
            setBanners(data);
            setLoading(false);
        } catch (error) {
            toast.error('Failed to fetch banners');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const openModal = (banner = null) => {
        if (banner) {
            setEditingBanner(banner);
            setFormData({
                title: banner.title,
                image: banner.image,
                isActive: banner.isActive
            });
        } else {
            setEditingBanner(null);
            setFormData({
                title: '', image: '', isActive: true
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`
                }
            };

            if (editingBanner) {
                await axios.put(`/api/banners/${editingBanner._id}`, formData, config);
                toast.success('Banner updated');
            } else {
                await axios.post('/api/banners', formData, config);
                toast.success('Banner created');
            }

            setIsModalOpen(false);
            fetchBanners();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error saving banner');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this banner?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`
                    }
                };
                await axios.delete(`/api/banners/${id}`, config);
                toast.success('Banner deleted');
                fetchBanners();
            } catch (error) {
                toast.error('Failed to delete banner');
            }
        }
    };

    return (
        <div className="flex bg-slate-900 min-h-screen pt-20 relative">
            <Sidebar currentPath={location.pathname} />

            <div className="flex-1 p-8 overflow-y-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Manage Banners</h1>
                        <p className="text-gray-400 mt-1">Add, edit, or delete home page hero banners</p>
                    </div>

                    <button onClick={() => openModal()} className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors border-none shadow-sm">
                        <Plus className="w-5 h-5" />
                        <span className="hidden sm:inline">Add Banner</span>
                    </button>
                </div>

                <div className="bg-slate-800 rounded-2xl shadow-sm border border-slate-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-800 border-b border-slate-700 text-gray-400 text-xs uppercase tracking-wider">
                                    <th className="py-4 px-6 font-medium">Image Preview</th>
                                    <th className="py-4 px-6 font-medium">Title</th>
                                    <th className="py-4 px-6 font-medium">Status</th>
                                    <th className="py-4 px-6 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                {loading ? (
                                    <tr><td colSpan="4" className="text-center py-8 text-gray-400">Loading banners...</td></tr>
                                ) : banners.map((banner, i) => (
                                    <motion.tr
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        key={banner._id}
                                        className="hover:bg-slate-700/50 transition-colors"
                                    >
                                        <td className="py-4 px-6">
                                            <div className="w-32 h-16 rounded overflow-hidden bg-slate-700">
                                                <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 font-medium text-white">{banner.title}</td>
                                        <td className="py-4 px-6">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${banner.isActive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                                {banner.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right space-x-2">
                                            <button onClick={() => openModal(banner)} className="p-2 text-gray-400 hover:text-indigo-400 transition-colors bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDelete(banner._id)} className="p-2 text-gray-400 hover:text-red-400 transition-colors bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                                {!loading && banners.length === 0 && (
                                    <tr><td colSpan="4" className="text-center py-8 text-gray-400">No banners found</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-slate-800 border border-slate-700 rounded-2xl shadow-xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <div className="flex justify-between items-center p-6 border-b border-slate-700">
                                <h3 className="text-xl font-bold text-white">{editingBanner ? 'Edit Banner' : 'Add New Banner'}</h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-6 overflow-y-auto">
                                <form id="banner-form" onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Banner Title</label>
                                        <input required type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Image URL</label>
                                        <input required type="text" name="image" value={formData.image} onChange={handleInputChange} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500" />
                                        {formData.image && (
                                            <div className="mt-3 aspect-video rounded-lg overflow-hidden bg-slate-900 border border-slate-700">
                                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.src = 'https://via.placeholder.com/800x400?text=Invalid+Image+URL' }} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input type="checkbox" id="isActive" name="isActive" checked={formData.isActive} onChange={handleInputChange} className="w-4 h-4 text-indigo-600 bg-slate-900 border-slate-700 rounded focus:ring-indigo-500 focus:ring-2" />
                                        <label htmlFor="isActive" className="text-sm font-medium text-white cursor-pointer">Set as Active</label>
                                    </div>
                                </form>
                            </div>

                            <div className="p-6 border-t border-slate-700 flex justify-end gap-3 bg-slate-800/50">
                                <button onClick={() => setIsModalOpen(false)} className="px-5 py-2 rounded-lg font-medium text-gray-300 hover:text-white bg-slate-700 hover:bg-slate-600 transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" form="banner-form" className="px-5 py-2 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-lg">
                                    {editingBanner ? 'Save Changes' : 'Create Banner'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminBanners;
