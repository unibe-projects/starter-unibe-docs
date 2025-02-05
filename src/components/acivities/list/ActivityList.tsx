import React from 'react';
import ActivityCard from './ActivityCard';
import { ListActivities } from '../../../interface/activities/activities.interface';
import NoDataMessage from '../../common/NoContent/NoDataMessage';

interface ActivityListProps {
  activities: ListActivities[];
  generatePdfActivities: (id: string) => void;
  handleViewActivities: (id: string) => void;
  handleChangeStatus: (activity: ListActivities) => void;
  isLoadingReport: Record<string, boolean>;
}

const ActivityList: React.FC<ActivityListProps> = ({
  activities,
  generatePdfActivities,
  handleViewActivities,
  handleChangeStatus,
  isLoadingReport,
}) => {
  if (activities.length === 0) {
    return (
      <NoDataMessage/>
    );
  }

  return (
    <div className="space-y-6">
      {activities.map((activity) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          generatePdfActivities={generatePdfActivities}
          handleViewActivities={handleViewActivities}
          handleChangeStatus={handleChangeStatus}
          isLoadingReport={isLoadingReport}
        />
      ))}
    </div>
  );
};

export default ActivityList;
