import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth/useUser';
import Header from '../components/common/header/Header';
import PageWrapper from '../components/common/page/PageWrapper';
import Sidebar from '../components/common/sidebar/Sidebar';
import NotFoundScreen from '../error/404/NotFoundScreen';
import CalendarScreen from '../pages/modules/calendar/CalendarScreen';
import HomeScreen from '../pages/modules/home/HomeScreen';
import GenerateDocScreen from '../pages/modules/activities/GenerateDocScreen';
import ProyectScreen from '../pages/modules/proyect/ProyectScreen';
import SettingsUpdatePasswordScreen from '../pages/modules/settings/SettingsUpdatePasswordScreen';
import PeriodScreen from '../pages/modules/proyect/PeriodScreen';
import ActivitiesScreen from '../pages/modules/activities/ActivitiesScreen';
import CreateActivitiesScreen from '../pages/modules/activities/CreateActivitiesScreen';
import Breadcrumbs from '../components/common/header/Breadcrumbs';
import ActivitiesViewScreen from '../pages/modules/activities/ActivitiesViewScreen';
import DocumentsScreen from '../pages/modules/documents/DocumentsScreen';
interface RouteConfig {
  path: string;
  element: JSX.Element;
}
const roleRoutes: Record<string, RouteConfig[]> = {
  ADMIN: [
    { path: '/home', element: <HomeScreen /> },
    { path: '/documentos', element: <DocumentsScreen /> },
    { path: '/settings/change-password', element: <SettingsUpdatePasswordScreen /> },
    { path: '/proyecto/periodo/actividad/calendar', element: <CalendarScreen /> },
    { path: '/proyecto', element: <ProyectScreen /> },
    { path: '/proyecto/periodo', element: <PeriodScreen /> },
    { path: '/proyecto/periodo/actividad', element: <ActivitiesScreen /> },
    { path: '/proyecto/periodo/actividad/crear-actividad', element: <CreateActivitiesScreen /> },
    { path: '/proyecto/periodo/actividad/generar-informe', element: <GenerateDocScreen /> },
    { path: '/proyecto/periodo/actividad/view', element: <ActivitiesViewScreen /> },
  ],
  DOCTOR: [
    { path: '/home', element: <HomeScreen /> },
    { path: '/documentos', element: <DocumentsScreen /> },
    { path: '/settings/change-password', element: <SettingsUpdatePasswordScreen /> },
    { path: '/proyecto/periodo/actividad/calendar', element: <CalendarScreen /> },
    { path: '/proyecto', element: <ProyectScreen /> },
    { path: '/proyecto/periodo', element: <PeriodScreen /> },
    { path: '/proyecto/periodo/actividad', element: <ActivitiesScreen /> },
    { path: '/proyecto/periodo/actividad/crear-actividad', element: <CreateActivitiesScreen /> },
    { path: '/proyecto/periodo/actividad/generar-informe', element: <GenerateDocScreen /> },
    { path: '/proyecto/periodo/actividad/view', element: <ActivitiesViewScreen /> },
  ],
};

const AuthRoutes: React.FC = () => {
  const { user } = useAuth();
  const role =  user?.["custom:role"] || 'DOCTOR';

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <PageWrapper>
          <main className="flex-1 overflow-auto pb-8">
            <Breadcrumbs />
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              {roleRoutes[role]?.map(({ path, element }: RouteConfig) => (
                <Route key={path} path={path} element={element} />
              ))}
              <Route path="*" element={<NotFoundScreen />} />
            </Routes>
          </main>
        </PageWrapper>
      </div>
    </div>
  );
};

export default AuthRoutes;
