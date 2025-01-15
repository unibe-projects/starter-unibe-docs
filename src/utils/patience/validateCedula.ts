import { verificarCedula } from 'udv-ec';

export const isValidCedula = (cedula: string): boolean => {
  return verificarCedula(cedula);
};
