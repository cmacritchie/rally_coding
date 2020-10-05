import {
    UserState,
    UserActionTypes,
    userContants
} from './userTypes'

const intitialState: UserState = {
    users:[]
}

export function userReducer(state = intitialState, action: UserActionTypes): UserState {
    switch(action.type) {
        case userContants.CREATE_USER:
            return {
                users: [...state.users, action.payload]
            }
        case userContants.DELETE_USER:
            return {
                users: state.users.filter(existingUsers => existingUsers.id !== action.payload )
            }
        default:
            return state
    }
}