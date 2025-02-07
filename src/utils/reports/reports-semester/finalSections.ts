import { jsPDF } from 'jspdf';
import { ReportData } from '../../../interface/activities/reporter-semester.interfae';

const MARGIN_LEFT = 20;
const TITLE_SPACING = 5;
const TEXT_INDENT = 5;
const LABEL_FONT_SIZE = 10;
const SECTION_SPACING = 15;
const FONT_FAMILY = 'Helvetica';
const FONT_BOLD = 'bold';
const FONT_NORMAL = 'normal';

export const finalSections = (doc: jsPDF, activity: ReportData, startY: number) => {
  const sections = [
    { title: '6. ESTADOS Y AVANCES: LO POSITIVO', content: activity.states_advances || 'N/A' },
    { title: '7. PROBLEMAS Y RIESGOS: LO NEGATIVO', content: activity.problems_risks || 'N/A' },
    { title: '8. PRÓXIMAS TAREAS O ACTIVIDADES', content: activity.upcoming_tasks || 'N/A' },
  ];

  doc.setFontSize(LABEL_FONT_SIZE);

  for (const section of sections) {
    doc.setFont(FONT_FAMILY, FONT_BOLD);
    doc.text(section.title, MARGIN_LEFT, startY);
    startY += TITLE_SPACING;
    
    doc.setFont(FONT_FAMILY, FONT_NORMAL);
    doc.text(section.content, MARGIN_LEFT + TEXT_INDENT, startY);
    startY += SECTION_SPACING;
  }

  return startY;
};
