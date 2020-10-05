import {
    User,
    userContants, 
    UserActionTypes
} from './userTypes'

export function createUser( newUser: User): UserActionTypes {
    return {
        type: userContants.CREATE_USER,
        payload: newUser
    }
}

export function deleteUser( userId: string): UserActionTypes {
    return {
        type: userContants.DELETE_USER,
        payload: userId
    }
}