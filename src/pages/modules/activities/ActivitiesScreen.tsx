import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery, useLazyQuery } from '@apollo/client';
import {
  GET_ACTIVITY,
  LIST_ACTIVITIES,
  LIST_ACTIVITIES_ALL,
} from '../../../services/activities/activitiesServices';
import LoadingSpinner from '../../../components/loadings/spinner/LoadingSpinner';
import ErrorMessage from '../../../error/messages/ErrorMessageRefresh';
import { generatePDF } from './pdf/activities';

const ActivitiesScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { periodProyectId, periodId, periodYear, periodSemester, nameProyect } =
    location.state || {};
  const {
    data,
    loading,
    error: errorListProyect,
    refetch,
  } = useQuery(LIST_ACTIVITIES(periodProyectId, periodId), {
    variables: {
      periodProyectId: periodProyectId ?? '',
      periodId: periodId ?? '',
    },
  });

  // Consulta para obtener una actividad específica (usando useLazyQuery)
  const [fetchActivity, { loading: isLoadingActivity, error: errorActivity }] =
    useLazyQuery(GET_ACTIVITY);

  const handleRetryFetch = () => {
    refetch();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (errorListProyect) {
    return <ErrorMessage message="Hubo un error al cargar los datos." onRetry={handleRetryFetch} />;
  }

  const activities = data?.listActivities?.items ?? [];

  const handleCreateActivity = () => {
    navigate('/proyecto/periodo/actividad/crear-actividad', {
      state: {
        activityProyectId: periodProyectId,
        activityPeriodId: periodId,
        periodYear,
        periodSemester,
        nameProyect,
      },
    });
  };

  const handleGenerateDoc = () => {
    navigate('/proyecto/periodo/actividad/generar-informe', {
      state: {
        activityProyectId: periodProyectId,
        activityPeriodId: periodId,
        periodYear,
        periodSemester,
      },
    });
  };

  const handleViewActivities = (id: string) => {
    navigate('/proyecto/periodo/actividad/view', {
      state: {
        id,
        periodProyectId,
        periodId,
        periodYear,
        periodSemester,
        nameProyect,
      },
    });
  };

  const handleViewCalendar = () => {
    navigate('/proyecto/periodo/actividad/calendar', {
      state: {
        periodProyectId,
        periodId,
        periodYear,
        periodSemester,
        nameProyect,
      },
    });
  };

  const generatePdfActivities = async (id: string) => {
    try {
      const { data: activityData } = await fetchActivity({ variables: { id } });
      if (activityData) {
        const period = periodYear + periodSemester;
        generatePDF(activityData, nameProyect, period);
      }
    } catch (err) {
      console.error('Error al generar el PDF:', err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Actividades: {nameProyect} - {periodYear}-{periodSemester}</h1>
      <div className="flex justify-end gap-4 mb-8">
        <button
          onClick={handleGenerateDoc}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition"
        >
          Generar Informe
        </button>

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
            {activities.map((activity: { id: string; project_manager: string; name: string }) => (
              <div
                key={activity.id}
                className="bg-white shadow-lg rounded-lg p-6 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-semibold">{activity.name}</h3>
                  <p className="text-gray-600">{activity.project_manager}</p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => generatePdfActivities(activity.id)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition"
                  >
                    Descargar PDF
                  </button>
                  <button
                    onClick={() => handleViewActivities(activity.id)}
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

      {/* Indicador de carga para PDF */}
      {isLoadingActivity && <LoadingSpinner />}
      {errorActivity && (
        <ErrorMessage
          message="Hubo un error al cargar los datos de la actividad para el PDF."
          onRetry={() => {}}
        />
      )}
    </div>
  );
};

export default ActivitiesScreen;
