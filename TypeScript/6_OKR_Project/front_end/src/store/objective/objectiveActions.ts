import {
    IObjective,
    ObjectiveConstants, 
    //ObjectActionTypes
} from './objectiveTypes'
import axios from 'axios'
import {  Dispatch } from 'redux';

export const createObjective = ( newObjective: IObjective) => async (dispatch: Dispatch) => {
    const res = await axios.post<IObjective>('/api/objective', newObjective)
    dispatch({
        type: ObjectiveConstants.CREATE_OBJECTIVE,
        payload: res.data
    })
}

export const getObjectives = () => async (dispatch:Dispatch) => {
    const res = await axios.get<IObjective[]>('/api/objective')
    console.log(res)
    dispatch({
        type: ObjectiveConstants.GET_OBJECTIVES,
        payload: res.data
    })
}

export const patchObjective = (existingObjective: IObjective) => async (dispatch:Dispatch) => {
    const res = await axios.patch<IObjective>(`/api/objective/${existingObjective._id}`, existingObjective)
    dispatch({
        type: ObjectiveConstants.PATCH_OBJECTIVE,
        payload: res.data
    })
}

export const deleteObjective = (objectiveId: string) => async (dispatch:Dispatch) =>  {
    const res = await axios.delete<IObjective>(`/api/objective/${objectiveId}`)
    dispatch({
        type: ObjectiveConstants.DELETE_OBJECTIVE,
        payload: res.data
    })
}
