import React, { useState } from 'react';
import UnibeLogo from '../../assets/header/LogoUnibe.png';
import { Activities } from '../../pages/modules/activities/CreateActivitiesScreen';

interface PreviewSectionProps {
  previewData: Activities;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({ previewData }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const sections = [
    {
      title: '1. Datos Generales',
      fields: [
        { label: 'Nombre del Proyecto', value: previewData.project_name },
        { label: 'Institución Ejecutora', value: previewData.executing_institution },
        { label: 'Responsable del Proyecto', value: previewData.project_manager },
        { label: 'Cargo', value: previewData.charge },
        { label: 'Unidad', value: previewData.unit },
        { label: 'Período del informe', value: previewData.report_period },
      ],
    },
    { title: '2. Objetivo General', content: previewData.general_objective },
    {
      title: '3. Actividades Realizadas',
      content: (
        <div className="space-y-4">
          {previewData.tasks &&
            previewData.tasks.map((task: any, index: number) => (
              <div
                key={index}
                className="border border-gray-400 rounded-lg p-4 shadow-md overflow-hidden"
              >
                <p className="text-lg font-semibold">
                  <span className="font-bold">Nombre:</span> {task.name}
                </p>
                <p className="text-gray-600">
                  <span className="font-bold">Descripción:</span> {task.description}
                </p>
              </div>
            ))}
        </div>
      ),
    },
    { title: '4. Número de Participantes', content: previewData.number_participants },
    { title: '5. Presupuesto Utilizado', content: previewData.budget_used },
    // { title: '6. Anexos', content: previewData.attachments },
  ];

  const handleNextPage = () => {
    if (page * itemsPerPage < sections.length) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const displayedSections = sections.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="w-full p-8 bg-white shadow-lg border-t-4 overflow-hidden">
      <div className="border border-gray-500 border-2 overflow-hidden">
        <table className="w-full border-collapse">
          <tbody>
            <tr>
              <td className="w-1/4 p-2 border border-gray-500 align-top">
                <img
                  src={UnibeLogo}
                  alt="UNIB.E Logo"
                  className="max-h-16 max-w-full object-contain"
                />
              </td>
              <td className="w-2/4 border border-gray-500 text-center">
                <p className="font-bold">BIENESTAR UNIVERSITARIO</p>
                <div className="border-t border-gray-500 mt-2 pt-1">
                  <p>INFORME DE ACTIVIDADES REALIZADAS</p>
                </div>
              </td>
              <td className="w-1/4 text-left align-top">
                <div className="pt-1">
                  <p>CÓDIGO:</p>
                </div>
                <div className="border border-gray-300 border-l-0 p-1">
                  <p>
                    PÁGINA: {page} DE {Math.ceil(sections.length / itemsPerPage)}
                  </p>
                </div>
                <div className="border border-gray-300 border-l-0 p-1">
                  <p>VERSIÓN: 001</p>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3} className="p-2 border border-gray-500">
                FECHA DE ACTUALIZACIÓN: {previewData.activity_date}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="space-y-6 mt-4">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-1xl font-bold text-black">{previewData.name}</h1>
          <h1 className="text-1xl font-bold text-black">BIENESTAR UNIVERSITARIO</h1>
        </div>

        {displayedSections.map((section, index) => (
          <div key={index}>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">{section.title}</h3>

            {section.fields ? (
              <div className="border border-gray-400 rounded-lg p-4 shadow-md overflow-hidden">
                <table className="w-full border-collapse">
                  <tbody>
                    {section.fields.map((field, fieldIndex) => (
                      <tr key={fieldIndex} className="border-b">
                        <td className="text-gray-600 w-1/2 py-2 align-top">
                          <strong>{field.label}:</strong>
                        </td>
                        <td
                          className="text-gray-800 break-words max-h-20 overflow-auto py-2"
                          style={{ wordBreak: 'break-word', overflowY: 'auto' }}
                        >
                          {field.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-gray-600 break-words">{section.content}</div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
          disabled={page === 1}
        >
          Anterior
        </button>
        <button
          onClick={handleNextPage}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
          disabled={page * itemsPerPage >= sections.length}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default PreviewSection;
