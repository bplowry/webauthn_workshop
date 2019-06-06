import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

export function Register() {
    const { setUser } = useContext(UserContext)
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
        ev.preventDefault()
        setUser({ id: username, username, displayName: name })
    }

    return (
        <div className="container">
            <div className="row row-center">
                <div className="column">
                    <div className="formcontainer">
                        <h3>Register page</h3>
                        <form id="register" onSubmit={onSubmit}>
                            <fieldset>
                                <label htmlFor="username">
                                    Username
                                    <input type="text" name="username" value={username} autoComplete="username" required onChange={(ev) => setUsername(ev.target.value)} />
                                </label>
                                <label htmlFor="name">
                                    Name
                                    <input type="text" name="name" value={name} autoComplete="name" required onChange={(ev) => setName(ev.target.value)} />
                                </label>
                                <label htmlFor="password">
                                    Password
                                    <input type="password" name="password" value={password} autoComplete="new-password" required onChange={(ev) => setPassword(ev.target.value)} />
                                </label>
                                <input className="button-primary" type="submit" value="Register" />
                            </fieldset>
                        </form>

                        <Link to='/login'>Already registered? Login page</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
