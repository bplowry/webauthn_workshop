import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { UserContext, UserContextType } from './context/UserContext';
import { Register } from './views/Register';
import { Login } from './views/Login';
import { Logout } from './views/Logout';
import { MyAccount } from './views/MyAccount';
import { Landing } from './views/Landing';
import { NotFound } from './views/NotFound';
import { UserHeader } from './components/UserHeader';
import { delay } from './utils/timer';

const App: React.FC = () => {
    const [user, setUser] = useState<UserContextType['user']>(null)

    // temporary health check to make sure we can contact the API
    // useEffect(() => {
    //     fetch('/api/health')
    //         .then(resp => resp.json())
    //         .then(console.log)
    //         .catch(console.error)
    // }, [])

    useEffect(() => {
        let ignore = false

        async function checkAuthenticated() {
            const [user] = await Promise.all<UserContextType['user'], any>([
                Promise.resolve(false), // do the fetch
                delay(1000, () => 0), // but make sure we're not "loading" for too short a period such that it causes a flash
            ])
            if (!ignore) setUser(user)
        }

        checkAuthenticated()
        return () => { ignore = true }
    }, [])

    return (
        <BrowserRouter>
            <UserContext.Provider value={{ user: user, setUser: setUser }}>
                {user === null ? <CheckingAuthentication />
                    : user ? <AuthenticatedApp />
                        : <UnauthenticatedApp />}
            </UserContext.Provider>
        </BrowserRouter>
    )
}

function AuthenticatedApp() {
    return (
        <React.Fragment>
            <UserHeader />
            <div className="container">
                <Switch>
                    <Route path='/' exact component={Landing} />
                    <Route path='/myaccount' component={MyAccount} />
                    <Route path='/logout' component={Logout} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </React.Fragment>
    );
}

function UnauthenticatedApp() {
    return (
        <Switch>
            <Route path='/' exact render={() => <Redirect to='/login' />} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route render={() => <Redirect to='/login' />} />
        </Switch>
    );
}

function CheckingAuthentication() {
    return (
        <div className="placeholder">
            <span role="img" aria-label="">⏲</span>
            <p>Checking authentication ...</p>
        </div>
    )
}

export default App;
