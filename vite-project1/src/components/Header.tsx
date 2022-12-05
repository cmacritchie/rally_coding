import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Header() {
  const { user, login } = useAuth();
  console.log("USER",user)
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/rqpage">RQ Page</Link>
          </li>
          <li>
            <Link to="/craigchat">Craig Chat</Link>{'   '}
          </li>
        </ul>
      </nav>

      <hr />
      {user ? 
      <h6>Logged In</h6>
      :
      <button onClick={login} className="login">
          Login with Google
      </button>
      
}
                

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  )
}
