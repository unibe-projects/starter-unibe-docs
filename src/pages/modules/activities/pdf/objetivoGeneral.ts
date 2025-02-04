// objetivoGeneral.ts
import { jsPDF } from 'jspdf';

const MARGIN_LEFT = 20;
const TITLE_SPACING = 5;
const LABEL_FONT_SIZE = 10;
const CONTENT_FONT_SIZE = 10;

export const dibujarObjetivoGeneral = (doc: jsPDF, activity: any, startY: number) => {
  doc.setFontSize(LABEL_FONT_SIZE);
  doc.setFont('Helvetica', 'bold');
  doc.text('2. Objetivo General', MARGIN_LEFT, startY);
  startY += TITLE_SPACING;

  const generalObjective = activity.getActivity.general_objective || 'N/A';
  doc.setFontSize(CONTENT_FONT_SIZE);
  doc.setFont('Helvetica', 'normal');
  doc.text(generalObjective, MARGIN_LEFT, startY);
  return startY + 15; // Ajusta la posición para el siguiente bloque
};
