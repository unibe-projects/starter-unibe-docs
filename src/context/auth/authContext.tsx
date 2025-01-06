import {
  AuthUser,
  confirmSignIn,
  getCurrentUser,
  ResetPasswordOutput,
  SignInInput,
  signOut,
} from 'aws-amplify/auth';
import { AuthSignInOutput } from '@aws-amplify/auth/dist/esm/types';
import { useMemo, createContext, useState, useEffect, useCallback } from 'react';
import {
  AuthInterface,
  AuthProviderInterface,
  ChangePasswordInput,
} from '../../interface/auth/auth.interface';
import {
  changePasswordService,
  resendPasswordService,
  signInService,
} from '../../services/auth/authSingInService';
import { errorToString } from '../../error/messages/errorToString';

export const AuthContext = createContext<AuthInterface | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderInterface> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const setCurrentUser = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const currentUser: AuthUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      const initializeAuth = async () => {
        await setCurrentUser();
      };
      initializeAuth();
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSignIn = useCallback(
    async (credentials: SignInInput): Promise<AuthSignInOutput> => {
      try {
        const response = await signInService(credentials);
        await setCurrentUser();
        return response;
      } catch (error) {
        throw new Error(errorToString(error));
      }
    },
    [setUser],
  );

  const handleConfirmSignIn = useCallback(
    async (newPassword: string, attributes: { username: string }) => {
      const response = await confirmSignIn({
        challengeResponse: newPassword,
        options: { userAttributes: attributes },
      });
      await setCurrentUser();
      return response;
    },
    [],
  );

  const handleSignOut = async (): Promise<void> => {
    try {
      await signOut();
      await setCurrentUser();
    } catch (error) {
      throw new Error(errorToString(error));
    }
  };

  const handleResendPassword = async (username: string): Promise<ResetPasswordOutput> => {
    return resendPasswordService(username);
  };

  const handleChangePassword = async ({
    oldPassword,
    newPassword,
  }: ChangePasswordInput): Promise<void> => {
    return changePasswordService({ oldPassword, newPassword });
  };

  const providerValue = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      handleSignIn,
      handleConfirmSignIn,
      handleSignOut,
      handleResendPassword,
      handleChangePassword,
      isLoading,
    }),
    [user, isLoading, handleSignIn, handleSignOut, handleConfirmSignIn],
  );

  return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
};
