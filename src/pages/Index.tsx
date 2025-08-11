import React, { useState, useEffect } from 'react';
import LoginForm from '@/components/LoginForm';
import Dashboard from '@/components/Dashboard';

interface User {
  id: number;
  username: string;
  email: string;
}

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setAuthToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginSuccess = (userData: User, token: string) => {
    setUser(userData);
    setAuthToken(token);
  };

  const handleLogout = () => {
    setUser(null);
    setAuthToken(null);
  };

  if (user && authToken) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  return <LoginForm onLoginSuccess={handleLoginSuccess} />;
};

export default Index;
