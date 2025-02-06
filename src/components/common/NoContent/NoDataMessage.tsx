import React from 'react';

interface NoDataMessageProps {
  mesagge: string;
}

const NoDataMessage: React.FC<NoDataMessageProps> = ({ mesagge }) => {
  return (
    <div className="flex items-center justify-center min-h-[calc(70vh-100px)]">
      <p className="text-xl font-semibold text-gray-600">
       {mesagge}
      </p>
    </div>
  );
};

export default NoDataMessage;
