import React from 'react'
import UserList from '../components/UserList';

const HomePage: React.FC = () => {
    return(
        <div>
            <h1>Home Page</h1>
            <div>
                <UserList />
            </div>
        </div>
    )
}

export default HomePage 