import React, { useState } from 'react'

interface Credential {
    id: string
    type: 'Cross-platform' | 'Platform'
    displayName: string
    lastUsed: string
}


export function Credentials() {
    const [credentials, setCredentials] = useState<Credential[]>([])

    function registerNewCredential() {
        setCredentials([...credentials, { id: `${Date.now()}`, type: 'Platform', displayName: 'Other', lastUsed: (new Date()).toISOString() }])
    }

    function removeCredential(id: Credential['id']) {
        return () => setCredentials(credentials.filter(x => x.id !== id))
    }

    if (!credentials.length) {
        return (
            <div>
                <p>You do not have any credentials registered</p>
                <button type="button" className="button" onClick={registerNewCredential}>Add a new login method</button>
            </div>
        )
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {['Type', 'Description', 'Last used', 'Actions'].map(key => <th key={key}>{key}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {credentials.map(cred => (
                        <tr key={cred.id}>
                            <td>
                                {cred.type}
                            </td>
                            <td>
                                {cred.displayName}
                            </td>
                            <td>
                                {new Date(cred.lastUsed).toLocaleString()}
                            </td>
                            <td>
                                <button type="button" className="button" onClick={removeCredential(cred.id)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button type="button" className="button" onClick={registerNewCredential}>Add a new login method</button>
        </div>
    )
}
