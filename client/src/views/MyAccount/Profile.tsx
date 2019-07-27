import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext';

export function Profile() {
    const { user } = useContext(UserContext)
    const displayName = (user && user.displayName) || ''
    const [name, setName] = useState(displayName)
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)

    function submit(ev: React.FormEvent<HTMLFormElement>) {
        ev.preventDefault() // ¯\_(ツ)_/¯

        setSaved(false)
        setSaving(true)

        setTimeout(() => {
            setSaved(true)
            setSaving(false)
        }, 2000)
    }

    return (
        <>
            <div>Welcome {displayName || 'to this great app'}!</div>
            <form name="profile" onSubmit={submit}>
                <fieldset>
                    <label htmlFor="name">
                        Name
                        <input type="text" name="name" value={name} autoComplete="name" required onChange={(ev) => setName(ev.target.value)} />
                    </label>
                    <label htmlFor="email">
                        Email
                        <input type="email" name="email" value={email} autoComplete="email" onChange={(ev) => setEmail(ev.target.value)} />
                    </label>
                    <label htmlFor="phone">
                        Phone
                        <input type="tel" name="phone" value={phone} autoComplete="tel" onChange={(ev) => setPhone(ev.target.value)} />
                    </label>
                    <input className="button button-primary" type="submit" value={`Save ${saving ? ' ⏳' : ''}`} disabled={saving} />
                    {saved && <>&nbsp;<span role="img" aria-label="Success">✔</span> Saved</>}
                </fieldset>
            </form>
        </>
    )
}
