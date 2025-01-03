import { AuthUser } from 'aws-amplify/auth';
import { ReactNode } from 'react';
import { AuthSignInInput } from '@aws-amplify/auth/dist/esm/types';

export interface AuthInterface {
  user: AuthUser | null;
  isAuthenticated: boolean;
  handleSignIn: (_credentials: AuthSignInInput) => Promise<void>;
  isLoading: boolean;
}

export interface AuthProviderInterface {
  children: ReactNode;
}

export type ResendSignUpCodeResponseInterface = {
  destination?: string;
  deliveryMedium?: string;
  attributeName?: string;
};

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextInterface extends AuthState, AuthInterface {}
