import React, { useState } from "react";

import "./card.scss";

const Card = ({ data }) => {
  const [error, setError] = useState(false);

  const handleError = (event) => {
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
        alt={data?.["poster-image"]}
        onError={handleError}
      />
      <span className="card-name">{data?.name}</span>
    </div>
  );
};

export default Card;
