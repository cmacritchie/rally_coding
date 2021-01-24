import axios from 'axios'
// import { history }

export const UserActionTypes = { 
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAIL: 'LOGIN_FAIL',
    REGISETER_USER: 'REGISTER_USER',
    LOGOUT: 'LOGOUT',
}

export const getMe = () => async dispatch => {

    try{
        const res = await axios.get('/api/me',);
        console.log("good", res)
        dispatch({
            type: UserActionTypes.LOGIN_SUCCESS,
            payload: res.data
        })
    
    } catch (e) {
        console.log('bad', e)
    }
}

export const registerUser = (newUser) => async dispatch => {
    console.log("inside action ",newUser)
    try{
        const res = await axios.post('/api/user', newUser);
        console.log(res);
        dispatch({
            type: UserActionTypes.REGISETER_USER,
            payload: res.data
        })
    } catch (e) {
        console.log(e)
    }
}

export const loginUser = (credentials) => async dispatch => {
    try{
        const res = await axios.post('/api/login', credentials)
        console.log('credentials, ', res)
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
    console.log('logout');
    try {
        const res = await axios.post('/api/logout')
        dispatch({ type: UserActionTypes.LOGOUT })
    } catch (e) {
        console.log(e)
    }
}