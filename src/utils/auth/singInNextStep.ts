import { AuthSignInInput, AuthSignInOutput } from "@aws-amplify/auth/dist/esm/types";
import { SignUpStepEnum } from "../../enums/auth/signUpStepEnum";
import { ConfirmSignUpError, SignInFailedError } from "../../error/messages/authSingInError";
import { errorToString } from "../../error/messages/errorToString";
import { resendCodeService } from "../../services/auth/authSingInService";
import { NavigateFunction } from "react-router-dom";

export async function signInNextStep(response: AuthSignInOutput, navigate: NavigateFunction, credentials: AuthSignInInput, attributes: { username: string },  clearError: () => void ): Promise<AuthSignInOutput> {
  try {
    switch (response.nextStep?.signInStep) {
      case SignUpStepEnum.CONFIRM_SIGN_UP:
        await resendCodeService(credentials.username);
        throw new ConfirmSignUpError();
        
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