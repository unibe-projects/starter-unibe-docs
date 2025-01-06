import { AuthUser, ConfirmSignInOutput, ResetPasswordOutput } from 'aws-amplify/auth';
import { ReactNode } from 'react';
import { AuthSignInInput, AuthSignInOutput } from '@aws-amplify/auth/dist/esm/types';

export interface AuthInterface {
  user: AuthUser | null;
  isAuthenticated: boolean;
  handleSignIn: (_credentials: AuthSignInInput) => Promise<AuthSignInOutput>;
  handleConfirmSignIn: (newPassword: string, attributes: { username: string }) => Promise<ConfirmSignInOutput>;
  handleSignOut: () => Promise<void>;
  handleResendPassword: ( username: string ) => Promise<ResetPasswordOutput>;
  handleChangePassword: (input: ChangePasswordInput) => Promise<void>;
  isLoading: boolean;
}

export interface AuthProviderInterface {
  children: ReactNode;
}

export interface BasePasswordInput {
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordInput extends BasePasswordInput {}


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
