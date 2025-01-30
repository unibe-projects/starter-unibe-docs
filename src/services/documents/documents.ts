
import { gql } from '@apollo/client';

export const CREATE_DOCUMENTS = gql`
  mutation CreateDocuments($name: String!, $path: String!, $tags: String!) {
    createDocuments(input: {name: $name, path: $path, tags: $tags}) {
      id
      createdAt
    }
  }
`;

export const CREATE_ACTIVITY_DOCUMENTS =  gql`
  mutation CreateActivityDocuments($documentsId: ID!, $activityId: ID!) {
    createActivityDocuments(input: {documentsId: $documentsId, activityId: $activityId}) {
      id
      createdAt
    }
  }
`;