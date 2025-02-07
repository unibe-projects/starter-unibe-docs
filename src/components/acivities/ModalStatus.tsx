import { useState, useEffect } from 'react';
import { ActivitiesStatusEnum } from '../../enums/activities/ActivitiesStatusEnum';
import { translateActivityStatus } from '../../utils/translateActivityStatus';
import { GET_COMPLETED_ACTIVITIES, UPDATE_ACTIVITY_STATUS } from '../../services/activities/activitiesServices';
import { useMutation } from '@apollo/client';
import useErrorHandler from '../../hooks/errors/useErrorHandler';
import Message from '../../error/messages/Message';
import LoadingButton from '../loadings/buttons/LoadingButton';

type ModalStatusProps = {
  currentId: string;
  currentStatus: ActivitiesStatusEnum;
  handleCloseModal: () => void;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  periodProyectId: string;
  periodId: string;
};

const ModalStatus: React.FC<ModalStatusProps> = ({
  currentStatus,
  currentId,
  handleCloseModal,
  setIsModalOpen,
  periodId,
  periodProyectId,
}) => {
  const statuses = [
    ActivitiesStatusEnum.COMPLETED,
    ActivitiesStatusEnum.EARRING,
    ActivitiesStatusEnum.CANCELADA,
    ActivitiesStatusEnum.IN_PROGRESS,
  ];
  const filteredStatuses = statuses.filter((status) => status !== currentStatus);
  const [selectedStatus, setSelectedStatus] = useState<ActivitiesStatusEnum | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [updateActivityStatus] = useMutation(UPDATE_ACTIVITY_STATUS, {
    refetchQueries: [
      {
        query: GET_COMPLETED_ACTIVITIES,
        variables: { activityPeriodId: periodId, activityProyectId: periodProyectId },
      },
    ],
    awaitRefetchQueries: true,
  });
  

  const { handleError, errorMessage, clearError } = useErrorHandler();

  useEffect(() => {
    setSelectedStatus(null);
  }, [currentStatus]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as ActivitiesStatusEnum;
    setSelectedStatus(newStatus);
  };

  const handleSaveStatus = async () => {
    if (selectedStatus && selectedStatus !== currentStatus) {
      setIsLoading(true);
      try {
        await updateActivityStatus({
          variables: { id: currentId, status: selectedStatus },
        });
        setIsModalOpen(false);
      } catch (error) {
        handleError({ error: 'Error al actualizar el estado' });
      } finally {
        setIsLoading(false);
      }
    } else {
      handleError({ error: 'El estado no ha cambiado' });
    }
  };

  const handleCancel = () => {
    clearError();
    handleCloseModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h3 className="text-xl font-semibold mb-4">Cambiar Estado de la Actividad</h3>
        {errorMessage && <Message text={errorMessage} type="error" />}
        <div>
          <label className="block text-gray-700">
            Estado Actual: {translateActivityStatus(currentStatus)}
          </label>
          <select
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
            value={selectedStatus ?? ''}
            onChange={handleStatusChange}
          >
            <option value="" disabled>
              Selecciona un nuevo estado
            </option>
            {filteredStatuses.map((status) => (
              <option key={status} value={status}>
                {translateActivityStatus(status)}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSaveStatus}
            className="bg-green-600 text-white px-4 py-2 rounded-lg mr-2"
            disabled={isLoading}
          >
            {isLoading ? <LoadingButton text="Cargando ...." /> : 'Confirmar'}
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalStatus;
