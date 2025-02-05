import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(90vh-100px)]">
    <div className="p-8 rounded-lg w-full max-w-md text-center">
    <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
    </div>
  </div>
  );
};

export default LoadingSpinner;
