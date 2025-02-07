class AuthSignInError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthSignInError';
  }
}

export class ConfirmSignUpError extends AuthSignInError {
  constructor() {
    super('Por favor, completa tu registro');
  }
}

export class SignInFailedError extends AuthSignInError {
  constructor() {
    super('Hubo un problema con tu inicio de sesión.');
  }
}

export class Done extends AuthSignInError {
  constructor() {
    super('Ingresa nuevamente.');
  }
}
