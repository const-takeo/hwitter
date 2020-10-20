import React, { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onChange = e => {
        const {target:{name, value}} = e;
        if(name === "email") {
            setEmail(value);
        } else if(name === "password") {
            setPassword(value);
        }
    }
    const onSubmit = e => {
        e.preventDefault();
    }
    return (
        <>
            <div>
                <form onSubmit={onSubmit}>
                    <input type="email" placeholder="email" required value={email} onChange={onChange} name="email"/>
                    <input tyoe="password" placeholder="password"required value={password} onChange={onChange} name="password"/>
                    <input type="submit" value="Sign In" />
                </form>
            </div>
            <div>
                <button>Continue with Google</button>
            </div>
        </>
    );
}

export default Auth;