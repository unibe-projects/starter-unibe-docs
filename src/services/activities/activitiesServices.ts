import { gql } from '@apollo/client';

export const CREATE_ACTIVITY = gql`
  mutation CreateActivity(
    $name: String!
    $status: String!
    $start_time: String!
    $hora_fin: String!
    $description: String!
    $activity_date: String!
    $activityProyectId: ID!
    $activityPeriodId: ID!
  ) {
    createActivity(
      input: {
        name: $name
        status: $status
        start_time: $start_time
        hora_fin: $hora_fin
        description: $description
        activity_date: $activity_date
        activityProyectId: $activityProyectId
        activityPeriodId: $activityPeriodId
      }
    ) {
      id
      createdAt
    }
  }
`;

export const LIST_ACTIVITIES = (projectId: string, periodId: string) => gql`
  query ListActivities {
    listActivities(
      filter: { 
      activityProyectId: { eq: "${projectId}" } 
      activityPeriodId: { eq: "${periodId}"}
      }
    ) {
      items {
        id
        name
        description
      }
    }
  }
`;
