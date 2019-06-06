import React from 'react'
import { Link } from 'react-router-dom';

export function Landing() {
    return (
        <main className="landing">
            <div className="placeholder">
                <img src='fingerprint.gif' alt='' role='presentation' />
                <p>There's not much here.</p>
                <p>Try going to <Link to='/myaccount'>My Account</Link></p>
            </div>
        </main>
    )
}
