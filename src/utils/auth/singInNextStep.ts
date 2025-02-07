import { AuthSignInInput, AuthSignInOutput } from '@aws-amplify/auth/dist/esm/types';
import { SignUpStepEnum } from '../../enums/auth/signUpStepEnum';
import { SignInFailedError } from '../../error/messages/authSingInError';
import { errorToString } from '../../error/messages/errorToString';
import { NavigateFunction } from 'react-router-dom';
import { resendCodeService } from '../../services/auth/authSingInService';

export async function signInNextStep(
  response: AuthSignInOutput,
  navigate: NavigateFunction,
  credentials: AuthSignInInput,
  attributes: { username: string },
  clearError: () => void,
): Promise<AuthSignInOutput> {
  try {
    switch (response.nextStep?.signInStep) {
    case SignUpStepEnum.CONFIRM_SIGN_UP:
      resendCodeService(attributes.username);
      navigate('/complete-record', { state: { attributes: attributes } });
      clearError();
      return response;

    case SignUpStepEnum.CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED:
      navigate('/password-required', { state: { attributes: attributes } });
      clearError();
      return response;

    case SignUpStepEnum.DONE:
      navigate('/home');
      clearError();
      return response;

    default:
      throw new SignInFailedError();
    }
  } catch (error) {
    throw new Error(errorToString(error));
  }
}
