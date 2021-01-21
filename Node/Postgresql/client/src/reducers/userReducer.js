import { UserActionTypes } from '../actions/userActions'


const initialState = {
    loginError: false,
    isAuthenticated: false,
    userInfo:null
}

export default function(state = initialState, action) {
    const { type, payload} = action;
    switch(type) {
        case UserActionTypes.LOGIN_SUCCESS:
        case UserActionTypes.REGISETER_USER:
            return { ...state, loginError: false, isAuthenticated: true, userInfo: { ...payload }}
        case UserActionTypes.LOGIN_FAIL:
            return { ...state, loginError: true }
        case UserActionTypes.LOGOUT:
            return { ...state, ...initialState }
        default:
            return state
    }
}