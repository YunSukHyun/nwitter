import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";
import { dbService, storageService } from "../firebase";

export default function Nweet({ nweetObj, isOwner }) {
  const [edit, setEdit] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const onDeleteClick = async () => {
    if (window.confirm("삭제하시겠습니까?")) {
      const data = doc(dbService, "nweets", nweetObj.id);
      await deleteDoc(data);
      console.log(nweetObj);
      if (nweetObj.attachmentUrl !== "") {
        await deleteObject(ref(storageService, nweetObj.attachmentUrl));
      }
    }
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewNweet(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = doc(dbService, "nweets", nweetObj.id);
    updateDoc(data, { text: newNweet });
    setEdit(false);
  };
  const toggleEdit = () => setEdit((prev) => !prev);
  return (
    <div>
      {edit ? (
        <>
          <form onSubmit={onSubmit}>
            <input onChange={onChange} value={newNweet} required />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEdit}>Cancel</button>
        </>
      ) : (
        <>
          {" "}
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && (
            <img
              src={nweetObj.attachmentUrl}
              alt="bad"
              width="50px"
              height="50px"
            />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEdit}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
}
