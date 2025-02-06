import { jsPDF } from 'jspdf';
import { ReportData } from '../../../interface/activities/reporter-semester.interfae';

export const subscribedBy = (doc: jsPDF, startY: number, signatureImage: string, value: ReportData) => {
  const MARGIN_LEFT = 20;
  const CELL_WIDTH = 60;
  const ROW_HEIGHT = 10;
  const SIGNATURE_MAX_WIDTH = 60;
  const SIGNATURE_MAX_HEIGHT = 30;

  doc.setFont('Helvetica', 'bold');
  doc.text('SUSCRITO POR', MARGIN_LEFT + CELL_WIDTH, startY);
  startY += ROW_HEIGHT;

  const splitTextIntoLines = (text: string, maxWidth: number) => {
    return doc.splitTextToSize(text, maxWidth);
  };

  const formattedText = splitTextIntoLines(`Elaboración ${value.charge} UNIB.E.`, CELL_WIDTH - 5);
  const textHeight = formattedText.length * 5;
  
  const signatureHeight = signatureImage ? SIGNATURE_MAX_HEIGHT : 10;

  const table = {
    headers: ['Nombre', 'Datos', 'Firma'],
    rows: [
      [value.project_manager, formattedText, signatureImage ? '[Firma]' : '']
    ],
    startX: MARGIN_LEFT,
    startY: startY,
    cellWidth: CELL_WIDTH,
    rowHeight: Math.max(ROW_HEIGHT, textHeight, signatureHeight)
  };

  const drawCell = (x: number, y: number, width: number, height: number, text: string | string[], style: any = {}) => {
    doc.rect(x, y, width, height);
    doc.setFont('Helvetica', style.fontStyle || 'normal');
    doc.setFontSize(style.fontSize || 10);
    doc.setTextColor(style.textColor || 0);
    
    if (style.fill) {
      doc.setFillColor(0, 0, 0);
      doc.rect(x, y, width, height, 'F');
      doc.setTextColor(255);
    }

    let textX = x + width / 2;
    let textY = y + height / 2;

    if (style.align === 'left') {
      textX = x + 5;
    }

    if (Array.isArray(text)) {
      text.forEach((line, i) => {
        doc.text(line, textX, textY - (text.length * 2.5) + i * 5, { align: style.align || 'center', baseline: 'middle' });
      });
    } else {
      doc.text(text, textX, textY + 3, { align: style.align || 'center', baseline: 'middle' });
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
      { align: 'center', fontStyle: 'bold', fill: true }
    );
  });

  table.startY += ROW_HEIGHT;
  table.rows.forEach((row, rowIndex) => {
    row.forEach((cell, index) => {
      const style = index === 1
        ? { align: 'left', fontStyle: rowIndex === 0 ? 'bold' : 'normal' }
        : {};
      drawCell(
        table.startX + index * table.cellWidth,
        table.startY,
        table.cellWidth,
        table.rowHeight,
        cell,
        style
      );
    });
  });

  const signatureX = table.startX + 2 * table.cellWidth;
  const signatureY = table.startY;

  const availableWidth = CELL_WIDTH - 10;
  const availableHeight = table.rowHeight - 5;

  const finalSignatureWidth = Math.min(SIGNATURE_MAX_WIDTH, availableWidth);
  const finalSignatureHeight = Math.min(SIGNATURE_MAX_HEIGHT, availableHeight);

  const centeredSignatureX = signatureX + (CELL_WIDTH - finalSignatureWidth) / 2;
  const centeredSignatureY = signatureY + (table.rowHeight - finalSignatureHeight) / 2;

  if (signatureImage) {
    doc.addImage(signatureImage, 'PNG', centeredSignatureX, centeredSignatureY, finalSignatureWidth, finalSignatureHeight);
  }

  return table.startY + table.rowHeight;
};
