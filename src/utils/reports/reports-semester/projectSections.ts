import { jsPDF } from 'jspdf';
import { ReportData } from '../../../interface/activities/reporter-semester.interfae';

const MARGIN_LEFT = 20;
const TITLE_SPACING = 5;
const SECTION_SPACING = 15;
const LABEL_FONT_SIZE = 10;
const TEXT_INDENT = 5;

export const projectSections = (doc: jsPDF, activity: ReportData, startY: number) => {
  const sections = [
    { title: '2. Objetivo General', value: activity.general_objective },
    { title: '3. Ámbito del Proyecto', value: activity.project_scope },
    { title: '4. Propuesta del Proyecto', value: activity.project_proposal },
    { title: '5. Actividades Realizadas', value: '' },
  ];

  sections.forEach((section) => {
    doc.setFontSize(LABEL_FONT_SIZE);
    doc.setFont('Helvetica', 'bold');
    doc.text(section.title, MARGIN_LEFT, startY);
    startY += TITLE_SPACING;
    doc.setFont('Helvetica', 'normal');
    doc.text(section.value || 'N/A', MARGIN_LEFT + TEXT_INDENT, startY);
    startY += SECTION_SPACING;
  });

  return startY;
};
