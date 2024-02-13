import React from "react";
import { Link } from "react-router-dom";


export const Tags = ({ tag }) => {
  return (
    <div className="m-4">
      <div>
        {/* <p>
          <Link to={`/tags/${tag.id}`}>
          <strong>{tag.name}</strong>
          </Link>
        </p> */}
        <div>
          <p>{tag.name}</p>
        </div>
      </div>
    </div>
  );
};