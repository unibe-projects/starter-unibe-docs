import { jsPDF } from 'jspdf';
import logoUnibe from '../../../../assets/header/LogoUnibe.png';

interface ActivityTask {
  name: string;
  description: string;
}

interface ActivityTasksConnection {
  items: Array<{ activityTasks: ActivityTask }>;
}

interface Activity {
  id: string;
  getActivity: {
    project_name?: string;
    executing_institution?: string;
    project_manager?: string;
    charge?: string;
    unit?: string;
    period?: string;
    general_objective?: string;
    activities?: string;
    number_participants?: number | null;
    budget_used?: string;
    ActivityTasks?: ActivityTasksConnection; // Cambio aquí
  };
  [key: string]: any;
}

// Definir constantes para evitar números mágicos
const HEADER_HEIGHT = 30;
const HEADER_Y = 10;
const TABLE_WIDTH = 180;
const MARGIN_LEFT = 20;
const LABEL_WIDTH = 85;
const ROW_HEIGHT = 8;
const LINE_HEIGHT = 7;
const PAGE_TEXT_Y = 33;
const CODE_TEXT_Y = 27;
const TITLE_SPACING = 15;
const TITLE_FONT_SIZE = 12;
const LABEL_FONT_SIZE = 10;
const CONTENT_FONT_SIZE = 10;

export const generatePDF = (activity: Activity, nameProyect: string, period: string) => {
  try {
    const doc = new jsPDF();

    // Configuración general
    doc.setFont('Helvetica');
    doc.setFontSize(CONTENT_FONT_SIZE);

    // Encabezado con imagen y texto
    const logoBase64 = logoUnibe;
    doc.addImage(logoBase64, 'PNG', 10, HEADER_Y, 30, HEADER_HEIGHT - 5);

    // Línea divisoria horizontal debajo del logo
    doc.line(40, HEADER_Y + 15, TABLE_WIDTH + 20, HEADER_Y + 15); // Línea divisoria

    // Texto centrado del encabezado
    doc.setFontSize(TITLE_FONT_SIZE);
    doc.setFont('Helvetica', 'bold');
    doc.text('BIENESTAR UNIVERSITARIO', 105, HEADER_Y + 15, { align: 'center' });
    doc.text('INFORME DE ACTIVIDADES REALIZADAS', 105, HEADER_Y + TITLE_SPACING, {
      align: 'center',
    });

    // Detalles en la fila debajo del título
    const codeText = `Código: ${activity.id}`;
    const pageText = 'Página:';
    doc.setFontSize(CONTENT_FONT_SIZE);
    doc.setFont('Helvetica', 'normal');
    doc.text(codeText, 180, HEADER_Y + CODE_TEXT_Y, { align: 'right' });
    doc.text(pageText, 180, HEADER_Y + PAGE_TEXT_Y, { align: 'right' });

    // Línea divisoria después de la cabecera
    doc.line(10, HEADER_Y + HEADER_HEIGHT + 5, TABLE_WIDTH + 20, HEADER_Y + HEADER_HEIGHT + 5); // Línea divisoria

    // Resto del contenido
    let startY = HEADER_Y + HEADER_HEIGHT + 10;

    // Título principal
    doc.setFontSize(TITLE_FONT_SIZE);
    doc.setFont('Helvetica', 'bold');
    doc.text('INFORME DE ACTIVIDADES REALIZADAS', 105, startY, { align: 'center' });
    startY += TITLE_SPACING;

    // Datos Generales
    doc.setFontSize(LABEL_FONT_SIZE);
    doc.setFont('Helvetica', 'bold');
    doc.text('1. Datos Generales', MARGIN_LEFT, startY);
    startY += 5;

    // Crear tabla con líneas para cada campo
    const fields = [
      { label: 'Nombre del Proyecto', value: nameProyect || 'N/A' },
      {
        label: 'Institución Ejecutora',
        value: activity.getActivity.executing_institution || 'N/A',
      },
      { label: 'Responsable del Proyecto', value: activity.getActivity.project_manager || 'N/A' },
      { label: 'Cargo', value: activity.getActivity.charge || 'N/A' },
      { label: 'Unidad', value: activity.getActivity.unit || 'N/A' },
      { label: 'Periodo del informe', value: period || 'N/A' },
    ];

    // Recuadro general (hasta "Periodo del informe")
    doc.rect(MARGIN_LEFT, startY, TABLE_WIDTH, fields.length * ROW_HEIGHT + 5);

    // Dibujar filas en la tabla
    fields.forEach((field, index) => {
      const yPosition = startY + index * ROW_HEIGHT;

      // Dibujar las etiquetas
      doc.setFont('Helvetica', 'bold');
      doc.text(field.label, MARGIN_LEFT + 5, yPosition + 5); // Etiqueta
      doc.setFont('Helvetica', 'normal');
      doc.text(field.value, MARGIN_LEFT + 5 + LABEL_WIDTH, yPosition + 5); // Valor

      // Línea divisoria entre label y value
      doc.line(
        MARGIN_LEFT + LABEL_WIDTH,
        yPosition - 0.2,
        MARGIN_LEFT + LABEL_WIDTH,
        yPosition + ROW_HEIGHT - 1.1
      ); // Ajustada

      // Línea divisoria horizontal
      doc.line(MARGIN_LEFT, yPosition + 7, MARGIN_LEFT + TABLE_WIDTH, yPosition + 7);
    });

    startY += fields.length * ROW_HEIGHT + 12; // Ajusta la posición para el siguiente bloque, más compacto

    // Objetivo general
    doc.setFontSize(LABEL_FONT_SIZE);
    doc.setFont('Helvetica', 'bold');
    doc.text('2. Objetivo General', MARGIN_LEFT, startY);
    startY += TITLE_SPACING;

    // Objetivo general (puedes agregar más campos aquí)
    doc.setFontSize(CONTENT_FONT_SIZE);
    doc.setFont('Helvetica', 'normal');
    const generalObjective = activity.getActivity.general_objective || 'N/A';
    doc.text(generalObjective, MARGIN_LEFT, startY);
    startY += 15;

    // Actividades realizadas
    doc.setFontSize(LABEL_FONT_SIZE);
    doc.setFont('Helvetica', 'bold');
    doc.text('3. Actividades Realizadas', MARGIN_LEFT, startY);
    startY += TITLE_SPACING;

    // Actividades realizadas (con tareas)
    const activities = activity.getActivity.ActivityTasks?.items || [];
    if (activities.length > 0) {
      activities.forEach((task, index) => {
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

    // Participantes
    doc.setFontSize(LABEL_FONT_SIZE);
    doc.setFont('Helvetica', 'bold');
    doc.text('4. Participantes', MARGIN_LEFT, startY);
    startY += TITLE_SPACING;

    // Número de participantes
    const participants = activity.getActivity.number_participants || 'N/A';
    doc.setFontSize(CONTENT_FONT_SIZE);
    doc.setFont('Helvetica', 'normal');
    doc.text(`Número de Participantes: ${participants}`, MARGIN_LEFT, startY);
    startY += 15;

    // Presupuesto utilizado
    doc.setFontSize(LABEL_FONT_SIZE);
    doc.setFont('Helvetica', 'bold');
    doc.text('5. Presupuesto Utilizado', MARGIN_LEFT, startY);
    startY += TITLE_SPACING;

    // Presupuesto utilizado
    const budgetUsed = activity.getActivity.budget_used || 'N/A';
    doc.setFontSize(CONTENT_FONT_SIZE);
    doc.setFont('Helvetica', 'normal');
    doc.text(`Presupuesto Utilizado: ${budgetUsed}`, MARGIN_LEFT, startY);

    // Guardar el PDF
    doc.save('informe_actividades.pdf');
  } catch (error) {
    console.error('Error generando el PDF:', error);
  }
};
