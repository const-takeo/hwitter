import React, { useEffect, useState } from "react";
import Hweet from "../components/Hweet";
import { dbService, storageService } from "../database/fBase";
import HweetFactory from "../components/HweetFactory";

const Home = ({ userObj }) => {
  const [hweets, setHweets] = useState([]);

  //
  useEffect(() => {
    dbService.collection("hweet").onSnapshot((snapshot) => {
      const hweetArray = snapshot.docs.map((documents) => ({
        id: documents.id,
        ...documents.data(),
      }));
      setHweets(hweetArray);
    });
  }, []);
  //
  return (
    <div className="container">
      <HweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {hweets.map((hweet) => (
          <Hweet
            key={hweet.id}
            hweetObj={hweet}
            isOwner={hweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
