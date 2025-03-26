import { jsPDF } from 'jspdf';
import { ReportData } from '../../../interface/activities/reporter-semester.interfae';

const MARGIN_LEFT = 20;
const CELL_WIDTH = 60;
const ROW_HEIGHT = 10;
const SIGNATURE_MAX_WIDTH = 60;
const SIGNATURE_MAX_HEIGHT = 30;
const SIGNATURE_MARGIN = 10;
const TEXT_FONT_SIZE = 10;
const FONT_STYLE_BOLD = 'bold';
const FONT_STYLE_NORMAL = 'normal';
const ZERO = 0;
const FIVE = 5;
const TWO = 2;
const TWO_HUNDRED_AND_FIFTY_FIVE = 255;
const THREE = 3;
const ONE = 1;
const TWO_POINT_FIVE = 2.5;

export const subscribedBy = (
  doc: jsPDF,
  startY: number,
  signatureImage: string,
  value: ReportData,
) => {
  doc.setFont('Helvetica', FONT_STYLE_BOLD);
  doc.text('SUSCRITO POR', MARGIN_LEFT + CELL_WIDTH, startY);
  startY += ROW_HEIGHT;

  const splitTextIntoLines = (text: string, maxWidth: number) => {
    return doc.splitTextToSize(text, maxWidth);
  };

  const formattedText = splitTextIntoLines(
    `Elaboración ${value.charge} UNIB.E.`,
    CELL_WIDTH - SIGNATURE_MARGIN,
  );
  const textHeight = formattedText.length * FIVE;

  const signatureHeight = signatureImage ? SIGNATURE_MAX_HEIGHT : ROW_HEIGHT;

  const table = {
    headers: ['Nombre', 'Datos', 'Firma'],
    rows: [[value.project_manager, formattedText, signatureImage ? '[Firma]' : '']],
    startX: MARGIN_LEFT,
    startY: startY,
    cellWidth: CELL_WIDTH,
    rowHeight: Math.max(ROW_HEIGHT, textHeight, signatureHeight),
  };

  const drawCell = (
    x: number,
    y: number,
    width: number,
    height: number,
    text: string | string[],
    style: any = {},
  ) => {
    doc.rect(x, y, width, height);
    doc.setFont('Helvetica', style.fontStyle || FONT_STYLE_NORMAL);
    doc.setFontSize(style.fontSize || TEXT_FONT_SIZE);
    doc.setTextColor(style.textColor || ZERO);

    if (style.fill) {
      doc.setFillColor(ZERO, ZERO, ZERO);
      doc.rect(x, y, width, height, 'F');
      doc.setTextColor(TWO_HUNDRED_AND_FIFTY_FIVE);
    }

    let textX = x + width / TWO;
    const textY = y + height / TWO;

    if (style.align === 'left') {
      textX = x + SIGNATURE_MARGIN;
    }

    if (Array.isArray(text)) {
      text.forEach((line, i) => {
        doc.text(line, textX, textY - text.length * TWO_POINT_FIVE + i * FIVE, {
          align: style.align || 'center',
          baseline: 'middle',
        });
      });
    } else {
      doc.text(text, textX, textY + THREE, { align: style.align || 'center', baseline: 'middle' });
    }
  };

  // Dibujar encabezados
  table.headers.forEach((header, index) => {
    drawCell(
      table.startX + index * table.cellWidth,
      table.startY,
      table.cellWidth,
      ROW_HEIGHT,
      header,
      { align: 'center', fontStyle: FONT_STYLE_BOLD, fill: true },
    );
  });

  table.startY += ROW_HEIGHT;
  table.rows.forEach((row, rowIndex) => {
    row.forEach((cell, index) => {
      const style =
        index === ONE
          ? { align: 'left', fontStyle: rowIndex === TWO ? FONT_STYLE_BOLD : FONT_STYLE_NORMAL }
          : {};
      drawCell(
        table.startX + index * table.cellWidth,
        table.startY,
        table.cellWidth,
        table.rowHeight,
        cell,
        style,
      );
    });
  });

  const signatureX = table.startX + TWO * table.cellWidth;
  const signatureY = table.startY;

  const availableWidth = CELL_WIDTH - SIGNATURE_MARGIN;
  const availableHeight = table.rowHeight - SIGNATURE_MARGIN;

  const finalSignatureWidth = Math.min(SIGNATURE_MAX_WIDTH, availableWidth);
  const finalSignatureHeight = Math.min(SIGNATURE_MAX_HEIGHT, availableHeight);

  const centeredSignatureX = signatureX + (CELL_WIDTH - finalSignatureWidth) / TWO;
  const centeredSignatureY = signatureY + (table.rowHeight - finalSignatureHeight) / TWO;

  if (signatureImage) {
    doc.addImage(
      signatureImage,
      'PNG',
      centeredSignatureX,
      centeredSignatureY,
      finalSignatureWidth,
      finalSignatureHeight,
    );
  }

  return table.startY + table.rowHeight;
};
