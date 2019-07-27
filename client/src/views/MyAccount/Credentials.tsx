import React, { useState } from 'react'
import { NewCredentialButton } from './NewCredentialButton';

interface Credential {
    id: string
    displayName: string
    lastUsed: string
    lastReviewed: string | null
}


export function Credentials() {
    const [credentials, setCredentials] = useState<Credential[]>([
        { id: '1', displayName: 'Yubico 5C', lastUsed: '2019-04-22T03:11:12Z', lastReviewed: null },
        { id: '2', displayName: 'Yubico 5 NFC', lastUsed: '2019-03-12T05:01:47Z', lastReviewed: '2019-03-15' },
        { id: '3', displayName: 'Google Pixel', lastUsed: '2019-07-31T14:14:14Z', lastReviewed: null },
    ])

    async function registerNewCredential({ credential, nickname }: { credential: PublicKeyCredential, nickname: string }) {
        setCredentials([...credentials, {
            id: credential.id,
            displayName: nickname,
            lastUsed: (new Date()).toISOString(),
            lastReviewed: null
        }])
    }

    function removeCredential(id: Credential['id']) {
        return () => setCredentials(credentials.filter(x => x.id !== id))
    }

    function reviewCredential(id: Credential['id']) {
        return () => {
            const index = credentials.findIndex(x => x.id === id)
            const updatedCreds = [...credentials]
            updatedCreds.splice(index, 1, {
                ...credentials[index],
                lastReviewed: (new Date()).toISOString(),
            })
            setCredentials(updatedCreds)
        }
    }

    if (!credentials.length) {
        return (
            <div>
                <p>You do not have any credentials registered</p>
                <NewCredentialButton onCreated={registerNewCredential} existingCredentials={credentials.map(x => ({
                    type: 'public-key', id: Uint8Array.from(x.id, c => c.charCodeAt(0))
                }))} />
            </div>
        )
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {[{ heading: 'Name'}, { heading: 'Last used' }, { heading: 'Actions', textAlign: 'right' as const}].map(({ heading, textAlign }) => <th style={{ ...(textAlign && { textAlign })}} key={heading}>{heading}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {credentials.map(cred => {
                        // get the last date it was used or reviewed. if > 90 days ago, prompt user to review again
                        const lastUsed = new Date(cred.lastUsed)
                        const lastReviewed = cred.lastReviewed && cred.lastReviewed > cred.lastUsed ? new Date(cred.lastReviewed) : lastUsed
                        const needsReview = lastReviewed.getTime() < (Date.now() - 7776000000) /* = 90 days = (90 * 24 * 60 * 60 * 1000) */

                        return (
                            <tr key={cred.id}>
                                <td>
                                    {cred.displayName}
                                </td>
                                <td>
                                    {lastUsed.toLocaleString('en-AU')}
                                    {needsReview && (
                                        <div>
                                            <span role="img" aria-label="Warning">⚠</span> You haven't used this authenticator in a while.
                                            <div>If you have lost or no longer own this device, consider removing it.</div>
                                        </div>
                                    )}
                                </td>
                                <td style={{textAlign:"right"}}>
                                    {needsReview && <><button type="button" className="button button-outline" onClick={reviewCredential(cred.id)}>Keep</button>&nbsp;</>}
                                    <button type="button" className="button" onClick={removeCredential(cred.id)}>Remove</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <NewCredentialButton onCreated={registerNewCredential} />
        </div>
    )
}
