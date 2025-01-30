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
  activityProyectId: string;
  activityPeriodId: string;
  periodYear: string;
  periodSemester: string;
  nameProyect: string;
}
