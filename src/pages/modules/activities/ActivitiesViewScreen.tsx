import { useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import { GET_ACTIVITY } from '../../../services/activities/activitiesServices';
import PreviewSection from '../../../components/acivities/documentView/PreviewSection';
import { useMemo } from 'react';
import ErrorMessage from '../../../error/messages/ErrorMessageRefresh';
import LoadingSpinner from '../../../components/loadings/spinner/LoadingSpinner';
import NoDataMessage from '../../../components/common/NoContent/NoDataMessage';

const ActivitiesViewScreen = () => {
  const location = useLocation();
  const { id: activityId, periodYear, periodSemester, nameProyect } = location.state || {};

  const { data, loading, error, refetch } = useQuery(GET_ACTIVITY, {
    variables: { id: activityId },
    skip: !activityId,
  });

  const previewData = useMemo(() => {
    if (!data?.getActivity) {
      return null;
    }

    const {
      project_manager,
      activity_date,
      start_time,
      hora_fin,
      executing_institution,
      charge,
      unit,
      general_objective,
      number_participants,
      budget_used,
      name,
      ActivityTasks,
      Documents,
    } = data.getActivity;

    const tasks = ActivityTasks?.items?.map((item: any) => item.activityTasks) || [];
    const documents = Documents?.items?.map((item: any) => item.documents) || [];

    return {
      activityProyectId: '',
      activityPeriodId: '',
      project_manager: project_manager ?? '',
      activity_date: activity_date ?? '',
      start_time: start_time ?? '',
      hora_fin: hora_fin ?? '',
      executing_institution: executing_institution ?? '',
      charge: charge ?? '',
      unit: unit ?? '',
      general_objective: general_objective ?? '',
      number_participants: number_participants ?? '',
      budget_used: budget_used ?? '',
      project_name: nameProyect ?? '',
      report_period: `${periodYear ?? ''} - ${periodSemester ?? ''}`,
      name: name ?? '',
      tasks,
      documents,
    };
  }, [data, nameProyect, periodYear, periodSemester]);

  const handleRetryFetch = () => {
    refetch();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message="Hubo un error al cargar los datos." onRetry={handleRetryFetch} />;
  }

  return (
    <div className="h-auto overflow-y-auto pb-8 pt-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl text-light-textSecondary text-start">Detalles de la actividad</h1>
      </div>
      {previewData ? (
        <PreviewSection previewData={previewData} iscreate={false} />
      ) : (
        <NoDataMessage mesagge="No hay actividades que puedas observar." />
      )}
    </div>
  );
};

export default ActivitiesViewScreen;
