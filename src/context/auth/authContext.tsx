import { AuthUser, getCurrentUser, signIn, SignInInput } from 'aws-amplify/auth';
import { useMemo, createContext, useState, useEffect, useCallback } from 'react';
import { AuthInterface, AuthProviderInterface } from '../../interface/auth/auth.interface';
import { getSessionService } from '../../services/auth/authSessionService';
import { signInService } from '../../services/auth/authSingInService';

export const AuthContext = createContext<AuthInterface | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderInterface> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authStatus, setAuthStatus] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const setCurrentUser = async (): Promise<void> => {
    try {
      const currentUser: AuthUser = await getCurrentUser();
      setUser(currentUser);
      setAuthStatus(!!currentUser);
    } catch (error) {
      setAuthStatus(false);
    }
  };

  const fetchSession = async () => {
    try {
      const sessions = await getSessionService();
      const { isAuthenticated } = sessions;
      setAuthStatus(isAuthenticated);
    } catch (error) {
      setAuthStatus(false);
      console.error('Failed to fetch session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      await Promise.all([setCurrentUser(), fetchSession()]);
      setIsLoading(false);
    };
    initializeAuth();
  }, []);

  const handleSignIn = useCallback(
    async (credentials: SignInInput): Promise<void> => {
      try {
        await signInService(credentials);
        await setCurrentUser();
      } finally {
        setIsLoading(false);
      }
    },
    [signIn, getCurrentUser, setUser],
  );

  const providerValue = useMemo(
    () => ({
      user,
      isAuthenticated: authStatus,
      handleSignIn,
      isLoading,
    }),
    [user, isLoading, handleSignIn],
  );

  return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
};
