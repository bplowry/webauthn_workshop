import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

export function Login() {
    const { setUser } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
        ev.preventDefault();

        setLoading(true);
        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })
            .then(resp => {
                if (resp.status === 400) {
                    throw new Error("Username and password are required");
                }

                if (resp.status === 401) {
                    throw new Error(
                        "Invalid username and password combination"
                    );
                }

                if (!resp.ok) {
                    throw new Error("Failed to log in");
                }

                return resp.json();
            })
            .then(({ id, displayName }) => {
                setUser({ id, displayName });
            })
            .catch(e => setError((e && e.message) || "Failed to log in"))
            .finally(() => setLoading(false));
    }

    return (
        <div className="container">
            <div className="row row-center">
                <div className="column">
                    <div className="formcontainer">
                        <h3>Login page</h3>
                        <form id="register" onSubmit={onSubmit}>
                            <fieldset>
                                <label htmlFor="username">
                                    Username
                                    <input
                                        type="text"
                                        name="username"
                                        value={username}
                                        autoComplete="username"
                                        required
                                        onChange={ev =>
                                            setUsername(ev.target.value)
                                        }
                                    />
                                </label>
                                <label htmlFor="password">
                                    Password
                                    <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        autoComplete="current-password"
                                        required
                                        onChange={ev =>
                                            setPassword(ev.target.value)
                                        }
                                    />
                                </label>
                                {error && (
                                    <div
                                        className="error"
                                        aria-live="assertive"
                                    >
                                        {error}
                                    </div>
                                )}
                                <button
                                    type="submit"
                                    className="button-primary"
                                    disabled={loading}
                                >
                                    {loading && "⏳ "}Log in
                                </button>
                            </fieldset>
                        </form>

                        <Link to="/register">
                            Don't have an account? Register page
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
