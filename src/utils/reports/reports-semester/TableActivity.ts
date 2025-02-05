import { jsPDF } from 'jspdf';
import { ActivityReport } from '../../../interface/activities/reporter-semester.interfae';

const MARGIN_LEFT = 20;
const LABEL_FONT_SIZE = 8;
const HEADER_FONT_SIZE = 8;
const ROW_HEIGHT = 10;
const CELL_WIDTH = 40;

export const TableActivity = (doc: jsPDF, actividades: ActivityReport[], startY: number) => {
    const headers = ['NOMBRE DE LA ACTIVIDAD', 'FECHA DE REALIZACIÓN', 'N.º DE PARTICIPANTES', 'PRESUPUESTO'];
    doc.setFontSize(HEADER_FONT_SIZE);
    doc.setFont('Helvetica', 'bold');
    headers.forEach((header, index) => {
      const x = MARGIN_LEFT + (index * CELL_WIDTH); 
      doc.text(header, x + CELL_WIDTH / 2, startY + ROW_HEIGHT / 2, { align: 'center' });
      doc.rect(x, startY, CELL_WIDTH, ROW_HEIGHT);
    });
  
    startY += ROW_HEIGHT;
    doc.setFontSize(LABEL_FONT_SIZE);
    doc.setFont('Helvetica', 'normal');
    actividades.forEach((actividad, index) => {
      const xOffsets = [MARGIN_LEFT, MARGIN_LEFT + CELL_WIDTH, MARGIN_LEFT + 2 * CELL_WIDTH, MARGIN_LEFT + 3 * CELL_WIDTH];
      doc.text(String(actividad.name || 'N/A'), xOffsets[0] + CELL_WIDTH / 2, startY + ROW_HEIGHT / 2, { align: 'center' });
      doc.text(String(actividad.createdAt || 'N/A'), xOffsets[1] + CELL_WIDTH / 2, startY + ROW_HEIGHT / 2, { align: 'center' });
      doc.text(String(actividad.number_participants) || 'N/A', xOffsets[2] + CELL_WIDTH / 2, startY + ROW_HEIGHT / 2, { align: 'center' });
      doc.text(String(actividad.budget_used) || 'N/A', xOffsets[3] + CELL_WIDTH / 2, startY + ROW_HEIGHT / 2, { align: 'center' });
      xOffsets.forEach((x, idx) => {
        doc.rect(x, startY, CELL_WIDTH, ROW_HEIGHT);
      });
  
      startY += ROW_HEIGHT;
    });
    startY += 10;
  
    return startY;
  };
  