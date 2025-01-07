import { AuthSignInOutput } from '@aws-amplify/auth/dist/esm/types';
import {
  ResetPasswordOutput,
  SignInInput,
  resendSignUpCode,
  resetPassword,
  signIn,
  updatePassword,
} from 'aws-amplify/auth';
import { errorToString } from '../../error/messages/errorToString';
import {
  ChangePasswordInput,
  ResendSignUpCodeResponseInterface,
} from '../../interface/auth/auth.interface';

export const resendCodeService = async (
  username: string,
): Promise<ResendSignUpCodeResponseInterface> => {
  try {
    const { destination, deliveryMedium, attributeName } = await resendSignUpCode({ username });
    return { destination, deliveryMedium, attributeName };
  } catch (error) {
    throw new Error(errorToString(error));
  }
};

export const signInService = async (credentials: SignInInput): Promise<AuthSignInOutput> => {
  return signIn(credentials);
};

export const resendPasswordService = async (username: string): Promise<ResetPasswordOutput> => {
  try {
    const response = await resetPassword({ username });
    return response;
  } catch (error) {
    throw new Error(errorToString(error));
  }
};

export const changePasswordService = async ({ oldPassword, newPassword }: ChangePasswordInput) => {
  try {
    await updatePassword({
      oldPassword,
      newPassword,
    });
  } catch (error) {
    throw new Error(errorToString(error));
  }
};