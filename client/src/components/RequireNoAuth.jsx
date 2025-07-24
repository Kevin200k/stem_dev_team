// src/components/RequireNoAuth.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthManager from '../utils/AuthManager';

const RequireNoAuth = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (AuthManager.isLoggedIn()) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  if (AuthManager.isLoggedIn()) {
    return null; // or spinner/loading
  }

  return children;
};

export default RequireNoAuth;
