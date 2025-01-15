import { gql } from '@apollo/client';

export const CREATE_PATIENT = gql`
  mutation CreatePatient($cedula_patient: String!, $last_name: String!, $name: String!) {
    createPatient(input: { cedula_patient: $cedula_patient, last_name: $last_name, name: $name }) {
      id
      createdAt
    }
  }
`;

export const LIST_PATIENTS = gql`
  query ListPatients {
    listPatients {
      items {
        last_name
        name
        cedula_patient
      }
    }
  }
`;


export const EXIST_CEDULA = gql`
  query ListPatients($cedula_patient: String!) {
    listPatients(filter: { cedula_patient: { eq: $cedula_patient } }) {
      items {
        id
      }
    }
  }
`;