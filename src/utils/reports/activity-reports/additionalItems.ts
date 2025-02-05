import { jsPDF } from 'jspdf';
import { ActivityResponse } from '../../../interface/activities/activities.interface';

const MARGIN_LEFT = 20;
const LABEL_FONT_SIZE = 10;
const CONTENT_FONT_SIZE = 10;
const TITLE_SPACING = 5;
const SECTION_SPACING = 10;

export const additionalItems = (doc: jsPDF, activity: ActivityResponse, startY: number) => {
   // participantes

   doc.setFontSize(LABEL_FONT_SIZE);
   doc.setFont('Helvetica', 'bold');
   doc.text('4. Participantes', MARGIN_LEFT, startY);
   startY += TITLE_SPACING;
 
   const participants = activity.getActivity.number_participants || 'N/A';
   doc.setFontSize(CONTENT_FONT_SIZE);
   doc.setFont('Helvetica', 'normal');
   doc.text(`Número de Participantes: ${participants}`, MARGIN_LEFT, startY);
   startY += SECTION_SPACING;

   // presupuesto utilizado
   doc.setFontSize(LABEL_FONT_SIZE);
   doc.setFont('Helvetica', 'bold');
   doc.text('5. Presupuesto Utilizado', MARGIN_LEFT, startY);
   startY += TITLE_SPACING;
 
   const budgetUsed = activity.getActivity.budget_used || 'N/A';
   doc.setFontSize(CONTENT_FONT_SIZE);
   doc.setFont('Helvetica', 'normal');
   doc.text(`Presupuesto Utilizado: ${budgetUsed}`, MARGIN_LEFT, startY);
   return startY + 15;
};
