import { jsPDF } from "jspdf";
import logoUnibe from "../../../assets/logo/logo.png";

export const headerSheet = (doc: jsPDF) => {
  const marginLeft = 20;
  const marginTop = 10;
  const headerHeight = 20;
  const logoWidth = 35;
  const logoHeight = 15;
  const columnWidth1 = 40;
  const columnWidth2 = 100;
  const columnWidth3 = 40;
  const totalWidth = columnWidth1 + columnWidth2 + columnWidth3;

  doc.setLineWidth(0.5);
  doc.rect(marginLeft, marginTop, totalWidth, headerHeight + 10);
  doc.rect(marginLeft, marginTop, columnWidth1, headerHeight);
  doc.addImage(logoUnibe, "PNG", marginLeft + 2, marginTop + 2, logoWidth, logoHeight);
  doc.rect(marginLeft + columnWidth1, marginTop, columnWidth2, headerHeight / 2);
  doc.setFontSize(12);
  doc.setFont("Helvetica", "bold");
  doc.text("BIENESTAR UNIVERSITARIO", marginLeft + columnWidth1 + 10, marginTop + 6);
  doc.rect(marginLeft + columnWidth1, marginTop + headerHeight / 2, columnWidth2, headerHeight / 2);
  doc.setFont("Helvetica", "normal");
  doc.text("INFORME DE ACTIVIDADES REALIZADAS", marginLeft + columnWidth1 + 10, marginTop + headerHeight / 2 + 6);
  doc.rect(marginLeft + columnWidth1 + columnWidth2, marginTop, columnWidth3, headerHeight);
  doc.setFontSize(10);
  doc.rect(marginLeft + columnWidth1 + columnWidth2, marginTop, columnWidth3, headerHeight / 3);
  doc.text("CÓDIGO:", marginLeft + columnWidth1 + columnWidth2 + 5, marginTop + 6);
  doc.rect(marginLeft + columnWidth1 + columnWidth2, marginTop + headerHeight / 3, columnWidth3, headerHeight / 3);
  doc.text("PÁGINA: 1 DE 2", marginLeft + columnWidth1 + columnWidth2 + 5, marginTop + headerHeight / 3 + 6);
  doc.rect(marginLeft + columnWidth1 + columnWidth2, marginTop + (2 * headerHeight) / 3, columnWidth3, headerHeight / 3);
  doc.text("VERSIÓN: 001", marginLeft + columnWidth1 + columnWidth2 + 5, marginTop + (2 * headerHeight) / 3 + 6);
  doc.setFontSize(10);
  doc.text(`FECHA DE ACTUALIZACIÓN: ${new Date().toLocaleDateString()}`, marginLeft, marginTop + headerHeight + 6);
};
