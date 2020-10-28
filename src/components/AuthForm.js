import React, { useState } from "react";
import { authService } from "../database/fBase";

const AuthForm = ({ newAccount }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setErr(error.message);
    }
  };
  return (
    <div>
      <p>{err}</p>
      <form onSubmit={onSubmit} className="container">
        <input
          type="email"
          placeholder="メール"
          required
          value={email}
          onChange={onChange}
          name="email"
          className="authInput"
        />
        <input
          type="password"
          placeholder="パスワード"
          required
          value={password}
          onChange={onChange}
          name="password"
          className="authInput"
        />
        <input type="submit" className="authInput authSubmit" value={newAccount ? "生成" : "入場"} />
      </form>
    </div>
  );
};

export default AuthForm;
