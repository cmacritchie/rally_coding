import React from 'react';
import { useQuery, useMutation, gql } from "@apollo/client";
import { NavLink } from 'react-router-dom'
import  * as BookQueries from '../queries/bookQueries';
import * as BookMutations from '../mutations/bookMutations'
import * as LibraryMutations from '../mutations/libraryMutations'

const BOOKS_LIBRARIES = gql`
{
  allBooks: books{
         name
         pages
         id
       }
   libraries {
     id
     name
     books {
       name
       id
     }
   }
 }
 `

// const BOOK_AVAILABILITY = gql`
// mutation ($bookId: ID!, $libId: ID!) {
//   addBookToLibrary(bookId: $bookId, libId: $libId ) {
//       name
//       address
//     }
// }
// ` 


const BookLibraryList = () => {

    const { loading, error, data} = useQuery(BOOKS_LIBRARIES)
    const [addBooktoLib] = useMutation(LibraryMutations.ADD_BOOK_LIBRARY)
    const [removeBookFromLib] = useMutation(LibraryMutations.REMOVE_BOOK_LIBRARY)

    const onChangeEvent = (e, bookId, libId) => {

      const properties = {
        variables: {
            bookId,
            libId
        },
        refetchQueries: [
            { 
                query: BOOKS_LIBRARIES,
            }
        ]
    }
      if(e.target.checked) {
        addBooktoLib(properties)
      }
      else {
        removeBookFromLib(properties)
      }

    }

    if(loading) return 'Loading'
    if(error) return `Error at the disco ${error.message}`;

    console.log(data)
    const bookLibGrid = () => {
      const { allBooks, libraries } = data 
        return(
            <table>
                <thead>
                    <tr key="bl-grid">
                        <th>Book Title</th>
                        {
                          libraries.map(library => {
                            return (
                              <th key={library.id}>{library.name}</th>
                            )
                          })
                        }
                    </tr>
                </thead>
                <tbody>
                {
                  allBooks.map(book => {
                    return(
                      <tr key={book.id}>
                        <td>{book.name}</td>
                        {
                          libraries.map(library =>{
                            return(
                              <td key={`${book.id}-${library.id}`}>
                                <input type="checkbox"
                                        onChange={e => onChangeEvent(e, book.id, library.id )}
                                        checked={
                                          library.books.map(bk => bk.id).includes(book.id)
                                        }
                                        />
                              </td>
                            )
                          })
                        }
                      </tr>
                    )
                  })
                }
                </tbody>
            </table>
        )
    }

    return (
        <div>
            <h3>Book Library List</h3>
            <div className="book-library-list">
              {
                bookLibGrid()
              }
            </div>
        </div>
    )
}

export default BookLibraryList;