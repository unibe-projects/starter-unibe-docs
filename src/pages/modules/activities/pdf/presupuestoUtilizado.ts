// presupuestoUtilizado.ts
import { jsPDF } from 'jspdf';

const MARGIN_LEFT = 20;
const LABEL_FONT_SIZE = 10;
const CONTENT_FONT_SIZE = 10;
const TITLE_SPACING = 5;

export const dibujarPresupuestoUtilizado = (doc: jsPDF, activity: any, startY: number) => {
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
