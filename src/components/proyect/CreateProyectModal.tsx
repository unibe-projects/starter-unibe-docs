import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { handleUpload } from '../../services/s3/S3Service';
import CustomInput from '../common/form/CustomInput';
import { validationSchemaProyect } from '../../pages/modules/proyect/validationSchemaProyect';

export interface Proyect {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  path: string;
}

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, description: string, path: string) => void;
  onEdit: (id: string, name: string, description: string, path: string) => void;
  selectedProject: Proyect | null;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  onEdit,
  selectedProject,
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImageFile(event.target.files[0]); // Guardar la imagen seleccionada
    }
  };

  const handleClose = () => {
    onClose();
    setImageFile(null);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {selectedProject ? 'Editar Proyecto' : 'Crear Proyecto'}
        </h2>
        <Formik
          enableReinitialize={true}
          initialValues={{
            name: selectedProject?.name || '',
            description: selectedProject?.description || '',
            path: selectedProject?.path || '',
          }}
          validationSchema={validationSchemaProyect}
          onSubmit={async (values, { resetForm }) => {
            try {
              let path = selectedProject?.path || '';

              if (imageFile) {
                // Subir la imagen al bucket S3
                const timestamp = Date.now(); // Evitar nombres duplicados
                const extension = imageFile.name.split('.').pop();
                const fileName = `public/assets/proyect/${values.name}_${timestamp}.${extension}`;
                const res = await handleUpload(fileName, imageFile);
                path = res;
              }
              if (selectedProject) {
                onEdit(selectedProject.id, values.name, values.description, path);
              } else {
                onCreate(values.name, values.description, path);
              }

              resetForm();
              handleClose();
            } catch (error) {
              console.error('Error al enviar el formulario:', error);
            }
          }}
        >
          {({ isSubmitting, values, resetForm }) => (
            <Form>
              <div className="mb-4">
                <CustomInput
                  name="name"
                  type="text"
                  placeholder="Ingresa el nombre del proyecto"
                  values={values.name}
                />
              </div>
              <div className="mb-4">
                <CustomInput
                  name="description"
                  type="textarea"
                  placeholder="Descripción del proyecto"
                  values={values.description}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Imagen del Proyecto
                </label>
                <input
                  name="path"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {selectedProject?.path && (
                  <p className="text-sm text-gray-500 mt-2">
                    Archivo actual: {selectedProject.path.split('/').pop()}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                  onClick={() => {
                    resetForm();
                    handleClose();
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  disabled={isSubmitting}
                >
                  {selectedProject ? 'Guardar Cambios' : 'Crear'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateProjectModal;
