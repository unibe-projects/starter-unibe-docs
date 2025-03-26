import { getUrl } from 'aws-amplify/storage';
import jsPDF from 'jspdf';

const getBase64Image = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const blob = await response.blob();
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const anexos = async (doc: jsPDF, documents: any[], startY: number) => {
  const SECTION_TITLE_SIZE = 16;
  const MARGIN_LEFT = 15;
  const IMAGE_WIDTH = 180;
  const IMAGE_HEIGHT = 150;
  const PAGE_MARGIN_TOP = 20;
  const LINE_SPACING = 10;
  const IMAGE_SPACING = 10;
  const ZERO = 0;

  let yPosition = startY + LINE_SPACING;

  const imageDocuments = documents.filter((doc: any) => doc.documents.type === 'Fotos');
  if (imageDocuments.length === ZERO) {
    return yPosition;
  }

  // Agregar título de la sección
  doc.setFontSize(SECTION_TITLE_SIZE);
  doc.text('Anexos', MARGIN_LEFT, yPosition);
  yPosition += LINE_SPACING;

  const getUrlStorages = async (path: string) => {
    try {
      const response = await getUrl({
        path,
        options: { validateObjectExistence: true },
      });
      return response.url.toString();
    } catch (err) {
      console.error('Error al obtener URL del almacenamiento:', err);
      return null;
    }
  };

  for (const document of imageDocuments) {
    const filePath = document.documents.path;
    const resourceUrl = await getUrlStorages(filePath);

    if (resourceUrl) {
      try {
        const base64Image = await getBase64Image(resourceUrl);

        // Verificar si hay suficiente espacio en la página antes de agregar la imagen
        if (yPosition + IMAGE_HEIGHT > doc.internal.pageSize.height) {
          doc.addPage();
          yPosition = PAGE_MARGIN_TOP;
        }

        doc.addImage(base64Image, 'JPEG', MARGIN_LEFT, yPosition, IMAGE_WIDTH, IMAGE_HEIGHT);
        yPosition += IMAGE_HEIGHT + IMAGE_SPACING;
      } catch (err) {
        console.error('Error al cargar la imagen:', err);
      }
    } else {
      console.error('La URL de la imagen no es válida:', filePath);
    }
  }

  return yPosition;
};
