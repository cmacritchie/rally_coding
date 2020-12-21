import {
    ObjectiveState,
    ObjectActionTypes,
    ObjectiveConstants
} from './objectiveTypes'

const initialState:ObjectiveState = {
    objectivesLoaded: false,
    objectives: {}
}

export function objectiveReducer(state = initialState, action: ObjectActionTypes): ObjectiveState {
    switch(action.type) {
        case ObjectiveConstants.GET_OBJECTIVES:
            return {
                ...state,
                objectivesLoaded: true,
                objectives: {
                ...action.payload.reduce((acc, curr) => {
                    if(acc[curr.owner]) {
                        return {
                            ...acc,
                            [curr.owner]: [
                                ...acc[curr.owner], curr
                            ]
                        }
                    }
                    return {
                        ...acc,
                        [curr.owner]:[curr]
                    }
                }, {})
                }
            }
        case ObjectiveConstants.CREATE_OBJECTIVE:
            return {
                ...state,
                objectives:{
                    [action.payload.owner]:state.objectives[action.payload.owner]?.length > 0 ?
                        [ ...state.objectives[action.payload.owner], action.payload] : [action.payload] 
                }
            }
        case ObjectiveConstants.DELETE_OBJECTIVE:
            return {
                ...state,
                objectives: {
                    [action.payload.owner]: state.objectives[action.payload.owner].filter(objective => objective._id !== action.payload._id)
                }
            }
        case ObjectiveConstants.PATCH_OBJECTIVE:
            return {
                ...state,
                objectives: {
                    [action.payload.owner]:state.objectives[action.payload.owner].map(objective => {
                        if(objective._id === action.payload._id) {
                            return action.payload
                        }
                        return objective
                    })
                }
            }
        default:
            return state
    }
}