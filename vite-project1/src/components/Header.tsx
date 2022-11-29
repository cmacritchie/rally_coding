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
        <Link to="/">Home</Link>
        <Link to="/rqpage">RQ Page</Link>
        </ul>
      </nav>

      <hr />
      <button onClick={login} className="login">
                    Login with Google
                </button>

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  )
}
