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
    $status: ActivitiesStatusEnum
    $name: String
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
        status: $status
        name: $name
      }
    ) {
      id
      createdAt
    }
  }
`;

export const CREATE_ACTIVITY_TASKS = gql`
  mutation createActivityTasks($name: String!, $description: String!) {
    createActivityTasks(input: { name: $name, description: $description }) {
      id
      createdAt
    }
  }
`;

export const CREATE_ACTIVITY_ACTIVITY_TASKS = gql`
  mutation CreateActivityActivityTasks($activityTasksId: ID!, $activityId: ID!) {
    createActivityActivityTasks(
      input: { activityTasksId: $activityTasksId, activityId: $activityId }
    ) {
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
        name
      }
    }
  }
`;

export const GET_ACTIVITY = gql`
  query GetActivity($id: ID!) {
    getActivity(id: $id) {
      status
      start_time
      project_manager
      number_participants
      id
      hora_fin
      general_objective
      executing_institution
      createdAt
      charge
      budget_used
      activity_date
      unit
      name
      ActivityTasks {
        items {
          activityTasks {
            name
            description
          }
        }
      }
      Documents {
        items {
          documents {
            name
            path
          }
        }
    }
}
}
`;

export const LIST_ACTIVITIES_ALL = gql`
  query MyQuery($activityProyectId: ID!, $activityPeriodId: ID!) {
    listActivities(
      filter: {
        activityProyectId: { eq: $activityProyectId }
        activityPeriodId: { eq: $activityPeriodId }
      }
    ) {
      items {
        Period {
          semester
          year
          Proyect {
            name
          }
        }
        ActivityTasks {
          items {
            activityTasks {
              name
              createdAt
            }
          }
        }
        project_manager
        number_participants
        budget_used
      }
    }
  }
`;

export const LIST_ACTIVITIES_DATES = gql`
  query ListActivities($activityPeriodId: ID!, $activityProyectId: ID!) {
    listActivities(
      filter: {
        activityPeriodId: { eq: $activityPeriodId }
        activityProyectId: { eq: $activityProyectId }
      }
    ) {
      items {
        activity_date
        hora_fin
        start_time
        status
        name
      }
    }
  }
`;

export const GET_ACTIVITIES = gql`
  query MyQuery {
    listActivities {
      items {
        name
        createdAt
        Proyect {
          id
          name
        }
        Period {
          year
          semester
        }
      }
    }
  }
`;
