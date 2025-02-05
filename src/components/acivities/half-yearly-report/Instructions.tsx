const Instructions = () => {
    return (
      <div className="w-1/3 bg-gray-100 p-8 border-l border-gray-300">
        <h3 className="text-2xl font-bold text-indigo-600 mb-4">Instrucciones</h3>
        <ul className="space-y-4 text-lg">
          <li>Primero llena todos los campos obligatorios.</li>
          <li>Asegúrate de tener las actividades completadas para generar el PDF correctamente.</li>
          <li>Haz clic en "Generar PDF" para obtener el informe final.</li>
        </ul>
      </div>
    );
  };
  
  export default Instructions;
  