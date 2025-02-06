import { jsPDF } from 'jspdf';
import { addFirstPage } from './addFirstPage';
import { finalSections } from './finalSections';
import { anexos } from './anexos';
import { TableActivity } from './TableActivity';
import { projectSections } from './projectSections';
import { generalHalfYearlyData } from './generalHalfYearlyData';
import { subscribedBy } from './subscribedBy';
import { fileToBase64 } from '../../fileToBase64';
import { ReportData } from '../../../interface/activities/reporter-semester.interfae';

export const reporterSemester = async (values: ReportData) => {
  try {
    const doc = new jsPDF();
    const topMargin = 20;
    const bottomMargin = 20;
    const pageHeight = doc.internal.pageSize.height;

    addFirstPage(doc);
    let startY = topMargin;

    const checkNewPage = (currentY: number, requiredSpace: number) => {
      if (currentY + requiredSpace > pageHeight - bottomMargin) {
        doc.addPage();
        return topMargin;
      }
      return currentY;
    };

    doc.addPage();
    startY = generalHalfYearlyData(doc, values, `${values.periodYear} - ${values.periodSemester}`, startY, values.nameProyect);

    startY = checkNewPage(startY, 20);
    startY = projectSections(doc, values, startY);

    startY = checkNewPage(startY, 30);
    startY = TableActivity(doc, values.completedActivities, startY);

    startY = checkNewPage(startY, 30);
    startY = finalSections(doc, values, startY);

    const allDocuments = values.completedActivities.flatMap((actividad: any) => actividad.Documents?.items || []);

    let signatureBase64 = '';
    if (values.signature && values.signature instanceof File) {
      signatureBase64 = await fileToBase64(values.signature);
    }

    startY = checkNewPage(startY, 30);
    startY = subscribedBy(doc, startY, signatureBase64, values);

    startY = checkNewPage(startY, 30);
    startY = await anexos(doc, allDocuments, startY);

    doc.save("informe_actividades.pdf");
  } catch (error) {
    console.error("Error generando el PDF:", error);
  }
};
