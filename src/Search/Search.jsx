import React, { useState, useEffect, useMemo } from "react";

import "./search.scss";

const Search = ({ setVisibleCards, data, visibility }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(
    () =>
      data.filter((item) =>
        item.name.match(
          new RegExp(searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi")
        )
      ),
    [searchQuery, data]
  );

  const search = () => {
    if (searchQuery.length && visibility) {
      setVisibleCards(filteredData);
    } else {
      setSearchQuery('')
      setVisibleCards(data);
    }
  };

  useEffect(() => {
    search();
  }, [searchQuery, data]);

  return (
    <input
      className="search"
      value={searchQuery}
      type="text"
      placeholder="Search"
      id="search"
      onChange={(event) => setSearchQuery(event.target.value)}
      style={{display: visibility}}
    />
  );
};

export default Search;
