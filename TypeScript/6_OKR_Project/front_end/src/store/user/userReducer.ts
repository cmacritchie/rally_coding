import {
    UserState,
    UserActionTypes,
    userContants
} from './userTypes'

const intitialState: UserState = {
    usersLoaded: false,
    users:[]
}

export function userReducer(state = intitialState, action: UserActionTypes): UserState {
    switch(action.type) {
        case userContants.CREATE_USER:
            return {
                ...state,
                users: [...state.users, action.payload]
            }
        case userContants.DELETE_USER:
            return {
                ...state,
                users: state.users.filter(existingUsers => existingUsers._id !== action.payload )
            }
        case userContants.GET_ALL_USERS: 
            return {
                ...state,
                usersLoaded: true,
                users: [...action.payload]
            }
        case userContants.GET_USER:
            return {
                ...state
            }
        default:
            return state
    }
}