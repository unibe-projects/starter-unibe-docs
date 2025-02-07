import { gql } from '@apollo/client';

export const CREATE_PROYECT = gql`
  mutation CreateProyect($name: String!, $description: String!, $path: String) {
    createProyect(input: { name: $name, description: $description, path: $path }) {
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
        path
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

export const UPDATE_PROYECT = gql`
  mutation UpdateProyect($id: ID!, $name: String!, $description: String!, $path: String!) {
    updateProyect(input: { id: $id, name: $name, description: $description, path: $path }) {
      id
    }
  }
`;

export const GET_PROJECTS = gql`
  query MyQuery {
    listProyects {
      items {
        name
      }
    }
  }
`;
