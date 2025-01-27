import React from 'react';
import CalendarComponent from '../../../components/calendar/CalendarComponent';
import { useQuery } from '@apollo/client';
import LoadingSpinner from '../../../components/loadings/spinner/LoadingSpinner';
import ErrorMessage from '../../../error/messages/ErrorMessageRefresh';
import { useLocation } from 'react-router-dom';
import { LIST_ACTIVITIES_DATES } from '../../../services/activities/activitiesServices';

const CalendarScreen: React.FC = () => {
  const location = useLocation();
  const {
    periodProyectId: activityProyectId,
    periodId: activityPeriodId,
    periodYear,
    periodSemester,
    nameProyect,
  } = location.state || {};
  const { data, loading, error, refetch } = useQuery(LIST_ACTIVITIES_DATES, {
    variables: {
      activityPeriodId,
      activityProyectId,
    },
    skip: !activityPeriodId || !activityProyectId,
  });

  const handleRetryFetch = () => {
    refetch();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Calendario del proyecto {nameProyect}-{periodYear}-{periodSemester}
      </h1>
      {loading && <LoadingSpinner />}
      {error && (
        <ErrorMessage message="Hubo un error al cargar los datos." onRetry={handleRetryFetch} />
      )}
      {!loading && !error && (
        <>
          <CalendarComponent data={data} />
        </>
      )}
    </div>
  );
};

export default CalendarScreen;
