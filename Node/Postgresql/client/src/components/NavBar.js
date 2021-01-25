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
            <li><NavLink to='/'>Home</NavLink></li>
            {!user.isAuthenticated &&
            <>
                <li><NavLink to='/login'>Login</NavLink></li>
                <li><NavLink to='/sign-up'>Signup</NavLink></li>
            </>
            }
            {user.isAuthenticated &&
            <>
                <li><NavLink to='/post-article'>New Article</NavLink></li>
                <li><NavLink to='/user-settings'>Edit User</NavLink></li>
                <li><a onClick={()=> test()}>Logout</a></li>
                <li><span>Welcome {user.userInfo.name}</span></li>
            </>
            }
        </ul>
    </div>
    )
}

export default NavBar