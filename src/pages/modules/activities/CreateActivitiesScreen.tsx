import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { validationSchemaActivities } from './validationSchemaActivities';
import {
  CREATE_ACTIVITY,
  CREATE_ACTIVITY_TASKS,
  CREATE_ACTIVITY_ACTIVITY_TASKS,
  LIST_ACTIVITIES,
  GET_ACTIVITIES,
} from '../../../services/activities/activitiesServices';
import FormSection from '../../../components/acivities/FormSection';
import PreviewSection from '../../../components/acivities/PreviewSection';
import useErrorHandler from '../../../hooks/errors/useErrorHandler';
import { ActivitiesStatusEnum } from '../../../enums/activities/ActivitiesStatusEnum';

export interface Task {
  name: string;
  description: string;
}

export interface Activities {
  activityProyectId: string;
  activityPeriodId: string;
  name: string;
  activity_date: string;
  start_time: string;
  hora_fin: string;
  executing_institution: string;
  project_manager: string;
  charge: string;
  unit: string;
  general_objective: string;
  number_participants: string;
  budget_used: string;
  project_name: string;
  report_period: string;
  tasks: Task[];
}

export interface FormValues {
  activity_date: string;
  start_time: string;
  hora_fin: string;
  executing_institution: string;
  project_manager: string;
  charge: string;
  unit: string;
  general_objective: string;
  number_participants: string;
  budget_used: string;
}

export interface LocationState {
  activityProyectId: string;
  activityPeriodId: string;
  periodYear: string;
  periodSemester: string;
  nameProyect: string;
}

interface InitialValues {
  project_name: string;
  report_period: string;
  tasks: Task[];
}

const CreateActivitiesScreen: React.FC = () => {
  const location = useLocation();
  const { activityProyectId, activityPeriodId, periodYear, periodSemester, nameProyect } =
    (location.state as LocationState) || {};
  const navigate = useNavigate();
  const [createActivity] = useMutation(CREATE_ACTIVITY);
  const [createTask] = useMutation(CREATE_ACTIVITY_TASKS);
  const [createActivityTask] = useMutation(CREATE_ACTIVITY_ACTIVITY_TASKS, {
    refetchQueries: [
      { query: LIST_ACTIVITIES(activityProyectId ?? '', activityPeriodId ?? '') },
      { query: GET_ACTIVITIES },
    ],
    awaitRefetchQueries: true,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { handleError, errorMessage } = useErrorHandler();

  const [previewData, setPreviewData] = useState<Activities>({
    activityProyectId: activityProyectId ?? '',
    activityPeriodId: activityPeriodId ?? '',
    name: '',
    project_manager: '',
    activity_date: '',
    start_time: '',
    hora_fin: '',
    executing_institution: '',
    charge: '',
    unit: '',
    general_objective: '',
    number_participants: '',
    budget_used: '',
    project_name: nameProyect ?? '',
    report_period: `${periodYear ?? ''} - ${periodSemester ?? ''}`,
    tasks: [],
  });

  const initialValues: Activities = {
    activityProyectId: activityProyectId ?? '',
    activityPeriodId: activityPeriodId ?? '',
    name: '',
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
    project_name: nameProyect ?? '',
    report_period: `${periodYear ?? ''} - ${periodSemester ?? ''}`,
    tasks: [],
  };

  const handleFormSubmit = async (values: FormValues & { tasks: Task[] }) => {
    setIsLoading(true);
    try {
      const formattedDate = values.activity_date
        ? new Date(values.activity_date).toISOString().split('T')[0]
        : null;

      const formattedStartTime = `${values.start_time}:00.000`;
      const formattedHoraFin = `${values.hora_fin}:00.000`;

      const { data: activityData } = await createActivity({
        variables: {
          activityProyectId,
          activityPeriodId,
          activity_date: formattedDate,
          start_time: formattedStartTime,
          hora_fin: formattedHoraFin,
          executing_institution: previewData.executing_institution,
          project_manager: previewData.project_manager,
          charge: previewData.charge,
          unit: previewData.unit,
          general_objective: values.general_objective,
          number_participants: values.number_participants,
          budget_used: values.budget_used,
          status: ActivitiesStatusEnum.EARRING,
          name: previewData.name,
        },
      });

      const activityId = activityData.createActivity.id;
      const tasksp = values.tasks;
      for (const task of tasksp) {
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

      navigate('/proyecto/periodo/actividad', {
        state: {
          periodProyectId: activityProyectId,
          periodId: activityPeriodId,
          periodYear,
          periodSemester,
          nameProyect,
        },
      });
    } catch (error) {
      console.error('error', error);
      handleError({ error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-start w-full min-h-screen p-6">
      <div className="flex-1 w-full lg:w-1/2 px-2">
        <PreviewSection previewData={previewData} />
      </div>
      <div className="flex-1 w-full lg:w-1/2 px-2">
        <FormSection
          handleFormSubmit={handleFormSubmit}
          validationSchema={validationSchemaActivities}
          previewData={previewData}
          setPreviewData={setPreviewData}
          errorMessage={errorMessage}
          isLoading={isLoading}
          initialValues={initialValues}
        />
      </div>
    </div>
  );
};

export default CreateActivitiesScreen;
