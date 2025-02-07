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

const TOP_MARGIN = 20;
const BOTTOM_MARGIN = 20;
const PAGE_HEIGHT_MARGIN = 30;
const INITIAL_SPACE = 20;
const SIGNATURE_SPACE = 30;

export const reporterSemester = async (values: ReportData) => {
  try {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;

    addFirstPage(doc);
    let startY = TOP_MARGIN;

    const checkNewPage = (currentY: number, requiredSpace: number) => {
      if (currentY + requiredSpace > pageHeight - BOTTOM_MARGIN) {
        doc.addPage();
        return TOP_MARGIN;
      }
      return currentY;
    };

    doc.addPage();
    startY = generalHalfYearlyData(doc, values, `${values.periodYear} - ${values.periodSemester}`, startY, values.nameProyect);

    startY = checkNewPage(startY, INITIAL_SPACE);
    startY = projectSections(doc, values, startY);

    startY = checkNewPage(startY, PAGE_HEIGHT_MARGIN);
    startY = TableActivity(doc, values.completedActivities, startY);

    startY = checkNewPage(startY, PAGE_HEIGHT_MARGIN);
    startY = finalSections(doc, values, startY);

    const allDocuments = values.completedActivities.flatMap((actividad: any) => actividad.Documents?.items || []);

    let signatureBase64 = '';
    if (values.signature && values.signature instanceof File) {
      signatureBase64 = await fileToBase64(values.signature);
    }

    startY = checkNewPage(startY, SIGNATURE_SPACE);
    startY = subscribedBy(doc, startY, signatureBase64, values);

    startY = checkNewPage(startY, SIGNATURE_SPACE);
    startY = await anexos(doc, allDocuments, startY);

    doc.save("informe_actividades.pdf");
  } catch (error) {
    console.error("Error generando el PDF:", error);
  }
};
