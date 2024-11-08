import React from 'react';
import AuthRoutes from './AuthRoutes';
import MainRoutes from './MainRoutes';

const AppRouter: React.FC = () => {
  const isAuthenticated = true;

  if (isAuthenticated) {
    return <AuthRoutes />;
  }

  return <MainRoutes />;
};

export default React.memo(AppRouter);
