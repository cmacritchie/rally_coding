import { combineReducers } from 'redux'
import { userReducer } from './user/userReducer'
import { objectiveReducer } from './objective/objectiveReducer'

//rootReducer
const rootReducer = combineReducers({
    users: userReducer,
    objectives: objectiveReducer
})
export default rootReducer

export type RootState = ReturnType<typeof rootReducer>
 
