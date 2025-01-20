import { Routes, Route, Navigate } from "react-router-dom";
import Header from "../components/common/header/Header";
import PageWrapper from "../components/common/page/PageWrapper";
import Sidebar from "../components/common/sidebar/Sidebar";
import NotFoundScreen from "../error/404/NotFoundScreen";
import CalendarScreen from "../pages/modules/calendar/CalendarScreen";
import HomeScreen from "../pages/modules/home/HomeScreen";
import PatienceScreen from "../pages/modules/patience/PatienceScreen";
import ProyectScreen from "../pages/modules/proyect/ProyectScreen";
import SettingsUpdatePasswordScreen from "../pages/modules/settings/SettingsUpdatePasswordScreen";
import PeriodScreen from "../pages/modules/proyect/PeriodScreen";
import ActivitiesScreen from "../pages/modules/activities/ActivitiesScreen";
import CreateActivitiesScreen from "../pages/modules/activities/CreateActivitiesScreen";

const AuthRoutes: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <PageWrapper>
          <main className="flex-1 overflow-auto pb-8">
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/settings/change-password" element={<SettingsUpdatePasswordScreen />} />
              <Route path="/paciente" element={<PatienceScreen />} />
              <Route path="/calendar" element={<CalendarScreen />} />
              <Route path="/proyecto" element={<ProyectScreen />} />
              <Route path="/proyecto/periodo" element={<PeriodScreen />} />
              <Route path="/proyecto/periodo/activities/:year-semester" element={<ActivitiesScreen />} />
              <Route path="/proyecto/periodo/activities/:year-semester/crear-actividad" element={<CreateActivitiesScreen />} />
              <Route path="*" element={<NotFoundScreen />} />
            </Routes>
          </main>
        </PageWrapper>
      </div>
    </div>
  );
};

export default AuthRoutes;
