import { gql } from '@apollo/client';

export const CREATE_DOCUMENTS = gql`
  mutation CreateDocuments($name: String!, $path: String!, $tags: String!, $type: String!) {
    createDocuments(input: { name: $name, path: $path, tags: $tags, type: $type }) {
      id
      createdAt
    }
  }
`;

export const CREATE_ACTIVITY_DOCUMENTS = gql`
  mutation CreateActivityDocuments($documentsId: ID!, $activityId: ID!) {
    createActivityDocuments(input: { documentsId: $documentsId, activityId: $activityId }) {
      id
      createdAt
    }
  }
`;

export const LIST_DOCUMENTS = gql`
  query MyQuery {
    listDocuments {
      items {
        name
        tags
        path
        createdAt
        updatedAt
      }
    }
  }
`;

export const LIST_DOCUMENTS_all = gql`
  query MyQuery {
    listActivities {
      items {
        Proyect {
          name
        }
        Period {
          semester
          year
        }
        Documents {
          items {
            documents {
              name
              path
              tags
              type
              updatedAt
              createdAt
            }
          }
        }
      }
    }
  }
`;
