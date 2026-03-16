import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('NexusStore_token'));
  
  const [user, setUser] = useState(() => {
    const savedToken = localStorage.getItem('NexusStore_token');
    if (savedToken) {
      try {
        const base64Url = savedToken.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const decoded = JSON.parse(jsonPayload);
        return {
          email: decoded.email || decoded.unique_name || 'User',
          roles: decoded.role || []
        };
      } catch (e) {
        console.error("Invalid token format locally", e);
        return null;
      }
    }
    return null;
  });
  
  const [loading] = useState(false);

  const logout = () => {
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('NexusStore_token');
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('NexusStore_token', token);
      
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const decoded = JSON.parse(jsonPayload);
        setUser({
          email: decoded.email || decoded.unique_name || 'User',
          roles: decoded.role || []
        });
      } catch {
        logout();
      }
    } else {
      logout();
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/authenticate', {
        username: email,
        password: password
      });
      
      if (response.data && response.data.token) {
        setToken(response.data.token);
        return { success: true };
      }
      return { success: false, error: 'No token received from server' };
    } catch (err) {
      console.error('Login error', err);
      return { 
        success: false, 
        error: err.response?.data?.message || 'Authentication failed' 
      };
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated: !!token, loading }}>
        {!loading && children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
