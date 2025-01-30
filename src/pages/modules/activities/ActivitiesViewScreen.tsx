import { useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import { GET_ACTIVITY } from '../../../services/activities/activitiesServices';
import PreviewSection from '../../../components/acivities/documentView/PreviewSection';
import { useMemo } from 'react';
import ErrorMessage from '../../../error/messages/ErrorMessageRefresh';
import LoadingSpinner from '../../../components/loadings/spinner/LoadingSpinner';

const ActivitiesViewScreen = () => {
  const location = useLocation();
  const { id: activityId, periodYear, periodSemester, nameProyect } = location.state || {};

  const { data, loading, error, refetch } = useQuery(GET_ACTIVITY, {
    variables: { id: activityId },
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

  if (!previewData) {
    return <p>No se encontraron datos de la actividad.</p>;
  }

  return (
    <div className="flex justify-center items-center px-4 md:px-8 lg:px-32 w-full pb-8">
      <PreviewSection previewData={previewData} iscreate={false}/>
    </div>
  );
};

export default ActivitiesViewScreen;
