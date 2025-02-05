import React from 'react';

const NoDataMessage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(70vh-100px)]">
      <p className="text-xl font-semibold text-gray-600">
        No hay actividades disponibles en este período.
      </p>
    </div>
  );
};

export default NoDataMessage;
