import React, { Suspense, useEffect, useState, lazy, useMemo } from "react";

import "./app.scss";
import { BASE_URL } from "../utils/utils";
import FallbackLoader from "../FallbackLoader/FallbackLoader";
import DataContext from "../Context/DataContext";

const Nav = lazy(() => import("../Nav/Nav"));
const Card = lazy(() => import("../Card/Card"));

const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [visibleCards, setVisibleCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  let appContainer;
  let cardContainer;

  const throttle = (func, wait) => {
    let isWaiting = false;
    return function executedFunction(...args) {
      if (
        appContainer.scrollTop <
          cardContainer.clientHeight - 2 * window.innerHeight ||
        loading
      ) {
        return;
      }
      if (!isWaiting) {
        func.apply(this, args);
        isWaiting = true;
        setTimeout(() => {
          isWaiting = false;
        }, wait);
      }
    };
  };

  const getData = async (pageNo) => {
    try {
      const response = await fetch(`${BASE_URL}/data/page${pageNo}.json`);
      if (response.ok) {
        const parsedResponse = await response.json();
        setData((prev) => [
          ...prev,
          ...parsedResponse.page["content-items"].content,
        ]);
        setLoading(false);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.warn(`Error fetching data! ${error}`);
    }
  };

  useEffect(() => {
    if (loading == true) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading]);

  useEffect(() => {
    const throttleHandleScroll = throttle(() => {
      setLoading(true);
    }, 100);

    appContainer = document.getElementById("app-container");
    cardContainer = document.getElementById("card-container");
    appContainer?.addEventListener("scroll", throttleHandleScroll);

    return () => {
      appContainer?.removeEventListener("scroll", throttleHandleScroll);
    };
  }, []);

  useEffect(() => {
    getData(page);
  }, [page]);

  const filteredData = useMemo(
    () =>
      data.filter((item) =>
        item.name.match(
          new RegExp(searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi")
        )
      ),
    [searchQuery, data]
  );

  useEffect(() => {
    const search = () => {
      if (searchQuery.length) {
        setVisibleCards(filteredData);
      } else {
        setVisibleCards(data);
      }
    };

    search();
  }, [searchQuery, data]);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        visibleCards,
        setVisibleCards,
        searchQuery,
        setSearchQuery,
      }}
    >
      <div id="app-container" className="app-container">
        <Nav />
        <div id="card-container" className="card-container">
          <Suspense fallback={<FallbackLoader />}>
            {visibleCards.map((item) => (
              <Card data={item} />
            ))}
          </Suspense>
        </div>
      </div>
    </DataContext.Provider>
  );
};

export default App;
