import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

export function Login() {
    const { setUser } = useContext(UserContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
        ev.preventDefault()
        setUser({ id: username, username, displayName: username })
    }

    return (
        <div className="container">
            <div className="row row-center">
                <div className="column">
                    <div className="formcontainer">
                        <h3>Login page</h3>
                        <form id="register" onSubmit={onSubmit}>
                            <fieldset>
                                <label htmlFor="username">
                                    Username
                                    <input type="text" name="username" value={username} autoComplete="username" required onChange={(ev) => setUsername(ev.target.value)} />
                                </label>
                                <label htmlFor="password">
                                    Password
                                    <input type="password" name="password" value={password} autoComplete="current-password" required onChange={(ev) => setPassword(ev.target.value)} />
                                </label>
                                <input className="button-primary" type="submit" value="Log in" />
                            </fieldset>
                        </form>

                        <Link to='/register'>Don't have an account? Register page</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
