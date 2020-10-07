import {
    Objective,
    ObjectiveContants, 
    ObjectActionTypes
} from './objectiveTypes'

export function createObjective( newObjective: Objective): ObjectActionTypes {
    return {
        type: ObjectiveContants.CREATE_OBJECTIVE,
        payload: newObjective
    }
}

export function deleteObjective( objectiveId: string): ObjectActionTypes {
    return {
        type: ObjectiveContants.DELETE_OBJECTIVE,
        payload: objectiveId
    }
}

export function getAllObjectives(): ObjectiveTypes {
    return {
        type: ObjectiveContants.GET_OBJECTIVES,
        
    }
}