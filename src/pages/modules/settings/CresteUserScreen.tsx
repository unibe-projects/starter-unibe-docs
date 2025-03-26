import { useState } from 'react';
import { useAuth } from '../../../hooks/auth/useUser';
import useErrorHandler from '../../../hooks/errors/useErrorHandler';
import { SignUpParameters } from '../../../interface/auth/auth.interface';
import Message from '../../../error/messages/Message';
import SidebarSettings from '../../../components/settings/SidebarSettings';
import PasswordPolicy from '../../../components/settings/PasswordPolicy';
import UserForm from '../../../components/users/UserForm';

const CreateUserScreen = () => {
  const { handleError, errorMessage, handleSuccess, successMessage, clearError, clearSuccess } =
    useErrorHandler();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { handleCreateUser } = useAuth();

  const handleCreatePatience = async (values: SignUpParameters): Promise<void> => {
    try {
      setIsLoading(true);
      await handleCreateUser({
        password: values.password,
        email: values.email,
        username: values.username,
        role: values.role,
      });
      handleSuccess(
        'Usuario creado correctamente, se le enviara un codigo para que pueda verificar su cuenta',
      );
      clearError();
      clearSuccess();
    } catch (error) {
      handleError({ error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row p-4 pt-4">
      <SidebarSettings />
      <div className="flex-1 ">
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0">
          <PasswordPolicy />

          <div className="flex-1 flex justify-start items-center p-2">
            <div className="w-full max-w-1xl">
              <div className="mb-6 text-start">
                <h1 className="text-2xl font-bold text-gray-800">Crear Usuarios</h1>
              </div>
              {errorMessage && <Message text={errorMessage} type="error" />}
              {successMessage && <Message text={successMessage} type="success" />}
              <div className="pt-2">
                <UserForm onSubmit={handleCreatePatience} isLoading={isLoading} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUserScreen;
