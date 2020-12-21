import {
    IUser,
    userContants, 
    //UserActionTypes
} from './userTypes'
import axios from 'axios'
import {  Dispatch } from 'redux';

export const createUser =  ( newUser: IUser) => async (dispatch:Dispatch) => {
    
    const res = await axios.post<IUser>('/api/user', newUser)
    dispatch({
        type: userContants.CREATE_USER,
        payload: res.data
    })
}

export const getUsers = () => async (dispatch:Dispatch) => {
    const res = await axios.get<IUser[]>('/api/user')
    dispatch({
        type: userContants.GET_ALL_USERS,
        payload: res.data
    })
}

export const patchUser = (existingUser: IUser) => async (dispatch:Dispatch) => {
    const res = await axios.patch<IUser>(`/api/user/${existingUser._id}`, existingUser)
    dispatch({
        type: userContants.PATCH_USER,
        payload: res.data
    })
}

export const deleteUser = (userId: String) => async (disptach:Dispatch) => {
    const res = await axios.delete(`/api/user/${userId}`)
    disptach({
        type: userContants.DELETE_USER,
        payload: res.data._id
    })
}