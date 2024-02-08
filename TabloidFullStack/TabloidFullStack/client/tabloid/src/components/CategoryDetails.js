import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { getCategoryByIdWithComments } from "../APIManagers/CategoryManager";
import { useParams } from "react-router-dom";
import { Category } from "./Category";

export const CategoryDetails = () => {
  const [category, setCategory] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getCategoryByIdWithComments(id).then(setCategory);
  }, [id]);

  if (!category) {
    return null;
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
          <Category category={category} />
          <ListGroup>
            {category.comments && category.comments.length > 0 ? (
              category.comments.map((c) => (
                <ListGroupItem key={c.id}>{c.name}</ListGroupItem>
              ))
            ) : (
              <ListGroupItem>No comments available</ListGroupItem>
            )}
          </ListGroup>
        </div>
      </div>
    </div>
  );
};
