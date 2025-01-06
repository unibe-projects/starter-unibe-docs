import { useContext } from 'react';
import { FormValuesContext } from '../../context/formValues/formValuesContext';

export const useFormValues = () => {
  const context = useContext(FormValuesContext);
  if (!context) {
    throw new Error('useFormValues debe ser usado dentro de un FormValuesProvider');
  }
  return context;
};