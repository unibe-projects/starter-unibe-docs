const PasswordPolicy: React.FC = () => {
  return (
    <div className="w-full lg:w-1/4 p-6 bg-gray-200 rounded-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Política de Contraseñas</h2>
      <p className="text-gray-700">
        Para cambiar tu contraseña, asegúrate de que cumpla con los siguientes requisitos:
      </p>
      <ul className="list-disc pl-6 text-gray-700 mt-4">
        <li>Longitud mínima: 8 caracteres</li>
        <li>Debe contener al menos 1 número</li>
        <li>Debe contener al menos 1 carácter especial</li>
        <li>Debe contener al menos 1 letra mayúscula</li>
        <li>Debe contener al menos 1 letra minúscula</li>
      </ul>
      <p className="text-gray-700 mt-4">
        Además, las contraseñas temporales establecidas por los administradores expiran en 7 días.
      </p>
    </div>
  );
};

export default PasswordPolicy;
