import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

//              title: "",
//             content: "",
//             imageLocation: "",
//             createDateTime: new Date(), 
//             isApproved: true,
//             categoryId: "",
//             UserProfileId: 1
export const Post = ({ post }) => {
  return (
    <Card className="m-4">
        <CardImg top src={post.imageLocation} alt={post.title} />
      <CardBody>
        <p>
          <Link to={`/posts/${post.id}`}>
          <strong>{post.title}</strong>
          </Link>
        </p>
        <p>{post.content}</p>
         <p>Comments:</p>
        <div>
            {post.comments?.map((comment) => (
                <>
                <p>{comment.message}</p>
                <p>{comment?.userProfile?.name}</p>
                </>
            ))}
        </div> 
      </CardBody>
    </Card>
  );
};