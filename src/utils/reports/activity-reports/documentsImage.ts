import { getUrl } from 'aws-amplify/storage';
import jsPDF from 'jspdf';
import { DocumentWrapper } from '../../../interface/activities/activities.interface';

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
  let yPosition = startY + 10;
  const imageDocuments = documents.filter((doc: any) => doc.documents.type === 'Fotos');
  if (imageDocuments.length === 0) return yPosition;

  doc.setFontSize(16);
  doc.text('Anexos', 10, yPosition);
  yPosition += 10;

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
        if (yPosition + 160 > doc.internal.pageSize.height) {
          doc.addPage();
          yPosition = 20;
        }
        doc.addImage(base64Image, 'JPEG', 15, yPosition, 180, 150);
        yPosition += 160;
      } catch (err) {
        console.error('Error al cargar la imagen:', err);
      }
    } else {
      console.error('La URL de la imagen no es válida:', filePath);
    }
  }

  return yPosition;
};
