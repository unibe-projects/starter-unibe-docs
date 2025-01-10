import { Formik, Form } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingButton from '../../../components/loadings/buttons/LoadingButton';
import Message from '../../../error/messages/Message';
import { useState } from 'react';
import { useAuth } from '../../../hooks/auth/useUser';
import useErrorHandler from '../../../hooks/errors/useErrorHandler';
import UnibeBackgraund from '../../../assets/auth/UnibeBackgraund.jpg';
import UnibeLogo from '../../../assets/header/LogoUnibe.png';
import CustomInput from '../../../components/common/form/CustomInput';
import { validationSchemaCompleteRecord } from './validationSchemaLogin';
import { ChangePassword, CompleteRecord } from '../../../interface/auth/auth.interface';
import { ConfirmSignUpOutput } from 'aws-amplify/auth';
import { SignUpStepEnum } from '../../../enums/auth/signUpStepEnum';

type FormValues = {
  [key: string]: string;
};

const CompleteRecordScreen = () => {
  const { handleSignUpConfirmation } = useAuth();
  const { handleError, errorMessage, clearError } = useErrorHandler();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { attributes } = location.state || {};

  const handleFormSubmitChangePassword = async (values: FormValues): Promise<void> => {
    const changePassword = {
      username: values.email,
      confirmationCode: values.confirmationCode,
    };

    await handleChangePasswordSumit(changePassword);
  };

  const navigateHome = (response: ConfirmSignUpOutput | undefined) => {
    if (response?.nextStep.signUpStep === SignUpStepEnum.DONE) {
      navigate('/login');
    }
    clearError();
  };

  const handleChangePasswordSumit = async (value: CompleteRecord) => {
    try {
      setIsLoading(true);
      const response = await handleSignUpConfirmation(value);
      navigateHome(response);
    } catch (error) {
      console.error(error);
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
          Cambia tu contraseña, por favor
        </h2>
        {errorMessage && <Message text={errorMessage} type="error" />}
        <Formik
          initialValues={{
            email: attributes.username || '',
            confirmationCode: '',
          }}
          validationSchema={validationSchemaCompleteRecord}
          onSubmit={handleFormSubmitChangePassword}
        >
          {({ isSubmitting, values }) => (
            <Form className="space-y-6">
              <CustomInput
                name="email"
                type="email"
                placeholder="Correo electrónico"
                values={values.email}
              />
              <CustomInput
                name="confirmationCode"
                type="text"
                placeholder="Código de Confirmación"
              />
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="w-full px-5 py-3 font-semibold text-white bg-dark-primary rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                  {isLoading ? <LoadingButton text="Cargando ...." /> : 'Verificar Correo'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CompleteRecordScreen;
