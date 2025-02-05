import { jsPDF } from 'jspdf';
import { headerSheet } from './headerSheet';
import { generalObjective } from './generalObjective';
import { ActivitiTask } from './activityTask';
import { additionalItems } from './additionalItems';
import { generalInformation } from './generalInformation';
import { documentsImage } from './documentsImage';
import { ActivityResponse, DocumentWrapper } from '../../../interface/activities/activities.interface';

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
