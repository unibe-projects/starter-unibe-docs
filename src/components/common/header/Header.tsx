import React, { useState } from 'react';
import LogoUnibe from '../../../assets/header/LogoUnibe.png';
import { useAuth } from '../../../hooks/auth/useUser';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '../../loadings/buttons/LoadingButton';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { handleSignOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await handleSignOut();
      navigate('/login');
    } finally {
      setIsLoading(false);
    }
  };

  const navigateSettings = () => {
    navigate('/settings/change-password');
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 h-24 w-full bg-light-primary">
      <div className="flex items-center space-x-4">
        <img src={LogoUnibe} alt="Logo Unibe" className="h-24 w-24 cursor-pointer" />
        <h1 className="text-light-textSecondary text-2xl font-bold">
          Universidad Iberoamericana Unibe
        </h1>
      </div>

      {/* Menú de opciones */}
      {isMenuOpen && (
        <div className="absolute top-24 right-8 bg-white shadow-lg rounded-lg p-4 w-48">
          <ul className="space-y-2">
            <li>
              <button onClick={navigateSettings} className="text-black">
                Configuración
              </button>
            </li>
            <li>
              <button onClick={handleLogout} disabled={isLoading} className="text-red-600">
                {' '}
                {isLoading ? <LoadingButton text="Cargando ...." /> : 'Cerrar Sesión'}
              </button>
            </li>
          </ul>
        </div>
      )}

      <div className="flex items-center space-x-4">
        <h1 className="text-light-textSecondary text-small font-bold">
          Hector Steveen Ordoñez Chamba
        </h1>
        <img src="logo_url_derecha" alt="Logo Derecha" className="h-10 w-10" onClick={toggleMenu} />
      </div>
    </header>
  );
};

export default Header;
