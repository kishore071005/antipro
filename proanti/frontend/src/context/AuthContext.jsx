import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    // Check expiry
                    if (decoded.exp * 1000 < Date.now()) {
                        throw new Error('Token expired');
                    }
                    setUser({ username: decoded.username, role: decoded.role, user_id: decoded.user_id });
                } catch (error) {
                    console.error("Auth check failed:", error);
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (username, password) => {
        try {
            const response = await api.post('auth/login/', { username, password });
            const { access, refresh } = response.data;
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            const decoded = jwtDecode(access);
            setUser({ username: decoded.username, role: decoded.role, user_id: decoded.user_id });
            return decoded;
        } catch (error) {
            throw error;
        }
    };

    const register = async (userData) => {
        await api.post('auth/register/', userData);
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
