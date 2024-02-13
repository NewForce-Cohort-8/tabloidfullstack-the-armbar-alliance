import React from "react";
import { Card, CardBody, Button } from "reactstrap";


export const Category = ({ category, onEdit, onDelete }) => {
  return (
    <Card className="m-4">
      <CardBody>
        <p>
          <h5 to={`/categorys/edit${category.id}`}>
            <strong>{category.name}</strong>
          </h5>
        </p>
        <Button onClick={() => onEdit(category.id)}>Edit</Button>
        <span style={{ margin: '0 5px' }}></span>
        <Button onClick={() => onDelete(category.id)} color="danger">Delete</Button> 
       </CardBody>
    </Card>
  );
};


