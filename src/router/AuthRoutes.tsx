import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from '../pages/modules/home/HomeScreen';
import Header from '../components/common/header/Header';
import PageWrapper from '../components/common/page/PageWrapper';
import Sidebar from '../components/common/sidebar/Sidebar';

const AuthRoutes: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex ">
          <Sidebar />
          <PageWrapper>
            <div className="flex-1 flex items-center justify-center">
              <main className="w-full">
                <Routes>
                  <Route path="/" element={<HomeScreen />} />
                </Routes>
              </main>
            </div>
          </PageWrapper>
        </div>
      </div>
    </Router>
  );
};

export default AuthRoutes;
