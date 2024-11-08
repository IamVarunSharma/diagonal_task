import React, { useState, memo } from "react";

import "./card.scss";

const Card = ({ data }) => {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  return (
    <div className="card">
      <img
        className="card-image"
        src={
          error
            ? "https://test.create.diagnal.com/images/placeholder_for_missing_posters.png"
            : `https://test.create.diagnal.com/images/${data?.["poster-image"]}`
        }
        // unique key is required to avoid issue with data updation as with any list of JSX components in react it is recommended to use unique value for keys. As it wasn't present in mock API data I have skipped it. In this case index as keys won't work as it is not a stable list
        alt={data?.["poster-image"]}
        onError={handleError}
      />
      <span className="card-name">{data?.name}</span>
    </div>
  );
};

export default memo(Card);
