import {
  AuthUser,
  getCurrentUser,
  AuthTokens,
  fetchAuthSession,
  AuthSession,
} from 'aws-amplify/auth';
import { CognitoAuthSignInDetails } from '@aws-amplify/auth/dist/esm/providers/cognito/types';
import { errorToString } from '../../error/messages/errorToString';

export interface AWSCredentials {
  accessKeyId?: string;
  sessionToken?: string;
  secretAccessKey?: string;
}

export interface JwtPayload {
  [key: string]: string | number | boolean | object | null | undefined;
}

type ExtendedAuthSession = AuthSession & {
  isAuthenticated: boolean;
  accessKeyId?: string;
  sessionToken?: string;
  secretAccessKey?: string;
  expiration?: number;
};

export interface AuthenticatedUser {
  name: string;
  email: string;
  id: string;
  authenticationFlowType?: string;
}

const extractCredentialsService = (
  credentials?: AWSCredentials,
): Pick<AWSCredentials, 'accessKeyId' | 'sessionToken' | 'secretAccessKey'> => {
  const accessKeyId = credentials?.accessKeyId;
  const sessionToken = credentials?.sessionToken;
  const secretAccessKey = credentials?.secretAccessKey;

  if (!accessKeyId || !secretAccessKey) {
    throw new Error('Credenciales inválidas o incompletas.');
  }

  return { accessKeyId, sessionToken, secretAccessKey };
};

const authenticatedUserService = (
  tokens: AuthTokens,
  credentials?: AWSCredentials,
  identityId?: string,
  userSub?: string,
): ExtendedAuthSession => {
  const { accessKeyId, sessionToken, secretAccessKey } = extractCredentialsService(credentials);
  return {
    isAuthenticated: true,
    identityId,
    userSub: userSub ?? '',
    accessKeyId,
    sessionToken,
    secretAccessKey,
    expiration: tokens?.idToken?.payload?.exp,
  };
};

export const getSessionService = async (
  forceRefresh: boolean = false,
): Promise<ExtendedAuthSession> => {
  try {
    const { tokens, credentials, identityId, userSub } = await fetchAuthSession({ forceRefresh });

    if (tokens?.accessToken && tokens?.idToken) {
      return authenticatedUserService(tokens, credentials, identityId, userSub);
    }
    return { isAuthenticated: false };
  } catch (error: unknown) {
    console.error('Error fetching session:', error);
    return { isAuthenticated: false };
  }
};

export const setCurrentUserService = async (): Promise<AuthUser> => {
  try {
    return await getCurrentUser();
  } catch (error: unknown) {
    throw new Error(errorToString(error));
  }
};

const getIdTokenPayload = async (): Promise<JwtPayload | null> => {
  try {
    const session = await fetchAuthSession();
    const idTokenPayload = session?.tokens?.idToken?.payload;

    if (!idTokenPayload) {
      throw new Error('No se pudo obtener el payload del token.');
    }

    return idTokenPayload;
  } catch (error: unknown) {
    console.error('Error al obtener el payload del token:', error);
    return null;
  }
};

const buildAuthenticatedUser = (
  payload: JwtPayload,
  signInDetails: CognitoAuthSignInDetails | undefined,
): AuthenticatedUser => {
  return {
    email: typeof payload.email === 'string' ? payload.email : '',
    name: typeof payload.name === 'string' ? payload.name : '',
    id: typeof payload.sub === 'string' ? payload.sub : '',
    authenticationFlowType: signInDetails?.authFlowType,
  };
};

export const getAuthenticatedUser = async (): Promise<AuthenticatedUser | null> => {
  try {
    const { signInDetails } = await getCurrentUser();
    const idTokenPayload = await getIdTokenPayload();

    if (!idTokenPayload) {
      return null;
    }

    return buildAuthenticatedUser(idTokenPayload, signInDetails);
  } catch (error: unknown) {
    console.error('Error al obtener el usuario autenticado:', error);
    return null;
  }
};
