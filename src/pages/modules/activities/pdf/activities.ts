import { jsPDF } from 'jspdf';
import { dibujarCabecera } from './cabecera';
import { dibujarDatosGenerales } from './datosGenerales';
import { dibujarObjetivoGeneral } from './objetivoGeneral';
import { dibujarActividadesRealizadas } from './actividadesRealizadas';
import { dibujarParticipantes } from './participantes';
import { dibujarPresupuestoUtilizado } from './presupuestoUtilizado';
import { generateImagesForPDF } from './generateImagesForPDF';

export const generatePDF = async (activity: any, nameProyect: string, period: string) => {
  try {
    const doc = new jsPDF();
    dibujarCabecera(doc);
    let startY = 40;
    
    console.log('📄 Generando PDF con datos:', activity);
    const documents = activity.getActivity.Documents.items || [];

    const pageWidth = doc.internal.pageSize.width;
    const text1 = activity.getActivity.name ?? '';
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
    startY = dibujarPresupuestoUtilizado(doc, activity, startY);
    startY = await generateImagesForPDF(doc, documents, startY);

    doc.save('informe_actividades.pdf');
  } catch (error) {
    console.error('❌ Error al generar el PDF:', error);
  }
};
