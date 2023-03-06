import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";
import { dbService, storageService } from "../firebase";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Nweet({ nweetObj, isOwner }) {
  const [edit, setEdit] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const onDeleteClick = async () => {
    if (window.confirm("삭제하시겠습니까?")) {
      const data = doc(dbService, "nweets", nweetObj.id);
      await deleteDoc(data);
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
    <div className="nweet">
      {edit ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              onChange={onChange}
              value={newNweet}
              required
              placeholder="Edit your nweet"
              autoFocus
              className="formInput"
            />
            <input type="submit" value="Update Nweet" className="formBtn" />
          </form>
          <button onClick={toggleEdit} className="formBtn cancelBtn">
            Cancel
          </button>
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
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEdit}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
