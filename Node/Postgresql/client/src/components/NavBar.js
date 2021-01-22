import React from 'react'
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return(
    <div className="nav-bar-wrapper">
        <ul className="nav-bar">
            <li><NavLink to='/'>BlogPosts</NavLink></li>
            <li><NavLink to='/login'>Login</NavLink></li>
            <li><NavLink to='/post-article'>New Article</NavLink></li>
            <li><span>Edit User</span></li>
            <li><span>Logout</span></li>
        </ul>
    </div>
    )
}

export default NavBar