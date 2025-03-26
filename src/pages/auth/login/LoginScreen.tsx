import { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import unibeBackgraund from '../../../assets/auth/UnibeBackgraund.jpg';
import unibeLogo from '../../../assets/header/LogoUnibe.png';
import { useAuth } from '../../../hooks/auth/useUser';
import useErrorHandler from '../../../hooks/errors/useErrorHandler';
import { validationSchemaLogin } from './validationSchemaLogin';
import { useNavigate } from 'react-router-dom';
import { signInNextStep } from '../../../utils/auth/singInNextStep';
import { SignUpStepEnum } from '../../../enums/auth/signUpStepEnum';
import { useFormValues } from '../../../hooks/formValues/formValues';
import PasswordInput from '../../../components/common/form/PasswordInput';
import LoadingButton from '../../../components/loadings/buttons/LoadingButton';
import CustomInput from '../../../components/common/form/CustomInput';
import Message from '../../../error/messages/Message';

const LoginScreen = () => {
  const { handleSignIn, isAuthenticated } = useAuth();
  const { handleError, errorMessage, clearError } = useErrorHandler();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { setFormValues } = useFormValues();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    } else {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleFormSubmit = async (values: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      const authFlowType = SignUpStepEnum.USER_PASSWORD_AUTH;
      const parameters = {
        username: values.email,
        password: values.password,
        options: { authFlowType },
      };
      const response = await handleSignIn(parameters);
      signInNextStep(response, navigate, parameters, { username: values.email }, clearError);
    } catch (error: unknown) {
      handleError({ error });
    } finally {
      setIsLoading(false);
    }
  };

  const navigateForgotPassword = (email: string) => {
    setFormValues({ email });
    navigate('/forgot-password');
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${unibeBackgraund})` }}
    >
      <div className="w-full max-w-3xl p-12 space-y-6 bg-white bg-opacity-90 rounded-lg shadow-lg mx-4 sm:mx-10">
        <div className="flex justify-center mb-6">
          <img src={unibeLogo} alt="Logo" className="h-40 w-64" />
        </div>
        <h2 className="text-lg font-semibold text-center text-gray-700">Iniciar Sesión</h2>

        {errorMessage && <Message text={errorMessage} type="error" />}
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchemaLogin}
          onSubmit={handleFormSubmit}
        >
          {({ isSubmitting, values }) => (
            <Form className="space-y-4">
              <CustomInput name="email" type="email" placeholder="Correo electrónico" />
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
                  {isLoading ? <LoadingButton text="Cargando ...." /> : 'Iniciar Sesión'}
                </button>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  type="button"
                  className="text-gray-600 underline hover:text-blue-500 focus:outline-none"
                  onClick={() => navigateForgotPassword(values.email)}
                >
                  ¿Olvidaste tu Contraseña?
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginScreen;
