export interface IObjective {
  _id: string
  objDescription: string
  owner: string
  createdAt?: string
  updatedAt?: string
}

//must be a string with the result being objective
export interface ObjectiveState {
    objectivesLoaded: Boolean
    objectives: {
      [prop: string] : IObjective[]
    }
}

export enum  ObjectiveConstants {
  CREATE_OBJECTIVE = "CREATE_OBJECTIVE",
  GET_OBJECTIVES = "GET_OBJECTIVES",
  GET_OBJECTIVE = "GET_OBJECTIVE",
  PATCH_OBJECTIVE = "PATCH_OBJECTIVE",
  DELETE_OBJECTIVE = "DELETE_OBJECTIVE"
}

interface CreateObjectiveAction {
  type: typeof ObjectiveConstants.CREATE_OBJECTIVE,
  payload: IObjective
}

interface DeleteObjectiveAction {
  type: typeof ObjectiveConstants.DELETE_OBJECTIVE,
  payload: IObjective
}

interface GetAllObjectivesAction {
  type: typeof ObjectiveConstants.GET_OBJECTIVES,
  payload: IObjective[]
}

interface GetObjectiveAction {
  type: typeof ObjectiveConstants.GET_OBJECTIVE,
  payload: IObjective
}

interface PatchObjectiveAction {
  type: typeof ObjectiveConstants.PATCH_OBJECTIVE,
  payload: IObjective
}



export type ObjectActionTypes = CreateObjectiveAction | DeleteObjectiveAction | GetAllObjectivesAction | GetObjectiveAction | PatchObjectiveAction