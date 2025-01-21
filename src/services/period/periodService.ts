import { gql } from '@apollo/client';

export const LIST_PERIODS = (projectId: string) => gql`
  query MyQuery {
    listPeriods(
      filter: { periodProyectId: { eq: "${projectId}" } }
    ) {
      items {
        id
        year
        semester
        createdAt
        description
      }
    }
  }
`;

export const CREATE_PERIOD = gql`
  mutation CreatePeriod(
    $year: String!
    $semester: String!
    $description: String!
    $periodProyectId: ID!
  ) {
    createPeriod(
      input: {
        year: $year
        semester: $semester
        description: $description
        periodProyectId: $periodProyectId
      }
    ) {
      id
      createdAt
    }
  }
`;
