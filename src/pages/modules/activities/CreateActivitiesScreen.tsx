import { Formik, Field, Form, FieldArray } from 'formik';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import CustomInput from '../../../components/common/form/CustomInput';
import LoadingButton from '../../../components/loadings/buttons/LoadingButton';
import Message from '../../../error/messages/Message';
import { useMutation } from '@apollo/client';
import {
  CREATE_ACTIVITY,
  CREATE_ACTIVITY_ACTIVITY_TASKS,
  CREATE_ACTIVITY_TASKS,
} from '../../../services/activities/activitiesServices';

const CreateActivitiesScreen = () => {
  const { activityProyectId, activityPeriodId } = useParams<{
    activityProyectId: string;
    activityPeriodId: string;
  }>();
  const navigate = useNavigate();
  const [createActivity] = useMutation(CREATE_ACTIVITY);
  const [createTask] = useMutation(CREATE_ACTIVITY_TASKS);
  const [createActivityTask] = useMutation(CREATE_ACTIVITY_ACTIVITY_TASKS);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validationSchema = Yup.object({
    charge: Yup.string().required('El cargo es requerido.'),
    activity_date: Yup.date().required('La fecha de la actividad es requerida.'),
    start_time: Yup.string().required('La hora de inicio es requerida.'),
    hora_fin: Yup.string().required('La hora de finalización es requerida.'),
    executing_institution: Yup.string(),
    project_manager: Yup.string(),
    unit: Yup.string(),
    general_objective: Yup.string(),
    number_participants: Yup.number()
      .positive('Debe ser un número positivo.')
      .integer('Debe ser un número entero.'),
    budget_used: Yup.string(),
    tasks: Yup.array()
      .of(
        Yup.object({
          name: Yup.string().required('El nombre de la tarea es requerido.'),
          description: Yup.string(),
        })
      )
      .min(1, 'Debe agregar al menos una tarea.'),
  });

  const handleFormSubmit = async (values: any) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const formattedDate = values.activity_date
      ? new Date(values.activity_date).toISOString().split('T')[0] // Solo la parte de la fecha
      : null;

      // Crear la actividad
      const { data: activityData } = await createActivity({
        variables: {
          activityProyectId: activityProyectId,
          activityPeriodId: activityPeriodId,
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

      console.log('id actividad:', activityId);

      // Crear las tareas y vincularlas con la actividad
      for (const task of values.tasks) {
        const { data: taskData } = await createTask({
          variables: {
            name: task.name,
            description: task.description,
          },
        });

        const taskId = taskData.createActivityTasks.id;

        console.log('task:', taskId);

        await createActivityTask({
          variables: {
            activityTasksId: taskId,
            activityId,
          },
        });
      }

      navigate(`/proyecto/${activityProyectId}/periodo/${activityPeriodId}/activities`);
    } catch (error: any) {
      setErrorMessage(error.message || 'Error al crear la actividad.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
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
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ values, isSubmitting }) => (
            <Form className="space-y-4">
              <CustomInput name="charge" type="text" placeholder="Cargo" />
              <CustomInput name="activity_date" type="date" placeholder="Fecha de la actividad" />
              <CustomInput name="start_time" type="time" placeholder="Hora de inicio" />
              <CustomInput name="hora_fin" type="time" placeholder="Hora de finalización" />
              <CustomInput
                name="executing_institution"
                type="text"
                placeholder="Institución ejecutora"
              />
              <CustomInput name="project_manager" type="text" placeholder="Gestor del proyecto" />
              <CustomInput name="unit" type="text" placeholder="Unidad" />
              <CustomInput
                name="general_objective"
                type="text"
                placeholder="Objetivo general"
              />
              <CustomInput
                name="number_participants"
                type="number"
                placeholder="Número de participantes"
              />
              <CustomInput name="budget_used" type="text" placeholder="Presupuesto utilizado" />

              <h3 className="text-lg font-semibold">Actividades realizadas</h3>
              <FieldArray
                name="tasks"
                render={(arrayHelpers) => (
                  <div>
                    {values.tasks.map((_, index) => (
                      <div key={index} className="space-y-2">
                        <CustomInput
                          name={`tasks[${index}].name`}
                          type="text"
                          placeholder={`Nombre de la actividad ${index + 1}`}
                        />
                        <CustomInput
                          name={`tasks[${index}].description`}
                          type="text"
                          placeholder={`Descripción de la actividad ${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                          className="text-red-500"
                        >
                          Eliminar
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => arrayHelpers.push({ name: '', description: '' })}
                      className="mt-4 text-blue-500"
                    >
                      Agregar Tarea
                    </button>
                  </div>
                )}
              />

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
