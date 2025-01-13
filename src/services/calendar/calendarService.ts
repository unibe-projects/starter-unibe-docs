import { gql } from '@apollo/client';

export const CREATE_SCHEDULE_DAY = gql`
  mutation CreateScheduleDay($createdBy: String!, $date: AWSDate!, $isWorkingDay: Boolean!) {
    createScheduleDays(input: { created_by: $createdBy, date: $date, is_working_day: $isWorkingDay }) {
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
