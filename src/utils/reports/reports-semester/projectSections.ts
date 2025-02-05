import { jsPDF } from 'jspdf';
import { ReportData } from '../../../interface/activities/reporter-semester.interfae';

const MARGIN_LEFT = 20;
const TITLE_SPACING = 5;
const LABEL_FONT_SIZE = 10;

export const projectSections = (doc: jsPDF, activity: ReportData, startY: number) => {
  doc.setFontSize(LABEL_FONT_SIZE);
  doc.setFont('Helvetica', 'bold');
  doc.text('2. Objetivo General', MARGIN_LEFT, startY);
  startY += TITLE_SPACING;
  doc.setFont('Helvetica', 'normal');
  doc.text(activity.general_objective || 'N/A', MARGIN_LEFT + 5, startY);

  startY += 15;
  doc.setFontSize(LABEL_FONT_SIZE);
  doc.setFont('Helvetica', 'bold');
  doc.text('3. Ámbito del Proyecto', MARGIN_LEFT, startY);
  startY += TITLE_SPACING;
  doc.setFont('Helvetica', 'normal');
  doc.text(activity.project_scope || 'N/A', MARGIN_LEFT + 5, startY);

  startY += 15;
  doc.setFontSize(LABEL_FONT_SIZE);
  doc.setFont('Helvetica', 'bold');
  doc.text('4. Propuesta del Proyecto', MARGIN_LEFT, startY);
  startY += TITLE_SPACING;
  doc.setFont('Helvetica', 'normal');
  doc.text(activity.project_proposal || 'N/A', MARGIN_LEFT + 5, startY);

  startY += 15;
  
  doc.setFontSize(LABEL_FONT_SIZE);
  doc.setFont('Helvetica', 'bold');
  doc.text('5. Actividades Realizadas', MARGIN_LEFT, startY);
  startY += TITLE_SPACING;
  doc.setFont('Helvetica', 'normal');

  return startY;
};
