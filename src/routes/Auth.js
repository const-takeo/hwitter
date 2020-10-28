import React, { useState } from "react";
import AuthForm from "../components/AuthForm";
import HalIcon from "../components/HAL";
import { authService, firebaseInstance } from "../database/fBase";

const Auth = () => {
  const [newAccount, setNewAccount] = useState(false);
  const toggleAccount = () => setNewAccount((prev) => !prev);
  //
  const onSocialClick = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };
  return (
    <div className="authContainer">
      <div className="halIcon">
        <HalIcon />
      </div>
      <AuthForm newAccount={newAccount}/>
      <div className="authBtns">
        <button onClick={onSocialClick} className="authSwitch" name="google" className="authBtn">
          Googleログイン
        </button>
        <button onClick={toggleAccount} className="authBtn">
          {newAccount ? "入場" : "アカウント生成"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
