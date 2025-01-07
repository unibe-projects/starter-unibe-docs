import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from '../pages/auth/login/LoginScreen';
import PasswordRequiredScreen from '../pages/auth/login/PasswordRequiredScreen';
import NotFoundScreen from '../error/404/NotFoundScreen';
import ForgotPasswordScreen from '../pages/auth/login/ForgotPasswordScreen';
import ResetPasswordScreen from '../pages/auth/login/ResetPasswordScreen';

const MainRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/password-required" element={<PasswordRequiredScreen />} />
      <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
      <Route path="/reset-password" element={<ResetPasswordScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
};

export default MainRoutes;
