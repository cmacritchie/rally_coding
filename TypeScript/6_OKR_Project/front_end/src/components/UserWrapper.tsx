import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { IUser, UserActionTypes } from '../store/user/userTypes'
import { createUser, patchUser } from '../store/user/userActions'
import UserPage  from '../pages/UserPage'
import axios from 'axios'
// import { RootState } from '../store'

interface ParentProps {
    match: any
    history:any
}

interface DispatchProps {
    createUser:(user:IUser) => UserActionTypes
    patchUser:(user:IUser) => UserActionTypes

}

type Props = ParentProps & DispatchProps
   
const mapDispatchToProps = (dispatch: Dispatch<any>) => bindActionCreators<DispatchProps, any>({
    createUser,
    patchUser
}, dispatch)

const UserWrapper: React.FC<Props> = ({ match, createUser, patchUser, history }) => {

    const [fetchedUser, setFetchedUser] = useState<Partial<IUser> | null>({ name:'', age:0, position:''})
    

    useEffect(() =>{
        const { params } = match;
        async function fechUser(user_id) {
            const res = await axios.get<IUser>(`/api/user/${user_id}`)
            setFetchedUser(res.data)
        }
        
        if(Object.keys(params).includes('id')){
            fechUser(params.id)
        }
    },[])

    const handleSubmitUser = (user: Partial<IUser>) => {
        //if has _id is existing user, patch user instead of submit
        if(user.hasOwnProperty('_id')) {
            patchUser(user as IUser)
        }
        else {
            createUser(user as IUser)
        }
        history.push('/')
    }

    return (
        <UserPage 
            submitUser={handleSubmitUser}
            existingUser={fetchedUser} />
        )
    
}

export default connect(null, mapDispatchToProps)(UserWrapper)