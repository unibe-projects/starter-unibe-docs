import * as Yup from 'yup';

export const validationSchemaActivities = Yup.object({
  name: Yup.string()
  .transform((value) => value?.toUpperCase()) // Convierte el valor a mayúsculas
  .required('El nombre es requerido.'),
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
      }),
    )
    .min(1, 'Debe agregar al menos una tarea.'),
});
