import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(90vh-90px)]">
      <div className="relative p-8 rounded-lg w-full max-w-md text-center flex flex-col items-center justify-center">
        <div className="w-32 h-32 border-4 border-t-transparent border-light-textSecondary animate-spin rounded-full"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
