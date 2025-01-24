import { gql } from '@apollo/client';

export const CREATE_ACTIVITY = gql`
  mutation CreateActivity(
    $activityProyectId: ID!
    $activityPeriodId: ID!
    $project_manager: String
    $activity_date: AWSDate
    $start_time: AWSTime
    $hora_fin: AWSTime
    $executing_institution: String
    $charge: String!
    $unit: String
    $general_objective: String
    $number_participants: Int
    $budget_used: String
  ) {
    createActivity(
      input: {
        activityProyectId: $activityProyectId
        activityPeriodId: $activityPeriodId
        activity_date: $activity_date
        start_time: $start_time
        hora_fin: $hora_fin
        executing_institution: $executing_institution
        project_manager: $project_manager
        charge: $charge
        unit: $unit
        general_objective: $general_objective
        number_participants: $number_participants
        budget_used: $budget_used
      }
    ) {
      id
      createdAt
    }
  }
`;


export const CREATE_ACTIVITY_TASKS = gql`
  mutation createActivityTasks($name: String!, $description: String! ) {
    createActivityTasks(input: { name: $name, description: $description }) {
      id
      createdAt
    }
  }
`;

export const CREATE_ACTIVITY_ACTIVITY_TASKS = gql`
  mutation CreateActivityActivityTasks($activityTasksId: ID!, $activityId: ID!) {
    createActivityActivityTasks(input: {activityTasksId: $activityTasksId, activityId: $activityId}) {
    id
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
        project_manager
        charge
      }
    }
  }
`;
