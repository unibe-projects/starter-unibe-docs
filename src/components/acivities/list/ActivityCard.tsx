import React from 'react';
import { ActivitiesStatusEnum } from '../../../enums/activities/ActivitiesStatusEnum';
import LoadingButton from '../../../components/loadings/buttons/LoadingButton';
import { ListActivities } from '../../../interface/activities/activities.interface';
import { getStatusColor } from '../../../utils/getStatusColor';
import { translateActivityStatus } from '../../../utils/translateActivityStatus';

interface ActivityCardProps {
  activity: ListActivities
  generatePdfActivities: (id: string) => void;
  handleViewActivities: (id: string) => void;
  handleChangeStatus: (activity: ListActivities) => void;
  isLoadingReport: Record<string, boolean>;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  generatePdfActivities,
  handleViewActivities,
  handleChangeStatus,
  isLoadingReport,
}) => {
  const isLoading = isLoadingReport[activity.id] || false;
  return (
    
    <div
      key={activity.id}
      className="bg-light-base100 shadow-lg rounded-lg p-6 flex justify-between items-center"
    >
      <div>
        <h3 className="text-xl font-semibold">{activity.name}</h3>
        <p className="text-gray-600">{activity.project_manager}</p>
      </div>
      <div className="flex gap-4">
        <span
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition"
          style={{ backgroundColor: getStatusColor(activity.status) }}
        >
          {translateActivityStatus(activity.status)}
        </span>
        {activity.status !== ActivitiesStatusEnum.CANCELADA && (
          <button
            onClick={() => generatePdfActivities(activity.id)}
            className="bg-light-secondary text-white px-4 py-2 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
          >
            {isLoading ? <LoadingButton text="Cargando ...." /> : 'Descargar Reporte'}
          </button>
        )}
        <button
          onClick={() => handleViewActivities(activity.id)}
          className="bg-light-accentContent text-white px-4 py-2 rounded-lg text-lg font-semibold hover:bg-purple-400 transition"
        >
          Ver Detalles
        </button>
        <button
          onClick={() => handleChangeStatus(activity)}
          className="bg-light-neutral text-white px-4 py-2 rounded-lg text-lg font-semibold hover:bg-blue-5 00 transition"
        >
          Cambiar Estado
        </button>
      </div>
    </div>
  );
};

export default ActivityCard;
