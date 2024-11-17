import logoUnibe from '../../../assets/header/LogoUnibe.png';

const LoadingApp = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-light-primary">
      <img src={logoUnibe} alt="Loading" className="w-32 h-32 animate-pulse" />
    </div>
  );
};

export default LoadingApp;
