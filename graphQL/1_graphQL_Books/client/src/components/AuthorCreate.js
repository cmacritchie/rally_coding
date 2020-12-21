import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client'
import * as AuthorMutations from '../mutations/authorMutations'
import { GET_AUTHORS, GET_AUTHOR } from '../queries/authorQueries'
import { withRouter } from 'react-router-dom'



const AuthorForm = ({ existingAuthor, onSubmit }) => {
    
    const [author, setAuthor] = useState(existingAuthor)

    const submitForm = e => {
        e.preventDefault()
        onSubmit(author)
    }

    return (
        <form onSubmit={e => submitForm(e)}>
            <input id="authorName" value={author.name || ''} required onChange={e => setAuthor({...author, name: e.target.value})} />
            <input id="authorAge" type='number' value={author.age || 0} required onChange={e => setAuthor({...author, age:e.target.value})} />
            <button type="submit" value="Submit">Submit</button>
        </form>
    )
}

AuthorForm.defaultProps = {
    existingAuthor: {
        name:'',
        age:null
    },
  };

const AuthorOperateWrapper = ({ match: { params }, history }) => {
        let authorId = null
        if(Object.keys(params).includes('authorid')) {
            authorId = params.authorid
        }

        const { loading, error, data } = useQuery(GET_AUTHOR, {
            variables: { id: authorId },
            skip: !authorId
        });


        const [addAuthor] = useMutation(AuthorMutations.ADD_AUTHOR);
        const [editAuthor] = useMutation(AuthorMutations.EDIT_AUTHOR);

        const newAuthor = (author) => {
            addAuthor({
                variables: { 
                    name: author.name, 
                    age: parseInt(author.age)
                },
                refetchQueries: [{ query: GET_AUTHORS }]
            }).then(()=>{
                history.push('/')
            })
        }

        const editAuthorSubmit = (author) => {

            editAuthor({
                variables: { 
                    id: authorId,
                    name: author.name, 
                    age: parseInt(author.age)
                },
                refetchQueries: [{ query: GET_AUTHORS }]
            }).then(()=>{
                history.push('/')
            })
        }

        if(authorId) {

            if(loading) return 'Loading'
            if(error) return `Error at the disco ${error.message}`;
            return <AuthorForm onSubmit={(submitAuthor) => editAuthorSubmit(submitAuthor)} existingAuthor={data.author} />
        }

        return <AuthorForm onSubmit={(submitAuthor) => newAuthor(submitAuthor)} />
}

export default withRouter(AuthorOperateWrapper);