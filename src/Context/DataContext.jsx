import React, { createContext } from "react";

const DataContext = createContext({
  data: [],
  setData: () => {},
  visibleCards: [],
  setVisibleCards: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
});

export default DataContext;
