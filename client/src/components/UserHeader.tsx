import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export function UserHeader() {
    const { user } = useContext(UserContext)
    const displayName = (user && user.displayName) || ''
    return (
        <header>
            <nav className="navigation">
                <section className="container">
                    <Link to='/'>Home</Link>
                    <ul className="navigation-list">
                        <li className="navigation-item">Hi {displayName || 'there'}!</li>
                        <li className="navigation-item"><Link to='/myaccount'>My Account</Link></li>
                        <li className="navigation-item"><Link to='/logout'>Log out</Link></li>
                    </ul>
                </section>
            </nav>
        </header>
    )
}
