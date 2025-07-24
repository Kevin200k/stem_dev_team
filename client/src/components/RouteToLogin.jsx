import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthManager from '../utils/AuthManager';

const RouteToLogin = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!AuthManager.isLoggedIn()) {  // make sure the method name matches your AuthManager
      navigate('/login');
    }
  }, [navigate]);

  // Optionally prevent rendering children while redirecting
  if (!AuthManager.isLoggedIn()) {
    return null; // or a loading spinner if you want
  }

  return children;
};

export default RouteToLogin;
