import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomeScreen from '../pages/modules/home/HomeScreen';
import Header from '../components/common/header/Header';
import PageWrapper from '../components/common/page/PageWrapper';
import Sidebar from '../components/common/sidebar/Sidebar';
import NotFoundScreen from '../error/404/NotFoundScreen';
import SettingsUpdatePasswordScreen from '../pages/modules/settings/SettingsUpdatePasswordScreen';

const AuthRoutes: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <PageWrapper>
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/settings/change-password" element={<SettingsUpdatePasswordScreen />} />
              <Route path="*" element={<NotFoundScreen />} />
            </Routes>
          </main>
        </PageWrapper>
      </div>
    </div>
  );
};

export default AuthRoutes;
