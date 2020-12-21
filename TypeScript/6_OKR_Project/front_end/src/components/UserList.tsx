import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { UserState, UserActionTypes } from '../store/user/userTypes'
import { deleteUser, getUsers } from '../store/user/userActions'
import { ObjectiveState, ObjectActionTypes } from '../store/objective/objectiveTypes'
import { deleteObjective, getObjectives } from '../store/objective/objectiveActions'
import { RootState } from '../store'



//if passed in somewhere
interface ParentProps {
    id?: string
}

interface StoreProps {
    users?: UserState
    objectives?: ObjectiveState
}

//this might need to be changed
interface DispatchProps {
    deleteUser?:(_id:String) => UserActionTypes
    getUsers?:() => UserActionTypes
    deleteObjective?:(_id:String) =>ObjectActionTypes
    getObjectives?: () =>ObjectiveState
}

type Props = ParentProps & StoreProps &  DispatchProps

const mapStateToProps = ({users, objectives}:RootState): StoreProps => {
   return {
    users,
    objectives
   } 
}
   
const mapDispatchToProps = (dispatch: Dispatch<any>) => bindActionCreators<DispatchProps, any>({
    deleteUser,
    getUsers,
    deleteObjective,
    getObjectives
}, dispatch)

const UserList: React.FC<Props> = ({ users, getUsers, deleteUser, objectives, getObjectives, deleteObjective }:Props) => {

    useEffect(() => {
        console.log("users loaded", users.usersLoaded)      
            getUsers()
            getObjectives()
       
        },[users.usersLoaded, objectives.objectivesLoaded]);
    
    const userList = () => {
        return users!.users.map(user => {
            return (
                <>
                    <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.age}</td>
                        <td>{user.position}</td>
                        <td><NavLink to={`/user/${user._id}`}>Edit User</NavLink></td>
                        <td><button onClick={() => deleteUser(user._id)}>Delete</button></td>
                        <td><NavLink to={`/user/${user._id}/objective`}>+ Add Objective</NavLink></td>
                    </tr>
                    {
                        (objectives.objectivesLoaded && objectives.objectives[user._id]?.length > 0) &&
                        objectives.objectives[user._id].map(objective => {
                            return (
                                <tr key={objective._id}>
                                    <td colSpan={3}>{objective.objDescription}</td>
                                    <td><NavLink to={`/user/${user._id}/objective/${objective._id}`}>Edit Objective</NavLink></td>
                                    <td colSpan={2}><button onClick={() => deleteObjective(objective._id)}>Delete Objective</button></td>
                                </tr>
                            )
                        }) 
                    }
                </>
            )
        })
    }
    
    return(
        <>
            {users!.users.length > 0 ?
                <table>
                    <thead>
                        <tr key="1">
                        <th>UserName</th>
                        <th>Age</th>
                        <th>Position</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>Add Objective</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList()}
                    </tbody>
                </table>
            :
                <h4>No Users!</h4>
            }
        </>
    )
}


export default connect(mapStateToProps, mapDispatchToProps)(UserList)