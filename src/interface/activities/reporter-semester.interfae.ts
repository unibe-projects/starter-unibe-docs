export interface DocumentInterface {
    path: string;
    type: string;
  }
  
  export interface ActivityDocuments {
    items: DocumentInterface[]; // Aquí tienes el array de documentos
  }
  
  export interface ActivityReport {
    name: string;
    createdAt: string;
    number_participants: number;
    budget_used: string;
    Documents?: ActivityDocuments[]; // Cambié esto para indicar que Documents es un array de ActivityDocuments
  }
  
  export interface FormData {
    executing_institution: string;
    project_manager: string;
    charge: string;
    unit: string;
    general_objective: string;
    project_scope: string;
    project_proposal: string;
    states_advances: string;
    problems_risks: string;
    upcoming_tasks: string;
  }
  
  export interface CompletedActivities {
    items: ActivityReport[];
  }
  
  export interface ActivityData {
    listActivities: CompletedActivities;
  }
  
  export interface ReportData {
    executing_institution: string;
    project_manager: string;
    charge: string;
    unit: string;
    general_objective: string;
    project_scope: string;
    project_proposal: string;
    states_advances: string;
    problems_risks: string;
    upcoming_tasks: string;
    completedActivities: ActivityReport[];
    periodYear: string;
    periodSemester: string;
    nameProyect: string;
    signature: File | null;
  }
  