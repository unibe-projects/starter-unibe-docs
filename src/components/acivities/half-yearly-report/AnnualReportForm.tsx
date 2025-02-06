import { Form, Formik, Field } from 'formik';
import { useQuery } from '@apollo/client';
import { GET_COMPLETED_ACTIVITIES } from '../../../services/activities/activitiesServices';
import { useLocation } from 'react-router-dom';
import CustomInputActivities from '../../../components/common/form/CustomInputActivities';
import { validationSchemaReportHalfYearly } from '../../../pages/modules/activities/validationSchemaActivities';
import { reporterSemester } from '../../../utils/reports/reports-semester/reporterSemester';
import LoadingSpinner from '../../loadings/spinner/LoadingSpinner';
import ErrorMessage from '../../../error/messages/ErrorMessageRefresh';
import NoDataMessage from '../../common/NoContent/NoDataMessage';

interface FormData {
  executing_institution: string;
  project_manager: string;
  charge: string;
  unit: string;
  general_objective: string;
  project_scope: string;
  project_proposal: string;
  states_advances: string;
  problems_risks: string;
  upcoming_tasks: string;
  signature: File | null;
}

const AnnualReportForm = () => {
  const location = useLocation();
  const { periodProyectId, periodId, periodYear, periodSemester, nameProyect } =
    location.state || {};

  const { data, loading, error, refetch } = useQuery(GET_COMPLETED_ACTIVITIES, {
    variables: { activityPeriodId: periodId, activityProyectId: periodProyectId },
  });

  const listActivities = data?.listActivities?.items.length

  const handleRetryFetch = () =>{
    refetch();
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message="Intentalo otra vez." onRetry={handleRetryFetch} />;
  }

  if (listActivities > 2) {
    return (
      <NoDataMessage mesagge='No hay actividades realizadas o culminadas para realizar el informe.'/>
    );
  }  


  return (
    <Formik
      initialValues={{
        executing_institution: '',
        project_manager: '',
        charge: '',
        unit: '',
        general_objective: '',
        project_scope: '',
        project_proposal: '',
        states_advances: '',
        problems_risks: '',
        upcoming_tasks: '',
        signature: null,
      }}
      validationSchema={validationSchemaReportHalfYearly}
      onSubmit={async (values) => {
        const completedActivities = data?.listActivities?.items || [];
        await reporterSemester({
          ...values,
          completedActivities,
          periodYear,
          periodSemester,
          nameProyect,
        });
      }}
    >
      {({ values, handleChange, setFieldValue }) => {
        const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const file = event.target.files ? event.target.files[0] : null;
          setFieldValue("signature", file);
        };

        return (
          <Form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <CustomInputActivities
                  name="executing_institution"
                  placeholder="Institución Ejecutora"
                  type="text"
                  onChange={handleChange}
                  values={values.executing_institution}
                />
              </div>
              <div>
                <CustomInputActivities
                  name="project_manager"
                  placeholder="Responsable del Proyecto"
                  type="text"
                  onChange={handleChange}
                  values={values.project_manager}
                />
              </div>
              <div>
                <CustomInputActivities
                  name="charge"
                  placeholder="Cargo"
                  type="text"
                  onChange={handleChange}
                  values={values.charge}
                />
              </div>
              <div>
                <CustomInputActivities
                  name="unit"
                  placeholder="Unidad"
                  type="text"
                  onChange={handleChange}
                  values={values.unit}
                />
              </div>
            </div>
            <div>
              <CustomInputActivities
                name="general_objective"
                type="text"
                as="textarea"
                placeholder="Objetivo general"
                onChange={handleChange}
                values={values.general_objective}
              />
            </div>
            <div>
              <CustomInputActivities
                name="project_scope"
                type="text"
                as="textarea"
                placeholder="Ámbito del proyecto"
                onChange={handleChange}
                values={values.project_scope}
              />
            </div>
            <div>
              <CustomInputActivities
                name="project_proposal"
                type="text"
                as="textarea"
                placeholder="Propuesta del proyecto"
                onChange={handleChange}
                values={values.project_proposal}
              />
            </div>
            <div>
              <CustomInputActivities
                name="states_advances"
                type="text"
                as="textarea"
                placeholder="ESTADOS Y AVANCES: LO POSITIVO"
                onChange={handleChange}
                values={values.states_advances}
              />
            </div>
            <div>
              <CustomInputActivities
                name="problems_risks"
                type="text"
                as="textarea"
                placeholder="PROBLEMAS Y RIESGOS: LO NEGATIVO"
                onChange={handleChange}
                values={values.problems_risks}
              />
            </div>
            <div>
              <CustomInputActivities
                name="upcoming_tasks"
                type="text"
                as="textarea"
                placeholder="PRÓXIMAS TAREAS O ACTIVIDADES"
                onChange={handleChange}
                values={values.upcoming_tasks}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Firma (Imagen)</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-indigo-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition duration-200"
              >
                Generar PDF
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AnnualReportForm;
