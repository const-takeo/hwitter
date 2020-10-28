import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "../database/fBase";

const Profile = ({ userObj, refreshUser }) => {
  console.log(userObj);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const history = useHistory();
  const onSignOut = async () => {
    await authService.signOut();
    history.push("/");
  };
  //
  const getMyHweets = async () => {
    const hweets = await dbService
      .collection("hweet")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt", "desc")
      .get();
    console.log(hweets.docs.map((hweet) => hweet.data()));
  };
  //
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };
  //
  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  //
  useEffect(() => {
    getMyHweets();
  }, []);
  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          placeholder="貴方様"
          value={newDisplayName}
          autoFocus
          className="formInput"
        />
        <input
          type="submit"
          value="更新"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span onClick={onSignOut} className="formBtn cancelBtn logOut">
        退場
      </span>
    </div>
  );
};

export default Profile;
