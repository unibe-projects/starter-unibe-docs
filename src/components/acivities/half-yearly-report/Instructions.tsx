const Instructions = () => {
  return (
    <div className="w-1/3 bg-gray-100 p-8 border-l border-gray-300">
      <h3 className="text-2xl text-light-textSecondary font-bold mb-4">Instrucciones</h3>
      <ul className="space-y-4 text-lg">
        <li>Completa toda la información necesaria para generar el reporte.</li>
        <li>Si no se encuentran actividades en este periodo, no será posible generar reportes para este semestre.</li>
        <li>Las actividades incompletas no aparecerán en la información del reporte.</li>
      </ul>
    </div>
  );
};

export default Instructions;
