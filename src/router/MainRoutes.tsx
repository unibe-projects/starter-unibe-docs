import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from '../pages/auth/login/LoginScreen';

const MainRoutes: React.FC = () => {
  return (
    <Router>
      <div>
        <main>
          <Routes>
            <Route path="/" element={<LoginScreen />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default MainRoutes;
