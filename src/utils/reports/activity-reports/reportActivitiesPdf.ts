import { jsPDF } from 'jspdf';
import { headerSheet } from './headerSheet';
import { generalObjective } from './generalObjective';
import { ActivitiTask } from './activityTask';
import { additionalItems } from './additionalItems';
import { generalInformation } from './generalInformation';
import { documentsImage } from './documentsImage';

interface ActivityTask {
  name: string;
  description: string;
  __typename: string;
}

export interface ActivityTaskWrapper {
  activityTasks: ActivityTask;
  __typename: string;
}

interface ActivityTasksConnection {
  items: ActivityTaskWrapper[];
  __typename: string;
}

interface Document {
  name: string;
  path: string;
  type: string;
  __typename: string;
}

export interface DocumentWrapper {
  documents: Document;
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

export const reportActivitiesPdf = async (
  activity: ActivityResponse,
  nameProyect: string,
  period: string
): Promise<void> => {
  try {
    const doc = new jsPDF();
    headerSheet(doc);
    let startY = 40;
    const documents: DocumentWrapper[] = activity.getActivity.Documents?.items ?? [];

    const pageWidth = doc.internal.pageSize.width;
    const text1 = activity.getActivity.name ?? '';
    const text2 = 'BIENESTAR UNIVERSITARIO';

    const text1Width = doc.getTextWidth(text1);
    const text2Width = doc.getTextWidth(text2);

    doc.text(text1, (pageWidth - text1Width) / 2, startY + 10);
    doc.text(text2, (pageWidth - text2Width) / 2, startY + 15);
    startY += 25;

    startY = generalInformation(doc, activity, period, startY, nameProyect);
    startY = generalObjective(doc, activity, startY);
    startY = ActivitiTask(doc, activity, startY);
    startY = additionalItems(doc, activity, startY);
    startY = await documentsImage(doc, documents, startY);

    doc.save('informe_actividades.pdf');
  } catch (error) {
    console.error('❌ Error al generar el PDF:', error);
  }
};
