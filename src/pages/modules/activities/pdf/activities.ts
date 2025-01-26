import { jsPDF } from 'jspdf';

interface Activity {
  id: string;
  project_manager: string;
  charge: string;
  activity_date: string;
  start_time: string;
  hora_fin: string;
  budget_used: string;
  executing_institution: string;
  general_objective: string;
  number_participants: number | null;
  unit: string;
  createdAt: string;
  [key: string]: any; // Para aceptar propiedades adicionales
}

export const generatePDF = (activity: Activity) => {
  try {
    console.log('Datos de la actividad:', activity);

    const doc = new jsPDF();

    // Título del documento
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text('Informe de Actividad', 105, 20, { align: 'center' });

    // Encabezado de detalles
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text('Detalles de la Actividad', 20, 30);

    // Detalles dinámicos con manejo de valores null o undefined
    const details = [
      { label: 'ID', value: activity.getActivity.id },
      { label: 'Gestor del Proyecto', value: activity.getActivity.project_manager },
      { label: 'Cargo', value: activity.getActivity.charge },
      { label: 'Fecha de la Actividad', value: activity.getActivity.activity_date },
      { label: 'Hora de Inicio', value: activity.getActivity.start_time },
      { label: 'Hora de Fin', value: activity.hora_fin },
      { label: 'Presupuesto Utilizado', value: activity.getActivity.budget_used },
      { label: 'Institución Ejecutora', value: activity.getActivity.executing_institution },
      { label: 'Objetivo General', value: activity.getActivity.general_objective },
      { label: 'Número de Participantes', value: activity.number_participants?.toString() || 'N/A' },
      { label: 'Unidad', value: activity.getActivity.unit },
      { label: 'Fecha de Creación', value: activity.getActivity.createdAt ? new Date(activity.createdAt).toLocaleString() : 'N/A' },
    ];

    doc.setFontSize(12);

    details.forEach((detail, index) => {
      const yPosition = 40 + index * 10;
      doc.text(`${detail.label}: ${detail.value || 'N/A'}`, 20, yPosition);
    });

    // Pie de página
    doc.setFontSize(10);
    doc.text('Documento generado automáticamente', 105, 290, { align: 'center' });

    // Descargar el PDF
    doc.save(`actividad_${activity.id}.pdf`);
  } catch (error) {
    console.error('Error al generar el PDF:', error);
  }
};
