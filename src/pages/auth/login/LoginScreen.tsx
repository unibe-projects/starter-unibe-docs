import UnibeBackgraund from '../../../assets/auth/UnibeBackgraund.jpg';
import UnibeLogo from '../../../assets/header/LogoUnibe.png';

const LoginScreen = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${UnibeBackgraund})` }}
    >
      <div className="w-full max-w-3xl p-12 space-y-6 bg-white bg-opacity-90 rounded-lg shadow-lg mx-4 sm:mx-10">
        <div className="flex justify-center mb-6">
          <img src={UnibeLogo} alt="Logo" className="h-32 w-32" />
        </div>
        <h2 className="text-small font-semibold text-center text-gray-700">Iniciar Sesión</h2>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full px-5 py-3 text-gray-700 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full px-5 py-3 text-gray-700 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button className="w-full px-5 py-3 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
