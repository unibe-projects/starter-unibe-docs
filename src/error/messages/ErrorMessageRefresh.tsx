import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <p className="text-red-500 text-lg">{message}</p>
      <button
        onClick={onRetry}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Intentar nuevamente
      </button>
    </div>
  );
};

export default ErrorMessage;
