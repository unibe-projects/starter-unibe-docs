import * as Yup from 'yup';
  
 export const validationSchemaProyect = Yup.object({
    name: Yup.string().required('El nombre del proyecto es obligatorio.'),
    description: Yup.string(),
  });