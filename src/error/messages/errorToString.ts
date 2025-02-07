import {
  MESSAGE_PREFIX_LENGTH,
  PATTERN_NOT_FOUND,
} from '../../constants/errors/mapErrorTranslateConstant';
import { mapErrorsTranslated } from './mapErrorsTranslated';

export function errorToString(error: unknown): string {
  const mapError: Error = mapErrorsTranslated(error);

  let message: string = mapError.message;
  const patternIndex: number = message.lastIndexOf(': ');

  if (patternIndex !== PATTERN_NOT_FOUND) {
    message = message.substring(patternIndex + MESSAGE_PREFIX_LENGTH);
  }

  return message;
}
