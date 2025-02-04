// actividadesRealizadas.ts
import { jsPDF } from 'jspdf';

const MARGIN_LEFT = 20;
const LABEL_FONT_SIZE = 10;
const CONTENT_FONT_SIZE = 10;
const TITLE_SPACING = 5;

export const dibujarActividadesRealizadas = (doc: jsPDF, activity: any, startY: number) => {
  doc.setFontSize(LABEL_FONT_SIZE);
  doc.setFont('Helvetica', 'bold');
  doc.text('3. Actividades Realizadas', MARGIN_LEFT, startY);
  startY += TITLE_SPACING;

  const activities = activity.getActivity.ActivityTasks?.items || [];
  if (activities.length > 0) {
    activities.forEach((task: { activityTasks: { name: any; description: any; }; }, index: number) => {
      const taskText = `${index + 1}. ${task.activityTasks.name}: ${task.activityTasks.description}`;
      doc.setFontSize(CONTENT_FONT_SIZE);
      doc.setFont('Helvetica', 'normal');
      doc.text(taskText, MARGIN_LEFT, startY);
      startY += 10;
    });
  } else {
    doc.text('N/A', MARGIN_LEFT, startY);
    startY += 15;
  }

  return startY;
};
