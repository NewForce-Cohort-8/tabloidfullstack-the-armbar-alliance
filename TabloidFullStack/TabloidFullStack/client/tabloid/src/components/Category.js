import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";


export const Category = ({ category }) => {
  return (
    <Card className="m-4">
      
     <CardBody>
        <p>
          <Link to={`/categorys/${category.id}`}>
          <strong>{category.name}</strong>
          </Link>
        </p>
        
        
        {/* <div>
            {category.comments?.map((singleComment) => (
                <>
                <p>{singleComment.message}</p>
                <p>{singleComment?.userProfile?.name}</p>
                </>
            ))}
        </div> */}
      </CardBody>
    </Card>
  );
};