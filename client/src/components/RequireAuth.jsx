// src/components/RequireAuth.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthManager from '../utils/AuthManager';

const RequireAuth = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!AuthManager.isLoggedIn()) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  if (!AuthManager.isLoggedIn()) {
    return null; // or spinner/loading
  }

  return children;
};

export default RequireAuth;
