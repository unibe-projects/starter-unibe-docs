import { jsPDF } from 'jspdf';
import { addFirstPage } from './addFirstPage';
import { finalSections } from './finalSections';
import { anexos } from './anexos';
import { TableActivity } from './TableActivity';
import { projectSections } from './projectSections';
import { ReportData } from '../../../interface/activities/reporter-semester.interfae';
import { generalHalfYearlyData } from './generalHalfYearlyData';
import { subscribedBy } from './subscribedBy';


export const repoerterSemester = async (values: ReportData) => {
  try {
    const doc = new jsPDF();
    addFirstPage(doc);

    doc.addPage();
    let startY = 20; 
    startY = generalHalfYearlyData(doc, values, `${values.periodYear} - ${values.periodSemester}`, startY, values.nameProyect);

    startY = projectSections(doc, values, startY);

    startY = TableActivity(doc, values.completedActivities, startY);
    startY = finalSections(doc, values, startY);
    const allDocuments = values.completedActivities
      .flatMap((actividad: any) => actividad.Documents?.items || []);

    startY = subscribedBy(doc, startY);
    startY = await anexos(doc, allDocuments, startY);
    doc.save("informe_actividades.pdf");
  } catch (error) {
    console.error("Error generando el PDF:", error);
  }
};

