import CustomInput from '../common/form/CustomInput';
import LoadingButton from '../loadings/buttons/LoadingButton';
import Message from '../../error/messages/Message';
import { Form, Formik } from 'formik';
import { validationSchemaUser } from '../../pages/modules/settings/validationSchemaUser';
import { RoleEnum } from '../../enums/auth/roleEnum';
import { SignUpParameters } from '../../interface/auth/auth.interface';
import PasswordInput from '../common/form/PasswordInput';
import { useState } from 'react';

type Props = {
  onSubmit: (values: SignUpParameters) => Promise<void>;
  isLoading: boolean;
};

const UserForm = ({ onSubmit, isLoading }: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Crear Usuario</h1>
      <Formik
        initialValues={{
          password: '',
          email: '',
          username: '',
          role: RoleEnum.DOCTOR,
        }}
        validationSchema={validationSchemaUser}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, values, handleChange }) => (
          <Form className="space-y-6">
            <CustomInput
              name="username"
              type="text"
              placeholder="Ingrese el nombre de usuario"
              values={values.username}
            />
            <CustomInput name="email" type="email" placeholder="Correo electrónico" />
            <PasswordInput
              name="password"
              placeholder="Contraseña"
              showPassword={showPassword}
              togglePassword={() => setShowPassword(!showPassword)}
            />
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Rol del Usuario
              </label>
              <select
                id="role"
                name="role"
                value={values.role}
                onChange={handleChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {Object.values(RoleEnum).map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="w-full px-5 py-3 font-semibold text-white bg-dark-primary rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              >
                {isLoading ? <LoadingButton text="Cargando ...." /> : 'Crear Usuario'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;
