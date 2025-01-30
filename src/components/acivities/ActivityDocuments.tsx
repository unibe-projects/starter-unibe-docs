import React, { useState } from "react";
import { Documents } from "../../pages/modules/activities/CreateActivitiesScreen";

interface ActivityDocumentsProps {
  documents: Documents[];
  handleDocumentUpload: (files: Documents[]) => void;
}

const ALLOWED_NAMES = [
  "Presupuesto",
  "Lista de participantes",
  "Fotos",
  "Memorando de gestión",
  "Artes gráficos de difusión",
] as const;

type DocumentName = (typeof ALLOWED_NAMES)[number];

const ActivityDocuments: React.FC<ActivityDocumentsProps> = ({
  documents,
  handleDocumentUpload,
}) => {
  // Estado local para gestionar los documentos seleccionados
  const [selectedDocuments, setSelectedDocuments] = useState<Documents[]>(documents);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: DocumentName
  ) => {
    if (event.target.files) {
      const newFiles: Documents[] = Array.from(event.target.files).map((file) => ({
        name, // Asignar el nombre según el input
        description: "",
        tags: file.name.split(".").pop() || "",
        file,
      }));

      // Si el nombre es "Fotos", agregamos varios archivos
      if (name === "Fotos") {
        const updatedDocuments = [
          ...selectedDocuments,
          ...newFiles, // Acumular los archivos de "Fotos"
        ];

        setSelectedDocuments(updatedDocuments);
        handleDocumentUpload(updatedDocuments);

        // Mostrar el arreglo final de documentos seleccionados
        // console.log("Documentos después de subir en Fotos:", updatedDocuments);
      } else {
        // Si no es "Fotos", solo agregamos un archivo
        const updatedDocuments = [
          ...selectedDocuments.filter((doc) => doc.name !== name), // Eliminar el archivo previamente seleccionado de ese tipo
          ...newFiles, // Agregar el nuevo archivo
        ];

        setSelectedDocuments(updatedDocuments);
        handleDocumentUpload(updatedDocuments);

        // Mostrar el arreglo final de documentos seleccionados
        // console.log("Documentos después de subir en otro tipo:", updatedDocuments);
      }
    }
  };

  const removeFile = (fileName: string) => {
    // Eliminar solo el archivo específico
    const updatedDocuments = selectedDocuments.filter((doc) => doc.file.name !== fileName);

    // Actualizar el estado después de eliminar el archivo
    setSelectedDocuments(updatedDocuments);
    handleDocumentUpload(updatedDocuments);

    // // Mostrar el arreglo final de documentos seleccionados después de eliminar un archivo
    // console.log("Documentos después de eliminar:", updatedDocuments);
  };

  return (
    <div className="space-y-4">
      <label className="block text-gray-700 font-semibold">
        Adjuntar Documentos
      </label>

      {ALLOWED_NAMES.map((name) => (
        <div key={name} className="space-y-2">
          <label className="block text-gray-700 font-medium">{name}</label>
          <input
            type="file"
            multiple={name === "Fotos"} // Permitir múltiples archivos solo para "Fotos"
            accept=".jpg, .jpeg, .png, .pdf, .doc, .docx, .xls, .xlsx" // Permitir imágenes y documentos
            onChange={(e) => handleFileChange(e, name)}
            className="w-full p-2 border rounded-lg"
          />

          {/* Mostrar lista de archivos correctamente para cada tipo */}
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
