import React from 'react';
import AuthRoutes from './AuthRoutes';
import MainRoutes from './MainRoutes';
import { useAuth } from '../hooks/auth/useUser';
import LoadingApp from '../components/loadings/loadingApp/LoadingApp';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const AppRouter: React.FC = () => {
  const { isAuthenticated, isLoading: authLoading, } = useAuth();

  if (authLoading) {
    return <LoadingApp />;
  }

  const router = createBrowserRouter(
    [
      {
        path: '*',
        element: isAuthenticated ? <AuthRoutes /> : <MainRoutes />,
      },
    ],
    {
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      },
    },
  );

  return <RouterProvider router={router} />;
};

export default React.memo(AppRouter);
