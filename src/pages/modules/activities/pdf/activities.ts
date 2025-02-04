// generatePDF.ts
import { jsPDF } from 'jspdf';
import { dibujarCabecera } from './cabecera';
import { dibujarDatosGenerales } from './datosGenerales';
import { dibujarObjetivoGeneral } from './objetivoGeneral';
import { dibujarActividadesRealizadas } from './actividadesRealizadas';
import { dibujarParticipantes } from './participantes';
import { dibujarPresupuestoUtilizado } from './presupuestoUtilizado';

export const generatePDF = (activity: any, nameProyect: string, period: string) => {
  const doc = new jsPDF();
  dibujarCabecera(doc);
  let startY = 40;

  const pageWidth = doc.internal.pageSize.width;
  const text1 =  activity.getActivity.name ?? '';
  const text2 = 'BIENESTAR UNIVERSITARIO';
  
  const text1Width = doc.getTextWidth(text1);
  const text2Width = doc.getTextWidth(text2);
  
  doc.text(text1, (pageWidth - text1Width) / 2, startY + 10);
  doc.text(text2, (pageWidth - text2Width) / 2, startY + 15);
  startY += 25;

  startY = dibujarDatosGenerales(doc, activity, period, startY, nameProyect);
  startY = dibujarObjetivoGeneral(doc, activity, startY);
  startY = dibujarActividadesRealizadas(doc, activity, startY);
  startY = dibujarParticipantes(doc, activity, startY);
  dibujarPresupuestoUtilizado(doc, activity, startY);

  // Guardar el PDF
  doc.save('informe_actividades.pdf');
};
