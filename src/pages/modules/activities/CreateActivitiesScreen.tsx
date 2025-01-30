import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import {
  CREATE_ACTIVITY,
  CREATE_ACTIVITY_TASKS,
  CREATE_ACTIVITY_ACTIVITY_TASKS,
  LIST_ACTIVITIES,
  GET_ACTIVITIES,
} from '../../../services/activities/activitiesServices';
import FormSection from '../../../components/acivities/FormSection';
import PreviewSection from '../../../components/acivities/documentView/PreviewSection';
import useErrorHandler from '../../../hooks/errors/useErrorHandler';
import { ActivitiesStatusEnum } from '../../../enums/activities/ActivitiesStatusEnum';
import { CREATE_DOCUMENTS, CREATE_ACTIVITY_DOCUMENTS } from '../../../services/documents/documents';
import { handleUpload } from '../../../services/s3/S3Service';
import {
  LocationState,
  Activities,
  FormValues,
  Task,
  Documents,
} from '../../../interface/activities/activities.interface';

const CreateActivitiesScreen: React.FC = () => {
  const location = useLocation();
  const { periodProyectId: activityProyectId, periodId: activityPeriodId, periodYear, periodSemester, nameProyect } =
    (location.state as LocationState) || {};
  const navigate = useNavigate();
  const [createActivity] = useMutation(CREATE_ACTIVITY);
  const [createTask] = useMutation(CREATE_ACTIVITY_TASKS);
  const [createDocument] = useMutation(CREATE_DOCUMENTS);
  const [createActivityDocument] = useMutation(CREATE_ACTIVITY_DOCUMENTS);
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
    documents: [],
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
    documents: [],
  };

  const handleFormSubmit = async (
    values: FormValues & { tasks: Task[] } & { documents: Documents[] },
  ) => {
    setIsLoading(true);
    try {
      const formattedDate = values.activity_date
        ? new Date(values.activity_date).toISOString().split('T')[0]
        : null;
      const formattedStartTime = `${values.start_time}:00.000`;
      const formattedHoraFin = `${values.hora_fin}:00.000`;

      const activityId = await createNewActivity({
        activityProyectId,
        activityPeriodId,
        formattedDate,
        formattedStartTime,
        formattedHoraFin,
        previewData,
        values,
      });

      await processTasksAndDocuments(values.tasks, values.documents, activityId);

      navigateToActivity();
    } catch (error) {
      console.error('Error:', error);
      handleError({ error });
    } finally {
      setIsLoading(false);
    }
  };

  const createNewActivity = async ({
    activityProyectId,
    activityPeriodId,
    formattedDate,
    formattedStartTime,
    formattedHoraFin,
    previewData,
    values,
  }: {
    activityProyectId: string;
    activityPeriodId: string;
    formattedDate: string | null;
    formattedStartTime: string;
    formattedHoraFin: string;
    previewData: Activities;
    values: FormValues;
  }): Promise<string> => {
    const { data } = await createActivity({
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
    return data.createActivity.id;
  };

  const processTasksAndDocuments = async (
    tasks: Task[],
    documents: Documents[],
    activityId: string,
  ): Promise<void> => {
    for (const task of tasks) {
      const taskId = await createNewTask(task);
      await linkTaskToActivity(taskId, activityId);
    }
    await processDocuments(documents, activityId);
  };

  const createNewTask = async (task: Task): Promise<string> => {
    const { data } = await createTask({
      variables: {
        name: task.name,
        description: task.description,
      },
    });
    return data.createActivityTasks.id;
  };

  const linkTaskToActivity = async (taskId: string, activityId: string): Promise<void> => {
    await createActivityTask({
      variables: {
        activityTasksId: taskId,
        activityId,
      },
    });
  };

  const processDocuments = async (documents: Documents[], activityId: string): Promise<void> => {
    for (const file of documents) {
      const timestamp = Date.now();
      const extension = file.file.name.split('.').pop();
      const fileName = `public/assets/documents/${file.file.name}_${timestamp}.${extension}`;
      const uploadedPath = await handleUpload(fileName, file.file);
      const documentId = await createNewDocument(file, uploadedPath);
      await linkDocumentToActivity(documentId, activityId);
    }
  };

  const createNewDocument = async (file: Documents, uploadedPath: string): Promise<string> => {
    const { data } = await createDocument({
      variables: {
        name: file.name,
        path: uploadedPath,
        tags: file.tags,
      },
    });
    return data.createDocuments.id;
  };

  const linkDocumentToActivity = async (documentId: string, activityId: string): Promise<void> => {
    await createActivityDocument({
      variables: {
        documentsId: documentId,
        activityId,
      },
    });
  };

  const navigateToActivity = () => {
    navigate('/proyecto/periodo/actividad', {
      state: {
        periodProyectId: activityProyectId,
        periodId: activityPeriodId,
        periodYear,
        periodSemester,
        nameProyect,
      },
    });
  };

  return (
    <div className="flex flex-col lg:flex-row items-start w-full min-h-screen p-6">
      <div className="flex-1 w-full lg:w-1/2 px-2">
        <PreviewSection previewData={previewData} iscreate/>
      </div>
      <div className="flex-1 w-full lg:w-1/2 px-2">
        <FormSection
          handleFormSubmit={handleFormSubmit}
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
