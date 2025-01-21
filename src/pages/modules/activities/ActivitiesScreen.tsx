import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { LIST_ACTIVITIES } from '../../../services/activities/activitiesServices';
import { useFormValues } from '../../../hooks/formValues/formValues';

const ActivitiesScreen: React.FC = () => {
  const navigate = useNavigate();
  const { periodProyectId, id } = useParams<{
    periodProyectId: string;
    id: string;
  }>();
  const { formValues } = useFormValues();

  const {
    data,
    loading,
    error: errorListProyect,
  } = useQuery(LIST_ACTIVITIES(periodProyectId ?? '', id ?? ''));

  // Manejo de errores o estado de carga
  if (loading) {
    return <p className="text-center">Cargando actividades...</p>;
  }
  if (errorListProyect) {
    return <p className="text-center text-red-500">Error al cargar actividades.</p>;
  }

  // Asignar actividades desde la data obtenida
  const activities = data?.listActivities?.items ?? [];

  const handleCreateActivity = () => {
    navigate(
      `/proyecto/periodo/activities/${formValues.year}-${formValues.semester}/crear-actividad`,
    );
  };

  const handleViewCalendar = () => {
    navigate('/calendar');
  };

  const handleDownloadPDF = (activity: { name: string; description: string }) => {};

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Actividades del Periodo</h1>

      <div className="flex justify-end gap-4 mb-8">
        <button
          onClick={handleCreateActivity}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          Crear Actividad
        </button>
        <button
          onClick={handleViewCalendar}
          className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
        >
          Ver Calendario
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Lista de Actividades</h2>

        {activities.length > 0 ? (
          <div className="space-y-6">
            {activities.map((activity: { id: string; name: string; description: string }) => (
              <div
                key={activity.id}
                className="bg-white shadow-lg rounded-lg p-6 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-semibold">{activity.name}</h3>
                  <p className="text-gray-600">{activity.description}</p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleDownloadPDF(activity)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition"
                  >
                    Descargar PDF
                  </button>
                  <button
                    onClick={() => alert(`Ver detalles de ${activity.name}`)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No hay actividades disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default ActivitiesScreen;
