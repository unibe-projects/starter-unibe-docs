import { useState } from 'react';
import { useAuth } from '../../../hooks/auth/useUser';
import { useNavigate } from 'react-router-dom';
import { ResetPasswordOutput } from 'aws-amplify/auth';
import useErrorHandler from '../../../hooks/errors/useErrorHandler';
import { Form, Formik } from 'formik';
import { validationSchemaEmail } from './validationSchemaLogin';
import UnibeBackgraund from '../../../assets/auth/UnibeBackgraund.jpg';
import UnibeLogo from '../../../assets/header/LogoUnibe.png';
import { SignUpStepEnum } from '../../../enums/auth/signUpStepEnum';
import { useFormValues } from '../../../hooks/formValues/formValues';
import CustomInput from '../../../components/common/form/CustomInput';
import LoadingButton from '../../../components/loadings/buttons/LoadingButton';
import Message from '../../../error/messages/Message';

const ForgotPasswordScreen = () => {
  const { handleResendPassword } = useAuth();
  const { handleError, errorMessage, clearError } = useErrorHandler();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { formValues, setFormValues } = useFormValues();
  const navigate = useNavigate();

  const navigateResetPassword = (res: ResetPasswordOutput) =>{
    if (res.nextStep.resetPasswordStep === SignUpStepEnum.CONFIRM_RESET_PASSWORD_WITH_CODE) {
      navigate('/reset-password');
      clearError();
    }
  }

  const handleSubmit = async (values: { email: string }) => {
    try {
      setIsLoading(true);
      const response = await handleResendPassword(values.email);
      setFormValues({ email: values.email })
      navigateResetPassword(response);
    } catch (error) {
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
        <h2 className="text-lg font-semibold text-center text-gray-700">
          Ingresa tu email para recibir un código y cambiar tu contraseña.
        </h2>
        {errorMessage && <Message text={errorMessage} type="error" />}
        <Formik
          initialValues={{ email: formValues.email || '' }}
          validationSchema={validationSchemaEmail}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values }) => (
            <Form className="space-y-6">
              <CustomInput name="email" type="email" values={values.email} placeholder="Correo electrónico" />
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

export default ForgotPasswordScreen;
