import { jsPDF } from 'jspdf';
import { ActivityResponse } from '../../../interface/activities/activities.interface';

const MARGIN_LEFT = 20;
const TABLE_WIDTH = 170;
const LABEL_WIDTH = 85;
const ROW_HEIGHT = 8;
const TITLE_SPACING = 5;
const LABEL_FONT_SIZE = 10;
const TABLE_HEIGHT = 47;
const TEXT_PADDING = 5;
const LINE_OFFSET = 0.2;
const ROW_LINE_OFFSET = 7;
const RECT_PADDING = 12;
const UNO_PUNTO_UNO = 1.1;

export const generalInformation = (
  doc: jsPDF,
  activity: ActivityResponse,
  period: string,
  startY: number,
  nameProyect: string,
) => {
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

  doc.rect(MARGIN_LEFT, startY, TABLE_WIDTH, TABLE_HEIGHT);

  fields.forEach((field, index) => {
    const yPosition = startY + index * ROW_HEIGHT;

    doc.setFont('Helvetica', 'bold');
    doc.text(field.label, MARGIN_LEFT + TEXT_PADDING, yPosition + TEXT_PADDING);

    doc.setFont('Helvetica', 'normal');
    doc.text(field.value, MARGIN_LEFT + TEXT_PADDING + LABEL_WIDTH, yPosition + TEXT_PADDING);

    doc.line(
      MARGIN_LEFT + LABEL_WIDTH,
      yPosition - LINE_OFFSET,
      MARGIN_LEFT + LABEL_WIDTH,
      yPosition + ROW_HEIGHT - UNO_PUNTO_UNO,
    );

    doc.line(
      MARGIN_LEFT,
      yPosition + ROW_LINE_OFFSET,
      MARGIN_LEFT + TABLE_WIDTH,
      yPosition + ROW_LINE_OFFSET,
    );
  });

  return startY + fields.length * ROW_HEIGHT + RECT_PADDING;
};
