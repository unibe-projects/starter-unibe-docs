import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthRoutes from './AuthRoutes';
import MainRoutes from './MainRoutes';
import { useAuth } from '../hooks/auth/useUser';
import LoadingApp from '../components/loadings/loadingApp/LoadingApp';

const AppRouter: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading && !isAuthenticated) {
    return <LoadingApp />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/*" element={isAuthenticated ? <AuthRoutes /> : <MainRoutes />} />
      </Routes>
    </Router>
  );
};

export default React.memo(AppRouter);
