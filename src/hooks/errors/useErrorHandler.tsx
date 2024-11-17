import { useState } from 'react';

type ErrorHandlerParams = {
  error: unknown;
  navigateToConfirmation?: () => void;
};

const useErrorHandler = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      }
    }
  };

  return {
    handleError,
    errorMessage,
    clearError: () => setErrorMessage(null),
  };
};

export default useErrorHandler;
