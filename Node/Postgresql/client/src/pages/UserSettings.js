import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const UserSettings = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    return(
        <div>
            <h3>User settings</h3>
            <p>Under Construction</p>
        </div>
    )
}

export default UserSettings

