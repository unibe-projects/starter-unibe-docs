import {
  ConfirmResetPasswordInput,
  ConfirmSignInOutput,
  ConfirmSignUpInput,
  ConfirmSignUpOutput,
  FetchUserAttributesOutput,
  ResetPasswordOutput,
} from 'aws-amplify/auth';
import { ReactNode } from 'react';
import { AuthSignInInput, AuthSignInOutput } from '@aws-amplify/auth/dist/esm/types';
import { RoleEnum } from '../../enums/auth/roleEnum';

export interface AuthInterface {
  user: FetchUserAttributesOutput | null;
  isAuthenticated: boolean;
  handleSignIn: (_credentials: AuthSignInInput) => Promise<AuthSignInOutput>;
  handleConfirmSignIn: (
    newPassword: string,
    attributes: { username: string }
  ) => Promise<ConfirmSignInOutput>;
  handleSignOut: () => Promise<void>;
  handleResendPassword: (username: string) => Promise<ResetPasswordOutput>;
  handleChangePassword: (input: ChangePasswordInput) => Promise<void>;
  handleConfirmResetPassword: ({
    username,
    confirmationCode,
    newPassword,
  }: ConfirmResetPasswordInput) => Promise<void>;
  handleCreateUser: ({ username, password, email, role}: SignUpParameters) => Promise<void>;
  handleSignUpConfirmation: ({username, confirmationCode }: ConfirmSignUpInput) => Promise<ConfirmSignUpOutput | undefined>;
  isLoading: boolean;
}

export interface AuthProviderInterface {
  children: ReactNode;
}

export interface BasePasswordInput {
  oldPassword: string;
  newPassword: string;
}

export interface ChangePassword {
  username: string;
  confirmationCode: string;
  newPassword: string;
}

export interface CompleteRecord {
  username: string;
  confirmationCode: string;
}

export interface ChangePasswordInput extends BasePasswordInput {}

export type ResendSignUpCodeResponseInterface = {
  destination?: string;
  deliveryMedium?: string;
  attributeName?: string;
};

export interface AuthState {
  user: FetchUserAttributesOutput | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}



export interface SignUpParameters {
  username: string;
  password: string;
  email: string;
  role: RoleEnum;
};


export interface AuthContextInterface extends AuthState, AuthInterface {}
