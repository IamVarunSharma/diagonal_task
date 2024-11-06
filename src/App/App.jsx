import React, { Suspense, useEffect, useState, useCallback, lazy } from "react";

import "./app.scss";
import { BASE_URL } from "../utils/utils";
import FallbackLoader from "../FallbackLoader/FallbackLoader";

const Search = lazy(() => import("../Search/Search"));
const Nav = lazy(() => import("../Nav/Nav"));
const Card = lazy(() => import("../Card/Card"));

const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [visibleCards, setVisibleCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibility, setVisibility] = useState(false);
  let appContainer;
  let cardContainer;

  function throttle(func, wait) {
    let isWaiting = false;
    return function executedFunction(...args) {
      if (
        appContainer.scrollTop <
          cardContainer.offsetHeight - cardContainer.offsetHeight / 1.5  ||
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
  }

  const throttleHandleScroll = throttle(() => {
    setLoading(true);
  }, 250);

  useEffect(() => {
    if (loading == true) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading]);

  useEffect(() => {
    appContainer = document.getElementById("app-container");
    cardContainer = document.getElementById("card-container");
    appContainer?.addEventListener("scroll", throttleHandleScroll);

    return () => {
      appContainer?.removeEventListener("scroll", throttleHandleScroll);
    };
  }, []);

  const getData = useCallback(async (pageNo) => {
    try {
      const response = await fetch(`${BASE_URL}/data/page${pageNo}.json`);
      if (response.ok) {
        const parsedResponse = await response.json();
        setData((prev) => [
          ...prev,
          ...parsedResponse.page["content-items"].content,
        ]);
        setLoading(false);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    } catch (error) {
      console.warn(`Error fetching data! ${error}`);
    }
  }, []);

  useEffect(() => {
    getData(page);
  }, [page]);

  return (
    <div id="app-container" className="app-container">
      <Nav setVisibility={setVisibility} />
      <Search
        visibility={visibility ? "block" : "none"}
        setVisibleCards={setVisibleCards}
        data={data}
      />
      <div id="card-container" className="card-container">
        <Suspense fallback={<FallbackLoader />}>
          {visibleCards.map((item, idx) => (
            // ids would have been prefered for keys. Because they were not present in mock api response I have used index.
            <Card data={item} key={idx} />
          ))}
        </Suspense>
      </div>
    </div>
  );
};

export default App;
