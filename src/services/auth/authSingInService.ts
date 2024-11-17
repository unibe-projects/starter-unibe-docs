import { AuthSignInOutput } from '@aws-amplify/auth/dist/esm/types';
import { SignInInput, resendSignUpCode, signIn } from 'aws-amplify/auth';
import { errorToString } from '../../error/messages/errorToString';
import { ResendSignUpCodeResponseInterface } from '../../interface/auth/auth.interface';
import { ConfirmSignUpError, SignInFailedError } from '../../error/messages/authSingInError';
import { SignUpStepEnum } from '../../enums/auth/signUpStepEnum';

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

async function signInResponseService(credentials: SignInInput): Promise<AuthSignInOutput> {
  try {
    const response: AuthSignInOutput = await signIn(credentials);

    switch (response.nextStep?.signInStep) {
    case SignUpStepEnum.CONFIRM_SIGN_UP:
      await resendCodeService(credentials.username);
      throw new ConfirmSignUpError();
    case undefined:
      if (!response.isSignedIn) {
        throw new SignInFailedError();
      }
      break;
    }

    return response;
  } catch (error) {
    throw new Error(errorToString(error));
  }
}

export const signInService = async (credentials: SignInInput) => {
  await signInResponseService(credentials);
};
