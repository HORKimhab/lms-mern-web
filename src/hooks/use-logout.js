import { useContext, useCallback } from 'react';
import { AuthContext } from '@/context/auth-context';

export function useLogout() {
  const { resetCredentials } = useContext(AuthContext);

  const logout = useCallback(() => {
    resetCredentials();
    sessionStorage.clear();
  }, [resetCredentials]);

  return logout;
}
