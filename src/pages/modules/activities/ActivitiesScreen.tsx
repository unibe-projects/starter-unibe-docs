import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { LIST_ACTIVITIES, UPDATE_ACTIVITY_STATUS, GET_ACTIVITY } from '../../../services/activities/activitiesServices';
import LoadingSpinner from '../../../components/loadings/spinner/LoadingSpinner';
import ErrorMessage from '../../../error/messages/ErrorMessageRefresh';
import ModalStatus from '../../../components/acivities/ModalStatus';
import { reportActivitiesPdf } from '../../../utils/reports/activity-reports/reportActivitiesPdf';
import ActivityList from '../../../components/acivities/list/ActivityList';
import { ListActivities } from '../../../interface/activities/activities.interface';
import useErrorHandler from '../../../hooks/errors/useErrorHandler';
import Message from '../../../error/messages/Message';

const ActivitiesScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedActivity, setSelectedActivity] = useState<ListActivities | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { handleError, errorMessage, clearError } = useErrorHandler();
  const [isLoadingReport, setIsLoadingReport] = useState<Record<string, boolean>>({});
  const [updateActivityStatus] = useMutation(UPDATE_ACTIVITY_STATUS);
  const { periodProyectId, periodId, periodYear, periodSemester, nameProyect } = location.state || {};
  const { data, loading, error: errorListProyect, refetch } = useQuery(LIST_ACTIVITIES(periodProyectId, periodId), {
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
      handleError({ error: err})
    } finally {
      setIsLoadingReport((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleChangeStatus = (activity: ListActivities) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
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
  }
  
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

  const handleSaveStatus = async () => {
    try {
      if(selectedActivity) {
        await updateActivityStatus({
          variables: { id: selectedActivity.id , status: selectedActivity.status },
        });
        setIsModalOpen(false);
        setSelectedActivity(null);
      }
    } catch (error) {
      handleError({ error: 'Error al actualizar el estado'})
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedActivity(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Actividades: {nameProyect} - {periodYear}-{periodSemester}
      </h1>

      <div className="flex justify-end gap-4 mb-8">
        <button onClick={handleGeneratePdfAnual} className="bg-purple-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition">
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
      {errorMessage && <Message text={errorMessage} type="error" />}
      <ActivityList
        activities={activities}
        generatePdfActivities={generatePdfActivities}
        handleViewActivities={handleViewActivities}
        handleChangeStatus={handleChangeStatus}
        isLoadingReport={isLoadingReport}
      />
      {isModalOpen && selectedActivity && (
        <ModalStatus
          selectedActivity={selectedActivity}
          handleSaveStatus={handleSaveStatus}
          setSelectedActivity={setSelectedActivity}
          handleCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ActivitiesScreen;
