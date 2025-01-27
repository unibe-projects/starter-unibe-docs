import { NavLink } from 'react-router-dom';
import { FaHome, FaUser, FaProjectDiagram, FaFileAlt } from 'react-icons/fa';
import ProfileImage from '../../../assets/sidebar/ProfileImage.webp';
import { useAuth } from '../../../hooks/auth/useUser';

const Sidebar = () => {
  const activeClass = 'bg-blue-500 text-white font-semibold';
  const inactiveClass = 'hover:bg-blue-100 text-gray-600';
  const { user } = useAuth();

  return (
    <div className="flex flex-col w-64 bg-white shadow-lg rounded-lg px-6 py-8 relative border-r-2 border-gray-200">
      <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-gray-800 to-transparent" />
      <div className="flex items-center justify-center mb-6">
        <img
          src={ProfileImage}
          alt="Perfil"
          className="h-20 w-20 rounded-full border-4 border-blue-500"
        />
      </div>
      <div className="flex items-center justify-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{user?.name}</h2>
      </div>
      <nav className="flex flex-col gap-6">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `flex items-center gap-5 text-lg p-3 rounded-lg transition-colors ${
              isActive ? activeClass : inactiveClass
            }`
          }
        >
          <FaHome className="text-2xl" />
          <span>Inicio</span>
        </NavLink>

        <NavLink
          to="/settings/change-password"
          className={({ isActive }) =>
            `flex items-center gap-5 text-lg p-3 rounded-lg transition-colors ${
              isActive ? activeClass : inactiveClass
            }`
          }
        >
          <FaUser className="text-2xl" />
          <span>Perfil</span>
        </NavLink>
        <NavLink
          to="/proyecto"
          className={({ isActive }) =>
            `flex items-center gap-5 text-lg p-3 rounded-lg transition-colors ${
              isActive ? activeClass : inactiveClass
            }`
          }
        >
          <FaProjectDiagram className="text-2xl" />
          <span>Proyecto</span>
        </NavLink>
        <NavLink
          to="/calendar"
          className={({ isActive }) =>
            `flex items-center gap-5 text-lg p-3 rounded-lg transition-colors ${
              isActive ? activeClass : inactiveClass
            }`
          }
        >
          <FaFileAlt className="text-2xl" />
          <span>Documentos</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
