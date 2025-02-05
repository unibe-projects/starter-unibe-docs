import { jsPDF } from 'jspdf';
import { ReportData } from '../../../interface/activities/reporter-semester.interfae';

const MARGIN_LEFT = 20;
const TITLE_SPACING = 5;
const LABEL_FONT_SIZE = 10;

export const finalSections = (doc: jsPDF, activity: ReportData, startY: number) => {
  doc.setFontSize(LABEL_FONT_SIZE);
  doc.setFont('Helvetica', 'bold');
  doc.text('6. ESTADOS Y AVANCES: LO POSITIVO ', MARGIN_LEFT, startY);
  startY += TITLE_SPACING;
  doc.setFont('Helvetica', 'normal');
  doc.text(activity.states_advances  || 'N/A', MARGIN_LEFT + 5, startY);

  startY += 15;

  doc.setFontSize(LABEL_FONT_SIZE);
  doc.setFont('Helvetica', 'bold');
  doc.text('7. PROBLEMAS Y RIESGOS: LO NEGATIVO', MARGIN_LEFT, startY);
  startY += TITLE_SPACING;
  doc.setFont('Helvetica', 'normal');
  doc.text(activity.problems_risks  || 'N/A', MARGIN_LEFT + 5, startY);

  startY += 15;

  doc.setFontSize(LABEL_FONT_SIZE);
  doc.setFont('Helvetica', 'bold');
  doc.text('8. PRÓXIMAS TAREAS O ACTIVIDADES ', MARGIN_LEFT, startY);
  startY += TITLE_SPACING;
  doc.setFont('Helvetica', 'normal');
  doc.text(activity.upcoming_tasks || 'N/A', MARGIN_LEFT + 5, startY);

  startY += 15;


  return startY;
};
