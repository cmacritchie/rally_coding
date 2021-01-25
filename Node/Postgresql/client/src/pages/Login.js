import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Credentials from '../components/Credentials'
import { loginUser, failAcknowledge } from '../actions/userActions'
import { useHistory } from "react-router-dom";

const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    

    useEffect(() => {
        return () => { 
            if(user.loginError) {
                dispatch(failAcknowledge()) 
            } 
        }
    },[])

    const submit = (info) => {
        dispatch(loginUser(info, history))
    }

    return(
        <>
        <h1>Login</h1>
        <Credentials onSubmit={submit} />
        {(user.loginError && !user.failAcknowledge) &&
            <h1>Failed to Sign up </h1>
        }
        </>
    )
}

export default Login
