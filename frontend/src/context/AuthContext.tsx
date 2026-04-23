import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService, SignupData, SigninData } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  signup: (userData: SignupData) => Promise<{ success: boolean; message: string }>;
  signin: (userData: SigninData) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth data on app load
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const signup = async (userData: SignupData) => {
    try {
      const response = await apiService.signup(userData);
      return {
        success: response.success,
        message: response.message
      };
    } catch (error) {
      return {
        success: false,
        message: 'Signup failed. Please try again.'
      };
    }
  };

  const signin = async (userData: SigninData) => {
    try {
      const response = await apiService.signin(userData);
      
      if (response.success && response.token && response.user) {
        setToken(response.token);
        setUser(response.user);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }

      return {
        success: response.success,
        message: response.message
      };
    } catch (error) {
      return {
        success: false,
        message: 'Login failed. Please try again.'
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    signup,
    signin,
    logout,
    isAuthenticated: !!user && !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};