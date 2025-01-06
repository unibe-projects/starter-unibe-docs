import React from 'react';
import { Field, ErrorMessage } from 'formik';

interface PasswordInputProps {
  name: string;
  placeholder: string;
  type: string;
}

const CustomInput: React.FC<PasswordInputProps> = ({ name, placeholder, type }) => {
  return (
    <div className="relative">
      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-gray-700 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
      />
      <ErrorMessage name={name} component="div" className="text-sm text-red-600" />
    </div>
  );
};

export default CustomInput;
