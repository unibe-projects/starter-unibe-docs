import React from 'react';

interface NoDataMessageProps {
  message: string;
}

const NoDataMessage: React.FC<NoDataMessageProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center min-h-[calc(70vh-100px)]">
      <p className="text-xl font-semibold text-gray-600">
       {message}
      </p>
    </div>
  );
};

export default NoDataMessage;
