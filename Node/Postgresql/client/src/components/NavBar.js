import React from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../actions/userActions'

const NavBar = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const test =() => {
        console.log('in test')
        dispatch(logout())
    }
    return(
    <div className="nav-bar-wrapper">
        <ul className="nav-bar">
            <li><NavLink to='/'>BlogPosts</NavLink></li>
            <li><NavLink to='/login'>Login</NavLink></li>
            <li><NavLink to='/sign-up'>Signup</NavLink></li>
            <li><NavLink to='/post-article'>New Article</NavLink></li>
            <li><span>Edit User</span></li>
            <li><button onClick={()=> test()}>Logout</button></li>
            {user.isAuthenticated &&
                <li>
                    <span>Welcom {user.userInfo.name}</span>
                </li>
            }
        </ul>
    </div>
    )
}

export default NavBar