import React from 'react';
import { useMutation, useQuery } from '@apollo/client'
import { DELETE_BOOK } from '../mutations/bookMutations'
import { GET_AUTHOR_BOOK } from '../queries/authorQueries'
import BookCreate from '../components/BookCreate'
import { withRouter } from 'react-router-dom';

const AuthorDetail = ({ match: { params }}) => {

    const [deleteBook] = useMutation(DELETE_BOOK)

    const onDeleteBook = (id, authorID) => {
        deleteBook({
            variables: { id },
            refetchQueries: 
            [{
                query: GET_AUTHOR_BOOK,
                variables: { id: authorID }
            }]
        })
    }

    let authorId = null
    if(Object.keys(params).includes('authorid')) {
        authorId = params.authorid
    }

    const { loading, error, data } = useQuery(GET_AUTHOR_BOOK, {
        variables: { id: authorId },
    });

    if(loading) return 'Loading...'
    if(error) return `Error at the disco ${error.message}`;

    const { author } = data; 
    return(
        <div>
            <h4>{author.name}</h4>
            <h5>Age: {author.age}</h5>
            <BookCreate authorId={authorId} />
            <h3>Book List</h3>
            {author.book.length === 0 ?
                <p>no Books</p>
                :
                <table>
                    <thead>
                        <tr>
                            <th>Book Title</th>
                            <th>Pages</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                       { author.book.map(b => {
                           return(
                               <tr key={b.id}>
                                   <td>{b.name}</td>
                                   <td>{b.pages}</td>
                                   <td>
                                       <button 
                                        onClick={()=> onDeleteBook(b.id, authorId)} >
                                        Delete Book
                                       </button>
                                   </td>
                               </tr>
                           )
                       })
                    }
                    </tbody>
                </table>

            }

        </div>
    )
}

export default AuthorDetail;