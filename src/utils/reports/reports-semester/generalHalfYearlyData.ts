import { jsPDF } from 'jspdf';
import { ReportData } from '../../../interface/activities/reporter-semester.interfae';

const MARGIN_LEFT = 20;
const TABLE_WIDTH = 170;
const LABEL_WIDTH = 85;
const ROW_HEIGHT = 8;
const TITLE_SPACING = 5;
const LABEL_FONT_SIZE = 10;

export const generalHalfYearlyData = (doc: jsPDF, activity: ReportData, period: string, startY: number, nameProyect: string) => {
  doc.setFontSize(LABEL_FONT_SIZE);
  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
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

  doc.rect(MARGIN_LEFT, startY, TABLE_WIDTH, 47);

  fields.forEach((field, index) => {
    const yPosition = startY + index * ROW_HEIGHT;
    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(field.label, MARGIN_LEFT + 5, yPosition + 5);
    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text(field.value, MARGIN_LEFT + 5 + LABEL_WIDTH, yPosition + 5);
    doc.line(
      MARGIN_LEFT + LABEL_WIDTH,
      yPosition - 0.2,
      MARGIN_LEFT + LABEL_WIDTH,
      yPosition + ROW_HEIGHT - 1.1
    );
    doc.line(MARGIN_LEFT, yPosition + 7, MARGIN_LEFT + TABLE_WIDTH, yPosition + 7);
  });

  return startY + fields.length * ROW_HEIGHT + 12;
};
