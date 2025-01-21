import { Formik, Form } from 'formik';
import CustomInput from '../common/form/CustomInput';
import * as Yup from 'yup';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (year: string, semester: string, description: string) => void;
}

export const CreatePeriodModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const validationSchema = Yup.object({
    year: Yup.string().required('El nombre del proyecto es obligatorio.'),
    semester: Yup.string().required('El nombre del proyecto es obligatorio.'),
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
        <h2 className="text-xl font-bold mb-4">Crear Periodo</h2>
        <Formik
          enableReinitialize={true}
          initialValues={{
            year: '',
            semester: '',
            description: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            onCreate(values.year, values.semester, values.description);
            resetForm();
            handleClose();
          }}
        >
          {({ isSubmitting, values, resetForm }) => (
            <Form>
              <div className="mb-4">
                <CustomInput
                  name="year"
                  type="text"
                  placeholder="Ingresa el año del periodo"
                  values={values.year}
                />
              </div>
              <div className="mb-4">
                <CustomInput
                  name="semester"
                  type="text"
                  placeholder="Ingresa el semestre al que pertenece"
                  values={values.semester}
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
                  Crear
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreatePeriodModal;
