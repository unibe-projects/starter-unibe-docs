import { Document, Page, pdfjs } from 'react-pdf';
import { useState, useEffect } from 'react';

const GenerateDocScreen: React.FC = () => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
  }, []);

  const onLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages);
    setError(null); // Reset error on successful load
  };

  const onLoadError = (error: any) => {
    setError(`Error al cargar el archivo PDF: ${error.message}`);
  };

  return (
    <div className="flex h-full bg-gray-50">
      <div className="border-r border-gray-300 p-4 w-1/2">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Informe Semestral</h2>
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
          {error && <p className="text-red-500">{error}</p>}
          <Document
            file="/pdfs/InformeSemestral.pdf"
            onLoadSuccess={onLoadSuccess}
            onLoadError={onLoadError}
            className="m-0 p-0 flex flex-col items-center"
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="m-0 p-0"
            />
          </Document>
          <div className="flex justify-between w-full mt-4 mb-4">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded transition duration-200 hover:bg-blue-700 disabled:bg-gray-300"
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber(pageNumber - 1)}
            >
              Anterior
            </button>
            <span className="text-gray-700">{`Página ${pageNumber} de ${numPages}`}</span>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded transition duration-200 hover:bg-blue-700 disabled:bg-gray-300"
              disabled={pageNumber >= numPages}
              onClick={() => setPageNumber(pageNumber + 1)}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>

      <div className="w-1/2 h-full p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Acciones de Plan Mejora</h2>
        <form className="space-y-6">
          {[
            'ESTADOS Y AVANCES: LO POSITIVO',
            'PROBLEMAS Y RIESGOS: LO NEGATIVO',
            'PRÓXIMAS TAREAS O ACTIVIDADES',
          ].map((label, index) => (
            <div key={index} className="space-y-2">
              <label htmlFor={`input${index}`} className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <textarea
                id={`textarea${index}`}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 rounded-md transition duration-200 shadow-sm"
                placeholder="Ingrese algo aquí"
              />
            </div>
          ))}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded transition duration-200 hover:bg-blue-700"
          >
            Generar
          </button>
        </form>
      </div>
    </div>
  );
};

export default GenerateDocScreen;
