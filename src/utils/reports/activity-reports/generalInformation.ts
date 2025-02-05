import { jsPDF } from 'jspdf';
import { ActivityResponse } from './reportActivitiesPdf';


const MARGIN_LEFT = 20;
const TABLE_WIDTH = 170;
const LABEL_WIDTH = 85;
const ROW_HEIGHT = 8;
const TITLE_SPACING = 5;
const LABEL_FONT_SIZE = 10;

export const generalInformation = (doc: jsPDF, activity: ActivityResponse, period: string, startY: number, nameProyect: string) => {
  doc.setFontSize(LABEL_FONT_SIZE);
  doc.setFont('Helvetica', 'bold');
  doc.text('1. Datos Generales', MARGIN_LEFT, startY);
  startY += TITLE_SPACING;

  const fields = [
    { label: 'Nombre del Proyecto', value: nameProyect || 'N/A' },
    { label: 'Institución Ejecutora', value: activity.getActivity.executing_institution || 'N/A' },
    { label: 'Responsable del Proyecto', value: activity.getActivity.project_manager || 'N/A' },
    { label: 'Cargo', value: activity.getActivity.charge || 'N/A' },
    { label: 'Unidad', value: activity.getActivity.unit || 'N/A' },
    { label: 'Periodo del informe', value: period || 'N/A' },
  ];
  doc.rect(MARGIN_LEFT, startY, TABLE_WIDTH, 47);
  fields.forEach((field, index) => {
    const yPosition = startY + index * ROW_HEIGHT;
    doc.setFont('Helvetica', 'bold');
    doc.text(field.label, MARGIN_LEFT + 5, yPosition + 5);
    doc.setFont('Helvetica', 'normal');
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
