import { ActivitiesStatusEnum } from '../../enums/activities/ActivitiesStatusEnum';
import { ListActivities } from '../../interface/activities/activities.interface';

type ModalStatusProps = {
  selectedActivity: ListActivities;
  handleSaveStatus: () => Promise<void>;
  setSelectedActivity: React.Dispatch<React.SetStateAction<ListActivities | null>>;
  handleCloseModal: () => void;
};

const ModalStatus: React.FC<ModalStatusProps> = ({
  selectedActivity,
  handleSaveStatus,
  setSelectedActivity,
  handleCloseModal,
}) => {
  const statuses = [
    ActivitiesStatusEnum.EARRING,
    ActivitiesStatusEnum.COMPLETED,
    ActivitiesStatusEnum.CANCELADA,
    ActivitiesStatusEnum.IN_PROGRESS,
  ];

  const filteredStatuses = statuses.filter((status) => status !== selectedActivity.status);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h3 className="text-xl font-semibold mb-4">Cambiar Estado de la Actividad</h3>
        <div>
          <label className="block text-gray-700">Estado Actual: {selectedActivity.status}</label>
          <select
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
            value={selectedActivity.status}
            onChange={(e) =>
              setSelectedActivity({
                ...selectedActivity,
                status: e.target.value as ActivitiesStatusEnum,
              })
            }
          >
            {filteredStatuses.map((status) => (
              <option key={status} value={status}>
                {status === ActivitiesStatusEnum.EARRING
                  ? 'Pendiente'
                  : status === ActivitiesStatusEnum.COMPLETED
                    ? 'Completada'
                    : status === ActivitiesStatusEnum.CANCELADA
                      ? 'Cancelada'
                      : 'En Progreso'}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSaveStatus}
            className="bg-green-600 text-white px-4 py-2 rounded-lg mr-2"
          >
            Guardar
          </button>
          <button
            onClick={handleCloseModal}
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
