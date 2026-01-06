import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { API_KEY_STORAGE_KEY } from '@/lib/axios';

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (key: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const key = localStorage.getItem(API_KEY_STORAGE_KEY);
        setIsAuthenticated(!!key);
        setIsLoading(false);

        const handleUnauthorized = () => {
            localStorage.removeItem(API_KEY_STORAGE_KEY);
            setIsAuthenticated(false);
        };

        window.addEventListener('auth:unauthorized', handleUnauthorized);
        return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
    }, []);

    const login = (key: string) => {
        localStorage.setItem(API_KEY_STORAGE_KEY, key);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem(API_KEY_STORAGE_KEY);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }
        }>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
