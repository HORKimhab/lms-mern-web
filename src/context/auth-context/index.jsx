import { Skeleton } from '@/components/ui/skeleton';
import { initialSignInFormData, initialSignUpFormData } from '@/config';
import { useToast } from '@/hooks/use-toast';
import { checkAuthService, loginService, registerService } from '@/services';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [auth, setAuth] = useState({
    authenticate: false,
    user: null,
  });
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  async function handleRegisterUser(event, setActiveTab) {
    event.preventDefault();
    try {
      const data = await registerService(signUpFormData);
      console.log('data', data);
      toast({
        title: 'Account created successfully 🎉',
        description: 'You can now sign in with your email.',
      });

      setActiveTab('signin');
      setSignUpFormData({
        userName: '',
        userEmail: '',
        password: '',
      });
    } catch (error) {
      console.error('Registration error:', error);

      // ❌ Optional: show error toast
      toast({
        title: 'Registration failed 😢',
        description: error.response?.data?.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  }

  async function handleLoginUser(event) {
    // toast({
    //   title: "Account created successfully 🎉",
    //   description: "You can now sign in with your email.",
    // });
    event.preventDefault();
    const data = await loginService(signInFormData);
    console.log(data, 'datadatadatadatadata');

    if (data.success) {
      sessionStorage.setItem('accessToken', JSON.stringify(data.data.accessToken));
      setAuth({
        authenticate: true,
        user: data.data.user,
      });
    } else {
      setAuth({
        authenticate: false,
        user: null,
      });
    }
  }

  async function checkAuthUser() {
    try {
      const data = await checkAuthService();
      if (data.success) {
        setAuth({
          authenticate: true,
          user: data.data.user,
        });
        setLoading(false);
      } else {
        setAuth({
          authenticate: false,
          user: null,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      if (!error?.response?.data?.success) {
        setAuth({
          authenticate: false,
          user: null,
        });
        setLoading(false);
      }
    }
  }

  function resetCredentials() {
    setAuth({
      authenticate: false,
      user: null,
    });
  }

  useEffect(() => {
    checkAuthUser();
  }, []);

  console.log(auth, 'gf');

  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
        auth,
        resetCredentials,
      }}
    >
      {loading ? <Skeleton /> : children}
    </AuthContext.Provider>
  );
}
