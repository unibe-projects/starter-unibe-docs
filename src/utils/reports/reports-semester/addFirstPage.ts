import { jsPDF } from "jspdf";
import formatImage from "../../../assets/format/formato_pdf.jpg";

export const addFirstPage = (doc: jsPDF) => {
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;

  const MARGIN_X = 20;
  const FONT_SIZE = 20;
  const TEXT_COLOR = { r: 255, g: 255, b: 255 };
  const LINE_SPACING = 0.5;
  const ZERO = 0;
  const TWO = 2;
  
  const currentYear = new Date().getFullYear();
  const title = `BIENESTAR UNIVERSITARIO\nINFORME DE PROYECTO\n${currentYear}`;

  // Agregar imagen de fondo
  doc.addImage(formatImage, "JPEG", ZERO, ZERO, pageWidth, pageHeight);

  // Configuración de texto
  doc.setFontSize(FONT_SIZE);
  doc.setTextColor(TEXT_COLOR.r, TEXT_COLOR.g, TEXT_COLOR.b);

  // Ajustar texto al ancho de la página con margen
  const textLines = doc.splitTextToSize(title, pageWidth - MARGIN_X * TWO);
  const textHeight = textLines.length * FONT_SIZE * LINE_SPACING;

  // Posición centrada
  const textX = pageWidth / TWO;
  const textY = pageHeight / TWO - textHeight / TWO;

  // Dibujar texto
  doc.text(textLines, textX, textY, { align: "center" });
};
