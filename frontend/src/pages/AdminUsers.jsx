import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, Search, Trash2, Edit, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

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

const AdminUsers = () => {
    const location = useLocation();

    const dummyUsers = [
        { _id: '1', name: 'Admin User', email: 'admin@example.com', isAdmin: true, date: '2026-01-15' },
        { _id: '2', name: 'Sarah Jennings', email: 'sarah@example.com', isAdmin: false, date: '2026-02-10' },
        { _id: '3', name: 'Michael Chen', email: 'michael@example.com', isAdmin: false, date: '2026-02-18' },
        { _id: '4', name: 'Emily Davis', email: 'emily@example.com', isAdmin: false, date: '2026-03-01' },
        { _id: '5', name: 'John Doe', email: 'john@example.com', isAdmin: false, date: '2026-03-05' },
    ];

    return (
        <div className="flex bg-slate-900 min-h-screen pt-20">
            <Sidebar currentPath={location.pathname} />

            <div className="flex-1 p-8">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Manage Users</h1>
                        <p className="text-gray-400 mt-1">View and manage customer accounts</p>
                    </div>

                    <div className="flex w-full md:w-auto gap-4">
                        <div className="relative flex-1 md:w-64">
                            <input
                                type="text"
                                placeholder="Search users..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                </div>

                <div className="bg-slate-800 rounded-2xl shadow-sm border border-slate-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-800 border-b border-slate-700 text-gray-400 text-xs uppercase tracking-wider">
                                    <th className="py-4 px-6 font-medium">ID</th>
                                    <th className="py-4 px-6 font-medium">Name</th>
                                    <th className="py-4 px-6 font-medium">Email</th>
                                    <th className="py-4 px-6 font-medium">Role</th>
                                    <th className="py-4 px-6 font-medium">Joined</th>
                                    <th className="py-4 px-6 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                {dummyUsers.map((user, i) => (
                                    <motion.tr
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        key={user._id}
                                        className="hover:bg-slate-700/50 transition-colors"
                                    >
                                        <td className="py-4 px-6 text-sm text-gray-400">{user._id}</td>
                                        <td className="py-4 px-6 font-medium text-white">{user.name}</td>
                                        <td className="py-4 px-6 text-gray-300">{user.email}</td>
                                        <td className="py-4 px-6">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${user.isAdmin ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-700 text-gray-300'}`}>
                                                {user.isAdmin ? 'Admin' : 'Customer'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-gray-400 text-sm">{user.date}</td>
                                        <td className="py-4 px-6 text-right space-x-2">
                                            <button className="p-2 text-gray-400 hover:text-indigo-400 transition-colors bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-gray-400 hover:text-red-400 transition-colors bg-slate-800 rounded-lg border border-slate-600 shadow-sm disabled:opacity-50" disabled={user.isAdmin}>
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 border-t border-slate-700 flex justify-between items-center text-sm text-gray-400">
                        <span>Showing 1 to 5 of 8,921 users</span>
                        <div className="flex space-x-1">
                            <button className="px-3 py-1 border border-slate-700 rounded hover:bg-slate-700">Prev</button>
                            <button className="px-3 py-1 border rounded bg-indigo-500/20 text-indigo-400 border-indigo-500/30 font-medium">1</button>
                            <button className="px-3 py-1 border border-slate-700 rounded hover:bg-slate-700">2</button>
                            <button className="px-3 py-1 border border-slate-700 rounded hover:bg-slate-700">Next</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminUsers;
