import React, { useState, useContext } from 'react'
import { UserContext } from '../../context/UserContext';
import { getPublicKeyCredentialCreationOptions } from '../../utils/publicKey';

interface NewCredentialButtonProps {
    type?: AuthenticatorSelectionCriteria['authenticatorAttachment']
    onCreated(cred: { nickname: string, credential: PublicKeyCredential }): void
    existingCredentials?: PublicKeyCredentialCreationOptions['excludeCredentials']
}

export function NewCredentialButton({ type, onCreated, existingCredentials = [] }: NewCredentialButtonProps) {
    const { user } = useContext(UserContext)
    const [nickname, setNickname] = useState('')

    const [credential, setCredential] = useState<PublicKeyCredential | undefined>(undefined)

    async function registerNewCredential(type: NewCredentialButtonProps['type']) {
        if (!user || !user.id || !user.displayName || !user.username) return

        const options = await getPublicKeyCredentialCreationOptions({ displayName: user.displayName, id: user.id, username: user.username }, { authenticatorAttachment: type, excludeCredentials: existingCredentials })
        const credential = await window.navigator.credentials.create({ publicKey: options })

        credential && credential.type === 'public-key' && setCredential(credential)
    }

    function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
        ev.preventDefault();

        if (!credential || !nickname) return
        onCreated({ credential, nickname })

        // reset
        setNickname('')
        setCredential(undefined)
    }

    return credential
        ? (
            <div>
                <form onSubmit={onSubmit}>
                    <label htmlFor="nickname">
                        Device nickname
                        <input type="text" name="nickname" value={nickname} required onChange={e => setNickname(e.target.value)} />
                    </label>
                    <input type="submit" value="Save" />
                </form>
            </div>
        )
        : <button type="button" className="button" onClick={() => registerNewCredential(type)}>Add a new security key</button>
}
