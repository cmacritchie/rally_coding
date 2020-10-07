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
    type: typeof userContants.CREATE_USER,
    payload: User
}

interface DeleteUserAction {
    type: typeof userContants.DELETE_USER,
    payload: string
}

interface GetAllUsersAction {
    type: typeof userContants.GET_ALL_USERS,
    payload: User[]
}

interface GetUserAction {
    type: typeof userContants.GET_USER,
    payload: User
}

interface PatchUserAction {
    type: typeof userContants.PATCH_USER,
    payload: User
}



export type UserActionTypes = CreateUserAction | DeleteUserAction | GetAllUsersAction | GetUserAction | PatchUserAction