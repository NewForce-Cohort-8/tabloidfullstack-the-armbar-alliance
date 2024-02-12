import React from "react";
import { Link } from "react-router-dom";


export const Tags = ({ tag }) => {
  return (
    <div className="m-4">
      <div>
        <div>
          <p>{tag.name}</p>
        </div>
      </div>
    </div>
  );
};