export const PeriodList: React.FC<{
  periods: Array<{
    id: string;
    year: string;
    semester: string;
    description?: string;
    createdAt?:number | Date | undefined;
  }>;
  onViewActivities: (period: { id: string; year: string; semester: string }) => void;
}> = ({ periods, onViewActivities }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {periods.map((period, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg flex flex-col justify-center items-center text-center h-auto w-full p-6"
        >
          <h2 className="text-2xl font-bold text-gray-800">
            Periodo: {period.year} - {period.semester}
          </h2>
          <p className="text-gray-600 mb-4">
            Descripción: {period.description || 'Sin descripción'}
          </p>
          <p className="text-gray-400 mb-4">
          Creado el: {period.createdAt ? new Date(period.createdAt).toLocaleDateString() : 'Fecha no disponible'}
          </p>
          <button
            onClick={() => onViewActivities(period)}
            className="mt-4 bg-light-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Ver Actividades
          </button>
        </div>
      ))}
    </div>
  );
};

export default PeriodList;
