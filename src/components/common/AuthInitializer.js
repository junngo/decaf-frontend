import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

function AuthInitializer() {
  const { refreshToken } = useAuth();

  useEffect(() => {
    refreshToken();
  }, [refreshToken]);

  return null; // This component does not render anything
}

export default AuthInitializer;
