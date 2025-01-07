import * as Yup from 'yup';

const PASSWORD_MIN_LENGTH = 8;

export const validationSchemaLogin = Yup.object().shape({
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
});

export const validationSchemaPassword = Yup.object().shape({
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
});

export const validationSchemaEmail = Yup.object().shape({
  email: Yup.string()
    .email('Correo electrónico inválido.')
    .required('El correo electrónico es obligatorio.'),
});

export const validationSchemaUpdatePassword = Yup.object({
  currentPassword: Yup.string()
    .required('La contraseña actual es obligatoria')
    .min(PASSWORD_MIN_LENGTH, `Debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres`)
    .matches(/[0-9]/, 'Debe contener al menos un número')
    .matches(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
    .matches(/[a-z]/, 'Debe contener al menos una letra minúscula')
    .matches(/[^A-Za-z0-9]/, 'Debe contener al menos un carácter especial'),
  newPassword: Yup.string()
    .required('La nueva contraseña es obligatoria')
    .min(PASSWORD_MIN_LENGTH, `Debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres`)
    .matches(/[0-9]/, 'Debe contener al menos un número')
    .matches(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
    .matches(/[a-z]/, 'Debe contener al menos una letra minúscula')
    .matches(/[^A-Za-z0-9]/, 'Debe contener al menos un carácter especial'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Las contraseñas no coinciden')
    .required('Confirmar la nueva contraseña es obligatoria'),
});

export const validationSchemaResetPassword = Yup.object({
  email: Yup.string()
    .email('Correo electrónico inválido')
    .required('El correo es obligatorio'),
  newPassword: Yup.string()
    .required('La nueva contraseña es obligatoria')
    .min(PASSWORD_MIN_LENGTH, `Debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres`)
    .matches(/[0-9]/, 'Debe contener al menos un número')
    .matches(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
    .matches(/[a-z]/, 'Debe contener al menos una letra minúscula')
    .matches(/[^A-Za-z0-9]/, 'Debe contener al menos un carácter especial'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Las contraseñas no coinciden')
    .required('Confirmar la nueva contraseña es obligatoria'),
  confirmationCode: Yup.string()
    .required('El código de confirmación es obligatorio.')
    .matches(/^[^\s]{6}$/, 'El código debe tener exactamente 6 caracteres y no debe contener espacios'),
});



