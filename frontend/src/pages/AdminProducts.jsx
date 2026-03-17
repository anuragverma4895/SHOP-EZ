import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, Edit, Trash2, Plus, Search, X, Image as ImageIcon } from 'lucide-react';
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

const AdminProducts = () => {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: 'Fashion',
        countInStock: '',
        description: '',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&w=400&q=80'
    });

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('/api/products?page=1&sort=newest'); // Backend pagination is built-in
            setProducts(data.products);
            setLoading(false);
        } catch (error) {
            toast.error('Failed to fetch products');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const openModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name,
                price: product.price,
                category: product.category,
                countInStock: product.countInStock || 0,
                description: product.description,
                image: product.image || product.images?.[0] || formData.image
            });
        } else {
            setEditingProduct(null);
            setFormData({
                name: '', price: '', category: 'Fashion', countInStock: '', description: '', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&w=400&q=80'
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

            const payload = { ...formData, brand: 'Generic ShopEZ' };

            if (editingProduct) {
                await axios.put(`/api/admin/products/${editingProduct._id}`, payload, config);
                toast.success('Product updated');
            } else {
                await axios.post('/api/admin/products', payload, config);
                toast.success('Product created');
            }

            setIsModalOpen(false);
            fetchProducts();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error saving product');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`
                    }
                };
                await axios.delete(`/api/admin/products/${id}`, config);
                toast.success('Product deleted');
                fetchProducts();
            } catch (error) {
                toast.error('Failed to delete product');
            }
        }
    };

    const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="flex bg-slate-900 min-h-screen pt-20 relative">
            <Sidebar currentPath={location.pathname} />

            <div className="flex-1 p-8 overflow-y-auto">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Manage Products</h1>
                        <p className="text-gray-400 mt-1">Add, edit, or delete products</p>
                    </div>

                    <div className="flex w-full md:w-auto gap-4">
                        <div className="relative flex-1 md:w-64">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                        <button onClick={() => openModal()} className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors border-none shadow-sm">
                            <Plus className="w-5 h-5" />
                            <span className="hidden sm:inline">Add Product</span>
                        </button>
                    </div>
                </div>

                <div className="bg-slate-800 rounded-2xl shadow-sm border border-slate-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-800 border-b border-slate-700 text-gray-400 text-xs uppercase tracking-wider">
                                    <th className="py-4 px-6 font-medium">ID</th>
                                    <th className="py-4 px-6 font-medium">Name</th>
                                    <th className="py-4 px-6 font-medium">Price</th>
                                    <th className="py-4 px-6 font-medium">Category</th>
                                    <th className="py-4 px-6 font-medium">Stock</th>
                                    <th className="py-4 px-6 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                {loading ? (
                                    <tr><td colSpan="6" className="text-center py-8 text-gray-400">Loading products...</td></tr>
                                ) : filteredProducts.map((product, i) => (
                                    <motion.tr
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        key={product._id}
                                        className="hover:bg-slate-700/50 transition-colors"
                                    >
                                        <td className="py-4 px-6 text-sm text-gray-400">{product._id.substring(0, 8)}...</td>
                                        <td className="py-4 px-6 font-medium text-white">{product.name}</td>
                                        <td className="py-4 px-6 text-gray-300">₹{product.price}</td>
                                        <td className="py-4 px-6 text-gray-300">{product.category}</td>
                                        <td className="py-4 px-6">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${product.countInStock > 10 ? 'bg-green-500/10 text-green-400' :
                                                product.countInStock > 0 ? 'bg-yellow-500/10 text-yellow-400' :
                                                    'bg-red-500/10 text-red-400'
                                                }`}>
                                                {product.countInStock}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right space-x-2">
                                            <button onClick={() => openModal(product)} className="p-2 text-gray-400 hover:text-indigo-400 transition-colors bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDelete(product._id)} className="p-2 text-gray-400 hover:text-red-400 transition-colors bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 border-t border-slate-700 flex justify-between items-center text-sm text-gray-400">
                        <span>Showing 1 to 5 of 342 entries</span>
                        <div className="flex space-x-1">
                            <button className="px-3 py-1 border border-slate-700 rounded hover:bg-slate-700">Prev</button>
                            <button className="px-3 py-1 border rounded bg-indigo-500/20 text-indigo-400 border-indigo-500/30 font-medium">1</button>
                            <button className="px-3 py-1 border border-slate-700 rounded hover:bg-slate-700">2</button>
                            <button className="px-3 py-1 border border-slate-700 rounded hover:bg-slate-700">Next</button>
                        </div>
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
                            className="bg-slate-800 border border-slate-700 rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <div className="flex justify-between items-center p-6 border-b border-slate-700">
                                <h3 className="text-xl font-bold text-white">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-6 overflow-y-auto">
                                <form id="product-form" onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                                            <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1">Price (₹)</label>
                                            <input required type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                                            <select required name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500">
                                                <option value="For You">For You</option>
                                                <option value="Fashion">Fashion</option>
                                                <option value="Mobiles">Mobiles</option>
                                                <option value="Beauty">Beauty</option>
                                                <option value="Electronics">Electronics</option>
                                                <option value="Home">Home</option>
                                                <option value="Appliances">Appliances</option>
                                                <option value="Toys & Baby">Toys & Baby</option>
                                                <option value="Sports">Sports</option>
                                                <option value="Furniture">Furniture</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1">Stock Quantity</label>
                                            <input required type="number" name="countInStock" value={formData.countInStock} onChange={handleInputChange} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1">Image URL</label>
                                            <input required type="text" name="image" value={formData.image} onChange={handleInputChange} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                                        <textarea required rows="3" name="description" value={formData.description} onChange={handleInputChange} className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-indigo-500"></textarea>
                                    </div>
                                </form>
                            </div>

                            <div className="p-6 border-t border-slate-700 flex justify-end gap-3 bg-slate-800/50">
                                <button onClick={() => setIsModalOpen(false)} className="px-5 py-2 rounded-lg font-medium text-gray-300 hover:text-white bg-slate-700 hover:bg-slate-600 transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" form="product-form" className="px-5 py-2 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-lg">
                                    {editingProduct ? 'Save Changes' : 'Create Product'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminProducts;
