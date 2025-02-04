// cabecera.js
import { jsPDF } from 'jspdf';
import logoUnibe from '../../../../assets/logo/LOGO NUEVO.png';

export const dibujarCabecera = (doc: { internal: { pageSize: { getWidth: () => any; }; }; setLineWidth: (arg0: number) => void; rect: (arg0: number, arg1: number, arg2: number, arg3: number) => void; addImage: (arg0: string, arg1: string, arg2: number, arg3: number, arg4: number, arg5: number) => void; setFontSize: (arg0: number) => void; setFont: (arg0: string, arg1: string) => void; text: (arg0: string, arg1: number, arg2: number) => void; }) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const marginLeft = 20;
  const marginTop = 10;
  const headerHeight = 20;
  const logoWidth = 35;
  const logoHeight = 15;

  // Ajusta los anchos de las columnas
  const columnWidth1 = 40; // Ancho de la primera columna (imagen)
  const columnWidth2 = 100; // Ancho de la segunda columna (título y subtítulo)
  const columnWidth3 = 40; // Ancho de la tercera columna (código, página, versión)
  const totalWidth = columnWidth1 + columnWidth2 + columnWidth3; // Ancho total

  // --- Dibujar el cuadro general de la cabecera ---
  doc.setLineWidth(0.5);
  doc.rect(marginLeft, marginTop, totalWidth, headerHeight + 10); // Cuadro grande

  // --- Columna 1 (Imagen) ---
  // Cuadro de la columna 1
  doc.rect(marginLeft, marginTop, columnWidth1, headerHeight);
  doc.addImage(logoUnibe, 'PNG', marginLeft + 2, marginTop + 2, logoWidth, logoHeight);

  // --- Columna 2 (Título y Subtítulo en recuadros separados) ---
  // Cuadro para "BIENESTAR UNIVERSITARIO"
  doc.rect(marginLeft + columnWidth1, marginTop, columnWidth2, headerHeight / 2);
  doc.setFontSize(12);
  doc.setFont('Helvetica', 'bold');
  doc.text("BIENESTAR UNIVERSITARIO", marginLeft + columnWidth1 + 10, marginTop + 6);

  // Cuadro para "INFORME DE ACTIVIDADES REALIZADAS"
  doc.rect(marginLeft + columnWidth1, marginTop + headerHeight / 2, columnWidth2, headerHeight / 2);
  doc.setFont('Helvetica', 'normal');
  doc.text("INFORME DE ACTIVIDADES REALIZADAS", marginLeft + columnWidth1 + 10, marginTop + headerHeight / 2 + 6);

  // --- Columna 3 (Código, Página, y Otro) ---
  // Cuadro de la columna 3
  doc.rect(marginLeft + columnWidth1 + columnWidth2, marginTop, columnWidth3, headerHeight);
  doc.setFontSize(10);
  doc.setFont('Helvetica', 'normal');
  
  // Recuadro para Código
  doc.rect(marginLeft + columnWidth1 + columnWidth2, marginTop, columnWidth3, headerHeight / 3);
  doc.text("CÓDIGO:", marginLeft + columnWidth1 + columnWidth2 + 5, marginTop + 6);
  
  // Recuadro para Página
  doc.rect(marginLeft + columnWidth1 + columnWidth2, marginTop + headerHeight / 3, columnWidth3, headerHeight / 3);
  doc.text("PÁGINA: 1 DE 2", marginLeft + columnWidth1 + columnWidth2 + 5, marginTop + headerHeight / 3 + 6);

  // Recuadro para Versión
  doc.rect(marginLeft + columnWidth1 + columnWidth2, marginTop + (2 * headerHeight / 3), columnWidth3, headerHeight / 3);
  doc.text("VERSIÓN: 001", marginLeft + columnWidth1 + columnWidth2 + 5, marginTop + (2 * headerHeight / 3) + 6);

  // --- Fecha de actualización ---
  doc.setFontSize(10);
  doc.text(`FECHA DE ACTUALIZACIÓN: ${new Date().toLocaleDateString()}`, marginLeft, marginTop + headerHeight + 6);
};
