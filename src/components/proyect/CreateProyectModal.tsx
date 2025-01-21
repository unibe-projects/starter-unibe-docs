import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomInput from '../common/form/CustomInput';
import { Proyect } from '../../pages/modules/proyect/ProyectScreen';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, description: string) => void;
  onEdit: (id: string, name: string, description: string) => void;
  selectedProject: Proyect | null;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  onEdit,
  selectedProject,
}) => {
  const validationSchema = Yup.object({
    name: Yup.string().required('El nombre del proyecto es obligatorio.'),
    description: Yup.string(),
  });

  const handleClose = () => {
    onClose();
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
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            if (selectedProject) {
              onEdit(selectedProject.id, values.name, values.description);
            } else {
              onCreate(values.name, values.description);
            }
            resetForm();
            handleClose();
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
