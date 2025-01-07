import { useState } from 'react';
import { Formik, Form } from 'formik';
import SidebarSettings from '../../../components/settings/SidebarSettings';
import { validationSchemaUpdatePassword } from '../../auth/login/validationSchemaLogin';
import { useAuth } from '../../../hooks/auth/useUser';
import { ChangePasswordInput } from '../../../interface/auth/auth.interface';
import PasswordPolicy from '../../../components/settings/PasswordPolicy';
import Message from '../../../error/messages/Message';
import PasswordInput from '../../../components/common/form/PasswordInput';
import useErrorHandler from '../../../hooks/errors/useErrorHandler';
import LoadingButton from '../../../components/loadings/buttons/LoadingButton';

type FormValues = {
  [key: string]: string;
};

const SettingsUpdatePasswordScreen = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const { handleChangePassword } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { handleError, handleSuccess, errorMessage, successMessage, clearError, clearSuccess } =
    useErrorHandler();

    const handleFormSubmitChangePassword = async (values: FormValues): Promise<void> => {
      const changePassword = {
        oldPassword: values.currentPassword,
        newPassword: values.confirmPassword,
      };
  
      await handleChangePasswordSumit(changePassword);
    };
    
  const handleChangePasswordSumit = async (value: ChangePasswordInput) => {
    try {
      setIsLoading(true);
      await handleChangePassword(value);
      handleSuccess('Contraseña actualizada exitosamente!');
      clearError();
    } catch (error) {
      console.error(error);
      handleError({ error });
      clearSuccess();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <SidebarSettings />

      <div className="flex-1 p-4">
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0">
          <PasswordPolicy />

          <div className="flex-1 flex justify-start items-center p-4">
            <div className="w-full max-w-1xl">
              <div className="mb-6 text-start">
                <h1 className="text-2xl font-bold text-gray-800">Actualiza Contraseña</h1>
              </div>
              {errorMessage && <Message text={errorMessage} type="error" />}
              {successMessage && <Message text={successMessage} type="success" />}
              <Formik
                initialValues={{
                  currentPassword: '',
                  newPassword: '',
                  confirmPassword: '',
                }}
                validationSchema={validationSchemaUpdatePassword}
                onSubmit={handleFormSubmitChangePassword}
              >
                {({ isSubmitting, values }) => (
                  <Form className="w-full p-8 bg-white shadow-lg rounded-lg border border-gray-200 mt-4 space-y-6">
                    {/* Contraseña Actual */}
                    <PasswordInput
                      name="currentPassword"
                      placeholder="Contraseña Actual"
                      showPassword={showCurrentPassword}
                      togglePassword={() => setShowCurrentPassword(!showCurrentPassword)}
                    />

                    {/* Nueva Contraseña */}
                    <PasswordInput
                      name="newPassword"
                      placeholder="Nueva Contraseña"
                      showPassword={showNewPassword}
                      togglePassword={() => setShowNewPassword(!showNewPassword)}
                    />

                    {/* Confirmar Nueva Contraseña */}
                    <PasswordInput
                      name="confirmPassword"
                      placeholder="Confirmar Nueva Contraseña"
                      showPassword={showConfirmPassword}
                      togglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                    />

                    <div className="mt-6">
                      <button
                        type="submit"
                        disabled={isSubmitting || isLoading}
                        className="w-full px-5 py-3 font-semibold text-white bg-dark-primary rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                      >
                        {isLoading ? (
                          <LoadingButton text="Cargando ...." />
                        ) : (
                          'Actualizar Contraseña'
                        )}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsUpdatePasswordScreen;
