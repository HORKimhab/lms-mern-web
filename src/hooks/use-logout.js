import { useContext, useCallback } from 'react';
import { AuthContext } from '@/context/auth-context';
import { initialSignInFormData } from '@/config';

export function useLogout() {
  const { resetCredentials } = useContext(AuthContext);
  const { setSignInFormData } = useContext(AuthContext);

  const logout = useCallback(() => {
    // 🧹 Clear sign-in and sign-up form data
    setSignInFormData(initialSignInFormData);

    resetCredentials();
    sessionStorage.clear();
  }, [resetCredentials, setSignInFormData]);

  return logout;
}
