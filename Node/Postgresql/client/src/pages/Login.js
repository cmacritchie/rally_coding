import React, { useEffect, useState} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Credentials from '../components/Credentials'
import { loginUser } from '../actions/userActions'

const mapDispatchToProps = dispatch => bindActionCreators(
    { loginUser },
    dispatch,
)

const Login = ({ loginUser }) => {

    const submit = (info) => {
        loginUser(info)
    }

    return(
        <>
        <h1>Login</h1>
        <Credentials onSubmit={submit} />
        </>
    )
}

export default connect(null, mapDispatchToProps)(Login)
