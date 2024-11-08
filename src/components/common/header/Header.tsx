import React from 'react';
import LogoUnibe from '../../../assets/header/LogoUnibe.png';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-8 py-4 h-24 w-full bg-light-primary">
      <div className="flex items-center space-x-4">
        <img src={LogoUnibe} alt="Logo Unibe" className="h-24 w-24" />
        <h1 className="text-light-textPrimary text-2xl font-bold">
          Universidad Iberoamericana Unibe
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <h1 className="text-light-textSecondary text-small font-bold">
          Hector Steveen Ordoñez Chamba
        </h1>
        <img src="logo_url_derecha" alt="Logo Derecha" className="h-10 w-10" />
      </div>
    </header>
  );
};

export default Header;
