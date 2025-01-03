export function mapErrorsTranslated(error: unknown): Error {
  if (!(error instanceof Error)) {
    return new Error('Error desconocido');
  }

  const cognitoErrorMessages: { [key: string]: string } = {
    'User does not exist.': 'Usuario no encontrado.',
    'Incorrect username or password.': 'Correo electrónico o contraseña incorrectos.',
    'User already exists': 'El usuario ya existe.',
  };
  const translatedMessage: string | undefined = Object.keys(cognitoErrorMessages).find((key) =>
    error.message.includes(key),
  );

  if (translatedMessage) {
    return new Error(cognitoErrorMessages[translatedMessage]);
  }

  return error;
}
