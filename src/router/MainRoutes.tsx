import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from '../pages/modules/home/HomeScreen';

const MainRoutes: React.FC = () => {
  return (
    <Router>
      <div>
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default MainRoutes;
