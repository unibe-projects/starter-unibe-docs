import { jsPDF } from 'jspdf';
import logoUnibe from '../../../../assets/header/LogoUnibe.png';

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
  };
  [key: string]: any;
}

export const generatePDF = (activity: Activity) => {
  try {
    const doc = new jsPDF();

    // Configuración general
    doc.setFont('Helvetica');
    doc.setFontSize(10);

    // Encabezado con imagen y texto
    const headerHeight = 30;
    const headerY = 10;

    // Imagen del logo
    const logoBase64 = logoUnibe;
    doc.addImage(logoBase64, 'PNG', 10, headerY, 30, headerHeight - 5);

    // Línea divisoria horizontal debajo del logo
    const tableWidth = 180;
    doc.line(40, headerY + 15, tableWidth + 20, headerY + 15); // Línea divisoria

    // Texto centrado del encabezado
    doc.setFontSize(12);
    doc.setFont('Helvetica', 'bold');
    doc.text('BIENESTAR UNIVERSITARIO', 105, headerY + 15, { align: 'center' });
    doc.text('INFORME DE ACTIVIDADES REALIZADAS', 105, headerY + 22, { align: 'center' });

    // Detalles en la fila debajo del título
    const codeText = `Código: ${activity.id}`;
    const pageText = `Página:`;
    doc.setFontSize(10);
    doc.setFont('Helvetica', 'normal');
    doc.text(codeText, 180, headerY + 27, { align: 'right' });
    doc.text(pageText, 180, headerY + 33, { align: 'right' });

    // Línea divisoria después de la cabecera
    doc.line(10, headerY + headerHeight + 5, tableWidth + 20, headerY + headerHeight + 5); // Línea divisoria

    // Resto del contenido
    let startY = headerY + headerHeight + 10;

    // Título principal
    doc.setFontSize(12);
    doc.setFont('Helvetica', 'bold');
    doc.text('INFORME DE ACTIVIDADES REALIZADAS', 105, startY, { align: 'center' });
    startY += 15;

    // Datos Generales
    doc.setFontSize(10);
    doc.setFont('Helvetica', 'bold');
    doc.text('1. Datos Generales', 20, startY);
    startY += 5;

    // Crear tabla con líneas para cada campo
    const fields = [
      { label: 'Nombre del Proyecto', value: activity.getActivity.project_name || 'N/A' },
      { label: 'Institución Ejecutora', value: activity.getActivity.executing_institution || 'N/A' },
      { label: 'Responsable del Proyecto', value: activity.getActivity.project_manager || 'N/A' },
      { label: 'Cargo', value: activity.getActivity.charge || 'N/A' },
      { label: 'Unidad', value: activity.getActivity.unit || 'N/A' },
      { label: 'Periodo del informe', value: activity.getActivity.period || 'N/A' },
    ];

    // Definir márgenes y dimensiones del recuadro
    const marginLeft = 20;
    const marginTop = startY;
    const labelWidth = 85;  // Ancho de la columna de las etiquetas

    // Recuadro general (hasta "Periodo del informe")
    doc.rect(marginLeft, marginTop, tableWidth, fields.length * 7 + 5);

    // Dibujar filas en la tabla
    let rowHeight = 8;
    fields.forEach((field, index) => {
      const yPosition = marginTop + index * rowHeight;
      
      // Dibujar las etiquetas
      doc.setFont('Helvetica', 'bold');
      doc.text(field.label, marginLeft + 5, yPosition + 5); // Etiqueta
      doc.setFont('Helvetica', 'normal');
      doc.text(field.value, marginLeft + 5 + labelWidth, yPosition + 5); // Valor

      // Línea divisoria entre label y value
      doc.line(marginLeft + labelWidth, yPosition - 0.20, marginLeft + labelWidth, yPosition + rowHeight - 1.10);  // Ajustada

      // Línea divisoria horizontal
      doc.line(marginLeft, yPosition + 7, marginLeft + tableWidth, yPosition + 7); 
    });

    startY += fields.length * 7 + 12; // Ajusta la posición para el siguiente bloque, más compacto

    // Objetivo general
    doc.setFont('Helvetica', 'bold');
    doc.text('2. Objetivo general', 20, startY);
    startY += 5;
    doc.setFont('Helvetica', 'normal');
    const objetivoGeneral = activity.getActivity.general_objective || 'N/A';
    const linesObjetivoGeneral = doc.splitTextToSize(objetivoGeneral, 170); // Ajuste ancho máximo
    linesObjetivoGeneral.forEach((line: string) => {
      doc.text(line, 20, startY);
      startY += 5; // Espacio entre líneas
    });

    startY += 10;

    // Actividades realizadas
    doc.setFont('Helvetica', 'bold');
    doc.text('3. Actividades realizadas', 20, startY);
    startY += 5;
    doc.setFont('Helvetica', 'normal');
    const actividadesRealizadas = activity.getActivity.activities || 'N/A';
    const linesActividadesRealizadas = doc.splitTextToSize(actividadesRealizadas, 170); // Ajuste ancho máximo
    linesActividadesRealizadas.forEach((line: string) => {
      doc.text(line, 20, startY);
      startY += 5; // Espacio entre líneas
    });

    startY += 10;

    // Número de participantes
    doc.setFont('Helvetica', 'bold');
    doc.text('4. Número de Participantes', 20, startY);
    startY += 5;
    doc.setFont('Helvetica', 'normal');
    doc.text(activity.getActivity.number_participants?.toString() || 'N/A', 20, startY);
    startY += 15;

    // Presupuesto utilizado
    doc.setFont('Helvetica', 'bold');
    doc.text('5. Presupuesto utilizado', 20, startY);
    startY += 5;
    doc.setFont('Helvetica', 'normal');
    doc.text(activity.getActivity.budget_used || 'N/A', 20, startY);

    // Pie de página
    doc.setFontSize(8);
    doc.text('Documento generado automáticamente', 105, 290, { align: 'center' });

    doc.save(`actividad_${activity.id}.pdf`);
  } catch (error) {
    console.error('Error al generar el PDF:', error);
  }
};
