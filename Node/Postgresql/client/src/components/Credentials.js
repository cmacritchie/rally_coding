import React, { useState} from 'react'

const Credentials = ({ onSubmit, email = false}) => {
    const [credentials, setCredentials] = useState({email:'', password:'', name:''})

    const submitForm = e => {
        e.preventDefault()
        onSubmit(credentials);
    }

    return(
        <form className="credentials" id="credentials-form" onSubmit={e => submitForm(e)}>
            <label htmlFor="login-username">User Name</label>
            <input required  name="username" id="login-username" value={credentials.name} onChange={e=>setCredentials({...credentials, name: e.target.value })}></input><br />
            {email &&
            <>
                <label htmlFor="login-email">email</label>
                <input required  name="email" id="login-email" value={credentials.email} onChange={e=>setCredentials({...credentials, email: e.target.value })}></input><br />
            </>
            }
            <label htmlFor="login-password">password</label>
            <input required type="password" id="login-password" value={credentials.password} onChange={e=>setCredentials({...credentials, password:e.target.value})}></input><br />
            <button type="submit" form="credentials-form" value="Submit">Submit</button>
        </form>
    )
}

export default Credentials