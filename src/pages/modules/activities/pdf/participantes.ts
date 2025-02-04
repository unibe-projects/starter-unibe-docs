// participantes.ts
import { jsPDF } from 'jspdf';

const MARGIN_LEFT = 20;
const LABEL_FONT_SIZE = 10;
const CONTENT_FONT_SIZE = 10;
const TITLE_SPACING = 5;

export const dibujarParticipantes = (doc: jsPDF, activity: any, startY: number) => {
  doc.setFontSize(LABEL_FONT_SIZE);
  doc.setFont('Helvetica', 'bold');
  doc.text('4. Participantes', MARGIN_LEFT, startY);
  startY += TITLE_SPACING;

  const participants = activity.getActivity.number_participants || 'N/A';
  doc.setFontSize(CONTENT_FONT_SIZE);
  doc.setFont('Helvetica', 'normal');
  doc.text(`Número de Participantes: ${participants}`, MARGIN_LEFT, startY);
  return startY + 15;
};
