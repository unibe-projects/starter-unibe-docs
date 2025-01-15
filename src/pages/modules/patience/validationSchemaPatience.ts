import * as Yup from 'yup';
import { isValidCedula } from '../../../utils/patience/validateCedula';

const cedulaEcuadorRegex = /^[0-9]{10}$/;
const CEDULA_LEGTH = 10;

export const validationSchemaPatience = Yup.object({
  cedula_patient: Yup.string()
    .required('La cédula es obligatoria')
    .matches(cedulaEcuadorRegex, 'La cédula debe ser solo números y tener 10 dígitos')
    .length(CEDULA_LEGTH, 'La cédula debe tener 10 dígitos')
    .test('cedula-validate', 'Verifica que la cedula sea valida.', async (value) => {
      const isValid = await isValidCedula(value);
      return isValid;
    }),
  last_name: Yup.string(),
  name: Yup.string(),
});
