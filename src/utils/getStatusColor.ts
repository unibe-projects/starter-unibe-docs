import { ActivitiesStatusEnum } from '../enums/activities/ActivitiesStatusEnum';

export const getStatusColor = (status: ActivitiesStatusEnum): string => {
  switch (status) {
  case ActivitiesStatusEnum.EARRING:
    return '#fbd7a7';
  case ActivitiesStatusEnum.COMPLETED:
    return '#5cb2af';
  case ActivitiesStatusEnum.CANCELADA:
    return '#f76e6e';
  case ActivitiesStatusEnum.IN_PROGRESS:
    return '#3b7e9b';
  default:
    return '#9E9E9E';
  }
};
