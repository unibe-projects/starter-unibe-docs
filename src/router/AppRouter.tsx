import React from 'react';
import AuthRoutes from './AuthRoutes';
import MainRoutes from './MainRoutes';
import { useAuth } from '../hooks/auth/useUser';
import LoadingApp from '../components/loadings/loadingApp/LoadingApp';

const AppRouter: React.FC = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  if (authLoading) {
    return <LoadingApp />;
  }

  if (isAuthenticated) {
    return <AuthRoutes />;
  }

  return <MainRoutes />;
};

export default React.memo(AppRouter);
