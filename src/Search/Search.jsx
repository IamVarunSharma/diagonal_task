import React, { memo, useContext, useRef, useEffect } from "react";

import "./search.scss";
import DataContext from "../Context/DataContext";
import { throttle } from "../utils/utils";

const Search = ({ visibility }) => {
  const { setSearchQuery, searchQuery } = useContext(DataContext);
  let inputRef = useRef();

  const handleChange = throttle((event) => {
    setSearchQuery(event.target.value);
  }, 1000);

  useEffect(() => {
    inputRef.current.focus();
  }, [visibility]);

  return (
    <input
      className="search"
      onChange={handleChange}
      value={searchQuery}
      type="text"
      placeholder="Search"
      id="search"
      ref={inputRef}
      style={{ display: visibility }}
    />
  );
};

export default memo(Search);
