import React, { useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext';
import { delay } from '../utils/timer';

export function Logout() {
    const { setUser } = useContext(UserContext)

    useEffect(() => {
        let ignore = false

        async function doLogout() {
            await Promise.all([
                Promise.resolve(false), // call /api/logout
                delay(1000, () => 0), // but make sure we're not "loading" for too short a period such that it causes a flash
            ])
            localStorage.removeItem('user')
            if (!ignore) setUser(false)
        }

        doLogout()
        return () => { ignore = true }
    }, [setUser])

    return (
        <div className="placeholder">
            <span role="img" aria-label="">⏲</span>
            <p>Logging out</p>
        </div>
    )
}
