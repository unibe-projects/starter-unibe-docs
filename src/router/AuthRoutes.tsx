import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomeScreen from '../pages/modules/home/HomeScreen';
import Header from '../components/common/header/Header';
import PageWrapper from '../components/common/page/PageWrapper';
import Sidebar from '../components/common/sidebar/Sidebar';
import NotFoundScreen from '../error/404/NotFoundScreen';

const AuthRoutes: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex">
        <Sidebar />
        <PageWrapper>
          <div className="flex-1 flex items-center justify-center">
            <main className="w-full">
              <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<HomeScreen />} />
                <Route path="*" element={<NotFoundScreen />} />
              </Routes>
            </main>
          </div>
        </PageWrapper>
      </div>
    </div>
  );
};

export default AuthRoutes;
