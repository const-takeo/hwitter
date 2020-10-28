import React, { useState } from "react";
import { dbService, storageService } from "../database/fBase";
import { v4 as uuidv4 } from "uuid";

const HweetFactory = ({ userObj }) => {
  const [hweet, setHweet] = useState("");
  const [attachment, setAttachment] = useState("");
  //
  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    //
    reader.readAsDataURL(theFile);
    //
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
  };
  //
  const onSubmit = async (e) => {
    e.preventDefault();
    let attachmentURL = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentURL = await response.ref.getDownloadURL();
    }
    const attachmentObj = {
      text: hweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentURL,
    };
    await dbService.collection("hweet").add(attachmentObj);
    setHweet("");
    setAttachment("");
  };
  //
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setHweet(value);
  };
  //
  const clearRef = () => {
    setAttachment("");
  };
  //
  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          type="text"
          placeholder="あなたが今考えているものは?"
          maxLength={120}
          value={hweet}
          onChange={onChange}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{
            opacity: 0,
          }}
        />
      <label for="attach-file" className="factoryInput__label">
        <span>イメージ追加</span>
      </label>
      {attachment && (
        <div className="factoryForm__attachment">
          <img
            src={attachment}
            style={{
              backgroundImage: attachment,
            }}
            alt="attached"
          />
          <div className="factoryForm__clear" onClick={clearRef}>
            <span>取り消し</span>
          </div>
        </div>
      )}
    </form>
  );
};

export default HweetFactory;
