export interface Objective {
    // _id: string
  objDescription: string
  owner: string
  createdAt?: string
  updatedAt?: string
}

//must be a string with the result being objective
export interface ObjectiveState {
    [prop: string] : Objective
}

export enum  ObjectiveContants {
  CREATE_OBJECTIVE = "CREATE_OBJECTIVE",
  GET_OBJECTIVES = "GET_OBJECTIVES",
  GET_OBJECTIVE = "GET_OBJECTIVE",
  PATCH_OBJECTIVE = "PATCH_OBJECTIVE",
  DELETE_OBJECTIVE = "DELETE_OBJECTIVE"
}

interface CreateObjectiveAction {
  type: typeof ObjectiveContants.CREATE_OBJECTIVE,
  payload: Objective
}

interface DeleteObjectiveAction {
  type: typeof ObjectiveContants.DELETE_OBJECTIVE,
  payload: string
}

interface GetAllObjectivesAction {
  type: typeof ObjectiveContants.GET_OBJECTIVES,
  payload: Objective[]
}

interface GetObjectiveAction {
  type: typeof ObjectiveContants.GET_OBJECTIVE,
  payload: Objective
}

interface PatchObjectiveAction {
  type: typeof ObjectiveContants.PATCH_OBJECTIVE,
  payload: Objective
}



export type ObjectActionTypes = CreateObjectiveAction | DeleteObjectiveAction | GetAllObjectivesAction | GetObjectiveAction | PatchObjectiveAction