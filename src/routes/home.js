import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Nweet from "../components/nweet";
import NweetFactory from "../components/nweetFactory";
import { dbService } from "../firebase";

export default function Home({ userObj }) {
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    onSnapshot(collection(dbService, "nweets"), (snapshot) => {
      const newArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(newArray);
    });
  }, []);

  return (
    <div className="container router">
      <NweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
}
