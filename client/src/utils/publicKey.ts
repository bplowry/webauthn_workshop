import { delay } from "./timer";

interface PublicKeyCredentialStatic {
    isUserVerifyingPlatformAuthenticatorAvailable(): Promise<boolean>
}

export async function isUserVerifyingPlatformAuthenticatorAvailable(): Promise<boolean> {
    if ('PublicKeyCredential' in window) {
        return ((window as any).PublicKeyCredential as PublicKeyCredentialStatic) // yay TypeScript
            .isUserVerifyingPlatformAuthenticatorAvailable()
    }
    return false
}

interface User {
    id: string
    username: string,
    displayName: string
}

interface Options {
    authenticatorAttachment?: AuthenticatorSelectionCriteria['authenticatorAttachment']
    userVerification?: AuthenticatorSelectionCriteria['userVerification']
    excludeCredentials?: PublicKeyCredentialCreationOptions['excludeCredentials']
}

export async function getPublicKeyCredentialCreationOptions(user: User, {
    authenticatorAttachment = undefined,
    userVerification = 'preferred',
    excludeCredentials = undefined
}: Options = {}): Promise<PublicKeyCredentialCreationOptions> {
    const challenge = await getChallengeFromServer()

    const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions = {
        challenge: Uint8Array.from(challenge, c => c.charCodeAt(0)),
        authenticatorSelection: {
            authenticatorAttachment,
            userVerification
        },
        excludeCredentials,
        pubKeyCredParams: [
            { type: 'public-key', alg: -7 },
            { type: 'public-key', alg: -257 }
        ],
        rp: {
            name: 'WebAuthn Workshop'
        },
        user: {
            displayName: user.displayName,
            name: user.username,
            id: Uint8Array.from(user.id, c => c.charCodeAt(0)),
        },
        timeout: 60000
    }
    return publicKeyCredentialCreationOptions
}

async function getChallengeFromServer() {
    return 'tHiS_sHOUlD BE-A lonG, rAndOMly_GenERAtEd StRiNg'
}

export async function saveCredentialToServer(user: any, credential: any) {
    await delay(500)
    return { status: 'OK' }
}
