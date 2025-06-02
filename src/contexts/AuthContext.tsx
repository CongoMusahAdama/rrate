
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: 'customer' | 'estate-advertiser';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const adminEmails = ['admin@realrate1', 'admin@realrate2'];

  useEffect(() => {
    // Check for stored user data on component mount
    const storedUser = localStorage.getItem('realrate_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string, userData: User) => {
    setUser(userData);
    localStorage.setItem('realrate_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('realrate_user');
  };

  const isAuthenticated = !!user;
  const isAdmin = user ? adminEmails.includes(user.email) : false;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
