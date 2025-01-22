import { Formik, Form } from 'formik';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomInput from '../../../components/common/form/CustomInput';
import LoadingButton from '../../../components/loadings/buttons/LoadingButton';
import Message from '../../../error/messages/Message';
import { useMutation } from '@apollo/client';
import { CREATE_ACTIVITY, CREATE_ACTIVITY_TASKS, CREATE_ACTIVITY_ACTIVITY_TASKS, LIST_ACTIVITIES } from '../../../services/activities/activitiesServices';
import ActivityTasks from '../../../components/acivities/ActivityTasks';
import { validationSchemaActivities } from './validationSchemaActivities';

const CreateActivitiesScreen = () => {
  const location = useLocation();
  const { activityProyectId, activityPeriodId } = location.state || {};
  const navigate = useNavigate();
  const [createActivity] = useMutation(CREATE_ACTIVITY);
  const [createTask] = useMutation(CREATE_ACTIVITY_TASKS);
  const [createActivityTask] = useMutation(CREATE_ACTIVITY_ACTIVITY_TASKS, {
      refetchQueries: [{ query: LIST_ACTIVITIES(activityProyectId ?? '', activityPeriodId ?? '' )}],
      awaitRefetchQueries: true,
    });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFormSubmit = async (values: any) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const formattedDate = values.activity_date
        ? new Date(values.activity_date).toISOString().split('T')[0]
        : null;

      // Crear la actividad
      const { data: activityData } = await createActivity({
        variables: {
          activityProyectId,
          activityPeriodId,
          activity_date: formattedDate,
          start_time: values.start_time,
          hora_fin: values.hora_fin,
          executing_institution: values.executing_institution,
          project_manager: values.project_manager,
          charge: values.charge,
          unit: values.unit,
          general_objective: values.general_objective,
          number_participants: values.number_participants,
          budget_used: values.budget_used,
        },
      });

      const activityId = activityData.createActivity.id;

      // Crear las tareas y vincularlas con la actividad
      for (const task of values.tasks) {
        const { data: taskData } = await createTask({
          variables: {
            name: task.name,
            description: task.description,
          },
        });

        const taskId = taskData.createActivityTasks.id;

        await createActivityTask({
          variables: {
            activityTasksId: taskId,
            activityId,
          },
        });
      }

      navigate(`/proyecto/periodo/activities`);
    } catch (error: any) {
      setErrorMessage(error.message || 'Error al crear la actividad.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">Crear Actividad</h2>

        {errorMessage && <Message text={errorMessage} type="error" />}

        <Formik
          initialValues={{
            charge: '',
            activity_date: '',
            start_time: '',
            hora_fin: '',
            executing_institution: '',
            project_manager: '',
            unit: '',
            general_objective: '',
            number_participants: '',
            budget_used: '',
            tasks: [{ name: '', description: '' }],
          }}
          validationSchema={validationSchemaActivities}
          onSubmit={handleFormSubmit}
        >
          {({ values, isSubmitting }) => (
            <Form className="space-y-4">
              <CustomInput name="charge" type="text" placeholder="Cargo" />
              <CustomInput name="activity_date" type="date" placeholder="Fecha de la actividad" />
              <CustomInput name="start_time" type="time" placeholder="Hora de inicio" />
              <CustomInput name="hora_fin" type="time" placeholder="Hora de finalización" />
              <CustomInput name="executing_institution" type="text" placeholder="Institución ejecutora" />
              <CustomInput name="project_manager" type="text" placeholder="Gestor del proyecto" />
              <CustomInput name="unit" type="text" placeholder="Unidad" />
              <CustomInput name="general_objective" type="text" placeholder="Objetivo general" />
              <CustomInput name="number_participants" type="number" placeholder="Número de participantes" />
              <CustomInput name="budget_used" type="text" placeholder="Presupuesto utilizado" />

              <ActivityTasks />

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="w-full px-5 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {isLoading ? <LoadingButton text="Cargando..." /> : 'Crear Actividad'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateActivitiesScreen;
