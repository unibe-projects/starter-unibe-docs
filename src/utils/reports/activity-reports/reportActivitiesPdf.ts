import { jsPDF } from 'jspdf';
import { headerSheet } from './headerSheet';
import { generalObjective } from './generalObjective';
import { ActivitiTask } from './activityTask';
import { additionalItems } from './additionalItems';
import { generalInformation } from './generalInformation';
import { documentsImage } from './documentsImage';
import {
  ActivityResponse,
  DocumentWrapper,
} from '../../../interface/activities/activities.interface';

const INITIAL_START_Y = 40;
const TITLE_MARGIN_Y = 10;
const SUBTITLE_MARGIN_Y = 15;
const SECTION_SPACING = 25;
const TEXT_CENTER_OFFSET = 2;
const FILE_NAME = 'informe_actividades.pdf';

export const reportActivitiesPdf = async (
  activity: ActivityResponse,
  nameProyect: string,
  period: string,
): Promise<void> => {
  try {
    const doc = new jsPDF();
    headerSheet(doc);

    let startY = INITIAL_START_Y;
    const documents: DocumentWrapper[] = activity.getActivity.Documents?.items ?? [];

    const pageWidth = doc.internal.pageSize.width;
    const activityName = activity.getActivity.name ?? '';
    const organizationName = 'BIENESTAR UNIVERSITARIO';

    const activityNameWidth = doc.getTextWidth(activityName);
    const organizationNameWidth = doc.getTextWidth(organizationName);

    doc.text(
      activityName,
      (pageWidth - activityNameWidth) / TEXT_CENTER_OFFSET,
      startY + TITLE_MARGIN_Y,
    );
    doc.text(
      organizationName,
      (pageWidth - organizationNameWidth) / TEXT_CENTER_OFFSET,
      startY + SUBTITLE_MARGIN_Y,
    );

    startY += SECTION_SPACING;

    startY = generalInformation(doc, activity, period, startY, nameProyect);
    startY = generalObjective(doc, activity, startY);
    startY = ActivitiTask(doc, activity, startY);
    startY = additionalItems(doc, activity, startY);
    startY = await documentsImage(doc, documents, startY);

    doc.save(FILE_NAME);
  } catch (error) {
    console.error('❌ Error al generar el PDF:', error);
  }
};
