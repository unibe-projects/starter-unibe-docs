import { ActivitiesStatusEnum } from '../../enums/activities/ActivitiesStatusEnum';

export interface Task {
  name: string;
  description: string;
}

export interface Documents {
  name:
    | 'Presupuesto'
    | 'Lista de participantes'
    | 'Fotos'
    | 'Memorando de gestión'
    | 'Artes gráficos de difusión';
  description: string;
  tags: string;
  path?: string;
  type?: string;
  createdAt?: string;
  updatedAt?: string;
  file: File;
}

export interface Activities {
  activityProyectId: string;
  activityPeriodId: string;
  name: string;
  activity_date: string;
  start_time: string;
  hora_fin: string;
  executing_institution: string;
  project_manager: string;
  charge: string;
  unit: string;
  general_objective: string;
  number_participants: string;
  budget_used: string;
  project_name: string;
  report_period: string;
  tasks: Task[];
  documents: Documents[];
}

export interface FormValues {
  activity_date: string;
  start_time: string;
  hora_fin: string;
  executing_institution: string;
  project_manager: string;
  charge: string;
  unit: string;
  general_objective: string;
  number_participants: string;
  budget_used: string;
}

export interface LocationState {
  periodProyectId: string;
  periodId: string;
  periodYear: string;
  periodSemester: string;
  nameProyect: string;
}

export interface Period {
  year: string;
  semester: string;
}

export interface Proyect {
  name: string;
}

export interface ListActivities {
  id: string;
  project_manager: string;
  name: string;
  status: ActivitiesStatusEnum;
}

export interface ActivityTaskWrapper {
  activityTasks: Task;
  __typename: string;
}

interface ActivityTasksConnection {
  items: ActivityTaskWrapper[];
  __typename: string;
}

interface DocumentItem {
  name: string;
  path: string;
  type: string;
  __typename: string;
}

export interface DocumentWrapper {
  documents: DocumentItem;
  __typename: string;
}

interface DocumentsConnection {
  items: DocumentWrapper[];
  __typename: string;
}

export interface Activity {
  id: string;
  name: string;
  activity_date: string;
  general_objective: string;
  executing_institution: string;
  project_manager: string;
  unit: string;
  charge: string;
  start_time: string;
  hora_fin: string;
  number_participants: number;
  budget_used: string;
  status: string;
  createdAt: string;
  ActivityTasks: ActivityTasksConnection;
  Documents: DocumentsConnection;
  __typename: string;
}

export interface ActivityResponse {
  getActivity: Activity;
}
