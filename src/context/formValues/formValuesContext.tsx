import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useMemo,
} from 'react';

interface FormValues {
  [key: string]: string;
}

interface FormValuesContextType {
  formValues: FormValues;
  setFormValues: Dispatch<SetStateAction<FormValues>>;
}

interface FormValuesProviderProps {
  children: ReactNode;
}

export const FormValuesContext = createContext<FormValuesContextType | undefined>(undefined);

export const FormValuesProvider: React.FC<FormValuesProviderProps> = ({ children }) => {
  const [formValues, setFormValues] = useState<FormValues>({});

  const contextValue = useMemo(() => ({ formValues, setFormValues }), [formValues, setFormValues]);

  return <FormValuesContext.Provider value={contextValue}>{children}</FormValuesContext.Provider>;
};
