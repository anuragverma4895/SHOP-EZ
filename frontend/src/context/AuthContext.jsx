import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Set up axios default headers from stored token
const setupAxiosAuth = (userData) => {
    if (userData && userData.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is stored in local storage
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setUser(parsed);
            setupAxiosAuth(parsed);
        }
        setLoading(false);

        // Axios Interceptor for 401
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && error.response.status === 401) {
                    console.log("Interceptor caught 401, logging out...");
                    setUser(null);
                    localStorage.removeItem('userInfo');
                    setupAxiosAuth(null);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await axios.post('/api/users/login', { email, password });
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            setupAxiosAuth(data);
            toast.success('Logged in successfully');
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
            return false;
        }
    };

    const register = async (name, email, password) => {
        try {
            const { data } = await axios.post('/api/users', { name, email, password });
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            setupAxiosAuth(data);
            toast.success('Registered successfully');
            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
            return false;
        }
    };

    const logout = async () => {
        try {
            await axios.post('/api/users/logout');
        } catch (error) {
            console.error('Logout API failed:', error);
        } finally {
            setUser(null);
            localStorage.removeItem('userInfo');
            setupAxiosAuth(null);
            toast.success('Logged out');
        }
    };

    const updateUser = (data) => {
        setUser(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
        setupAxiosAuth(data);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, updateUser, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
