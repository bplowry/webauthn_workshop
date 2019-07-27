import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { isUserVerifyingPlatformAuthenticatorAvailable, getPublicKeyCredentialCreationOptions, saveCredentialToServer } from '../utils/publicKey';

export function Landing() {
    const { user } = useContext(UserContext)
    const [isUVPAA, setIsUVPAA] = useState(false)
    const [nickname, setNickname] = useState('')
    const [acknowledgedAuthenticatorPrompt, setAcknowledged] = useState(false)
    const [showCode, setShowCode] = useState(false)

    async function getIsUserVerifyingPlatformAuthenticatorAvailable() {
        const available = await isUserVerifyingPlatformAuthenticatorAvailable()
        setIsUVPAA(available)
    }

    /* normally this would happen on mount, but for the demo,
     * we'll trigger it on a click so we can show some code, too
    useEffect(() => {
        async function getIsUserVerifyingPlatformAuthenticatorAvailable() {
            const available = await isUserVerifyingPlatformAuthenticatorAvailable()
            setIsUVPAA(available)
        }

        getIsUserVerifyingPlatformAuthenticatorAvailable()
    }, []) */

    async function registerPlatformAuthenticator() {
        if (!user || !user.id || !user.displayName || !user.username) return

        const options = await getPublicKeyCredentialCreationOptions({ displayName: user.displayName, id: user.id, username: user.username }, { authenticatorAttachment: 'platform', userVerification: 'required' })
        const credential = await window.navigator.credentials.create({ publicKey: options })

        if (!credential || credential.type !== 'public-key') return

        await saveCredentialToServer(user, credential)
        setAcknowledged(true)
    }

    return (
        <>
        <main className="landing">
            <div className="placeholder" onClick={() => getIsUserVerifyingPlatformAuthenticatorAvailable()}>
                <img src='fingerprint.gif' alt='' role='presentation' />
                <p>There's not much here.</p>
                <p>Try going to <Link to='/myaccount'>My Account</Link></p>
            </div>
            {isUVPAA && !acknowledgedAuthenticatorPrompt && (
                <div style={{ backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, height: '100vh', width: '100vw' }}>
                    <dialog open={true} style={{ backgroundColor: 'white', position: 'fixed', top: '50%', transform: 'translate(0, -50%)', maxWidth: '60rem' }}>
                        <p>Your device is capable of logging in without a password.</p>
                        <label htmlFor="prompt-nickname">
                            Device name
                            <input type="text" name="prompt-nickname" value={nickname} onChange={e => setNickname(e.target.value)} />
                        </label>
                        <div style={{float: 'right'}}>
                            <button type="button" className="button button-outline" onClick={() => setAcknowledged(true)}>Remind me later</button>
                            &nbsp;
                            <button type="button" className="button" onClick={() => registerPlatformAuthenticator()}>Register this device</button>
                        </div>
                        {showCode ? (
                            <pre style={{clear: 'both', maxHeight: '40rem', overflow: 'auto'}}>
                            <code>
{`function onCancel() {
    // remind in 30 days
    window.localStorage
        .setItem('remindDate', (Date.now() + 2592000000).toString());
    hasSeenPrompt = true;
    closePrompt();
}

function onSubmit() {
    getOptionsFromServer(userId, 'platform')
        .then(createOptions)
        .then(window.navigator.credentials.create)
        .then(sendCredentialToServer)
        .then(response => {
            if (response.success) {
                hasSeenPrompt = true;
                hasRegisteredAuthenticator = true;
                closePrompt();
                showSuccessMessage();
            } else {
                throw new Error('Failed to save credential');
            }
        });
}`}
                    </code>
                        </pre>
                        ) : (
                            <>
                            <br />
                            <button type="button" className="button button-clear" onClick={() => setShowCode(true)}>Show code <span role="img" aria-label="">👇</span></button>
                            </>
                        )}
                    </dialog>
                </div>
            )}
        </main>
        <aside>
            <pre>
                <code>
{`function checkForRegisteredAuthenticator() {
    if (hasRegisteredAuthenticator) return;
    if (!window.PublicKeyCredential ||
        !window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable) {
        return;
    }

    if (hasSeenPrompt && remindDate > Date.now()) return;

    window.PublicKeyCredential
        .isUserVerifyingPlatformAuthenticatorAvailable()
        .then(available => {
            if (!available) return;
            showPrompt();
        });
}`}
                </code>
            </pre>
        </aside>
        </>
    )
}
