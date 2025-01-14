import { NavLink } from 'react-router-dom';
import { FaHome, FaUser } from 'react-icons/fa';
import ProfileImage from '../../../assets/sidebar/ProfileImage.webp';
import { useAuth } from '../../../hooks/auth/useUser';

const Sidebar = () => {
  const activeClass = 'bg-blue-200 text-blue-700 font-bold';
  const inactiveClass = 'hover:bg-blue-100';
  const { user } = useAuth();

  return (
    <div className="flex flex-col w-64 bg-light shadow-lg px-4 py-8 relative">
      <div className="absolute top-0 right-0 h-full w-1 bg-gray-300" />
      <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-gray-800 to-transparent" />
      <div className="flex items-center justify-center mb-6">
        <img
          src={ProfileImage}
          alt="Perfil"
          className="h-16 w-16 rounded-full border-2 border-gray-300"
        />
      </div>
      <div className="flex items-center justify-center mb-6">
        <h2 className="text-small font-bold text-light-textSecondary">{user?.name}</h2>
      </div>
      <nav className="flex flex-col gap-6">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `flex items-center gap-4 text-light-accent p-2 rounded-lg transition-colors ${
              isActive ? activeClass : inactiveClass
            }`
          }
        >
          <FaHome className="text-xl" />
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/calendar"
          className={({ isActive }) =>
            `flex items-center gap-4 text-light-accent p-2 rounded-lg transition-colors ${
              isActive ? activeClass : inactiveClass
            }`
          }
        >
          <FaHome className="text-xl" />
          <span>Calendario</span>
        </NavLink>
        <NavLink
          to="/user/create"
          className={({ isActive }) =>
            `flex items-center gap-4 text-light-accent p-2 rounded-lg transition-colors ${
              isActive ? activeClass : inactiveClass
            }`
          }
        >
          <FaHome className="text-xl" />
          <span>User</span>
        </NavLink>
        <NavLink
          to="/documentos"
          className={({ isActive }) =>
            `flex items-center gap-4 text-light-accent p-2 rounded-lg transition-colors ${
              isActive ? activeClass : inactiveClass
            }`
          }
        >
          <FaUser className="text-xl" />
          <span>Documentos</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
