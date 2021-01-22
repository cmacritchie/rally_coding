import React, { useEffect, useState} from 'react'

const Login = () => {
    const [credentials, setCredentials] = useState({email:'', password:''})

    return(
        <div className="login">
            <label htmlFor="login-email">email</label>
            <input  name="gender" id="login-email" value={credentials.email} onChange={e=>setCredentials({...credentials, email: e.target.value })}></input><br />
            <label htmlFor="login-password">password</label>
            <input type="password" id="login-password" value={credentials.password} onChange={e=>setCredentials({...credentials, password:e.target.value})}></input><br />
        </div>
    )
}

export default Login