import React, { useState } from 'react';
import ActivityCard from './ActivityCard';
import { ListActivities } from '../../../interface/activities/activities.interface';
import NoDataMessage from '../../common/NoContent/NoDataMessage';
import ModalStatus from '../ModalStatus';

interface ActivityListProps {
  activities: ListActivities[];
  generatePdfActivities: (id: string) => void;
  handleViewActivities: (id: string) => void;
  isLoadingReport: Record<string, boolean>;
}

const ActivityList: React.FC<ActivityListProps> = ({
  activities,
  generatePdfActivities,
  handleViewActivities,
  isLoadingReport,
}) => {
  const [selectedActivity, setSelectedActivity] = useState<ListActivities | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectActivity = (activity: ListActivities) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (activities.length === 0) {
    return <NoDataMessage mesagge='No hay actividades disponibles en este período.'/>;
  }

  return (
    <div className="space-y-6">
      {activities.map((activity) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          generatePdfActivities={generatePdfActivities}
          handleViewActivities={handleViewActivities}
          handleChangeStatus={() => handleSelectActivity(activity)}
          isLoadingReport={isLoadingReport}
        />
      ))}

      {isModalOpen && selectedActivity && (
        <ModalStatus
          key={selectedActivity.id}
          currentStatus={selectedActivity.status}
          handleCloseModal={handleCloseModal}
          currentId={selectedActivity.id}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default ActivityList;
