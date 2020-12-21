import { gql } from '@apollo/client'

export const ADD_BOOK = gql`
mutation AddBook($authorId: ID!, $pages: Int!, $name: String!) {
    addBook(authorID: $authorId, pages: $pages, name: $name ) {
        name
        pages
        id
      }
}
`

export const DELETE_BOOK = gql`
mutation deleteBook($id: ID!) {
    deleteBook(id: $id) {
       name
      }
}
`

// export const EDIT_AUTHOR = gql`
// mutation editAuthor($id: ID!, $name: String!, $age:Int!) {
//     editAuthor(id: $id, name:$name, age: $age) {
//         name
//         age
//         id
//       }
// }