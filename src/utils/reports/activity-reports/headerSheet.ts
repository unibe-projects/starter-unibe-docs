import { jsPDF } from 'jspdf';
import logoUnibe from '../../../assets/logo/logo.png';
const TWO = 2;
const THREE = 3;
const MARGIN_LEFT = 20;
const MARGIN_TOP = 10;
const HEADER_HEIGHT = 20;
const FOOTER_HEIGHT = 10;
const LOGO_MARGIN = 2;
const LOGO_WIDTH = 35;
const LOGO_HEIGHT = 15;
const COLUMN_WIDTH1 = 40;
const COLUMN_WIDTH2 = 100;
const COLUMN_WIDTH3 = 40;
const TOTAL_WIDTH = COLUMN_WIDTH1 + COLUMN_WIDTH2 + COLUMN_WIDTH3;
const TEXT_OFFSET_X = 10;
const TEXT_OFFSET_Y = 6;
const HEADER_SECTION_HEIGHT = HEADER_HEIGHT / TWO;
const SUB_SECTION_HEIGHT = HEADER_HEIGHT / THREE;
const TEXT_MARGIN = 5;
const PAGE_NUMBER = '1 DE 2';
const VERSION = '001';
const SETLINEWIDTH = 0.5;
const SETFONTSIZE = 12;

export const headerSheet = (doc: jsPDF) => {
  doc.setLineWidth(SETLINEWIDTH);

  // Contenedor general del header
  doc.rect(MARGIN_LEFT, MARGIN_TOP, TOTAL_WIDTH, HEADER_HEIGHT + FOOTER_HEIGHT);

  // Logo
  doc.rect(MARGIN_LEFT, MARGIN_TOP, COLUMN_WIDTH1, HEADER_HEIGHT);
  doc.addImage(
    logoUnibe,
    'PNG',
    MARGIN_LEFT + LOGO_MARGIN,
    MARGIN_TOP + LOGO_MARGIN,
    LOGO_WIDTH,
    LOGO_HEIGHT,
  );

  // Título principal
  doc.rect(MARGIN_LEFT + COLUMN_WIDTH1, MARGIN_TOP, COLUMN_WIDTH2, HEADER_SECTION_HEIGHT);
  doc.setFontSize(SETFONTSIZE);
  doc.setFont('Helvetica', 'bold');
  doc.text(
    'BIENESTAR UNIVERSITARIO',
    MARGIN_LEFT + COLUMN_WIDTH1 + TEXT_OFFSET_X,
    MARGIN_TOP + TEXT_OFFSET_Y,
  );

  // Subtítulo
  doc.rect(
    MARGIN_LEFT + COLUMN_WIDTH1,
    MARGIN_TOP + HEADER_SECTION_HEIGHT,
    COLUMN_WIDTH2,
    HEADER_SECTION_HEIGHT,
  );
  doc.setFont('Helvetica', 'normal');
  doc.text(
    'INFORME DE ACTIVIDADES REALIZADAS',
    MARGIN_LEFT + COLUMN_WIDTH1 + TEXT_OFFSET_X,
    MARGIN_TOP + HEADER_SECTION_HEIGHT + TEXT_OFFSET_Y,
  );

  // Sección de información adicional
  doc.rect(MARGIN_LEFT + COLUMN_WIDTH1 + COLUMN_WIDTH2, MARGIN_TOP, COLUMN_WIDTH3, HEADER_HEIGHT);
  doc.setFontSize(MARGIN_TOP);

  // Código
  doc.rect(
    MARGIN_LEFT + COLUMN_WIDTH1 + COLUMN_WIDTH2,
    MARGIN_TOP,
    COLUMN_WIDTH3,
    SUB_SECTION_HEIGHT,
  );
  doc.text(
    'CÓDIGO:',
    MARGIN_LEFT + COLUMN_WIDTH1 + COLUMN_WIDTH2 + TEXT_MARGIN,
    MARGIN_TOP + TEXT_OFFSET_Y,
  );

  // Página
  doc.rect(
    MARGIN_LEFT + COLUMN_WIDTH1 + COLUMN_WIDTH2,
    MARGIN_TOP + SUB_SECTION_HEIGHT,
    COLUMN_WIDTH3,
    SUB_SECTION_HEIGHT,
  );
  doc.text(
    `PÁGINA: ${PAGE_NUMBER}`,
    MARGIN_LEFT + COLUMN_WIDTH1 + COLUMN_WIDTH2 + TEXT_MARGIN,
    MARGIN_TOP + SUB_SECTION_HEIGHT + TEXT_OFFSET_Y,
  );

  // Versión
  doc.rect(
    MARGIN_LEFT + COLUMN_WIDTH1 + COLUMN_WIDTH2,
    MARGIN_TOP + LOGO_MARGIN * SUB_SECTION_HEIGHT,
    COLUMN_WIDTH3,
    SUB_SECTION_HEIGHT,
  );
  doc.text(
    `VERSIÓN: ${VERSION}`,
    MARGIN_LEFT + COLUMN_WIDTH1 + COLUMN_WIDTH2 + TEXT_MARGIN,
    MARGIN_TOP + LOGO_MARGIN * SUB_SECTION_HEIGHT + TEXT_OFFSET_Y,
  );

  // Fecha de actualización
  doc.setFontSize(MARGIN_TOP);
  doc.text(
    `FECHA DE ACTUALIZACIÓN: ${new Date().toLocaleDateString()}`,
    MARGIN_LEFT,
    MARGIN_TOP + HEADER_HEIGHT + TEXT_OFFSET_Y,
  );
};
