import { gql } from '@apollo/client'

export const ADD_LIBRARY = gql`
mutation AddLibary($address: String!, $name: String!) {
    addLibrary(address: $address, name: $name ) {
        name
        address
      }
}
`
export const REMOVE_LIBRARY = gql`
mutation ($id: ID!) {
  deleteLibrary(id:$id) {
    name
    id
  }
}
`

export const ADD_BOOK_LIBRARY = gql`
mutation ($bookId: ID! $libId: ID!) {
  addBookToLibrary(bookId: $bookId, libId: $libId) {
    name
    address
    books {
      name
      id
    }
  }
}
`

export const REMOVE_BOOK_LIBRARY = gql`
mutation ($bookId: ID! $libId: ID!) {
  removeBookFromLibrary(bookId: $bookId, libId: $libId) {
    name
    address
    books {
      name
      id
    }
  }
}
`