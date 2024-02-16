import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { useParams } from "react-router-dom";
import { Tags } from "./Tags";


export const TagDetails = () => {
  const [tag, setTag] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    getTagById(id).then(setTag);
  }, [id]);
  if (!tag) {
    return null;
  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
          <Tags tags={tag} />
          {/* <ListGroup>
            {category.comments && category.comments.length > 0 ? (
              category.comments.map((c) => (
                <ListGroupItem key={c.id}>{c.name}</ListGroupItem>
              ))
            ) : (
              <ListGroupItem>No comments available</ListGroupItem>
            )}
          </ListGroup> */}
        </div>
      </div>
    </div>
  );
};