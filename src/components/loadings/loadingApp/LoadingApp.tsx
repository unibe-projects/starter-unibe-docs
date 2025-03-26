import logoUnibe from '../../../assets/header/LogoUnibe.png';

const LoadingApp = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <img src={logoUnibe} alt="Loading" className="w-48 h-48 animate-pulse" />
    </div>
  );
};

export default LoadingApp;
