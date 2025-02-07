import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-extrabold mb-4 text-blue-600">404</h1>
      <p className="text-lg text-gray-600 mb-8">Lo sentimos, la página que buscas no existe.</p>
      <Link
        to="/"
        className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFoundScreen;
