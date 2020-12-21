import { gql } from "@apollo/client";

export const GET_AUTHORS = gql`
{
    authors {
        name,
        age,
        id
    }
}
`

export const GET_AUTHOR = gql`
query Authors($id: ID!) {
    author(id: $id) {
      name, 
      id, 
      age
    }
  }
`

export const GET_AUTHOR_BOOK = gql`
query Authors($id: ID!) {
    author(id: $id) {
      name, 
      id, 
      age
      book {
          name
          pages
          id
      }
    }
  }
  `