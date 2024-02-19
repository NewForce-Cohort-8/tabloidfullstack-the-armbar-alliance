import React from "react";
import { Link } from "react-router-dom";
import { DeleteTags, getAllTags } from "../../APIManagers/TagManager";
import { Button } from "reactstrap";


const handleDelete = (id) => { 
  const confirmDelete = window.confirm("Are you sure you would like to delete this tag?");
  if (confirmDelete) {
    DeleteTags(id).then(() => { 
      getAllTags();
      window.location.reload();
    });
  }
};

export const Tags = ({ tag }) => {
  return (
    <div className="m-4">
      <div>
         <p>
          <strong>{tag.name}</strong>
        </p>
        </div>
        <Button onClick={() => handleDelete(tag.id)}>Delete</Button> 
        </div>
  )}
