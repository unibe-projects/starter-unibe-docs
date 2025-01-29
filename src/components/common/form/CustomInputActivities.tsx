import React from 'react';
import { Field, ErrorMessage } from 'formik';

interface CustomInputActivitiesProps {
  name: string;
  placeholder: string;
  type: string;
  values?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  as?: string;
}

const CustomInputActivities: React.FC<CustomInputActivitiesProps> = ({
  name,
  placeholder,
  type,
  values,
  onChange,
  as,
}) => {
  return (
    <div className="relative">
      <Field
        as={as}
        type={type}
        name={name}
        value={values}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-gray-700 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
      />
      <ErrorMessage name={name} component="div" className="text-sm text-red-600" />

      <style>
        {`
          /* Asegurarse de que el calendario o selector se abra abajo del input */
          input[type="date"],
          input[type="time"] {
            background-color: transparent;
            z-index: 20; /* Controlar el z-index del selector para asegurarse de que quede arriba del input */
          }

          /* Asegurar que el ícono de calendario y tiempo tenga color negro */
          input[type="date"]::-webkit-calendar-picker-indicator,
          input[type="time"]::-webkit-calendar-picker-indicator {
            filter: invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0) contrast(100%);
          }
        `}
      </style>
    </div>
  );
};

export default CustomInputActivities;
