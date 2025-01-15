import { Formik, Form } from 'formik';
import { validationSchemaPatience } from '../../pages/modules/patience/validationSchemaPatience';
import CustomInput from '../common/form/CustomInput';
import LoadingButton from '../loadings/buttons/LoadingButton';

type FormValues = {
  cedula_patient: string;
  name: string;
  last_name: string;
};

type Props = {
  onSubmit: (values: FormValues) => Promise<void>;
  isLoading: boolean;
};

const PatienceForm = ({ onSubmit, isLoading }: Props) => {
  return (
    <div className="w-1/2 bg-gray-100 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Crear Paciente</h1>
      <Formik
        initialValues={{
          cedula_patient: '',
          name: '',
          last_name: '',
        }}
        validationSchema={validationSchemaPatience}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form className="space-y-6">
            <CustomInput
              name="cedula_patient"
              type="text"
              placeholder="Ingrese el número de cédula del paciente"
              values={values.cedula_patient}
            />
            <CustomInput
              name="name"
              type="text"
              placeholder="Ingrese los nombres del paciente"
              values={values.name}
            />
            <CustomInput
              name="last_name"
              type="text"
              placeholder="Ingrese los apellidos del paciente"
              values={values.last_name}
            />
            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="w-full px-5 py-3 font-semibold text-white bg-dark-primary rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              >
                {isLoading ? <LoadingButton text="Cargando ...." /> : 'Crear paciente'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PatienceForm;
