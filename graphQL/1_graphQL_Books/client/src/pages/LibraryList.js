import React from 'react'
import { useQuery, useMutation } from "@apollo/client";
import { NavLink } from 'react-router-dom'
import  * as LibraryQueries from '../queries/libraryQueries';
import * as LibraryMutations from '../mutations/libraryMutations'

import LibraryCreate from '../components/LibraryCreate'

const LibraryList = () => {
    
    const [deleteLibrary] = useMutation(LibraryMutations.REMOVE_LIBRARY)
    const { loading, error, data, } = useQuery(LibraryQueries.GET_LIBRARIES)

    if(loading) return 'Loading'
    if(error) return `Error at the disco ${error.message}`;
    
    const renderLibrary = () => {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Library Name</th>
                        <th>Address</th>
                        <th>Number of Books</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {data.libraries.map(library => {
                   return ( <tr key={library.id} >
                        <td>{library.name}</td>
                        <td>{library.address}</td>
                        <td>{library.books.length}</td>
                        <td>
                            <button onClick={() => deleteLibrary({
                                variables: { id: library.id },
                                refetchQueries: [{ query: LibraryQueries.GET_LIBRARIES }]
                            })}>
                                Delete Library
                            </button>
                        </td>
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
            <h4>Libraries</h4>
            <LibraryCreate />
            <br />
            {renderLibrary()}
        </div>
    )
}

export default LibraryList