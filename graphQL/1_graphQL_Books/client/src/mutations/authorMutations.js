import { gql } from '@apollo/client'

export const ADD_AUTHOR = gql`
mutation AddAuthor($name: String!, $age: Int!) {
    addAuthor(name: $name, age: $age) {
        name
        age
      }
}
`

export const DELETE_AUTHOR = gql`
mutation deleteAuthor($id: ID!) {
    deleteAuthor(id: $id) {
        name
        age
      }
}
`

export const EDIT_AUTHOR = gql`
mutation editAuthor($id: ID!, $name: String!, $age:Int!) {
    editAuthor(id: $id, name:$name, age: $age) {
        name
        age
        id
      }
}
`
