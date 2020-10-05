export interface User {
    id: string
    name: string,
    age: number,
    position: string
}

export interface UserState {
    users: User[]
}

export enum  userContants {
    CREATE_USER = "CREATE_USER",
    GET_ALL_USERS = "GET_ALL_USERS",
    GET_USER = "GET_USER",
    PATCH_USER = "PATCH_USER",
    DELETE_USER = "DELETE_USER"
}

interface CreateUserAction {
    type: typeof userContants.CREATE_USER
    payload: User
}

interface DeleteUserAction {
    type: typeof userContants.DELETE_USER
    payload: string
}
//Create other actions.


export type UserActionTypes = CreateUserAction | DeleteUserAction