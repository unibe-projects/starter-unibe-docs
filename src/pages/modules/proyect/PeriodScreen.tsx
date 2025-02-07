import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_PERIOD, LIST_PERIODS } from '../../../services/period/periodService';
import CreatePeriodModal from '../../../components/period/CreatePeriodModal';
import PeriodList from '../../../components/period/PeriodList';
import useErrorHandler from '../../../hooks/errors/useErrorHandler';
import ErrorMessage from '../../../error/messages/ErrorMessageRefresh';
import LoadingSpinner from '../../../components/loadings/spinner/LoadingSpinner';
import { useAuth } from '../../../hooks/auth/useUser';
import Message from '../../../error/messages/Message';
import NoDataMessage from '../../../components/common/NoContent/NoDataMessage';

const PeriodScreen: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const { periodProyectId, nameProyect } = location.state || {};
  const { user } = useAuth();
  const role = user?.['custom:role'];

  const {
    data,
    loading,
    error: errorListProyect,
    refetch,
  } = useQuery(LIST_PERIODS, {
    variables: { periodProyectId },
    skip: !periodProyectId
  });

  const [createPeriod] = useMutation(CREATE_PERIOD);
  const { handleError, errorMessage, clearError } = useErrorHandler();
  const navigate = useNavigate();

  const handleViewActivities = (period: { id: string; year: string; semester: string }) => {
    navigate('/proyecto/periodo/actividad', {
      state: {
        periodProyectId,
        periodId: period.id,
        periodYear: period.year,
        periodSemester: period.semester,
        nameProyect,
      },
    });
  };

  const handleCreatePeriod = async (year: string, semester: string, description: string) => {
    try {
      const existingPeriod = data?.listPeriods?.items?.find(
        (p: { year: string; semester: string }) => p.year === year && p.semester === semester
      );

      if (existingPeriod) {
        handleError({ error: new Error('🚫 El período ya existe.') });
        return;
      }

      await createPeriod({ variables: { year, semester, description, periodProyectId } });

      refetch();
      clearError();
    } catch (error) {
      handleError({ error });
    }
  };

  const handleRetryFetch = () => {
    refetch();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (errorListProyect) {
    return <ErrorMessage message="Hubo un error al cargar los datos." onRetry={handleRetryFetch} />;
  }

  return (
    <div className="h-auto overflow-y-auto pb-8 pt-4">
      <h1 className="text-2xl text-light-textSecondary font-bold mb-6">
        Periodos para {nameProyect}
      </h1>
      {role === 'ADMIN' && (
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-light-primary text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Crear Periodo
          </button>
        </div>
      )}

      {errorMessage && <Message text={errorMessage} type="error" />}

      <CreatePeriodModal
        isOpen={isModalOpen}
        onCreate={handleCreatePeriod}
        onClose={() => setIsModalOpen(false)}
      />
      {data?.listPeriods?.items.length > 0 ? (
        <PeriodList
          periods={data?.listPeriods?.items || []}
          onViewActivities={handleViewActivities}
        />
      ) : (
        <NoDataMessage message="No hay periodos disponibles." />
      )}
    </div>
  );
};

export default PeriodScreen;
