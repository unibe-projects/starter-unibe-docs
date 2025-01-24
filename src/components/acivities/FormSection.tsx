import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import Message from '../../error/messages/Message';
import CustomInput from '../common/form/CustomInput';
import LoadingButton from '../loadings/buttons/LoadingButton';
import ActivityTasks from './ActivityTasks';
import { Activities, Task } from '../../pages/modules/activities/CreateActivitiesScreen';

interface FormSectionProps {
  handleFormSubmit: (values: any) => Promise<void>;
  validationSchema: any;
  previewData: any;
  setPreviewData: React.Dispatch<React.SetStateAction<any>>;
  errorMessage: string | null;
  isLoading: boolean;
  initialValues: Activities;
}

const FormSection: React.FC<FormSectionProps> = ({
  handleFormSubmit,
  validationSchema,
  previewData,
  setPreviewData,
  errorMessage,
  isLoading,
  initialValues,
}) => {
  const [tasks, setTasks] = useState<Task[]>(initialValues.tasks || []);

  const handleTaskUpdate = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    setPreviewData((prevData: any) => ({
      ...prevData,
      tasks: updatedTasks,
    }));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-6">Crear Actividad</h2>
      {errorMessage && <Message text={errorMessage} type="error" />}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleFormSubmit({ ...values, tasks })}
        enableReinitialize
      >
        {({ values, isSubmitting, handleChange, setFieldValue }) => {
          const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(e);
            setPreviewData((prevData: any) => ({
              ...prevData,
              [e.target.name]: e.target.value,
            }));
          };

          return (
            <Form className="space-y-4">
              <CustomInput
                name="project_manager"
                placeholder="Responsable del Proyecto"
                onChange={handleInputChange}
                type="text"
                values={values.project_manager}
              />
              <CustomInput
                name="charge"
                type="text"
                placeholder="Cargo"
                onChange={handleInputChange}
                values={values.charge}
              />
               <CustomInput
                name="activity_date"
                type="date"
                placeholder="Fecha de la actividad"
                onChange={handleInputChange}
                values={values.activity_date}
              />
              <CustomInput
                name="start_time"
                type="time"
                placeholder="Hora de inicio"
                onChange={handleInputChange}
                values={values.start_time}
              />
              <CustomInput
                name="hora_fin"
                type="time"
                placeholder="Hora de finalización"
                onChange={handleInputChange}
                values={values.hora_fin}
              />
              <CustomInput
                name="executing_institution"
                type="text"
                placeholder="Institución ejecutora"
                onChange={handleInputChange}
                values={values.executing_institution}
              />
              <CustomInput
                name="unit"
                type="text"
                placeholder="Unidad"
                onChange={handleInputChange}
                values={values.unit}
              />
              <CustomInput
                name="general_objective"
                type="text"
                placeholder="Objetivo general"
                onChange={handleInputChange}
                values={values.general_objective}
              />
              <CustomInput
                name="number_participants"
                type="number"
                placeholder="Número de participantes"
                onChange={handleInputChange}
                values={values.number_participants}
              />
              <CustomInput
                name="budget_used"
                type="text"
                placeholder="Presupuesto utilizado"
                onChange={handleInputChange}
                values={values.budget_used}
              />
              <ActivityTasks tasks={values.tasks} setFieldValue={setFieldValue} onChange={handleTaskUpdate} />
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
          );
        }}
      </Formik>
    </div>
  );
};

export default FormSection;
