import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="flex items-center justify-center min-h-[calc(90vh-100px)]">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">¡Oops! Algo salió mal.</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <button
          onClick={onRetry}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          Intentar nuevamente
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
