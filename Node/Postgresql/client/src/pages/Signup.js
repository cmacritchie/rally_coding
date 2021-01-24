import React, { useEffect, useState} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Credentials from '../components/Credentials'
import { registerUser } from '../actions/userActions'

const mapDispatchToProps = dispatch => bindActionCreators(
    { registerUser },
    dispatch,
)

const Signup = ({ registerUser }) => {

    const submit = (info) => {
        console.log(info)
        registerUser(info)
    }

    return(
        <>
        <h1> Sign Up</h1>
        <Credentials onSubmit={submit} email={true} />
        </>
    )
}

export default connect(null, mapDispatchToProps)(Signup)