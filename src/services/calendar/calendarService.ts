import { gql } from '@apollo/client';

export const CREATE_SCHEDULE_DAY = gql`
  mutation CreateScheduleDay($createdBy: String!, $date: AWSDate!, $isWorkingDay: Boolean!) {
    createScheduleDays(
      input: { created_by: $createdBy, date: $date, is_working_day: $isWorkingDay }
    ) {
      createdAt
    }
  }
`;

export const listScheduleDays = gql`
  query MyQuery {
    listScheduleDays {
      items {
        date
        id
        is_working_day
        createdAt
        created_by
      }
    }
  }
`;

export const CREATE_WORKING_HOURS = gql`
  mutation CreateWorkingHours($startTime: AWSTime!, $endTime: AWSTime!, $workingHoursDayId: ID!) {
    createWorkingHours(
      input: {
        start_time: $startTime
        end_time: $endTime
        workingHoursDay_idId: $workingHoursDayId
      }
    ) {
      id
      createdAt
    }
  }
`;

export const LIST_WORKING_HOURS = gql`
  query MyQuery {
    listWorkingHours {
      items {
        day_id {
          is_working_day
          date
        }
        start_time
        end_time
      }
    }
  }
`;
