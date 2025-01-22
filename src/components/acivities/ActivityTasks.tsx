import { FieldArray } from 'formik';
import CustomInput from '../common/form/CustomInput';

const ActivityTasks = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold">Actividades realizadas</h3>
      <FieldArray
        name="tasks"
        render={(arrayHelpers) => (
          <div>
            {arrayHelpers.form.values.tasks.map((_: any, index: any) => (
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
    </div>
  );
};

export default ActivityTasks;
