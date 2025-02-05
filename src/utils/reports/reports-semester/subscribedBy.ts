import { jsPDF } from 'jspdf';

export const subscribedBy = (doc: jsPDF, startY: number) => {
  const MARGIN_LEFT = 20;
  const CELL_WIDTH = 60;
  const ROW_HEIGHT = 10;

  doc.setFont('Helvetica', 'bold');
  doc.text('SUSCRITO POR', MARGIN_LEFT + CELL_WIDTH, startY);
  startY += ROW_HEIGHT;

  const table = {
    headers: ['Nombre', 'Datos', 'Firma'],
    rows: [
      ['', 'Elaboración', ''],
      ['CARGO', 'UNIB.E.', ''],
    ],
    startX: MARGIN_LEFT,
    startY: startY,
    cellWidth: CELL_WIDTH,
    rowHeight: ROW_HEIGHT
  };

  const drawCell = (x: number, y: number, width: number, height: number, text: string, style: any = {}) => {
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
    if (style.align === 'left') {
      textX = x + 5;
    }

    doc.text(text, textX, y + height / 2 + 3, { align: style.align || 'center', baseline: 'middle' });
  };
  table.headers.forEach((header, index) => {
    drawCell(
      table.startX + index * table.cellWidth,
      table.startY,
      table.cellWidth,
      table.rowHeight,
      header,
      { align: 'center', fontStyle: 'bold', fill: true }
    );
  });

  table.startY += table.rowHeight;
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
    table.startY += table.rowHeight;
  });

  return table.startY;
};
