import { gql } from "@apollo/client";

export const GET_LIBRARIES = gql`
{
    libraries {
        name
        address
        id
        books {
            id
            name
        }
    }
 }
`