import { gql } from '@apollo/client';

export const CREATE_PROYECT = gql`
mutation CreateProyect($name: String!, $description: String!) {
  createProyect(input: { name: $name, description: $description }) {
    id
    createdAt
  }
}
`;

export const LIST_PROJECTS = gql`
  query ListProyect {
    listProyects {
      items {
      id
      name
      createdAt
      description
      }
    }
  }
`;

export const DELETE_PROYECT = gql`
  mutation DeleteProyect($id: ID!) {
    deleteProyect(input: { id: $id }) {
      id
    }
  }
`;

export const UPDATE_PROYECT =  gql`
mutation UpdateProyect($id: ID!, $name: String!, $description: String!) {
    updateProyect(input: { id: $id, name: $name, description: $description }) {
      id
    }
  }
`;
  
