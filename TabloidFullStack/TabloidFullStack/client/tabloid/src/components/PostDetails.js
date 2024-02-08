import React, { useState, useEffect } from "react";
import { getPostById } from "../Managers/PostManager";
import { useParams } from "react-router-dom";
// import "./Posts.css"
import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
// import { CommentList } from "../Comment/CommentList";
// import { Button } from "reactstrap";
export const PostDetails = () => {
    const [postDetails, setPostDetails] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        getPostById(id)
            .then((data) =>
            {setPostDetails(data);
            })
            .catch((error) => {
                console.log("Error fetching user posts:", error);
            });
    }, [id]);
    //returns a list of all user profiles
    return (
    <>
    {console.log(id)}
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-lg-6">
        <Card className="m-4">
      <CardImg top src={postDetails.imageUrl} alt={"image not available"} />
      <CardBody>
        <p>
        <Link to={`/posts/${postDetails.id}`}>
            <strong>Title: {postDetails.title}</strong>
        </Link>
        </p>
        <p>{postDetails.content}</p>
        <p className="text-left px-2">Posted by: <Link to={`/userprofile/${postDetails.userProfileId}`}>{postDetails.userProfile?.firstName} {postDetails.userProfile?.lastName}</Link>
        </p>
        <p className="text-left px-2">Posted: {postDetails.publishDateTime}
        </p>
        {/* <div>
          <h5>Comments:</h5>
          {postDetails.comments.map((comment) => (
            <div key={comment.id}>
              <p>{comment.message}</p>
              <p>Posted by: {comment.userProfileId}</p>
            </div>
          ))}
        </div> */}
       {/* <Button tag={Link} to={`/comment/create/${postDetails.id}`} className="comment-btn">Add Comment</Button> */}
        {/* <CommentList /> */}
      </CardBody>
    </Card>
        </div>
      </div>
    </div>
    </>
    )}