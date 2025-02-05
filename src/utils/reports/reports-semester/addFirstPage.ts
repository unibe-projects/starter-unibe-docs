import { jsPDF } from "jspdf";
import formatImage from "../../../assets/format/formato_pdf.jpg";

export const addFirstPage = (doc: jsPDF) => {

  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const currentYear = new Date().getFullYear();
  const title = `BIENESTAR UNIVERSITARIO\nINFORME DE PROYECTO\n${currentYear}`;
  doc.addImage(formatImage, "JPEG", 0, 0, pageWidth, pageHeight);
  const fontSize = 20;
  doc.setFontSize(fontSize);
  doc.setTextColor(255, 255, 255);
  const textLines = doc.splitTextToSize(title, pageWidth - 40);
  const textHeight = textLines.length * fontSize * 0.5;
  const textX = pageWidth / 2;
  const textY = pageHeight / 2 - textHeight / 2;
  doc.text(textLines, textX, textY, { align: "center" });
};
