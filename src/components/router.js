import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../routes/auth";
import Home from "../routes/home";
import Profile from "../routes/profile";
import Navigation from "./navigation";

export default function Router({ refreshUser, isLoggedIn, userObj }) {
  return (
    <BrowserRouter>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home userObj={userObj} />} />
            <Route
              path="/profile"
              element={<Profile refreshUser={refreshUser} userObj={userObj} />}
            />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
