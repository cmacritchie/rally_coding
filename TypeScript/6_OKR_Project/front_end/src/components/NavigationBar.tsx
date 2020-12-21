import React from 'react'
import { NavLink } from 'react-router-dom';

const HomePage: React.FC = () => {
    return(
        <ul>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/user'>Users</NavLink></li>
        </ul>
    )
}

export default HomePage