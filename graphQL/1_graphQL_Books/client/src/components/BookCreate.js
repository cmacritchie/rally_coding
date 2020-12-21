import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_BOOK} from '../mutations/bookMutations'
import { GET_AUTHOR_BOOK } from '../queries/authorQueries'
import { withRouter } from 'react-router-dom';


const BookForm = ({ existingBook, onSubmit }) => {

    const [book, setBook] = useState(existingBook)

    const submitBookForm = e => {
        e.preventDefault()
        onSubmit(book)
        setBook({name:'', pages:0 })
    }

    return (
        <form onSubmit={submitBookForm}>
            <input id="bookName" value = {book.name || ''} required onChange={e => setBook({...book, name: e.target.value })} />
            <input id="bookPageCount" value={book.pages || 0} required onChange={e => setBook({ ...book, pages: e.target.value })} />
            <button type="submit">Submit</button>
        </form>
    )
}

BookForm.defaultProps = {
    existingBook: {
        name: '',
        pages: 0
    }
}


const BookWrapper = ({ authorId, }) => {

    const [addBook] = useMutation(ADD_BOOK)

    const submitNewBook = newBook => {
        addBook({
            variables: {
                ...newBook,
                pages: parseInt(newBook.pages),
                authorId
            },
            refetchQueries: [
                { 
                    query: GET_AUTHOR_BOOK,
                    variables: { id: authorId }
                }
            ]
        })
    }

    return <BookForm onSubmit={newBook => submitNewBook(newBook)} />

}


export default BookWrapper
