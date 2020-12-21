import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_LIBRARY} from '../mutations/libraryMutations'
import { GET_LIBRARIES } from '../queries/libraryQueries'
import { withRouter } from 'react-router-dom';

const LibaryForm = ({ existingLibrary, onSubmit }) => {

    const [library, setLibrary] = useState(existingLibrary)

    const submitLibraryForm = e => {
        e.preventDefault()
        onSubmit(library)
        setLibrary({name:'', address:'' })
    }

    return (
        <form onSubmit={submitLibraryForm}>
            <input id="library-Name" value = {library.name || ''} required onChange={e => setLibrary({...library, name: e.target.value })} />
            <input id="library-address" value={library.address || ''} required onChange={e => setLibrary({ ...library, address: e.target.value })} />
            <button type="submit">Submit</button>
        </form>
    )
}

LibaryForm.defaultProps = {
    existingLibrary: {
        name: '',
        address: ''
    }
}


const LibraryWrapper = () => {

    const [addLibrary] = useMutation(ADD_LIBRARY)

    const submitNewLibrary = newLib => {
        addLibrary({
            variables: {
                ...newLib,
            },
            refetchQueries: [
                { 
                    query: GET_LIBRARIES,
                }
            ]
        })
    }

    return <LibaryForm onSubmit={newLib => submitNewLibrary(newLib)} />

}

export default LibraryWrapper