import React from 'react'
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return(
        <ul>
            <li><NavLink to='/'>BlogPosts</NavLink></li>
            <li><NavLink to='/login'>Login</NavLink></li>
            <li><NavLink to='/post-article'>New Article</NavLink></li>
            <li>Edit User</li>
            <li>Logout</li>
        </ul>
    )
}

export default NavBar