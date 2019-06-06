import React from 'react'
import { Switch, Route, Link } from 'react-router-dom';
import { Profile } from './MyAccount/Profile';
import { Credentials } from './MyAccount/Credentials';

export function MyAccount() {
    return (
        <div className="myaccount">
            <aside className="container">
                <nav>
                    <section>
                        <ul>
                            <li><Link to='/myaccount' >Profile</Link></li>
                            <li><Link to='/myaccount/credentials'>Credentials</Link></li>
                        </ul>
                    </section>
                </nav>
            </aside>
            <main className="container">
                <Switch>
                    <Route path='/myaccount' exact component={Profile} />
                    <Route path='/myaccount/credentials' component={Credentials} />
                </Switch>
            </main>
        </div>
    )
}
