import * as Yup from 'yup';
const PASSWORD_MIN_LENGTH = 8;

export const validationSchemaUser = Yup.object({
  email: Yup.string()
    .email('Correo electrónico inválido.')
    .required('El correo electrónico es obligatorio.'),
  password: Yup.string()
    .min(
      PASSWORD_MIN_LENGTH,
      `La contraseña debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres.`,
    )
    .matches(/[0-9]/, 'La contraseña debe contener al menos 1 número.')
    .matches(/[a-z]/, 'La contraseña debe contener al menos 1 letra minúscula.')
    .matches(/[A-Z]/, 'La contraseña debe contener al menos 1 letra mayúscula.')
    .matches(/[\W_]/, 'La contraseña debe contener al menos 1 carácter especial.')
    .required('La contraseña es obligatoria.'),
  username: Yup.string()
    .required('El nombre de usuario es obligatorio.'),
  role: Yup.string()
    .required('El rol es obligatorio.'),
});
