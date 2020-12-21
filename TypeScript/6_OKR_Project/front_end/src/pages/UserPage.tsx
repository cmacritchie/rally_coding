import React, { useState, FormEvent, useEffect } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { IUser, UserState, UserActionTypes } from '../store/user/userTypes'
import { createUser } from '../store/user/userActions'
import { RootState } from '../store'

interface ParentProps {
    existingUser: Partial<IUser> | null
    submitUser: (user: IUser) => void
}

interface StoreProps {
    users?: UserState
}

//this might need to be changed
// interface DispatchProps {
//     createUser?:(user:IUser) => UserActionTypes;
// }

type Props = ParentProps & StoreProps //&  DispatchProps

const mapStateToProps = (state:RootState):StoreProps => {
   return {
    users: state.users
   } 
}
   
// const mapDispatchToProps = (dispatch: Dispatch<any>) => bindActionCreators<DispatchProps, any>({
//     createUser
// }, dispatch)

const UserPage: React.FC<Props> = ({ existingUser, submitUser }) => {

    const [user, setUser] = useState<Partial<IUser> | null>(existingUser)
    useEffect(() =>{
        setUser(existingUser)
    },[existingUser])


    const onHandleSumit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        submitUser(user as IUser)
    }
    
    return (
        <div>
            <h1>User Page</h1>
            <form onSubmit={onHandleSumit} >
                <input  value={user?.name}
                    placeholder="User Name" 
                    name="user-name" 
                    onChange = {e => setUser({...user, name: e.target.value})}
                    required
                    />
                    <br />
                <input  value={user?.age}
                    placeholder="User age" 
                    name="user-age"
                    type="number" 
                    onChange = {e => setUser({...user, age: +e.target.value})}
                    required
                    />
                    <br />
                <select value={user?.position} 
                    placeholder="User position" 
                    name="user-position"
                    onChange = {e => setUser({...user, position: e.target.value})}
                    >
                    <option>Developer</option>
                    <option>Manager</option>
                    <option>QA</option>
                    <option>HR</option>
                </select>
                <br />
            <input type="submit" value="submit" /> 
            </form>
        </div>
    )
}

export default connect(mapStateToProps)(UserPage)
