import React from "react";
import { Card, CardBody, Button } from "reactstrap";


export const Category = ({ category, onEdit }) => {
  return (
    <Card className="m-4">
      <CardBody>
        <p>
          <h5 to={`/categorys/edit${category.id}`}>
            <strong>{category.name}</strong>
          </h5>
        </p>
        <Button onClick={() => onEdit(category.id)}>Edit</Button>
      </CardBody>
    </Card>
  );
};


