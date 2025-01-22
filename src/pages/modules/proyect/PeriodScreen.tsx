import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_PERIOD, LIST_PERIODS } from '../../../services/period/periodService';
import CreatePeriodModal from '../../../components/period/CreatePeriodModal';
import PeriodList from '../../../components/period/PeriodList';
import useErrorHandler from '../../../hooks/errors/useErrorHandler';
import ErrorMessage from '../../../error/messages/ErrorMessageRefresh';
import LoadingSpinner from '../../../components/loadings/spinner/LoadingSpinner';

const PeriodScreen: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const { periodProyectId, nameProyect } = location.state || {};
  const {
    data,
    loading,
    error: errorListProyect,
    refetch,
  } = useQuery(LIST_PERIODS(periodProyectId ?? ''));
  const [createPeriod] = useMutation(CREATE_PERIOD);
  const { handleError, errorMessage, clearError } = useErrorHandler();
  const navigate = useNavigate();

  const handleViewActivities = (period: { id: string; year: string; semester: string }) => {
    navigate(
      '/proyecto/periodo/actividad',
      {
        state: { 
          periodProyectId, 
          periodId: period.id, 
          periodYear: period.year, 
          periodSemester: period.semester 
        }
      }
    );
  };
  

  const handleCreatePeriod = async (year: string, semester: string, description: string) => {
    try {
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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Periodos para {nameProyect}</h1>

      {/* Button to open modal */}
      <div className="flex justify-end mb-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          Crear Periodo
        </button>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <CreatePeriodModal
        isOpen={isModalOpen}
        onCreate={handleCreatePeriod}
        onClose={() => setIsModalOpen(false)}
      />

      <PeriodList
        periods={data?.listPeriods?.items || []}
        onViewActivities={handleViewActivities}
      />
    </div>
  );
};

export default PeriodScreen;
