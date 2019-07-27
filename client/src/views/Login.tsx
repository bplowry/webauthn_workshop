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

    function doLogin(ev: React.SyntheticEvent) {
        window.navigator.credentials.get({
            publicKey: {
                allowCredentials: [],
                challenge: Uint8Array.from('this is a test', c => c.charCodeAt(0)),
                userVerification: 'required',
            }
        }).then(() => {
            onSubmit(ev as any);
        })
        .catch(console.error)
    }

    return (
        <div className="container">
            <div className="row row-center">
                <div className="column">
                    <div className="formcontainer">
                        <h3>Log in</h3>
                        <form id="register" onSubmit={onSubmit}>
                            <fieldset>
                                <label htmlFor="username">
                                    Username
                                    <input type="text" name="username" value={username} autoComplete="username" required onChange={(ev) => setUsername(ev.target.value)} />
                                </label>
                                <div style={{display: 'flex'}}>
                                    <div className="login-option noflex">
                                        <label htmlFor="password">
                                            Password
                                            <input type="password" name="password" value={password} autoComplete="current-password" required onChange={(ev) => setPassword(ev.target.value)} />
                                        </label>
                                        <input className="button-primary" type="submit" value="Log in with password" />
                                    </div>
                                    <div className="login-option"> or </div>
                                    <div className="login-option">
                                        <button className="button-primary" type="button" onClick={doLogin}>Log in with your device</button>
                                    </div>
                                </div>
                            </fieldset>
                        </form>

                        <Link to='/register'>Don't have an account? Register</Link>

                        <pre>
                            <code>
{`function onLoginWithDevice() {
    getOptionsFromServer(userId, 'platform')
        .then(getOptions)
        .then(window.navigator.credentials.get)
        .then(sendCredentialToServer)
        .then(response => {
            if (response.success) {
                loggedIn();
            } else {
                throw new Error('Unable to log in');
            }
        });
}`}
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    )
}
