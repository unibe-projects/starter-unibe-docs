import * as Yup from 'yup';

const cedulaEcuadorRegex = /^[0-9]{10}$/;
const CEDULA_LEGTH = 10;

export const validationSchemaPatience = Yup.object({
  cedula_patient: Yup.string()
    .required('La cédula es obligatoria')
    .matches(cedulaEcuadorRegex, 'La cédula debe ser solo números y tener 10 dígitos')
    .length(CEDULA_LEGTH, 'La cédula debe tener 10 dígitos'),
  last_name: Yup.string(),
  name: Yup.string(),
});
