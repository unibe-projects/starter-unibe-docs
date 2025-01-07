export function mapErrorsTranslated(error: unknown): Error {
  if (!(error instanceof Error)) {
    return new Error('Error desconocido');
  }

  const cognitoErrorMessages: { [key: string]: string } = {
    'User does not exist.': 'Usuario no encontrado.',
    'Incorrect username or password.': 'Correo electrónico o contraseña incorrectos.',
    'User already exists': 'El usuario ya existe.',
    'There is already a signed in user.': 'Ya hay un usuario que ha iniciado sesión.',
    'Cannot reset password for the user as there is no registered/verified email or phone_number': 'Verifica tu correo para cambiar tu contraseña.',
    'Attempt limit exceeded, please try after some time.': 'Se excedió el límite de intentos, por favor intente después de un tiempo.',
    'Username/client id combination not found.':'Verifica que tu correo exista.',
    'Invalid verification code provided, please try again.':'Verifica que tu codigo sea el correcto.',
  };
  const translatedMessage: string | undefined = Object.keys(cognitoErrorMessages).find((key) =>
    error.message.includes(key),
  );

  if (translatedMessage) {
    return new Error(cognitoErrorMessages[translatedMessage]);
  }

  return error;
}
