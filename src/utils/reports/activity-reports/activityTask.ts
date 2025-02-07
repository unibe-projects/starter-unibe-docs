import { jsPDF } from 'jspdf';
import { ActivityResponse, ActivityTaskWrapper } from '../../../interface/activities/activities.interface';

const MARGIN_LEFT = 20;
const LABEL_FONT_SIZE = 10;
const CONTENT_FONT_SIZE = 10;
const TITLE_SPACING = 5;
const INDEX = 1;
const LINE_SPACING = 10;
const EXTRA_SPACING = 15;

export const ActivitiTask = (
  doc: jsPDF,
  activity: ActivityResponse,
  startY: number
): number => {
  doc.setFontSize(LABEL_FONT_SIZE);
  doc.setFont('Helvetica', 'bold');
  doc.text('3. Actividades Realizadas', MARGIN_LEFT, startY);
  startY += TITLE_SPACING;

  const activities: ActivityTaskWrapper[] = activity.getActivity.ActivityTasks?.items ?? [];
  if (activities.length > 0) {
    activities.forEach((taskWrapper, index) => {
      const task = taskWrapper.activityTasks;
      const taskText = `${index + INDEX}. ${task.name}: ${task.description}`;
      doc.setFontSize(CONTENT_FONT_SIZE);
      doc.setFont('Helvetica', 'normal');
      doc.text(taskText, MARGIN_LEFT, startY);
      startY += LINE_SPACING;
    });
  } else {
    doc.text('N/A', MARGIN_LEFT, startY);
    startY += EXTRA_SPACING;
  }

  return startY;
};
