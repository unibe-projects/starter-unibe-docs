import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery, useLazyQuery } from '@apollo/client';
import {
  LIST_ACTIVITIES,
  GET_ACTIVITY,
} from '../../../services/activities/activitiesServices';
import LoadingSpinner from '../../../components/loadings/spinner/LoadingSpinner';
import ErrorMessage from '../../../error/messages/ErrorMessageRefresh';
import { reportActivitiesPdf } from '../../../utils/reports/activity-reports/reportActivitiesPdf';
import ActivityList from '../../../components/acivities/list/ActivityList';
import useErrorHandler from '../../../hooks/errors/useErrorHandler';
import Message from '../../../error/messages/Message';

const ActivitiesScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleError, errorMessage, clearError } = useErrorHandler();
  const [isLoadingReport, setIsLoadingReport] = useState<Record<string, boolean>>({});
  const { periodProyectId, periodId, periodYear, periodSemester, nameProyect } =
    location.state || {};
  const {
    data,
    loading,
    error: errorListProyect,
    refetch,
  } = useQuery(LIST_ACTIVITIES(periodProyectId, periodId), {
    variables: { periodProyectId, periodId },
  });

  const [fetchActivity] = useLazyQuery(GET_ACTIVITY);

  const handleRetryFetch = () => refetch();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (errorListProyect) {
    return <ErrorMessage message="Hubo un error al cargar los datos." onRetry={handleRetryFetch} />;
  }

  const activities = data?.listActivities?.items ?? [];

  const handleGeneratePdfAnual = async () => {
    navigate('/proyecto/periodo/actividad/generar-informe', {
      state: { periodProyectId, periodId, periodYear, periodSemester, nameProyect },
    });
  };

  const generatePdfActivities = async (id: string) => {
    try {
      setIsLoadingReport((prev) => ({ ...prev, [id]: true }));
      const { data: activityData } = await fetchActivity({ variables: { id } });
      if (activityData) {
        const period = periodYear + periodSemester;
        reportActivitiesPdf(activityData, nameProyect, period);
      }
    } catch (err) {
      handleError({ error: err });
    } finally {
      setIsLoadingReport((prev) => ({ ...prev, [id]: false }));
    }
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

  const handleCreateActivity = () => {
    navigate('/proyecto/periodo/actividad/crear-actividad', {
      state: {
        periodProyectId,
        periodId,
        periodYear,
        periodSemester,
        nameProyect,
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

  return (
    <div className="h-auto overflow-y-auto pb-8 pt-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl text-light-textSecondary text-start">
          Actividades: {nameProyect} - {periodYear}-{periodSemester}
        </h1>
        <div className="flex gap-4">
          <button
            onClick={handleGeneratePdfAnual}
            className="bg-light-primaryContent text-white px-4 py-3 rounded-lg text-lg font-semibold hover:bg-blue-400 transition"
          >
            Generar Informe
          </button>
          <button
            onClick={handleViewCalendar}
            className="bg-light-accent text-white px-4 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
          >
            Ver Calendario
          </button>
          <button
            onClick={handleCreateActivity}
            className="bg-light-primary text-white px-4 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Crear Actividad
          </button>
        </div>
      </div>

      {errorMessage && <Message text={errorMessage} type="error" />}
      <ActivityList
        activities={activities}
        generatePdfActivities={generatePdfActivities}
        handleViewActivities={handleViewActivities}
        isLoadingReport={isLoadingReport}
      />
    </div>
  );
};

export default ActivitiesScreen;
