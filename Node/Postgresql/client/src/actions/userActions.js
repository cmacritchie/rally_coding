import axios from 'axios'
// import { history }

export const UserActionTypes = { 
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAIL: 'LOGIN_FAIL',
    REGISETER_USER: 'REGISTER_USER',
    LOGOUT: 'LOGOUT',
}

export const registerUser = (newUser) => async dispatch => {
    const res = await axios.post('localhost:5000/api/user', newUser);
    dispatch({
        type: UserActionTypes.REGISETER_USER,
        payload: res.data
    })
}

export const loginUser = (credentials) => async dispatch => {
    try{
        const res = await axios.post('/api/login', credentials)
        dispatch({
            type: UserActionTypes.LOGIN_SUCCESS,
            payload: res.data
        })
    } catch (e) {
        console.log(e)
        dispatch({
            type: UserActionTypes.LOGIN_FAIL,
        })
    }
}

export const logout = () => async dispatch => {
    try {
        const res = await axios.post('/api/logout')
        dispatch({ type: UserActionTypes.LOGOUT })
    } catch (e) {
        console.log(e)
    }
}