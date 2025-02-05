import { ActivitiesStatusEnum } from "../enums/activities/ActivitiesStatusEnum";

  export const getStatusColor = (status: ActivitiesStatusEnum): string => {
    switch (status) {
      case ActivitiesStatusEnum.EARRING:
        return '#FFA500';
      case ActivitiesStatusEnum.COMPLETED:
        return '#4CAF50';
      case ActivitiesStatusEnum.CANCELADA:
        return '#F44336';
      case ActivitiesStatusEnum.IN_PROGRESS:
        return '#2196F3';
      default:
        return '#9E9E9E';
    }
  };