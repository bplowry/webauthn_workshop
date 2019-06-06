import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext';

export function Profile() {
    const { user } = useContext(UserContext)
    return (
        <div>Welcome {user && user.displayName || 'to this great app'}!</div>
    )
}
