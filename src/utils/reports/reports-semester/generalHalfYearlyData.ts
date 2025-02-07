import { jsPDF } from 'jspdf';
import { ReportData } from '../../../interface/activities/reporter-semester.interfae';

const MARGIN_LEFT = 20;
const TABLE_WIDTH = 170;
const LABEL_WIDTH = 85;
const ROW_HEIGHT = 8;
const TITLE_SPACING = 5;
const LABEL_FONT_SIZE = 10;
const TABLE_HEIGHT = 47;
const CELL_PADDING = 5;
const LINE_OFFSET = 0.2;
const LAST_LINE_OFFSET = 1.1;
const TABLE_MARGIN_BOTTOM = 12;
const ZERO = 0;
const ONE = 0;

export const generalHalfYearlyData = (
  doc: jsPDF,
  activity: ReportData,
  period: string,
  startY: number,
  nameProyect: string
) => {
  doc.setFontSize(LABEL_FONT_SIZE);
  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(ZERO, ZERO, ZERO);
  doc.text('1. Datos Generales', MARGIN_LEFT, startY);
  startY += TITLE_SPACING;

  const fields = [
    { label: 'Nombre del Proyecto', value: nameProyect || 'N/A' },
    { label: 'Institución Ejecutora', value: activity.executing_institution || 'N/A' },
    { label: 'Responsable del Proyecto', value: activity.project_manager || 'N/A' },
    { label: 'Cargo', value: activity.charge || 'N/A' },
    { label: 'Unidad', value: activity.unit || 'N/A' },
    { label: 'Periodo del informe', value: period || 'N/A' },
  ];

  doc.rect(MARGIN_LEFT, startY, TABLE_WIDTH, TABLE_HEIGHT);

  fields.forEach((field, index) => {
    const yPosition = startY + index * ROW_HEIGHT;
    
    // Etiqueta
    doc.setFont('Helvetica', 'bold');
    doc.text(field.label, MARGIN_LEFT + CELL_PADDING, yPosition + CELL_PADDING);

    // Valor
    doc.setFont('Helvetica', 'normal');
    doc.text(field.value, MARGIN_LEFT + CELL_PADDING + LABEL_WIDTH, yPosition + CELL_PADDING);

    // Línea divisoria entre etiquetas y valores
    doc.line(MARGIN_LEFT + LABEL_WIDTH, yPosition - LINE_OFFSET, MARGIN_LEFT + LABEL_WIDTH, yPosition + ROW_HEIGHT - LAST_LINE_OFFSET);

    // Línea horizontal inferior
    doc.line(MARGIN_LEFT, yPosition + ROW_HEIGHT - ONE, MARGIN_LEFT + TABLE_WIDTH, yPosition + ROW_HEIGHT - ONE);
  });

  return startY + fields.length * ROW_HEIGHT + TABLE_MARGIN_BOTTOM;
};
