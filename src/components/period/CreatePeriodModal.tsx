import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomInput from '../common/form/CustomInput';

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
  const currentYear = new Date().getFullYear();

  const periods = ['1', '2', '3', '4', '5'];

  const validationSchema = Yup.object({
    year: Yup.string().required('El año es obligatorio.'),
    semester: Yup.string().required('El semestre es obligatorio.'),
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
            year: currentYear.toString(),
            semester: '1',
            description: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            onCreate(values.year, values.semester, values.description);
            resetForm();
            handleClose();
          }}
        >
          {({ isSubmitting, values, resetForm, setFieldValue }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="year" className="block mb-2 font-semibold">Año</label>
                <select
                  name="year"
                  value={values.year}
                  onChange={(e) => setFieldValue('year', e.target.value)}
                  className="w-full border p-2 rounded-md"
                  disabled
                >
                  <option value={currentYear}>{currentYear}</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="semester" className="block mb-2 font-semibold">Semestre</label>
                <select
                  name="semester"
                  value={values.semester}
                  onChange={(e) => setFieldValue('semester', e.target.value)}
                  className="w-full border p-2 rounded-md"
                >
                  {periods.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <CustomInput
                  name="description"
                  type="textarea"
                  placeholder="Descripción del periodo"
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
