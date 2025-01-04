import { AuthSignInOutput } from '@aws-amplify/auth/dist/esm/types';
import { SignInInput, resendSignUpCode, signIn } from 'aws-amplify/auth';
import { errorToString } from '../../error/messages/errorToString';
import { ResendSignUpCodeResponseInterface } from '../../interface/auth/auth.interface';

export const resendCodeService = async (
  username: string
): Promise<ResendSignUpCodeResponseInterface> => {
  try {
    const { destination, deliveryMedium, attributeName } = await resendSignUpCode({ username });
    return { destination, deliveryMedium, attributeName };
  } catch (error) {
    throw new Error(errorToString(error));
  }
};

export const signInService = async (credentials: SignInInput): Promise<AuthSignInOutput> => {
  return  signIn(credentials);
};
