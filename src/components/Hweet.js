import React, { useState } from "react";
import { dbService, storageService } from "../database/fBase";

const Hweet = ({ hweetObj, isOwner }) => {
  const [editng, setEditing] = useState(false);
  const [newHweet, setNewHweet] = useState(hweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are u sure delete this Hweet?");
    if (ok) {
      await dbService.doc(`hweet/${hweetObj.id}`).delete();
      await storageService.refFromURL(hweetObj.attachmentURL).delete();
    }
  };
  const toggleEdit = () => setEditing((prev) => !prev);
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewHweet(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.doc(`hweet/${hweetObj.id}`).update({ text: newHweet });
    setEditing(false);
  };
  //
  return (
    <div className="nweet">
      {editng ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              onChange={onChange}
              type="text"
              value={newHweet}
              required
              className="formInput"
              autoFocus
            />
            <input type="submit" value="修正" className="formBtn" />
          </form>
          <span onClick={toggleEdit} className="formBtn cancelBtn">
            取り消し
          </span>
        </>
      ) : (
        <>
          <h4>{hweetObj.text}</h4>
          {hweetObj.attachmentURL && (
            <img src={hweetObj.attachmentURL} alt="attachmented" />
          )}
        </>
      )}
      {isOwner && (
         <div class="nweet__actions">
          <span onClick={onDeleteClick}>削除</span>
          <span onClick={toggleEdit}>修正</span>
        </div>
      )}
    </div>
  );
};

export default Hweet;
