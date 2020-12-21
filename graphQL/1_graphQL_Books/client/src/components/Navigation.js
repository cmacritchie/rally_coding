import React from 'react';
import { NavLink } from 'react-router-dom'

export default () => {
    return (
        <div className="routers">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/author-form">Add Author</NavLink>
            <NavLink to="/libraries">Add Library</NavLink>
            <NavLink to="/book-library">BookLibraryList</NavLink>
        </div>
    )
}