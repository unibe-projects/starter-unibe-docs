import React, { useState } from 'react';
import { Documents } from '../../interface/activities/activities.interface';

interface ActivityDocumentsProps {
  documents: Documents[];
  handleDocumentUpload: (files: Documents[]) => void;
}

const ALLOWED_NAMES = [
  'Presupuesto',
  'Lista de participantes',
  'Fotos',
  'Memorando de gestión',
  'Artes gráficos de difusión',
] as const;

type DocumentName = (typeof ALLOWED_NAMES)[number];

const ActivityDocuments: React.FC<ActivityDocumentsProps> = ({
  documents,
  handleDocumentUpload,
}) => {
  // Estado local para gestionar los documentos seleccionados
  const [selectedDocuments, setSelectedDocuments] = useState<Documents[]>(documents);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, name: DocumentName) => {
    if (event.target.files) {
      const newFiles: Documents[] = Array.from(event.target.files).map((file) => ({
        name,
        description: '',
        tags: file.name.split('.').pop() || '',
        file,
      }));
      if (name === 'Fotos') {
        const updatedDocuments = [...selectedDocuments, ...newFiles];

        setSelectedDocuments(updatedDocuments);
        handleDocumentUpload(updatedDocuments);
      } else {
        const updatedDocuments = [
          ...selectedDocuments.filter((doc) => doc.name !== name),
          ...newFiles,
        ];

        setSelectedDocuments(updatedDocuments);
        handleDocumentUpload(updatedDocuments);
      }
    }
  };

  const removeFile = (fileName: string) => {
    const updatedDocuments = selectedDocuments.filter((doc) => doc.file.name !== fileName);
    setSelectedDocuments(updatedDocuments);
    handleDocumentUpload(updatedDocuments);
  };

  return (
    <div className="space-y-4">
      <label className="block text-gray-700 font-semibold">Adjuntar Documentos</label>

      {ALLOWED_NAMES.map((name) => (
        <div key={name} className="space-y-2">
          <label className="block text-gray-700 font-medium">{name}</label>
          <input
            type="file"
            multiple={name === 'Fotos'}
            accept=".jpg, .jpeg, .png, .pdf, .doc, .docx, .xls, .xlsx"
            onChange={(e) => handleFileChange(e, name)}
            className="w-full p-2 border rounded-lg"
          />
          {selectedDocuments.filter((doc) => doc.name === name).length > 0 && (
            <div className="space-y-1 bg-gray-100 p-2 rounded-lg">
              {selectedDocuments
                .filter((doc) => doc.name === name)
                .map((doc) => (
                  <div
                    key={doc.file.name}
                    className="flex items-center justify-between p-1 border-b"
                  >
                    <span className="text-sm text-gray-700">{doc.file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(doc.file.name)}
                      className="px-2 py-1 text-red-600 hover:text-red-800"
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ActivityDocuments;
