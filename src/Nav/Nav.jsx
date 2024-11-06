import React from "react";

import "./nav.scss";
import { BASE_URL } from "../utils/utils";

const Nav = ({ setVisibility }) => {
  return (
    <div className="nav-bar">
      <img
        className="nav-back-button"
        src={`${BASE_URL}/images/Back.png`}
        alt="back button"
      />
      <span className="nav-title">Romantic Comedy</span>
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

export default Nav;
