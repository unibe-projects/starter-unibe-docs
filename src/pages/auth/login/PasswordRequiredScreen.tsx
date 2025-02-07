import { useState } from 'react';
import { useAuth } from '../../../hooks/auth/useUser';
import { useLocation, useNavigate } from 'react-router-dom';
import { ConfirmSignInOutput } from 'aws-amplify/auth';
import useErrorHandler from '../../../hooks/errors/useErrorHandler';
import { Form, Formik } from 'formik';
import { validationSchemaPassword } from './validationSchemaLogin';
import UnibeBackgraund from '../../../assets/auth/UnibeBackgraund.jpg';
import UnibeLogo from '../../../assets/header/LogoUnibe.png';
import { SignUpStepEnum } from '../../../enums/auth/signUpStepEnum';
import PasswordInput from '../../../components/common/form/PasswordInput';
import LoadingButton from '../../../components/loadings/buttons/LoadingButton';
import Message from '../../../error/messages/Message';

const PasswordRequiredScreen = () => {
  const { handleConfirmSignIn } = useAuth();
  const { handleError, errorMessage, clearError } = useErrorHandler();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const location = useLocation();
  const { attributes } = location.state || {};
  const navigate = useNavigate();

  const navigateHome = (res: ConfirmSignInOutput) => {
    if (res.nextStep.signInStep === SignUpStepEnum.DONE) {
      navigate('/home');
      clearError();
    }
  };

  const handleSubmit = async (values: { password: string }) => {
    try {
      setIsLoading(true);
      const response = await handleConfirmSignIn(values.password, attributes);
      navigateHome(response);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      handleError({ error });
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${UnibeBackgraund})` }}
    >
      <div className="w-full max-w-3xl p-12 space-y-6 bg-white bg-opacity-90 rounded-lg shadow-lg mx-4 sm:mx-10">
        <div className="flex justify-center mb-6">
          <img src={UnibeLogo} alt="Logo" className="h-32 w-32" />
        </div>
        <h2 className="text-lg font-semibold text-center text-gray-700">
          Cambia tu contraseña, por favor
        </h2>
        {errorMessage && <Message text={errorMessage} type="error" />}
        <Formik
          initialValues={{ password: '' }}
          validationSchema={validationSchemaPassword}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <PasswordInput
                name="password"
                placeholder="Contraseña"
                showPassword={showPassword}
                togglePassword={() => setShowPassword(!showPassword)}
              />
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="w-full px-5 py-3 font-semibold text-white bg-dark-primary rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                  {isLoading ? <LoadingButton text="Cargando ...." /> : 'Confirmar'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PasswordRequiredScreen;
