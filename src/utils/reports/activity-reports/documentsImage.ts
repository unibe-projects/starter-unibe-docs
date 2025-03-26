import { getUrl } from 'aws-amplify/storage';
import jsPDF from 'jspdf';
import { DocumentWrapper } from '../../../interface/activities/activities.interface';

const MARGIN_LEFT = 15;
const SECTION_TITLE_SIZE = 16;
const SECTION_SPACING = 10;
const IMAGE_WIDTH = 180;
const IMAGE_HEIGHT = 150;
const PAGE_MARGIN_TOP = 20;
const IMAGE_SPACING = 160;

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

export const documentsImage = async (doc: jsPDF, documents: DocumentWrapper[], startY: number) => {
  let yPosition = startY + SECTION_SPACING;
  const imageDocuments = documents.filter((doc: any) => doc.documents.type === 'Fotos');
  if (imageDocuments.length === 0) {
    return yPosition;
  }

  doc.setFontSize(SECTION_TITLE_SIZE);
  doc.text('Anexos', MARGIN_LEFT, yPosition);
  yPosition += SECTION_SPACING;

  const getUrlStorages = async (path: string) => {
    try {
      const response = await getUrl({
        path,
        options: {
          validateObjectExistence: true,
        },
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
        if (yPosition + IMAGE_SPACING > doc.internal.pageSize.height) {
          doc.addPage();
          yPosition = PAGE_MARGIN_TOP;
        }
        doc.addImage(base64Image, 'JPEG', MARGIN_LEFT, yPosition, IMAGE_WIDTH, IMAGE_HEIGHT);
        yPosition += IMAGE_SPACING;
      } catch (err) {
        console.error('Error al cargar la imagen:', err);
      }
    } else {
      console.error('La URL de la imagen no es válida:', filePath);
    }
  }

  return yPosition;
};
