import { jsPDF } from 'jspdf';
import { ActivityReport } from '../../../interface/activities/reporter-semester.interfae';

const MARGIN_LEFT = 20;
const LABEL_FONT_SIZE = 8;
const HEADER_FONT_SIZE = 8;
const ROW_HEIGHT = 10;
const CELL_WIDTH = 40;
const TEXT_ALIGN = 'center';
const DEFAULT_TEXT = 'N/A';
const TWO = 2;
const THREE = 3;
const ZERO = 0;
const ONE = 1;
const TEN = 10;

export const TableActivity = (doc: jsPDF, actividades: ActivityReport[], startY: number) => {
  const headers = ['NOMBRE DE LA ACTIVIDAD', 'FECHA DE REALIZACIÓN', 'N.º DE PARTICIPANTES', 'PRESUPUESTO'];

  doc.setFontSize(HEADER_FONT_SIZE);
  doc.setFont('Helvetica', 'bold');

  // Draw table headers
  headers.forEach((header, index) => {
    const x = MARGIN_LEFT + (index * CELL_WIDTH); 
    doc.text(header, x + CELL_WIDTH / TWO, startY + ROW_HEIGHT / TWO, { align: TEXT_ALIGN });
    doc.rect(x, startY, CELL_WIDTH, ROW_HEIGHT);
  });

  startY += ROW_HEIGHT;

  // Draw table rows
  doc.setFontSize(LABEL_FONT_SIZE);
  doc.setFont('Helvetica', 'normal');
  actividades.forEach((actividad) => {
    const xOffsets = [
      MARGIN_LEFT, 
      MARGIN_LEFT + CELL_WIDTH, 
      MARGIN_LEFT + TWO * CELL_WIDTH, 
      MARGIN_LEFT + THREE * CELL_WIDTH
    ];

    // Draw each cell in the row
    doc.text(String(actividad.name || DEFAULT_TEXT), xOffsets[ZERO] + CELL_WIDTH / TWO, startY + ROW_HEIGHT / TWO, { align: TEXT_ALIGN });
    doc.text(String(actividad.createdAt || DEFAULT_TEXT), xOffsets[ONE] + CELL_WIDTH / TWO, startY + ROW_HEIGHT / TWO, { align: TEXT_ALIGN });
    doc.text(String(actividad.number_participants || DEFAULT_TEXT), xOffsets[TWO] + CELL_WIDTH / TWO, startY + ROW_HEIGHT / TWO, { align: TEXT_ALIGN });
    doc.text(String(actividad.budget_used || DEFAULT_TEXT), xOffsets[THREE] + CELL_WIDTH / TWO, startY + ROW_HEIGHT / TWO, { align: TEXT_ALIGN });

    // Draw cell borders
    xOffsets.forEach((x) => {
      doc.rect(x, startY, CELL_WIDTH, ROW_HEIGHT);
    });

    startY += ROW_HEIGHT;
  });

  startY += TEN;
  
  return startY;
};
