import { FieldArray } from 'formik';
import { Task } from '../../pages/modules/activities/CreateActivitiesScreen';
import CustomInputActivities from '../common/form/CustomInputActivities';

interface ActivityTasksProps {
  setFieldValue: (field: string, value: any) => void;
  tasks: Task[];
  onChange: (updatedTasks: Task[]) => void;
}

const ActivityTasks: React.FC<ActivityTasksProps> = ({ setFieldValue, tasks, onChange }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold">Actividades realizadas</h3>
      <FieldArray
        name="tasks"
        render={(arrayHelpers) => (
          <div>
            {tasks.map((task, index) => (
              <div key={index} className="space-y-2">
                <CustomInputActivities
                  name={`tasks[${index}].name`}
                  type="text"
                  placeholder={`Nombre de la actividad ${index + 1}`}
                  values={task.name}
                  onChange={(e) => {
                    const updatedTasks = [...tasks];
                    updatedTasks[index].name = e.target.value;
                    onChange(updatedTasks);
                    setFieldValue('tasks', updatedTasks);
                  }}
                />
                <CustomInputActivities
                  name={`tasks[${index}].description`}
                  type="text"
                  placeholder={`Descripción de la actividad ${index + 1}`}
                  values={task.description}
                  onChange={(e) => {
                    const updatedTasks = [...tasks];
                    updatedTasks[index].description = e.target.value;
                    onChange(updatedTasks);
                    setFieldValue('tasks', updatedTasks);
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const updatedTasks = [...tasks];
                    updatedTasks.splice(index, 1);
                    onChange(updatedTasks);
                    setFieldValue('tasks', updatedTasks);
                  }}
                  className="text-red-500"
                >
                  Eliminar
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const newTask = { name: '', description: '' };
                const updatedTasks = [...tasks, newTask];
                onChange(updatedTasks);
                setFieldValue('tasks', updatedTasks);
              }}
              className="mt-4 text-blue-500"
            >
              Agregar Tarea
            </button>
          </div>
        )}
      />
    </div>
  );
};

export default ActivityTasks;
