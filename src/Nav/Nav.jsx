import React, { memo, useState } from "react";

import "./nav.scss";
import { BASE_URL } from "../utils/utils";
import Search from "../Search/Search";

const Nav = () => {
  const [visibility, setVisibility] = useState(false);
  return (
    <div className="nav-bar">
      <img
        className="nav-back-button"
        src={`${BASE_URL}/images/Back.png`}
        alt="back button"
      />
      {!visibility ? (
        <span className="nav-title">Romantic Comedy</span>
      ) : (
        <Search visibility={visibility ? "block" : "none"} />
      )}
      <img
        onClick={() => {
          setVisibility((prev) => !prev);
        }}
        className="nav-search-button"
        src={`${BASE_URL}/images/search.png`}
        alt="search button"
      />
    </div>
  );
};

export default memo(Nav);
