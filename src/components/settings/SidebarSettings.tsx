import { useNavigate } from "react-router-dom";

const SidebarSettings = () => {
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-gray-100 text-gray-800 flex flex-col justify-between h-screen py-6 px-4 shadow-lg">
      <div>
        <h2 className="text-lg font-bold mb-6">Configuraciones</h2>
        <button
          className="py-2 px-4 mb-4 bg-gray-200 hover:bg-gray-300 rounded text-left"
          onClick={() => navigate("/settings/change-password")}
        >
          Cambio de Contraseña
        </button>
        <button
          className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded text-left"
          onClick={() => navigate("/update-profile")}
        >
          Actualizar Datos
        </button>
      </div>
    </div>
  );
};

export default SidebarSettings;
