export interface IUser {
    _id: string,
    name: string,
    age: number,
    position: string
}

export interface UserState {
    usersLoaded: boolean
    users: IUser[]
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
    payload: IUser
}

interface DeleteUserAction {
    type: typeof userContants.DELETE_USER,
    payload: string
}

interface GetAllUsersAction {
    type: typeof userContants.GET_ALL_USERS,
    payload: IUser[]
}

interface GetUserAction {
    type: typeof userContants.GET_USER,
    payload: IUser
}

interface PatchUserAction {
    type: typeof userContants.PATCH_USER,
    payload: IUser
}



export type UserActionTypes = CreateUserAction | DeleteUserAction | GetAllUsersAction | GetUserAction | PatchUserAction