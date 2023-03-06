import { updateProfile } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../firebase";

export default function Profile({ userObj, refreshUser }) {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  // const getMyNweets = async () => {
  //   const nweetsRef = collection(dbService, "nweets");
  //   const q = query(
  //     nweetsRef,
  //     where("creatorId", "==", userObj.uid),
  //     orderBy("createdAt", "asc")
  //   );
  //   const nweets = await getDocs(q);
  //   console.log(nweets.docs);
  // };
  // useEffect(() => {
  //   getMyNweets();
  // });

  return (
    <div className="container router">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          value={newDisplayName || ""}
          type="text"
          placeholder="Display name"
          autoFocus
          className="formInput"
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{ marginTop: 10 }}
        />
      </form>
      <span onClick={onLogOutClick} className="formBtn cancelBtn logOut">
        Log out
      </span>
    </div>
  );
}
