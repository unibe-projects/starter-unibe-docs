import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

interface PasswordInputProps {
  name: string;
  placeholder: string;
  showPassword: boolean;
  togglePassword: () => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  name,
  placeholder,
  showPassword,
  togglePassword,
}) => {
  return (
    <div className="relative">
      <Field
        type={showPassword ? 'text' : 'password'}
        name={name}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-gray-700 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
      />
      <button
        type="button"
        onClick={togglePassword}
        className="absolute inset-y-0 right-4 flex items-center text-gray-500"
      >
        {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
      </button>
      <ErrorMessage name={name} component="div" className="text-sm text-red-600" />
    </div>
  );
};

export default PasswordInput;
