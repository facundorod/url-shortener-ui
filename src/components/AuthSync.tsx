'use client';

import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { setAuthToken } from '../lib/services/api.service';

export const AuthSync: React.FC = () => {
  const { token } = useAuth();

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  return null;
}; 