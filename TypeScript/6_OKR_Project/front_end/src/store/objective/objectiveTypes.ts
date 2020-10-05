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