export interface Result {
    // _id: string
    resultDescription: string
    owner: string
    objectiveId: string
    createdAt?: string
    updatedAt?: string
}

export interface ResultState {
    [prop: string] : Result
}

