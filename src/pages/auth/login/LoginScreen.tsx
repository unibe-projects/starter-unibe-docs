import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import UnibeBackgraund from '../../../assets/auth/UnibeBackgraund.jpg';
import UnibeLogo from '../../../assets/header/LogoUnibe.png';
import { useAuth } from '../../../hooks/auth/useUser';
import useErrorHandler from '../../../hooks/errors/useErrorHandler';
import { validationSchemaLogin } from './validationSchemaLogin';
import { useNavigate } from 'react-router-dom';
import { signInNextStep } from '../../../utils/auth/singInNextStep';

const LoginScreen = () => {
  const { handleSignIn, isAuthenticated } = useAuth();
  const { handleError, errorMessage, clearError } = useErrorHandler();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
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
      const authFlowType = 'USER_PASSWORD_AUTH';
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

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${UnibeBackgraund})` }}
    >
      <div className="w-full max-w-3xl p-12 space-y-6 bg-white bg-opacity-90 rounded-lg shadow-lg mx-4 sm:mx-10">
        <div className="flex justify-center mb-6">
          <img src={UnibeLogo} alt="Logo" className="h-32 w-32" />
        </div>
        <h2 className="text-lg font-semibold text-center text-gray-700">Iniciar Sesión</h2>

        {errorMessage && (
          <div className="p-4 text-red-600 bg-red-100 rounded-lg">{errorMessage}</div>
        )}
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchemaLogin}
          onSubmit={handleFormSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  className="w-full px-5 py-3 text-gray-700 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage name="email" component="div" className="text-sm text-red-600" />
              </div>
              <div className="relative">
                <Field
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Contraseña"
                  className="w-full px-5 py-3 text-gray-700 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-4 flex items-center text-gray-500"
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
                <ErrorMessage name="password" component="div" className="text-sm text-red-600" />
              </div>
              <button
                type="submit"
                disabled={isLoading || isSubmitting}
                className={`w-full px-5 py-3 font-semibold text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${
                  isLoading || isSubmitting
                    ? 'bg-blue-300 cursor-not-allowed'
                    : 'bg-dark-primary bg-light-primary hover:bg-blue-600'
                }`}
              >
                {isLoading || isSubmitting ? 'Cargando...' : 'Iniciar Sesión'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginScreen;
