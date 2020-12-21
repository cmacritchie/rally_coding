import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
{
  books {
      name
      pages
      id
    }
}
`

export const GET_BOOK = gql`
query GetBook($id:ID!){
  book(id: $id) {
      name
      pages
      id
    }
}
`