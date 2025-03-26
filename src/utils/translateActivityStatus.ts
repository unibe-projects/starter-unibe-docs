import { ActivitiesStatusEnum } from '../enums/activities/ActivitiesStatusEnum';

const activityStatusTranslations: Record<ActivitiesStatusEnum, string> = {
  [ActivitiesStatusEnum.EARRING]: 'Pendiente',
  [ActivitiesStatusEnum.COMPLETED]: 'Completada',
  [ActivitiesStatusEnum.CANCELADA]: 'Cancelada',
  [ActivitiesStatusEnum.IN_PROGRESS]: 'En Progreso',
};

export const translateActivityStatus = (status: ActivitiesStatusEnum): string => {
  return activityStatusTranslations[status] || status;
};
