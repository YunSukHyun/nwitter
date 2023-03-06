import { useEffect, useState } from "react";
import { authService } from "../firebase";
import Router from "./router";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      uid: user.uid,
      displayName: user.displayName,
    });
  };
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          uid: user.uid,
          displayName: user.displayName,
        });
      } else {
        setUserObj(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <Router
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "initializing..."
      )}
    </>
  );
}

export default App;
