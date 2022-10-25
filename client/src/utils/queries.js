import { gql } from '@apollo/client';


export const QUERY_BOOKS = gql`
  query books($username: String) {
    books(username: $username) {
      bookId
      createdAt
      username
    }
  }
`;

//QUERY GET_ME EXECUTES THE ME QUERY VIA THE APOLLO SERVER