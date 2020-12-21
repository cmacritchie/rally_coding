import React from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { NavLink } from 'react-router-dom'
import  * as AuthorQueries from '../queries/authorQueries';
import * as AuthorMutations from '../mutations/authorMutations'

const AuthorList = () => {
    const [deleteAuthor] = useMutation(AuthorMutations.DELETE_AUTHOR)
    const { loading, error, data, refetch } = useQuery(AuthorQueries.GET_AUTHORS)

    if(loading) return 'Loading'
    if(error) return `Error at the disco ${error.message}`;

    const authorList = () => {
        return(
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {data.authors.map(author => (
                    
                    <tr key ={author.id}>
                        <td>
                            <NavLink to={`/author/${author.id}`}>
                            {author.name}
                            </NavLink>
                        </td>
                        <td>{author.age}</td>
                        <td>
                            <NavLink to={`/author-form/${author.id}`}>
                                Edit Author
                            </NavLink>
                        </td>
                        <td><button onClick={()=> deleteAuthor({ 
                                                    variables :{ id: author.id },
                                                    refetchQueries: [{ query: AuthorQueries.GET_AUTHORS }]
                                                    })}>Delete User</button></td>
                    </tr>
                ))
                }
                </tbody>
            </table>
        )
    }

    return (
        <div>
            <h3>Author List</h3>
            <div className="author-list">
                {authorList()}
            </div>
        </div>
    )
}

export default AuthorList;