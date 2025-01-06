import { useState } from 'react';

type ErrorHandlerParams = {
  error: unknown;
  navigateToConfirmation?: () => void;
};

const useErrorHandler = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleError = ({ error, navigateToConfirmation }: ErrorHandlerParams) => {
    if (error instanceof Error) {
      if (error.message === 'Por favor, completa tu registro') {
        setErrorMessage(null);
        if (navigateToConfirmation) {
          navigateToConfirmation();
        }
      }
      if (error.message === 'Ingresa nuevamente.') {
        setErrorMessage(null);
        if (navigateToConfirmation) {
          navigateToConfirmation();
        }
      } else {
        setErrorMessage(error.message);
        setSuccessMessage(null);
      }
    }
  };

  const handleSuccess = (message: string) => {
    setSuccessMessage(message);
    setErrorMessage(null);
  };

  const clearMessages = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  return {
    handleError,
    handleSuccess,
    errorMessage,
    successMessage,
    clearMessages,
    clearError: () => setErrorMessage(null),
    clearSuccess: () => setSuccessMessage(null),
  };
};

export default useErrorHandler;
