import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Link } from "react-router-dom";

export default function Navigation({ userObj }) {
  return (
    <nav>
      <ul className="posting">
        <li>
          <Link to="/" style={{ marginRight: 10 }}>
            <FontAwesomeIcon icon={faTwitter} color={"#04AAF"} size="2x" />
          </Link>
        </li>
        <li>
          <Link to="/profile" className="profile">
            <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
            <span style={{ marginTop: 10 }}>
              {userObj.displayName
                ? `${userObj.displayName}의 profile`
                : "Profile"}
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
